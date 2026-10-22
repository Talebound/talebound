# Talebound

The frontend and backend for Talebound, developed together in one repository.

| Directory | Application |
| --- | --- |
| `frontend/` | Next.js / React / TypeScript, managed with Yarn 4.18.1 |
| `backend/` | Go API, protobuf/gRPC, PostgreSQL migrations, and Docker configuration |
| `.github/workflows/` | Frontend checks, backend tests, and manual backend deployment |

## Development

On Linux/WSL, use Bash, Python 3.9+, Git, and Docker with Compose v2. The supported
worktree launcher runs Node.js 24, Go 1.23, PostgreSQL 15, Redis 7, and Mailpit in
containers. No host Node, Go, Yarn, or Make installation is needed to run the app.

```sh
scripts/worktree-dev/bootstrap-worktree.sh
scripts/worktree-dev/talebound-worktree-dev up
scripts/worktree-dev/talebound-worktree-dev status
```

Each worktree gets its own database, Redis queue, email inbox, loopback address,
ports, and authentication key. `status` prints the exact app and inbox URLs.
Use those URLs: separate loopback addresses also keep browser cookies isolated.
No hosts-file edits or AWS credentials are required. Register an account in the
app and open the verification email in the local inbox.

Bootstrap is idempotent and stops after installing dependencies and applying
migrations; `up` starts both applications. `down` stops this worktree and retains
data. Generated `.env.worktree`, `backend/app.env.worktree`,
`frontend/.env.worktree`, and `.talebound/` are ignored local state. Do not copy
them between worktrees. Optional development Cloudflare settings go in
`.talebound/integrations.env`; uploads require those credentials.

See [the worktree development guide](scripts/worktree-dev/README.md) for lifecycle
commands, environment precedence, database access, cleanup, and validation.
GNU Make aliases (`make dev-up`, `make dev-status`, `make dev-down`) are optional.
The older `backend/Makefile` and `backend/docker-compose.yaml` contain historical
single-repository commands; use the root launcher for local worktree development.

## Validation and API generation

```sh
make frontend-lint
make frontend-build
make backend-build
make backend-test
make api-generate
```

Backend tests use the current worktree's migrated PostgreSQL database. The
frontend checks/API generator and `backend-build` use host Node.js 24/Go 1.23;
their container equivalents are documented in the worktree guide. API generation reads
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
- Frontend lint, TypeScript checking, and the production build pass with Node 24
  and the checked-in Yarn lockfile. The inherited API/type mismatches and unused
  code have been corrected; lint and type checking remain enabled.

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

## Quest settings and character participation

Quest managers can set a quest's status and open recruitment from **Edit → Quest
settings**. On a character's detail page, **Search for a quest** lists quests that
accept applications in the same world and game system. Row/grid preferences are
remembered in the browser.

Character managers can apply with an optional message, update a pending message,
and withdraw or leave. Quest managers review applications on the quest detail
page and can approve, decline, or remove characters. Character detail pages show
all their quests and applications, including completed quests. Finishing or
abandoning a quest closes recruitment automatically.

Pending/declined applications and application messages are visible only to the
relevant character/quest managers (including site administrators). Other visitors
see accepted participants without their messages. Existing applications must be
withdrawn before changing a character's world/system; quest world/system changes
retain the original restriction to universal modules with no applications.

This recovers the frontend and backend `archive/*/feature/quest-settings-and-characters`
work on the current monorepo and dependency versions. Story turns and in-game chat
remain separate future features. The quest handler regression tests run as part of
`scripts/worktree-dev/talebound-worktree-dev test-backend`.
