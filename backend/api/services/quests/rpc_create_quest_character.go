package quests

import (
	"context"
	"database/sql"
	"errors"
	"github.com/lib/pq"
	"github.com/the-medo/talebound-backend/api/servicecore"
	"github.com/the-medo/talebound-backend/converters"
	db "github.com/the-medo/talebound-backend/db/sqlc"
	"github.com/the-medo/talebound-backend/e"
	"github.com/the-medo/talebound-backend/pb"
	"github.com/the-medo/talebound-backend/validator"
	"google.golang.org/genproto/googleapis/rpc/errdetails"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (server *ServiceQuests) CreateQuestCharacter(ctx context.Context, request *pb.CreateQuestCharacterRequest) (*pb.QuestCharacter, error) {
	violations := validateCreateQuestCharacter(request)
	if violations != nil {
		return nil, e.InvalidArgumentError(violations)
	}

	if _, err := server.AuthorizeUserCookie(ctx); err != nil {
		return nil, e.UnauthenticatedError(err)
	}
	// Only the character manager can apply.
	_, _, err := server.CheckModuleTypePermissions(ctx, db.ModuleTypeCharacter, request.GetCharacterId(), &servicecore.ModulePermission{
		NeedsSuperAdmin: true,
	})
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, "only the character manager can apply to a quest")
	}

	quest, err := server.Store.GetQuestByID(ctx, request.GetQuestId())
	if errors.Is(err, sql.ErrNoRows) {
		return nil, status.Error(codes.NotFound, "quest not found")
	}
	if err != nil {
		return nil, err
	}
	if !quest.CanJoin || (quest.Status != db.QuestStatusNotStarted && quest.Status != db.QuestStatusInProgress) {
		return nil, status.Error(codes.FailedPrecondition, "this quest is not accepting applications")
	}
	character, err := server.Store.GetCharacterByID(ctx, request.GetCharacterId())
	if err != nil {
		return nil, err
	}
	if quest.SystemID != character.SystemID {
		return nil, status.Errorf(codes.FailedPrecondition, "failed to create quest character: quest and character systems do not match")
	}
	if quest.WorldID != character.WorldID {
		return nil, status.Errorf(codes.FailedPrecondition, "failed to create quest character: quest and character worlds do not match")
	}

	argQuestCharacter := db.CreateQuestCharacterParams{
		QuestID:            request.GetQuestId(),
		CharacterID:        request.GetCharacterId(),
		Approved:           2, //Pending
		MotivationalLetter: request.GetMotivationalLetter(),
	}

	newQuestCharacter, err := server.Store.CreateQuestCharacter(ctx, argQuestCharacter)
	if err != nil {
		var pqErr *pq.Error
		if errors.As(err, &pqErr) && pqErr.Code == "23505" {
			return nil, status.Error(codes.AlreadyExists, "this character already has an application for this quest")
		}
		return nil, err
	}

	rsp := converters.ConvertQuestCharacter(newQuestCharacter)

	return rsp, nil
}

func validateCreateQuestCharacter(req *pb.CreateQuestCharacterRequest) (violations []*errdetails.BadRequest_FieldViolation) {
	if err := validator.ValidateUniversalId(req.GetQuestId()); err != nil {
		violations = append(violations, e.FieldViolation("quest_id", err))
	}

	if err := validator.ValidateUniversalId(req.GetCharacterId()); err != nil {
		violations = append(violations, e.FieldViolation("character_id", err))
	}
	if err := validator.ValidateString(req.GetMotivationalLetter(), 0, 5000); err != nil {
		violations = append(violations, e.FieldViolation("motivational_letter", err))
	}
	return violations
}
