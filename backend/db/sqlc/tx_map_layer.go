package db

import (
	"context"
	"database/sql"
	"errors"
)

var (
	ErrBaseMapLayer      = errors.New("the base layer must stay enabled at position 1")
	ErrMapLayerMap       = errors.New("layer does not belong to this map")
	ErrMapLayerPosition  = errors.New("invalid overlay position")
	ErrMapLayerImageSize = errors.New("layer image dimensions must match the map")
)

type CreateMapLayerTxParams struct {
	MapID    int32
	Name     string
	ImageID  int32
	Enabled  bool
	Position *int32
}

type UpdateMapLayerTxParams struct {
	MapID    int32
	LayerID  int32
	Name     *string
	ImageID  *int32
	Enabled  *bool
	Position *int32
}

// All layer mutations lock the parent map first, so position shifts and image
// size changes cannot race with another create, reorder, update, or deletion.
func (store *SQLStore) CreateMapLayerTx(ctx context.Context, arg CreateMapLayerTxParams) (ViewMapLayer, error) {
	var result ViewMapLayer
	err := store.execTx(ctx, func(q *Queries) error {
		m, err := q.GetMapForUpdate(ctx, arg.MapID)
		if err != nil {
			return err
		}
		layers, err := q.GetMapLayers(ctx, arg.MapID)
		if err != nil {
			return err
		}
		if len(layers) == 0 {
			return ErrBaseMapLayer
		}
		position := int32(len(layers) + 1)
		if arg.Position != nil {
			position = *arg.Position
		}
		if position < 2 || position > int32(len(layers)+1) {
			return ErrMapLayerPosition
		}
		img, err := q.GetImageById(ctx, arg.ImageID)
		if err != nil {
			return err
		}
		if m.Width != img.Width || m.Height != img.Height {
			return ErrMapLayerImageSize
		}
		if err = q.IncreaseMapLayerPositions(ctx, IncreaseMapLayerPositionsParams{MapID: arg.MapID, Position: position}); err != nil {
			return err
		}
		layer, err := q.CreateMapLayer(ctx, CreateMapLayerParams{MapID: arg.MapID, Name: arg.Name, ImageID: arg.ImageID, Enabled: arg.Enabled, Position: position})
		if err != nil {
			return err
		}
		result, err = q.GetMapLayerByID(ctx, layer.ID)
		return err
	})
	return result, err
}

func (store *SQLStore) UpdateMapLayerTx(ctx context.Context, arg UpdateMapLayerTxParams) (ViewMapLayer, error) {
	var result ViewMapLayer
	err := store.execTx(ctx, func(q *Queries) error {
		m, err := q.GetMapForUpdate(ctx, arg.MapID)
		if err != nil {
			return err
		}
		layer, err := q.GetMapLayerByID(ctx, arg.LayerID)
		if err != nil {
			return err
		}
		if layer.MapID != arg.MapID {
			return ErrMapLayerMap
		}
		if layer.Position == 1 && ((arg.Enabled != nil && !*arg.Enabled) || (arg.Position != nil && *arg.Position != 1)) {
			return ErrBaseMapLayer
		}
		layers, err := q.GetMapLayers(ctx, arg.MapID)
		if err != nil {
			return err
		}
		if arg.Position != nil && layer.Position != 1 && (*arg.Position < 2 || *arg.Position > int32(len(layers))) {
			return ErrMapLayerPosition
		}
		update := UpdateMapLayerParams{ID: arg.LayerID}
		if arg.Name != nil {
			update.Name = sql.NullString{String: *arg.Name, Valid: true}
		}
		if arg.Enabled != nil {
			update.Enabled = sql.NullBool{Bool: *arg.Enabled, Valid: true}
		}
		if arg.ImageID != nil {
			img, err := q.GetImageById(ctx, *arg.ImageID)
			if err != nil {
				return err
			}
			if m.Width != img.Width || m.Height != img.Height {
				if len(layers) != 1 {
					return ErrMapLayerImageSize
				}
				if _, err = q.UpdateMap(ctx, UpdateMapParams{ID: arg.MapID, Width: sql.NullInt32{Int32: img.Width, Valid: true}, Height: sql.NullInt32{Int32: img.Height, Valid: true}}); err != nil {
					return err
				}
			}
			update.ImageID = sql.NullInt32{Int32: *arg.ImageID, Valid: true}
		}
		if arg.Position != nil && *arg.Position != layer.Position {
			if err = q.MoveMapLayer(ctx, MoveMapLayerParams{ID: arg.LayerID, Position: *arg.Position}); err != nil {
				return err
			}
		}
		if _, err = q.UpdateMapLayer(ctx, update); err != nil {
			return err
		}
		result, err = q.GetMapLayerByID(ctx, arg.LayerID)
		return err
	})
	return result, err
}

func (store *SQLStore) DeleteMapLayerTx(ctx context.Context, mapID, layerID int32) error {
	return store.execTx(ctx, func(q *Queries) error {
		if _, err := q.GetMapForUpdate(ctx, mapID); err != nil {
			return err
		}
		layer, err := q.GetMapLayerByID(ctx, layerID)
		if err != nil {
			return err
		}
		if layer.MapID != mapID {
			return ErrMapLayerMap
		}
		if layer.Position == 1 {
			return ErrBaseMapLayer
		}
		if err = q.DeleteMapPinsForMapLayer(ctx, sql.NullInt32{Int32: layerID, Valid: true}); err != nil {
			return err
		}
		if err = q.DeleteMapLayer(ctx, layerID); err != nil {
			return err
		}
		return q.DecreaseMapLayerPositions(ctx, DecreaseMapLayerPositionsParams{MapID: mapID, Position: layer.Position})
	})
}
