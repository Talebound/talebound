package locations

import (
	"context"
	"github.com/the-medo/talebound-backend/api/servicecore"
	"github.com/the-medo/talebound-backend/converters"
	db "github.com/the-medo/talebound-backend/db/sqlc"
	"github.com/the-medo/talebound-backend/e"
	"github.com/the-medo/talebound-backend/pb"
	"github.com/the-medo/talebound-backend/validator"
	"google.golang.org/genproto/googleapis/rpc/errdetails"
)

func (server *ServiceLocations) CreateLocationPost(ctx context.Context, request *pb.CreateLocationPostRequest) (*pb.Location, error) {

	violations := validateCreateLocationPost(request)
	if violations != nil {
		return nil, e.InvalidArgumentError(violations)
	}

	authPayload, err := server.CheckEntityTypePermissions(ctx, db.EntityTypeLocation, request.GetLocationId(), &servicecore.ModulePermission{
		NeedsEntityPermission: &[]db.EntityType{db.EntityTypeLocation, db.EntityTypePost},
	})

	if err != nil {
		return nil, err
	}

	location, err := server.Store.CreateLocationPostTx(ctx, request.GetLocationId(), authPayload.UserId)
	if err != nil {
		return nil, err
	}

	rsp := converters.ConvertLocation(location)

	return rsp, nil
}

func validateCreateLocationPost(req *pb.CreateLocationPostRequest) (violations []*errdetails.BadRequest_FieldViolation) {

	if err := validator.ValidateLocationId(req.GetLocationId()); err != nil {
		violations = append(violations, e.FieldViolation("location_id", err))
	}

	return violations
}
