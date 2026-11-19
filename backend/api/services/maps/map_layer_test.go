package maps

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

func TestUpdateMapLayerGuards(t *testing.T) {
	for _, tc := range []struct {
		name string
		err  error
		code codes.Code
	}{
		{"base disabled", db.ErrBaseMapLayer, codes.FailedPrecondition},
		{"wrong map", db.ErrMapLayerMap, codes.NotFound},
		{"invalid position", db.ErrMapLayerPosition, codes.InvalidArgument},
		{"invalid image", db.ErrMapLayerImageSize, codes.InvalidArgument},
	} {
		t.Run(tc.name, func(t *testing.T) {
			store := mockdb.NewMockStore(gomock.NewController(t))
			maker, err := token.NewPasetoMaker(strings.Repeat("m", 32))
			require.NoError(t, err)
			service := NewMapsService(&servicecore.ServiceCore{Store: store, TokenMaker: maker})
			ctx := testutils.NewContextWithCookie(t, maker, 42, time.Hour)
			store.EXPECT().GetEntityByMapId(gomock.Any(), sql.NullInt32{Int32: 7, Valid: true}).Return(db.Entity{ID: 11}, nil)
			store.EXPECT().GetEntityModuleAdmin(gomock.Any(), db.GetEntityModuleAdminParams{UserID: 42, EntityID: 11}).Return(db.ViewModuleAdmin{Approved: 1, AllowedEntityTypes: []db.EntityType{db.EntityTypeMap}}, nil)
			store.EXPECT().HasUserRole(gomock.Any(), gomock.Any()).Return(db.HasUserRoleRow{}, sql.ErrNoRows)
			disabled := false
			store.EXPECT().UpdateMapLayerTx(gomock.Any(), db.UpdateMapLayerTxParams{MapID: 7, LayerID: 8, Enabled: &disabled}).Return(db.ViewMapLayer{}, tc.err)
			_, err = service.UpdateMapLayer(ctx, &pb.UpdateMapLayerRequest{MapId: 7, LayerId: 8, Enabled: &disabled})
			require.Equal(t, tc.code, status.Code(err))
		})
	}
}

func TestMapSortingDirection(t *testing.T) {
	store := mockdb.NewMockStore(gomock.NewController(t))
	service := NewMapsService(&servicecore.ServiceCore{Store: store})
	field := "width"
	direction := "asc"
	store.EXPECT().GetMaps(gomock.Any(), gomock.Any()).DoAndReturn(func(_ context.Context, p db.GetMapsParams) ([]db.GetMapsRow, error) {
		require.Equal(t, "ASC", p.OrderDirection.String)
		require.True(t, p.OrderDirection.Valid)
		require.Equal(t, "width", p.OrderBy.String)
		return []db.GetMapsRow{}, nil
	})
	_, err := service.GetMaps(context.Background(), &pb.GetMapsRequest{OrderBy: &field, OrderDirection: &direction})
	require.NoError(t, err)
	direction = "invalid"
	_, err = service.GetMaps(context.Background(), &pb.GetMapsRequest{OrderDirection: &direction})
	require.Equal(t, codes.InvalidArgument, status.Code(err))
}
