.DEFAULT_GOAL := help

NODE ?= node
FRONTEND_YARN = cd frontend && $(NODE) .yarn/releases/yarn-3.6.1.cjs
COMPOSE = docker compose -f backend/docker-compose.yaml

.PHONY: help frontend-install frontend-dev frontend-build frontend-lint backend-dev backend-build backend-test backend-migrate api-generate services-up services-down

help:
	@echo "frontend-install  Install frontend dependencies from the lockfile"
	@echo "frontend-dev      Start Next.js on port 4000"
	@echo "frontend-build    Build the frontend"
	@echo "frontend-lint     Lint the frontend"
	@echo "backend-dev       Start the Go API"
	@echo "backend-build     Compile all Go packages"
	@echo "backend-test      Run Go tests (requires a migrated test database)"
	@echo "backend-migrate   Apply database migrations to the configured database"
	@echo "api-generate      Generate frontend API types from the local Swagger schema"
	@echo "services-up       Start local PostgreSQL and Redis"
	@echo "services-down     Stop local Compose services, retaining volumes"

frontend-install:
	$(FRONTEND_YARN) install --immutable

frontend-dev:
	$(FRONTEND_YARN) dev

frontend-build:
	$(FRONTEND_YARN) build

frontend-lint:
	$(FRONTEND_YARN) lint

backend-dev:
	$(MAKE) -C backend server

backend-build:
	cd backend && go build ./...

backend-test:
	$(MAKE) -C backend test

backend-migrate:
	$(MAKE) -C backend migrateup

api-generate:
	$(FRONTEND_YARN) generate

services-up:
	$(COMPOSE) up -d postgres redis

services-down:
	$(COMPOSE) down
