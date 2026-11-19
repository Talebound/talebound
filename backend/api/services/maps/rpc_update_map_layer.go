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

func (server *ServiceMaps) UpdateMapLayer(ctx context.Context, request *pb.UpdateMapLayerRequest) (*pb.ViewMapLayer, error) {
	violations := validateUpdateMapLayer(request)
	if violations != nil {
		return nil, e.InvalidArgumentError(violations)
	}

	_, err := server.CheckEntityTypePermissions(ctx, db.EntityTypeMap, request.GetMapId(), nil)
	if err != nil {
		return nil, err
	}

	layer, err := server.Store.UpdateMapLayerTx(ctx, db.UpdateMapLayerTxParams{
		MapID: request.GetMapId(), LayerID: request.GetLayerId(), Name: request.Name, ImageID: request.ImageId, Enabled: request.Enabled, Position: request.Position,
	})
	if err != nil {
		return nil, mapLayerError(err)
	}
	return converters.ConvertViewMapLayer(layer), nil
}

func validateUpdateMapLayer(req *pb.UpdateMapLayerRequest) (violations []*errdetails.BadRequest_FieldViolation) {
	if err := validator.ValidateMapId(req.GetMapId()); err != nil {
		violations = append(violations, e.FieldViolation("map_id", err))
	}

	if err := validator.ValidateUniversalId(req.GetLayerId()); err != nil {
		violations = append(violations, e.FieldViolation("layer_id", err))
	}

	if req.Name != nil {
		if err := validator.ValidateUniversalName(req.GetName()); err != nil {
			violations = append(violations, e.FieldViolation("name", err))
		}
	}

	if req.ImageId != nil {
		if err := validator.ValidateImageId(req.GetImageId()); err != nil {
			violations = append(violations, e.FieldViolation("image_id", err))
		}
	}

	return violations
}
