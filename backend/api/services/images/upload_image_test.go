package images

import (
	"bytes"
	"context"
	"image"
	"image/png"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/cloudflare/cloudflare-go/v7"
	"github.com/cloudflare/cloudflare-go/v7/option"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/the-medo/talebound-backend/pb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func TestUploadImageCloudflare(t *testing.T) {
	var data bytes.Buffer
	require.NoError(t, png.Encode(&data, image.NewRGBA(image.Rect(0, 0, 3, 2))))

	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		assert.Equal(t, http.MethodPost, r.Method)
		assert.Equal(t, "/accounts/test-account/images/v1", r.URL.Path)
		assert.Equal(t, "Bearer test-token", r.Header.Get("Authorization"))
		file, header, err := r.FormFile("file")
		if !assert.NoError(t, err) {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		defer file.Close()
		defer r.MultipartForm.RemoveAll()
		assert.Equal(t, "portrait.png", header.Filename)
		assert.Equal(t, "image/png", header.Header.Get("Content-Type"))
		uploaded, err := io.ReadAll(file)
		assert.NoError(t, err)
		assert.Equal(t, data.Bytes(), uploaded)
		w.Header().Set("Content-Type", "application/json")
		_, _ = io.WriteString(w, `{"success":true,"errors":[],"messages":[],"result":{"id":"image-id","filename":"portrait.png","variants":["https://imagedelivery.net/test/image-id/public"],"uploaded":"2026-10-22T12:00:00Z"}}`)
	}))
	defer server.Close()

	client := cloudflare.NewClient(option.WithAPIToken("test-token"), option.WithBaseURL(server.URL), option.WithMaxRetries(0))
	response, err := uploadImage(context.Background(), client.Images.V1, "test-account", &pb.UploadImageRequest{
		Filename: "portrait.png",
		Data:     data.Bytes(),
	})
	require.NoError(t, err)
	require.Equal(t, "image-id", response.Id)
	require.Equal(t, "portrait.png", response.Filename)
	require.Equal(t, []string{"https://imagedelivery.net/test/image-id/public"}, response.Variants)
	require.Equal(t, int32(3), response.Width)
	require.Equal(t, int32(2), response.Height)
	require.Equal(t, time.Date(2026, 10, 22, 12, 0, 0, 0, time.UTC), response.UploadedAt.AsTime())
}

func TestUploadImageCloudflareError(t *testing.T) {
	var data bytes.Buffer
	require.NoError(t, png.Encode(&data, image.NewRGBA(image.Rect(0, 0, 1, 1))))
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		_, _ = io.WriteString(w, `{"success":false,"errors":[{"code":10000,"message":"Authentication error"}],"messages":[],"result":null}`)
	}))
	defer server.Close()
	client := cloudflare.NewClient(option.WithAPIToken("test-token"), option.WithBaseURL(server.URL), option.WithMaxRetries(0))
	response, err := uploadImage(context.Background(), client.Images.V1, "test-account", &pb.UploadImageRequest{
		Filename: "portrait.png",
		Data:     data.Bytes(),
	})
	require.Nil(t, response)
	require.Equal(t, codes.Internal, status.Code(err))
	require.ErrorContains(t, err, "failed to upload image")
}
