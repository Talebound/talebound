package db

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"sort"
	"sync"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	"github.com/the-medo/talebound-backend/util"
)

func todoistModule(t *testing.T) (*SQLStore, int32, int32) {
	t.Helper()
	user := CreateRandomUser(t)
	store := NewStore(testDB).(*SQLStore)
	system, err := store.CreateSystemTx(context.Background(), CreateSystemTxParams{UserId: user.ID, CreateSystemParams: CreateSystemParams{Name: util.RandomString(12)}})
	require.NoError(t, err)
	// Keep the introductory post outside the entity-list fixtures.
	_, err = testDB.Exec("DELETE FROM entities WHERE module_id = $1", system.Module.ID)
	require.NoError(t, err)
	return store, user.ID, system.Module.ID
}

func todoistLocation(t *testing.T, store *SQLStore, moduleID int32, name string) Location {
	t.Helper()
	loc, err := store.CreateLocation(context.Background(), CreateLocationParams{Name: name})
	require.NoError(t, err)
	_, err = store.CreateEntity(context.Background(), CreateEntityParams{Type: EntityTypeLocation, ModuleID: moduleID, LocationID: sql.NullInt32{Int32: loc.ID, Valid: true}})
	require.NoError(t, err)
	return loc
}

func TestCreateLocationPostTransaction(t *testing.T) {
	store, userID, moduleID := todoistModule(t)
	loc := todoistLocation(t, store, moduleID, "Concurrent location "+util.RandomString(8))
	const requests = 8
	results := make(chan Location, requests)
	errs := make(chan error, requests)
	var wg sync.WaitGroup
	for range requests {
		wg.Add(1)
		go func() {
			defer wg.Done()
			result, err := store.CreateLocationPostTx(context.Background(), loc.ID, userID)
			results <- result
			errs <- err
		}()
	}
	wg.Wait()
	close(results)
	close(errs)
	for err := range errs {
		require.NoError(t, err)
	}
	saved, err := store.GetLocationById(context.Background(), loc.ID)
	require.NoError(t, err)
	require.True(t, saved.PostID.Valid)
	for result := range results {
		require.Equal(t, saved.PostID, result.PostID)
	}
	var count int
	require.NoError(t, testDB.QueryRow("SELECT count(*) FROM posts WHERE title = $1", loc.Name).Scan(&count))
	require.Equal(t, 1, count)
	entity, err := store.GetEntityByPostId(context.Background(), saved.PostID)
	require.NoError(t, err)
	require.Equal(t, moduleID, entity.ModuleID)
	post, err := store.GetPostById(context.Background(), saved.PostID.Int32)
	require.NoError(t, err)
	require.Equal(t, userID, post.UserID)
	require.Equal(t, loc.Name, post.Title)
}

func TestCreateLocationPostRollback(t *testing.T) {
	store, userID, moduleID := todoistModule(t)
	loc := todoistLocation(t, store, moduleID, "Rollback location "+util.RandomString(8))
	// Fail after the post has been inserted, proving that the earlier write rolls back.
	_, err := testDB.Exec(fmt.Sprintf(`CREATE FUNCTION todoist_reject_entity_%d() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.module_id = %d AND NEW.type = 'post' THEN RAISE EXCEPTION 'test entity failure'; END IF; RETURN NEW; END $$;
 CREATE TRIGGER todoist_reject_entity_%d BEFORE INSERT ON entities FOR EACH ROW EXECUTE FUNCTION todoist_reject_entity_%d();`, loc.ID, moduleID, loc.ID, loc.ID))
	require.NoError(t, err)
	t.Cleanup(func() {
		_, err := testDB.Exec(fmt.Sprintf("DROP TRIGGER todoist_reject_entity_%d ON entities; DROP FUNCTION todoist_reject_entity_%d();", loc.ID, loc.ID))
		require.NoError(t, err)
	})
	_, err = store.CreateLocationPostTx(context.Background(), loc.ID, userID)
	require.ErrorContains(t, err, "test entity failure")
	saved, err := store.GetLocationById(context.Background(), loc.ID)
	require.NoError(t, err)
	require.False(t, saved.PostID.Valid)
	var count int
	require.NoError(t, testDB.QueryRow("SELECT count(*) FROM posts WHERE title = $1", loc.Name).Scan(&count))
	require.Zero(t, count)
}

func todoistMap(t *testing.T, store *SQLStore, userID int32) (Map, Image, MapLayer) {
	t.Helper()
	ctx := context.Background()
	img, err := store.CreateImage(ctx, CreateImageParams{UserID: userID, Url: "https://example.invalid/map.png", BaseUrl: "https://example.invalid", Width: 100, Height: 100})
	require.NoError(t, err)
	m, err := store.CreateMap(ctx, CreateMapParams{UserID: userID, Title: "Base layer test", Width: 100, Height: 100})
	require.NoError(t, err)
	base, err := store.CreateMapLayer(ctx, CreateMapLayerParams{MapID: m.ID, Name: "Base", ImageID: img.ID, Enabled: true, Position: 1})
	require.NoError(t, err)
	return m, img, base
}

func TestMapLayerTransactions(t *testing.T) {
	store, userID, _ := todoistModule(t)
	ctx := context.Background()
	m, img, base := todoistMap(t, store, userID)
	disabled := false
	one := int32(1)
	two := int32(2)
	_, err := store.UpdateMapLayerTx(ctx, UpdateMapLayerTxParams{MapID: m.ID, LayerID: base.ID, Enabled: &disabled})
	require.ErrorIs(t, err, ErrBaseMapLayer)
	_, err = store.UpdateMapLayerTx(ctx, UpdateMapLayerTxParams{MapID: m.ID, LayerID: base.ID, Position: &two})
	require.ErrorIs(t, err, ErrBaseMapLayer)
	require.ErrorIs(t, store.DeleteMapLayerTx(ctx, m.ID, base.ID), ErrBaseMapLayer)
	_, err = store.CreateMapLayerTx(ctx, CreateMapLayerTxParams{MapID: m.ID, Name: "Displace", ImageID: img.ID, Position: &one})
	require.ErrorIs(t, err, ErrMapLayerPosition)
	overlay, err := store.CreateMapLayerTx(ctx, CreateMapLayerTxParams{MapID: m.ID, Name: "Overlay", ImageID: img.ID, Enabled: false})
	require.NoError(t, err)
	require.Equal(t, int32(2), overlay.Position)
	require.False(t, overlay.Enabled)
	_, err = store.UpdateMapLayerTx(ctx, UpdateMapLayerTxParams{MapID: m.ID, LayerID: overlay.ID, Position: &one})
	require.ErrorIs(t, err, ErrMapLayerPosition)
	other, _, _ := todoistMap(t, store, userID)
	_, err = store.UpdateMapLayerTx(ctx, UpdateMapLayerTxParams{MapID: other.ID, LayerID: overlay.ID, Enabled: &disabled})
	require.ErrorIs(t, err, ErrMapLayerMap)
	require.ErrorIs(t, store.DeleteMapLayerTx(ctx, other.ID, overlay.ID), ErrMapLayerMap)
	// A bad image at an otherwise valid insertion position must not shift any rows.
	before, err := store.GetMapLayers(ctx, m.ID)
	require.NoError(t, err)
	badImg, err := store.CreateImage(ctx, CreateImageParams{UserID: userID, Url: "https://example.invalid/bad.png", BaseUrl: "https://example.invalid", Width: 200, Height: 100})
	require.NoError(t, err)
	_, err = store.CreateMapLayerTx(ctx, CreateMapLayerTxParams{MapID: m.ID, Name: "Wrong size", ImageID: badImg.ID, Position: &two})
	require.ErrorIs(t, err, ErrMapLayerImageSize)
	after, err := store.GetMapLayers(ctx, m.ID)
	require.NoError(t, err)
	require.ElementsMatch(t, before, after)
	_, err = testDB.Exec("UPDATE map_layers SET enabled = false WHERE id = $1", base.ID)
	require.ErrorContains(t, err, "map_base_layer_enabled")
	require.NoError(t, store.DeleteMapLayerTx(ctx, m.ID, overlay.ID))
}

func TestConcurrentMapLayerPositions(t *testing.T) {
	store, userID, _ := todoistModule(t)
	m, img, _ := todoistMap(t, store, userID)
	var wg sync.WaitGroup
	errs := make(chan error, 6)
	for range 6 {
		wg.Add(1)
		go func() {
			defer wg.Done()
			_, err := store.CreateMapLayerTx(context.Background(), CreateMapLayerTxParams{MapID: m.ID, Name: "Overlay", ImageID: img.ID})
			errs <- err
		}()
	}
	wg.Wait()
	close(errs)
	for err := range errs {
		require.NoError(t, err)
	}
	layers, err := store.GetMapLayers(context.Background(), m.ID)
	require.NoError(t, err)
	sort.Slice(layers, func(i, j int) bool { return layers[i].Position < layers[j].Position })
	require.Len(t, layers, 7)
	for i, layer := range layers {
		require.Equal(t, int32(i+1), layer.Position)
	}
	// Reordering an overlay, then deleting it, leaves a contiguous sequence.
	target := int32(2)
	moved, err := store.UpdateMapLayerTx(context.Background(), UpdateMapLayerTxParams{MapID: m.ID, LayerID: layers[6].ID, Position: &target})
	require.NoError(t, err)
	require.Equal(t, target, moved.Position)
	require.NoError(t, store.DeleteMapLayerTx(context.Background(), m.ID, moved.ID))
	layers, err = store.GetMapLayers(context.Background(), m.ID)
	require.NoError(t, err)
	positions := make([]int, len(layers))
	for i, layer := range layers {
		positions[i] = int(layer.Position)
	}
	sort.Ints(positions)
	require.Equal(t, []int{1, 2, 3, 4, 5, 6}, positions)
}

func TestEntityListSortingAcrossPages(t *testing.T) {
	store, userID, moduleID := todoistModule(t)
	ctx := context.Background()
	type record struct {
		id                int32
		name, description string
		size              int32
		date              time.Time
	}
	records := map[string][]record{"posts": {}, "maps": {}, "locations": {}}
	names := []string{"Zulu", "Alpha", "Delta", "Alpha", "Echo", "Bravo", "Charlie", "Delta", "Foxtrot"}
	for i, name := range names {
		desc := fmt.Sprintf("Description %d", (i*7)%4)
		date := time.Date(2020, 1, 1+(i%3), 0, 0, 0, 0, time.UTC)
		size := int32((i*7)%5 + 50)
		p, err := store.CreatePost(ctx, CreatePostParams{UserID: userID, Title: name, Description: sql.NullString{String: desc, Valid: true}})
		require.NoError(t, err)
		m, err := store.CreateMap(ctx, CreateMapParams{UserID: userID, Title: name, Description: sql.NullString{String: desc, Valid: true}, Width: size, Height: size})
		require.NoError(t, err)
		img, err := store.CreateImage(ctx, CreateImageParams{UserID: userID, Url: "https://example.invalid/map.png", BaseUrl: "https://example.invalid", Width: size, Height: size})
		require.NoError(t, err)
		_, err = store.CreateMapLayer(ctx, CreateMapLayerParams{MapID: m.ID, Name: "Base", ImageID: img.ID, Enabled: true, Position: 1})
		require.NoError(t, err)
		l, err := store.CreateLocation(ctx, CreateLocationParams{Name: name, Description: sql.NullString{String: desc, Valid: true}})
		require.NoError(t, err)
		for kind, id := range map[string]int32{"posts": p.ID, "maps": m.ID, "locations": l.ID} {
			entity := CreateEntityParams{ModuleID: moduleID}
			ref := sql.NullInt32{Int32: id, Valid: true}
			switch kind {
			case "posts":
				entity.Type = EntityTypePost
				entity.PostID = ref
			case "maps":
				entity.Type = EntityTypeMap
				entity.MapID = ref
			case "locations":
				entity.Type = EntityTypeLocation
				entity.LocationID = ref
			}
			_, err := store.CreateEntity(ctx, entity)
			require.NoError(t, err)
			if kind != "locations" {
				_, err = testDB.Exec("UPDATE "+kind+" SET created_at=$1,last_updated_at=$1 WHERE id=$2", date, id)
				require.NoError(t, err)
			}
			records[kind] = append(records[kind], record{id, name, desc, size, date})
		}
	}
	for kind, fields := range map[string][]string{"posts": {"title", "description", "created_at", "last_updated_at"}, "maps": {"title", "description", "created_at", "last_updated_at", "width", "height"}, "locations": {"id", "name", "description"}} {
		for _, field := range fields {
			for _, direction := range []string{"ASC", "DESC"} {
				t.Run(kind+"/"+field+"/"+direction, func(t *testing.T) {
					expected := append([]record(nil), records[kind]...)
					sort.Slice(expected, func(i, j int) bool {
						a, b := expected[i], expected[j]
						cmp := 0
						switch field {
						case "title", "name":
							if a.name < b.name {
								cmp = -1
							} else if a.name > b.name {
								cmp = 1
							}
						case "description":
							if a.description < b.description {
								cmp = -1
							} else if a.description > b.description {
								cmp = 1
							}
						case "width", "height":
							if a.size < b.size {
								cmp = -1
							} else if a.size > b.size {
								cmp = 1
							}
						case "created_at", "last_updated_at":
							if a.date.Before(b.date) {
								cmp = -1
							} else if a.date.After(b.date) {
								cmp = 1
							}
						case "id":
							if a.id < b.id {
								cmp = -1
							} else if a.id > b.id {
								cmp = 1
							}
						}
						if cmp == 0 {
							return a.id > b.id
						}
						if direction == "DESC" {
							return cmp > 0
						}
						return cmp < 0
					})
					ids := []int32{}
					for offset := int32(0); offset < 9; offset += 3 {
						module := sql.NullInt32{Int32: moduleID, Valid: true}
						order := sql.NullString{String: field, Valid: true}
						dir := sql.NullString{String: direction, Valid: true}
						switch kind {
						case "posts":
							rows, err := store.GetPosts(ctx, GetPostsParams{ModuleID: module, OrderBy: order, OrderDirection: dir, PageLimit: 3, PageOffset: offset})
							require.NoError(t, err)
							require.Len(t, rows, 3)
							for _, r := range rows {
								require.Equal(t, int32(9), r.TotalCount)
								ids = append(ids, r.ID)
							}
						case "maps":
							rows, err := store.GetMaps(ctx, GetMapsParams{ModuleID: module, OrderBy: order, OrderDirection: dir, PageLimit: 3, PageOffset: offset})
							require.NoError(t, err)
							require.Len(t, rows, 3)
							for _, r := range rows {
								require.Equal(t, int32(9), r.TotalCount)
								ids = append(ids, r.ID)
							}
						case "locations":
							rows, err := store.GetLocations(ctx, GetLocationsParams{ModuleID: module, OrderBy: order, OrderDirection: dir, PageLimit: 3, PageOffset: offset})
							require.NoError(t, err)
							require.Len(t, rows, 3)
							for _, r := range rows {
								require.Equal(t, int32(9), r.TotalCount)
								ids = append(ids, r.ID)
							}
						}
					}
					expectedIDs := make([]int32, len(expected))
					for i, r := range expected {
						expectedIDs[i] = r.id
					}
					require.Equal(t, expectedIDs, ids)
				})
			}
		}
	}
}

func TestBaseLayerMigrationRepairsDisabledBase(t *testing.T) {
	store, userID, _ := todoistModule(t)
	_, _, base := todoistMap(t, store, userID)
	migration, err := os.ReadFile("../migration/000032_map_base_layer_enabled.up.sql")
	require.NoError(t, err)
	tx, err := testDB.Begin()
	require.NoError(t, err)
	defer tx.Rollback()
	_, err = tx.Exec("ALTER TABLE map_layers DROP CONSTRAINT map_base_layer_enabled")
	require.NoError(t, err)
	_, err = tx.Exec("UPDATE map_layers SET enabled=false WHERE id=$1", base.ID)
	require.NoError(t, err)
	_, err = tx.Exec(string(migration))
	require.NoError(t, err)
	var enabled bool
	require.NoError(t, tx.QueryRow("SELECT enabled FROM map_layers WHERE id=$1", base.ID).Scan(&enabled))
	require.True(t, enabled)
	_, err = tx.Exec("UPDATE map_layers SET enabled=false WHERE id=$1", base.ID)
	require.ErrorContains(t, err, "map_base_layer_enabled")
}
