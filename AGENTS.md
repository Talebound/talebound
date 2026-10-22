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
