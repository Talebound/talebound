# Talebound worktree development

This Linux/WSL workflow follows the lifecycle conventions in the
[SWUBASE agent guide](https://github.com/the-medo/swu-collection/blob/main/AGENTS.md),
adapted for Talebound's Go/Next.js applications. It requires Bash, Python 3.9+,
Git, and a local Docker Engine with Compose v2. Remote Docker contexts and native
macOS/Windows Docker Desktop are not supported by the loopback-address scheme.

## Start a worktree

Keep the primary checkout at `/home/medo/dev/talebound/monorepo` and worktrees
under `/home/medo/dev/talebound/worktrees/`. From a task worktree:

```sh
scripts/worktree-dev/bootstrap-worktree.sh
scripts/worktree-dev/talebound-worktree-dev up
scripts/worktree-dev/talebound-worktree-dev status
```

The bootstrap delegates to `setup`. It creates fresh local configuration,
starts PostgreSQL/Redis/Mailpit, installs Yarn dependencies with `--immutable`,
and applies migrations. It does not start the frontend or backend. `up` also
runs setup, then starts both applications and waits for their health checks.
The first run downloads container images/dependencies and compiles Go.

`setup`/`up` preserve existing data, credentials, and allocated addresses. There
is no production database import or automatic dump download. A new database
contains the schema and reference data supplied by the migrations. Register
your own local account and open its verification email in Mailpit. Password-reset
emails go to that same inbox. No AWS or email credentials are needed.

## Isolation and addresses

Each checkout gets a path-derived Compose identity and its own:

- PostgreSQL 15 container and persistent database volume;
- Redis 7 instance and persistent email queue;
- Mailpit inbox with persistent captured messages;
- Go module/build cache volumes and frontend dependency/build directories;
- random database password and 32-character token key;
- loopback IP in `127.64.0.0/16`, plus four reserved ports in `20000–44999`.

The app, API, database, and inbox bind only to the allocated loopback IP. Redis,
SMTP, and gRPC have no published host ports. Host-only auth cookies stay on that
worktree's IP, and backend CORS permits its exact frontend origin. Cookies do
not distinguish ports, which is why the address also differs between worktrees.
No DNS service or hosts-file change is needed on Linux.

Always use the URLs printed by `status`; do not replace the address with
`localhost`. For example, a worktree might use `http://127.64.20.30:20000`.
These addresses refer to the development machine. Access from a different
machine requires explicit forwarding; this tool does not set up Tailscale or
HTTPS. If a local proxy intercepts loopback traffic, bypass it for `127.0.0.0/8`.

Address reservations are serialized in `<git-common-dir>/talebound-dev/`, and
lifecycle operations on the same worktree are locked. Stopped worktrees keep
their reservations. If an unrelated process later occupies an allocated port,
startup fails without killing it or silently changing the worktree URL.

## Commands

```sh
scripts/worktree-dev/talebound-worktree-dev setup
scripts/worktree-dev/talebound-worktree-dev up
scripts/worktree-dev/talebound-worktree-dev status
scripts/worktree-dev/talebound-worktree-dev status --json
scripts/worktree-dev/talebound-worktree-dev logs backend
scripts/worktree-dev/talebound-worktree-dev restart backend
scripts/worktree-dev/talebound-worktree-dev migrate
scripts/worktree-dev/talebound-worktree-dev test-backend
scripts/worktree-dev/talebound-worktree-dev down
```

`setup --services-only` starts just PostgreSQL, Redis, and Mailpit; it skips
dependency installation and migrations. It is useful for infrastructure tests.
`logs` shows the last 100 log lines; it accepts any service name or no argument
for all services. `restart frontend` applies changed frontend configuration.

The frontend uses a live source mount and hot reload. The backend copies source
into its container at startup because the existing migrator generates SQL files.
Use `restart backend` after backend source changes. Its entrypoint compiles the
binary and uses `exec` so Docker can terminate the actual application process.

## Local environment files

| Path | Purpose |
| --- | --- |
| `.talebound/state.json` | Worktree identity, addresses, credentials |
| `.env.worktree` | Generated Compose settings |
| `backend/app.env.worktree` | Generated backend runtime overrides |
| `frontend/.env.worktree` | Generated frontend runtime settings |
| `.talebound/database.env` | Host connection settings for psql/IDE tools |
| `.talebound/integrations.env` | Optional developer-supplied image settings |

All these files are ignored and created with mode `0600`; `.talebound/` is
`0700`. Generated files are refreshed by `setup`/`up` without rotating credentials.
Do not copy state or generated env files between worktrees, manually edit generated
settings, or move an initialized worktree. Purge its stack before moving/removing
it, then bootstrap it at the new path.

The backend snapshot replaces `app.env.local` with the generated worktree
overrides and also receives them as process environment. The frontend receives
its generated settings as process environment, taking precedence over Next.js
dotenv files. Existing `backend/app.env.local` and `frontend/.env.local` are
left alone and are not copied into a newly created worktree. The launcher
explicitly sets every currently used frontend integration variable.

Optional image integrations can be configured in `.talebound/integrations.env`:

```dotenv
CLOUDFLARE_API_TOKEN=development-token
CLOUDFLARE_ACCOUNT_ID=development-account-id
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH=development-delivery-hash
NEXT_PUBLIC_CLOUDFLARE_HOSTNAME=imagedelivery.net
```

Only these keys plus `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` are accepted. Values are
literal strings, not shell expressions. Use development-only credentials;
uploads with configured credentials contact Cloudflare. The default reCAPTCHA
key is Google's public development test key. Sentry is disabled. SMTP always
targets this stack's Mailpit; the backend now honors `SMTP_ENDPOINT` (hostname
or `host:port`), while the existing deployed configuration still specifies SES.

## Database and development checks

To run SQL without exposing a password in a command:

```sh
printf 'SELECT version, dirty FROM schema_migrations;\n' | \
  scripts/worktree-dev/talebound-worktree-dev db
```

For an IDE connection, use the host/port and credentials in
`.talebound/database.env` with database `talebound`, user `root`, and SSL disabled.
The existing function migrations require the `root` ownership role.
Backend short tests write fixtures to this worktree's database and skip the
legacy test that sends a real email.

For containerized frontend lint/build/API generation after setup:

```sh
# Obtain the project name without printing credentials.
project=$(python3 -c 'import json; print(json.load(open(".talebound/state.json"))["project"])')
docker compose -p "$project" --env-file .env.worktree \
  -f scripts/worktree-dev/compose.yaml run --rm --no-deps frontend \
  node .yarn/releases/yarn-4.18.1.cjs lint
```

Replace `lint` with `build` or `generate`. Stop the frontend before `build`
because Next.js uses the same `.next` directory for development and production
builds. Both lint and type checking must stay enabled.
For backend compilation using the same `project` variable:

```sh
docker compose -p "$project" --env-file .env.worktree \
  -f scripts/worktree-dev/compose.yaml run --rm --no-deps backend go build ./...
```

## Cleanup

`down` stops only this worktree's containers and retains data/caches/settings.
To intentionally discard the worktree database, email queue, inbox, and caches:

```sh
scripts/worktree-dev/talebound-worktree-dev status
scripts/worktree-dev/talebound-worktree-dev down --purge-data
```

Purge checks ownership, removes this Compose project's containers/network/volumes,
and releases its generated configuration and reservations. Optional integration
settings and frontend dependencies remain in the worktree. Every managed Docker
resource carries `com.talebound.managed`, `com.talebound.worktree`, and
`com.talebound.identity` labels. Operations refuse resources with mismatched or
missing ownership labels, including resources with only a matching Compose
project label. No global Docker prune command is used.

Purge before `git worktree remove` when the data is disposable. Keep the worktree
and its state if its database is still needed. There is no automatic stale
worktree cleanup, database reset, or restore operation.

## Lifecycle validation

```sh
bash -n scripts/worktree-dev/*.sh scripts/worktree-dev/talebound-worktree-dev
python3 -m py_compile scripts/worktree-dev/*.py
scripts/worktree-dev/test-concurrent-worktrees.sh
```

The integration test creates two disposable Git worktrees under this workspace,
copies the current tooling into them, and starts real data services concurrently.
It checks isolated databases/Redis/addresses/keys, private ignored configuration,
idempotent setup, persistence after stopping, rejection of a foreign-labelled
resource, and that purging one stack leaves the other usable. It removes only
its test resources and worktrees. It needs Docker and may pull the three data
service images; it does not install frontend dependencies or contact production.
