package quests

import (
	"context"
	"database/sql"
	"strings"
	"testing"
	"time"

	"github.com/lib/pq"
	"github.com/stretchr/testify/require"
	"github.com/the-medo/talebound-backend/api/servicecore"
	"github.com/the-medo/talebound-backend/api/testutils"
	"github.com/the-medo/talebound-backend/constants"
	mockdb "github.com/the-medo/talebound-backend/db/mock"
	db "github.com/the-medo/talebound-backend/db/sqlc"
	"github.com/the-medo/talebound-backend/pb"
	"github.com/the-medo/talebound-backend/token"
	"go.uber.org/mock/gomock"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/proto"
)

func participationService(t *testing.T) (*ServiceQuests, *mockdb.MockStore, context.Context) {
	t.Helper()
	store := mockdb.NewMockStore(gomock.NewController(t))
	maker, err := token.NewPasetoMaker(strings.Repeat("q", 32))
	require.NoError(t, err)
	server := NewQuestsService(&servicecore.ServiceCore{Store: store, TokenMaker: maker})
	ctx := testutils.NewContextWithCookie(t, maker, 42, time.Hour)
	return server, store, grpc.NewContextWithServerTransportStream(ctx, &testutils.MockServerTransportStream{})
}

// The character and quest deliberately have different IDs and module IDs.
func expectManager(store *mockdb.MockStore, moduleType db.ModuleType, allowed bool) {
	id := int32(100)
	if moduleType == db.ModuleTypeCharacter {
		id = 200
	}
	store.EXPECT().GetModule(gomock.Any(), gomock.Any()).DoAndReturn(func(_ context.Context, arg db.GetModuleParams) (db.Module, error) {
		if moduleType == db.ModuleTypeCharacter {
			return db.Module{ID: id, CharacterID: arg.CharacterID}, nil
		}
		return db.Module{ID: id, QuestID: arg.QuestID}, nil
	})
	store.EXPECT().GetModuleAdmin(gomock.Any(), db.GetModuleAdminParams{ModuleID: id, UserID: 42}).Return(db.ViewModuleAdmin{SuperAdmin: allowed, Approved: 1}, nil)
	store.EXPECT().HasUserRole(gomock.Any(), gomock.Any()).Return(db.HasUserRoleRow{}, sql.ErrNoRows)
}

func TestCreateQuestCharacter(t *testing.T) {
	for _, tc := range []struct {
		name                                string
		closed, mismatch, duplicate, denied bool
		code                                codes.Code
	}{
		{name: "compatible character", code: codes.OK},
		{name: "closed recruitment", closed: true, code: codes.FailedPrecondition},
		{name: "incompatible world", mismatch: true, code: codes.FailedPrecondition},
		{name: "duplicate application", duplicate: true, code: codes.AlreadyExists},
		{name: "another users character", denied: true, code: codes.PermissionDenied},
	} {
		t.Run(tc.name, func(t *testing.T) {
			server, store, ctx := participationService(t)
			expectManager(store, db.ModuleTypeCharacter, !tc.denied)
			quest := db.Quest{ID: 11, CanJoin: !tc.closed, Status: db.QuestStatusNotStarted, WorldID: sql.NullInt32{Int32: 1, Valid: true}, SystemID: sql.NullInt32{Int32: 2, Valid: true}}
			if !tc.denied {
				store.EXPECT().GetQuestByID(gomock.Any(), int32(11)).Return(quest, nil)
				if !tc.closed {
					character := db.Character{ID: 22, WorldID: quest.WorldID, SystemID: quest.SystemID}
					if tc.mismatch {
						character.WorldID.Int32 = 99
					}
					store.EXPECT().GetCharacterByID(gomock.Any(), int32(22)).Return(character, nil)
					if !tc.mismatch {
						var insertErr error
						if tc.duplicate {
							insertErr = &pq.Error{Code: "23505"}
						}
						store.EXPECT().CreateQuestCharacter(gomock.Any(), db.CreateQuestCharacterParams{QuestID: 11, CharacterID: 22, Approved: 2, MotivationalLetter: "Ready to explore"}).Return(db.QuestCharacter{QuestID: 11, CharacterID: 22, Approved: 2}, insertErr)
					}
				}
			}
			result, err := server.CreateQuestCharacter(ctx, &pb.CreateQuestCharacterRequest{QuestId: 11, CharacterId: 22, MotivationalLetter: "Ready to explore"})
			require.Equal(t, tc.code, status.Code(err))
			if tc.code == codes.OK {
				require.Equal(t, int32(2), result.Approved)
			}
		})
	}
}

func TestQuestApplicationRequiresAuthenticationAndValidInput(t *testing.T) {
	server, _, _ := participationService(t)
	_, err := server.CreateQuestCharacter(context.Background(), &pb.CreateQuestCharacterRequest{QuestId: 11, CharacterId: 22})
	require.Equal(t, codes.Unauthenticated, status.Code(err))
	_, err = server.CreateQuestCharacter(context.Background(), &pb.CreateQuestCharacterRequest{QuestId: 11, CharacterId: 22, MotivationalLetter: strings.Repeat("a", 5001)})
	require.Equal(t, codes.InvalidArgument, status.Code(err))
	for _, req := range []*pb.UpdateQuestCharacterRequest{
		{QuestId: 11, CharacterId: 22},
		{QuestId: 11, CharacterId: 22, Approved: ptr(int32(3))},
		{QuestId: 11, CharacterId: 22, MotivationalLetter: ptr(strings.Repeat("a", 5001))},
	} {
		_, err = server.UpdateQuestCharacter(context.Background(), req)
		require.Equal(t, codes.InvalidArgument, status.Code(err))
	}
}

func ptr[T any](value T) *T { return &value }

func TestQuestApplicationApproval(t *testing.T) {
	for _, tc := range []struct {
		name              string
		manager, finished bool
		code              codes.Code
	}{
		{name: "manager approves", manager: true, code: codes.OK},
		{name: "player cannot self approve", code: codes.PermissionDenied},
		{name: "finished quest rejects approval", manager: true, finished: true, code: codes.FailedPrecondition},
	} {
		t.Run(tc.name, func(t *testing.T) {
			server, store, ctx := participationService(t)
			expectManager(store, db.ModuleTypeQuest, tc.manager)
			if tc.manager {
				quest := db.Quest{ID: 11, Status: db.QuestStatusNotStarted}
				if tc.finished {
					quest.Status = db.QuestStatusFinishedCompleted
				}
				store.EXPECT().GetQuestByID(gomock.Any(), int32(11)).Return(quest, nil)
				store.EXPECT().GetCharacterByID(gomock.Any(), int32(22)).Return(db.Character{ID: 22}, nil)
				if !tc.finished {
					store.EXPECT().UpdateQuestCharacter(gomock.Any(), db.UpdateQuestCharacterParams{QuestID: 11, CharacterID: 22, Approved: sql.NullInt32{Int32: 1, Valid: true}}).Return(db.QuestCharacter{Approved: 1}, nil)
				}
			}
			_, err := server.UpdateQuestCharacter(ctx, &pb.UpdateQuestCharacterRequest{QuestId: 11, CharacterId: 22, Approved: ptr(int32(1))})
			require.Equal(t, tc.code, status.Code(err))
		})
	}
}

func TestQuestApplicationLetterDoesNotChangeApproval(t *testing.T) {
	server, store, ctx := participationService(t)
	expectManager(store, db.ModuleTypeCharacter, true)
	store.EXPECT().UpdateQuestCharacter(gomock.Any(), db.UpdateQuestCharacterParams{QuestID: 11, CharacterID: 22, MotivationalLetter: sql.NullString{String: "Updated", Valid: true}}).Return(db.QuestCharacter{Approved: 2}, nil)
	result, err := server.UpdateQuestCharacter(ctx, &pb.UpdateQuestCharacterRequest{QuestId: 11, CharacterId: 22, MotivationalLetter: ptr("Updated")})
	require.NoError(t, err)
	require.Equal(t, int32(2), result.Approved)
}

func TestFinishQuestClosesRecruitment(t *testing.T) {
	server, store, ctx := participationService(t)
	expectManager(store, db.ModuleTypeQuest, true)
	store.EXPECT().GetQuestByID(gomock.Any(), int32(11)).Return(db.Quest{ID: 11, Status: db.QuestStatusInProgress, CanJoin: true}, nil)
	store.EXPECT().UpdateQuest(gomock.Any(), gomock.Any()).DoAndReturn(func(_ context.Context, arg db.UpdateQuestParams) (db.Quest, error) {
		require.Equal(t, sql.NullBool{Bool: false, Valid: true}, arg.CanJoin)
		require.Equal(t, db.QuestStatusFinishedCompleted, arg.Status.QuestStatus)
		return db.Quest{ID: 11, Status: arg.Status.QuestStatus}, nil
	})
	_, err := server.UpdateQuest(ctx, &pb.UpdateQuestRequest{QuestId: 11, Status: ptr(pb.QuestStatus_FINISHED_COMPLETED)})
	require.NoError(t, err)
}

func TestQuestWorldChangeChecksOriginalWorld(t *testing.T) {
	server, store, ctx := participationService(t)
	expectManager(store, db.ModuleTypeQuest, true)
	store.EXPECT().GetQuestByID(gomock.Any(), int32(11)).Return(db.Quest{ID: 11, WorldID: sql.NullInt32{Int32: 1, Valid: true}}, nil)
	store.EXPECT().GetQuestCharactersByQuestID(gomock.Any(), int32(11)).Return([]db.QuestCharacter{}, nil)
	store.EXPECT().GetWorldByID(gomock.Any(), int32(1)).Return(db.World{Name: constants.UniversalWorldName}, nil)
	store.EXPECT().UpdateQuest(gomock.Any(), gomock.Any()).DoAndReturn(func(_ context.Context, arg db.UpdateQuestParams) (db.Quest, error) {
		require.Equal(t, int32(9), arg.WorldID.Int32)
		return db.Quest{ID: 11}, nil
	})
	_, err := server.UpdateQuest(ctx, &pb.UpdateQuestRequest{QuestId: 11, WorldId: ptr(int32(9))})
	require.NoError(t, err)
}

func TestQuestApplicationVisibility(t *testing.T) {
	rows := []db.QuestCharacter{{QuestID: 11, CharacterID: 21, Approved: 2, MotivationalLetter: "Private pending message"}, {QuestID: 11, CharacterID: 22, Approved: 1, MotivationalLetter: "Private accepted message"}}
	t.Run("visitor sees accepted participants without messages", func(t *testing.T) {
		server, store, _ := participationService(t)
		store.EXPECT().GetModule(gomock.Any(), gomock.Any()).Return(db.Module{ID: 100}, nil)
		visible := server.VisibleQuestCharacters(context.Background(), rows, db.ModuleTypeQuest, 11)
		require.Len(t, visible, 1)
		require.Equal(t, int32(22), visible[0].CharacterID)
		require.Empty(t, visible[0].MotivationalLetter)
		require.Equal(t, "Private accepted message", rows[1].MotivationalLetter)
	})
	t.Run("manager sees applications and messages", func(t *testing.T) {
		server, store, ctx := participationService(t)
		expectManager(store, db.ModuleTypeQuest, true)
		require.Equal(t, rows, server.VisibleQuestCharacters(ctx, rows, db.ModuleTypeQuest, 11))
	})
}

// Older gRPC clients encode orderBy, limit and offset as fields 5, 6 and 7.
// Recruitment filters must not reuse those wire numbers.
func TestGetQuestsRequestWireCompatibility(t *testing.T) {
	var request pb.GetQuestsRequest
	err := proto.Unmarshal([]byte{0x2a, 0x04, 'n', 'a', 'm', 'e', 0x30, 10, 0x38, 20}, &request)
	require.NoError(t, err)
	require.Equal(t, "name", request.GetOrderBy())
	require.Equal(t, int32(10), request.GetLimit())
	require.Equal(t, int32(20), request.GetOffset())
	require.Nil(t, request.CanJoin)
	require.Nil(t, request.Status)
}
