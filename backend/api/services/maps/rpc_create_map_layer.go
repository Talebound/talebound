package maps

import (
	"context"
	"github.com/the-medo/talebound-backend/converters"
	db "github.com/the-medo/talebound-backend/db/sqlc"
	"github.com/the-medo/talebound-backend/e"
	"github.com/the-medo/talebound-backend/pb"
	"github.com/the-medo/talebound-backend/validator"
	"google.golang.org/genproto/googleapis/rpc/errdetails"
)

func (server *ServiceMaps) CreateMapLayer(ctx context.Context, request *pb.CreateMapLayerRequest) (*pb.ViewMapLayer, error) {
	violations := validateCreateMapLayer(request)
	if violations != nil {
		return nil, e.InvalidArgumentError(violations)
	}

	_, err := server.CheckEntityTypePermissions(ctx, db.EntityTypeMap, request.GetMapId(), nil)
	if err != nil {
		return nil, err
	}

	layer, err := server.Store.CreateMapLayerTx(ctx, db.CreateMapLayerTxParams{
		MapID: request.GetMapId(), Name: request.GetName(), ImageID: request.GetImageId(), Enabled: request.GetEnabled(), Position: request.Position,
	})
	if err != nil {
		return nil, mapLayerError(err)
	}
	return converters.ConvertViewMapLayer(layer), nil
}

func validateCreateMapLayer(req *pb.CreateMapLayerRequest) (violations []*errdetails.BadRequest_FieldViolation) {
	if err := validator.ValidateMapId(req.GetMapId()); err != nil {
		violations = append(violations, e.FieldViolation("map_id", err))
	}

	if err := validator.ValidateUniversalName(req.GetName()); err != nil {
		violations = append(violations, e.FieldViolation("name", err))
	}

	if err := validator.ValidateImageId(req.GetImageId()); err != nil {
		violations = append(violations, e.FieldViolation("image_id", err))
	}

	return violations
}
