# Build stage
FROM golang:1.27.3-alpine3.24 AS builder
WORKDIR /app
COPY . .
RUN go build -o main main.go


# Run stage
FROM alpine:3.24
WORKDIR /app
COPY --from=builder /app/main .
COPY app.env .
COPY db/migration /app/db/migration

EXPOSE 8080
CMD [ "/app/main" ]
