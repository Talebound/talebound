# Talebound monorepo

- `frontend/` contains Next.js, React, TypeScript, and its Yarn 3.6.1 lockfile.
- `backend/` contains the Go module, protobuf definitions, database migrations,
  Docker configuration, and deployment manifests.
- Run commands through the root Makefile or from the relevant application directory.
  Keep the frontend and backend dependency managers and builds independent.
- For API changes, update the backend schema and run `make api-generate` to update
  the frontend client from `backend/doc/swagger/talebound.swagger.json`.
- The Go module intentionally retains `github.com/the-medo/talebound-backend`;
  do not rename imports or generated protobuf packages as incidental cleanup.
- GitHub Actions workflows belong in the root `.github/workflows/` directory.
- Production deployment is manual. Repository migration is not a deployment.
- The original `Talebound/talebound-frontend` and `Talebound/talebound-backend`
  repositories must remain untouched. Historical branches live under
  `archive/frontend/*` and `archive/backend/*`; implement new work on monorepo branches.
- On this workstation, keep the primary clone at `/home/medo/dev/talebound/monorepo/`
  and all task worktrees under `/home/medo/dev/talebound/worktrees/<task>/`.
  Use worktrees for implementation and keep the primary clone clean.
- Prefer an existing suitable worktree. Otherwise branch from fetched `origin/main`
  with an explicit task branch and destination path, using `--no-track`.
  Use `git worktree add` if a managed tool cannot honor the required location.

## Local worktree development

- Read `scripts/worktree-dev/README.md` before changing local lifecycle tooling.
- On Linux/WSL, bootstrap a new worktree with
  `scripts/worktree-dev/bootstrap-worktree.sh`. This installs locked frontend
  dependencies, starts this worktree's data services, and applies migrations.
- Use `scripts/worktree-dev/talebound-worktree-dev up`, `status`, `logs`, and
  `down` for the app lifecycle. Root Makefile aliases are also supported.
  Do not create ad-hoc shared databases or use the legacy backend Compose file.
- `setup` and `up` are idempotent; neither replaces existing database data.
  `down` retains data. Before `down --purge-data`, check `status` and the exact
  current worktree path. Purge deletes this worktree's labelled data and cache
  volumes. Never remove unrelated or unlabelled Docker resources.
- Every worktree has a separate PostgreSQL container/volume, Redis queue,
  Mailpit inbox, auth key, and loopback address/ports. Open the frontend URL
  reported by `status`; substituting `localhost` breaks origin/session isolation.
- `.talebound/`, `.env.worktree`, `backend/app.env.worktree`, and
  `frontend/.env.worktree` are generated local state. Never commit them, print
  their secret values, or copy them between worktrees. Registry/lock files live
  in the primary clone's Git metadata and must not be edited while tooling runs.
- The launcher generates development configuration and does not copy another
  checkout's environment. Email stays in Mailpit, Sentry is disabled, and
  Cloudflare is unconfigured by default. Optional development image credentials
  belong in `.talebound/integrations.env`; never add production fallbacks.
- Frontend changes hot reload. For backend changes, use
  `scripts/worktree-dev/talebound-worktree-dev restart backend`: the container
  snapshots the source so migrations do not write generated SQL into the checkout.
- Purge the current stack before removing a disposable worktree. Use
  `git worktree remove` for Git-created worktrees. Preserve development data when
  it has not been intentionally discarded.

## Validation

- For lifecycle, ownership, ports, or cleanup changes: run Bash syntax checks,
  Python compilation, `status`, and
  `scripts/worktree-dev/test-concurrent-worktrees.sh`. This creates disposable
  worktrees under this workspace and verifies isolation and scoped cleanup.
- For backend changes, use `scripts/worktree-dev/talebound-worktree-dev migrate`
  when needed, then `test-backend`. Short tests skip the legacy real-email test.
  Tests write fixtures to the current worktree database; never point them at a
  shared or production database.
- For frontend changes, run relevant lint/build checks and verify the affected
  browser flow. The README records inherited frontend lint/type-check failures;
  report those honestly and do not suppress checks to make a build appear green.
- For worktree authentication/email changes, verify signup, local email delivery,
  verification, login, and isolation from another running worktree. Report the
  actual commands/results and any untested behavior before handoff.
