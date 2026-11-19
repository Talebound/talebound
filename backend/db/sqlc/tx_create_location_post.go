package db

import (
	"context"
	"database/sql"
)

// CreateLocationPostTx serializes creation for a location. Retried requests return
// its existing post, and a failed module assignment leaves no orphaned records.
func (store *SQLStore) CreateLocationPostTx(ctx context.Context, locationID, userID int32) (Location, error) {
	var result Location
	err := store.execTx(ctx, func(q *Queries) error {
		location, err := q.GetLocationForUpdate(ctx, locationID)
		if err != nil {
			return err
		}
		if location.PostID.Valid {
			result = location
			return nil
		}
		entity, err := q.GetEntityByLocationId(ctx, sql.NullInt32{Int32: locationID, Valid: true})
		if err != nil {
			return err
		}
		post, err := q.CreatePost(ctx, CreatePostParams{
			UserID: userID, Title: location.Name, Content: "", IsDraft: false, IsPrivate: false,
		})
		if err != nil {
			return err
		}
		postID := sql.NullInt32{Int32: post.ID, Valid: true}
		if _, err = q.CreateEntity(ctx, CreateEntityParams{
			Type: EntityTypePost, ModuleID: entity.ModuleID, PostID: postID,
		}); err != nil {
			return err
		}
		result, err = q.UpdateLocation(ctx, UpdateLocationParams{ID: locationID, PostID: postID})
		return err
	})
	return result, err
}
