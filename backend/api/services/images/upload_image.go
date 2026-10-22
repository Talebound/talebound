package images

import (
	"bytes"
	"context"
	"image"
	_ "image/gif"  // Import this to decode gif images
	_ "image/jpeg" // Import this to decode jpeg images
	_ "image/png"  // Import this to decode png images
	"net/http"

	"github.com/cloudflare/cloudflare-go/v7"
	cloudflareImages "github.com/cloudflare/cloudflare-go/v7/images"
	"github.com/cloudflare/cloudflare-go/v7/option"
	"github.com/the-medo/talebound-backend/api/servicecore"
	"github.com/the-medo/talebound-backend/e"
	"github.com/the-medo/talebound-backend/pb"
	"github.com/the-medo/talebound-backend/validator"
	"google.golang.org/genproto/googleapis/rpc/errdetails"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func UploadImage(service *servicecore.ServiceCore, ctx context.Context, request *pb.UploadImageRequest) (*pb.UploadImageResponse, error) {
	violations := validateUploadImageRequest(request)
	if violations != nil {
		return nil, e.InvalidArgumentError(violations)
	}

	if service.Config.CloudflareApiToken == "" {
		return nil, status.Error(codes.Internal, "Cloudflare API token is not configured")
	}

	client := cloudflare.NewClient(option.WithAPIToken(service.Config.CloudflareApiToken))
	return uploadImage(ctx, client.Images.V1, service.Config.CloudflareAccountId, request)
}

func uploadImage(ctx context.Context, client *cloudflareImages.V1Service, accountID string, request *pb.UploadImageRequest) (*pb.UploadImageResponse, error) {
	reader := bytes.NewReader(request.GetData())

	decodedImg, _, err := image.DecodeConfig(reader)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to decode image: %v", err)
	}
	width := decodedImg.Width
	height := decodedImg.Height

	// Reset the reader to the beginning, so it can be used again for uploading
	_, err = reader.Seek(0, 0)
	if err != nil {
		return nil, err
	}

	uploadRequest := cloudflareImages.V1NewParams{
		AccountID: cloudflare.F(accountID),
		File:      cloudflare.FileParam(reader, request.GetFilename(), http.DetectContentType(request.GetData())),
	}

	img, err := client.New(ctx, uploadRequest)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to upload image: %v", err)
	}

	rsp := &pb.UploadImageResponse{
		Id:         img.ID,
		Filename:   img.Filename,
		Variants:   img.Variants,
		UploadedAt: timestamppb.New(img.Uploaded),
		Width:      int32(width),  // assuming Width is int32 in your pb.UploadImageResponse
		Height:     int32(height), // assuming Height is int32 in your pb.UploadImageResponse
	}

	return rsp, nil
}

func validateUploadImageRequest(req *pb.UploadImageRequest) (violations []*errdetails.BadRequest_FieldViolation) {
	if err := validator.ValidateFilename(req.GetFilename()); err != nil {
		violations = append(violations, e.FieldViolation("filename", err))
	}

	if err := validator.ValidateImageTypeId(req.GetImageTypeId()); err != nil {
		violations = append(violations, e.FieldViolation("image_type_id", err))
	}

	return violations
}
