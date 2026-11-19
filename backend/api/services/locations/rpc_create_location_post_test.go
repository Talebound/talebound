package locations

import (
	"context"
	"database/sql"
	"strings"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	"github.com/the-medo/talebound-backend/api/servicecore"
	"github.com/the-medo/talebound-backend/api/testutils"
	mockdb "github.com/the-medo/talebound-backend/db/mock"
	db "github.com/the-medo/talebound-backend/db/sqlc"
	"github.com/the-medo/talebound-backend/pb"
	"github.com/the-medo/talebound-backend/token"
	"go.uber.org/mock/gomock"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func TestCreateLocationPostPermissions(t *testing.T) {
	for _, tc := range []struct {
		name     string
		loggedIn bool
		approved int32
		types    []db.EntityType
		allowed  bool
	}{
		{name: "logged out"},
		{name: "viewer", loggedIn: true},
		{name: "location only", loggedIn: true, approved: 1, types: []db.EntityType{db.EntityTypeLocation}},
		{name: "post only", loggedIn: true, approved: 1, types: []db.EntityType{db.EntityTypePost}},
		{name: "both permissions", loggedIn: true, approved: 1, types: []db.EntityType{db.EntityTypeLocation, db.EntityTypePost}, allowed: true},
	} {
		t.Run(tc.name, func(t *testing.T) {
			store := mockdb.NewMockStore(gomock.NewController(t))
			maker, err := token.NewPasetoMaker(strings.Repeat("l", 32))
			require.NoError(t, err)
			service := NewLocationsService(&servicecore.ServiceCore{Store: store, TokenMaker: maker})
			ctx := context.Background()
			if tc.loggedIn {
				ctx = testutils.NewContextWithCookie(t, maker, 42, time.Hour)
			}
			store.EXPECT().GetEntityByLocationId(gomock.Any(), sql.NullInt32{Int32: 7, Valid: true}).Return(db.Entity{ID: 11, ModuleID: 100}, nil)
			if tc.loggedIn {
				store.EXPECT().GetEntityModuleAdmin(gomock.Any(), db.GetEntityModuleAdminParams{UserID: 42, EntityID: 11}).Return(db.ViewModuleAdmin{Approved: tc.approved, AllowedEntityTypes: tc.types}, nil)
				store.EXPECT().HasUserRole(gomock.Any(), gomock.Any()).Return(db.HasUserRoleRow{}, sql.ErrNoRows)
			}
			if tc.allowed {
				store.EXPECT().CreateLocationPostTx(gomock.Any(), int32(7), int32(42)).Return(db.Location{ID: 7, Name: "Harbor", PostID: sql.NullInt32{Int32: 19, Valid: true}}, nil)
			}
			result, err := service.CreateLocationPost(ctx, &pb.CreateLocationPostRequest{LocationId: 7})
			if tc.allowed {
				require.NoError(t, err)
				require.Equal(t, int32(19), result.GetPostId())
			} else {
				require.Error(t, err)
				require.Nil(t, result)
			}
		})
	}
}

func TestLocationSortingDirection(t *testing.T) {
	store := mockdb.NewMockStore(gomock.NewController(t))
	service := NewLocationsService(&servicecore.ServiceCore{Store: store})
	direction := "asc"
	field := "name"
	module := int32(7)
	store.EXPECT().GetLocations(gomock.Any(), gomock.Any()).DoAndReturn(func(_ context.Context, p db.GetLocationsParams) ([]db.GetLocationsRow, error) {
		require.Equal(t, sql.NullString{String: "ASC", Valid: true}, p.OrderDirection)
		require.Equal(t, field, p.OrderBy.String)
		require.Equal(t, module, p.ModuleID.Int32)
		return []db.GetLocationsRow{}, nil
	})
	_, err := service.GetLocations(context.Background(), &pb.GetLocationsRequest{ModuleId: &module, OrderBy: &field, OrderDirection: &direction})
	require.NoError(t, err)
	direction = "invalid"
	_, err = service.GetLocations(context.Background(), &pb.GetLocationsRequest{OrderDirection: &direction})
	require.Equal(t, codes.InvalidArgument, status.Code(err))
	field = "not_a_column"
	direction = "desc"
	_, err = service.GetLocations(context.Background(), &pb.GetLocationsRequest{OrderBy: &field, OrderDirection: &direction})
	require.Equal(t, codes.InvalidArgument, status.Code(err))
}
