package maps

import (
	"database/sql"
	"errors"
	db "github.com/the-medo/talebound-backend/db/sqlc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func mapLayerError(err error) error {
	switch {
	case errors.Is(err, db.ErrBaseMapLayer):
		return status.Error(codes.FailedPrecondition, err.Error())
	case errors.Is(err, db.ErrMapLayerMap), errors.Is(err, sql.ErrNoRows):
		return status.Error(codes.NotFound, "map or layer not found")
	case errors.Is(err, db.ErrMapLayerPosition), errors.Is(err, db.ErrMapLayerImageSize):
		return status.Error(codes.InvalidArgument, err.Error())
	default:
		return err
	}
}
