# Talebound

The frontend and backend for Talebound, developed together in one repository.

| Directory | Application |
| --- | --- |
| `frontend/` | Next.js / React / TypeScript, managed with Yarn 3.6.1 |
| `backend/` | Go API, protobuf/gRPC, PostgreSQL migrations, and Docker configuration |
| `.github/workflows/` | Frontend checks, backend tests, and manual backend deployment |

## Development

Use Node.js 22, Go 1.23 (as declared in `backend/go.mod`), GNU Make, and Docker
with Compose. Yarn is checked into the frontend, so a global Yarn installation
is not required. Run `make` to see the available commands.

```sh
make frontend-install
make services-up
make backend-migrate
```

The backend loads `backend/app.env`. Put local overrides in the ignored
`backend/app.env.local`, which is loaded by the backend Makefile. Review the
database configuration before running migrations. The supplied development
database uses port 5432 and Redis uses port 6379.

Create `frontend/.env.local` using the settings described in
[the frontend README](frontend/README.md), including the API URL and the service
keys needed for features you use. The existing development CORS setup uses
`dev.talebound.net`; map it to `127.0.0.1` in your hosts file.

Start each application in its own terminal:

```sh
make backend-dev
make frontend-dev
```

The frontend runs at `http://dev.talebound.net:4000` and the HTTP API at
`http://dev.talebound.net:8080`. Email, image delivery, and other integrations
still need their own configuration. See [the backend README](backend/README.md)
for its existing development tools and workflow.

## Validation and API generation

```sh
make frontend-lint
make frontend-build
make backend-build
make backend-test
make api-generate
```

Backend tests require the migrated PostgreSQL database. API generation reads
`backend/doc/swagger/talebound.swagger.json` directly; it no longer needs a
running backend or the old development server. After changing protobuf API
definitions, regenerate the backend schema with `make -C backend proto` using
the backend's protobuf tools, then run `make api-generate` and review both diffs.

The Go module path remains `github.com/the-medo/talebound-backend` to preserve
existing imports and protobuf package identities. Go builds use the local
`backend/go.mod`; the directory move does not require a module rename.

### Validation at migration (2026-10-22)

- Backend compilation and the existing short test suite passed against an
  isolated PostgreSQL 15 database after applying migrations.
- Local Swagger generation succeeded and reproduced the committed frontend
  client without changes. The Yarn lockfile installed with `--immutable`.
- GitHub Actions workflows passed `actionlint`; Compose configuration and root
  Makefile command paths were checked.
- The imported frontend has existing build blockers: lint reports 28 errors
  and one warning, and a separate build with lint disabled fails type checking
  in `frontend/api/entities/useCreateEntityGroupContent.ts` because
  `entityGroupId` can be undefined. The source and generated client are unchanged
  by this migration. Frontend CI will report these failures until they are fixed;
  lint and type checking have not been disabled in the build configuration.

## Builds and deployment

The applications retain independent builds. Configure frontend hosting to use
`frontend/` as its root directory. Build the backend container from the repository
root with:

```sh
docker build -f backend/Dockerfile backend
```

CI runs frontend checks and backend tests for changes to the relevant paths.
The backend production workflow is **manual only**, on `main`, so importing or
merging code does not deploy it. Before using it, configure `AWS_ACCESS_KEY_ID`
and `AWS_SECRET_ACCESS_KEY` for this repository and verify access to the existing
AWS Secrets Manager secret, ECR repository, and EKS cluster. Repository secrets
and hosting integrations were not copied from the original repositories.

## History and worktrees

The existing `main` branches were imported without squashing or rewriting their
commit IDs:

- [Frontend source](https://github.com/Talebound/talebound-frontend):
  `c60d33a36c5ae0fddf01ef9f32627246455a3f56`.
- [Backend source](https://github.com/Talebound/talebound-backend):
  `0fa9905003f530f4c03ecde23f28e7a51bffb44a`.

All source branch tips are retained under `archive/frontend/<original-branch>`
and `archive/backend/<original-branch>`. These historical branches retain their
original single-repository layouts. In particular, the unmerged
`feature/quest-settings-and-characters` work is preserved there and is not part
of monorepo `main`. The original GitHub repositories remain unchanged.

On the current workstation, the primary clone is
`/home/medo/dev/talebound/monorepo/`. Create one worktree per task containing both
applications, keeping every worktree inside `/home/medo/dev/talebound/`:

```sh
git -C /home/medo/dev/talebound/monorepo fetch origin
git -C /home/medo/dev/talebound/monorepo worktree add --no-track \
  -b codex/example-feature \
  /home/medo/dev/talebound/worktrees/example-feature origin/main
```
