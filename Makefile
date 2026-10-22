.DEFAULT_GOAL := help

NODE ?= node
FRONTEND_YARN = cd frontend && $(NODE) .yarn/releases/yarn-3.6.1.cjs
WORKTREE_DEV = scripts/worktree-dev/talebound-worktree-dev

.PHONY: help dev-setup dev-up dev-down dev-status dev-logs frontend-install frontend-dev frontend-build frontend-lint backend-dev backend-build backend-test backend-migrate api-generate services-up services-down

help:
	@echo "dev-setup         Install dependencies and migrate this worktree's local database"
	@echo "dev-up            Set up and start this worktree's complete local app"
	@echo "dev-down          Stop this worktree, retaining data"
	@echo "dev-status        Show this worktree's URLs and services"
	@echo "dev-logs          Show recent logs for this worktree"
	@echo "frontend-install  Install frontend dependencies from the lockfile"
	@echo "frontend-dev      Alias for dev-up (starts both applications)"
	@echo "frontend-build    Build the frontend"
	@echo "frontend-lint     Lint the frontend"
	@echo "backend-dev       Alias for dev-up (starts both applications)"
	@echo "backend-build     Compile all Go packages"
	@echo "backend-test      Run Go short tests in this worktree's container and database"
	@echo "backend-migrate   Apply migrations to this worktree's database"
	@echo "api-generate      Generate frontend API types from the local Swagger schema"
	@echo "services-up       Start this worktree's PostgreSQL, Redis, and local email inbox"
	@echo "services-down     Alias for dev-down"

dev-setup:
	$(WORKTREE_DEV) setup

dev-up:
	$(WORKTREE_DEV) up

dev-down:
	$(WORKTREE_DEV) down

dev-status:
	$(WORKTREE_DEV) status

dev-logs:
	$(WORKTREE_DEV) logs

frontend-install:
	$(FRONTEND_YARN) install --immutable

frontend-dev: dev-up

frontend-build:
	$(FRONTEND_YARN) build

frontend-lint:
	$(FRONTEND_YARN) lint

backend-dev: dev-up

backend-build:
	cd backend && go build ./...

backend-test:
	$(WORKTREE_DEV) test-backend

backend-migrate:
	$(WORKTREE_DEV) migrate

api-generate:
	$(FRONTEND_YARN) generate

services-up:
	$(WORKTREE_DEV) setup --services-only

services-down: dev-down
