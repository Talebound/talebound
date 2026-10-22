#!/usr/bin/env bash
set -Eeuo pipefail
# The migrator writes generated SQL files. Keep these out of the source tree.
mkdir -p /tmp/backend
cp -a /source/. /tmp/backend/
cp /runtime/backend.env /tmp/backend/app.env.local
cd /tmp/backend
case "${1:-serve}" in
  migrate)
    exec go run github.com/the-medo/golang-migrate-objects \
      -mpath=file://db/migration -obj_path=file://db/migration/objects \
      -db_source="$DB_SOURCE" -co_filename=migrations_create_objects.sql \
      -do_filename=migrations_drop_objects.sql -up
    ;;
  test) exec go test -short ./... ;;
  serve)
    go build -o /tmp/talebound .
    exec /tmp/talebound
    ;;
  *) exec "$@" ;;
esac
