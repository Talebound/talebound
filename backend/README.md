# AWS EKS 
`aws eks update-kubeconfig --name talebound --region eu-central-1`

`kubectl config use-context arn:aws:eks:eu-central-1:871098816149:cluster/talebound`

AWS EC2 pricing - https://aws.amazon.com/ec2/pricing/on-demand/

AWS EKS pod count - https://github.com/awslabs/amazon-eks-ami/blob/master/files/eni-max-pods.txt

The manual deployment workflow reads the cluster's Kubernetes version through
`aws eks describe-cluster`, then installs the latest stable `kubectl` patch for
that same minor version. It stops before publishing an image if version lookup
fails. This updates the deployment client; it does not upgrade the EKS cluster.

## Install cert-manager
https://cert-manager.io/docs/installation/kubectl/
`kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.11.0/cert-manager.yaml`

## Install ingress
`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.7.0/deploy/static/provider/aws/deploy.yaml`

## Tool setup on windows
### Using make commands on windows

https://gnuwin32.sourceforge.net/packages/make.htm

1. https://sourceforge.net/projects/gnuwin32/
2. install
3. add to path system variables

### Install scoop to use "migrate":
https://scoop.sh/
```
> Set-ExecutionPolicy RemoteSigned -Scope CurrentUser # Optional: Needed to run a remote script the first time
> irm get.scoop.sh | iex
```

https://github.com/ScoopInstaller/Scoop#readme


### Install "migrate" through scoop
` scoop install migrate `
- add migrate to path system variables (in ~\scoop\apps\migrate\ [version])

### Running sqlc generate on "windows"
`docker run --rm -v "%cd%:/src" -w /src sqlc/sqlc:1.31.1 generate`

`make sqlc-generate` pins the same sqlc version in `Makefile`. After changing
queries or upgrading sqlc, regenerate the database code and run `make mock`
to keep store mocks aligned.

---

### postgres driver
`go get github.com/lib/pq`
`go get github.com/stretchr/testify`

---
### Create migration

`make new_migration name=migration_name`
`migrate create -ext sql -dir db/migration -seq migration_name`

---
### Install DMBL CLI
For converting dbml schemas to SQL 

`npm install -g @dbml/cli`

---
### Install jq

https://stedolan.github.io/jq/download/

---
### Install protobuf
https://grpc.io/docs/languages/go/quickstart/

Latest release:
https://github.com/protocolbuffers/protobuf/releases

Use Go 1.27.3 for backend builds and development. CI reads the version from
`go.mod`; the production Dockerfile and worktree Compose image use the same
toolchain version.

From `backend/`, install generators at the versions selected by `go.mod`:

```sh
make tools-install
```

Ensure `$(go env GOPATH)/bin` is on `PATH` before running `make proto`.
`make mock` runs the maintained `go.uber.org/mock` generator at the module's
selected version without requiring a global `mockgen` installation.


---
## Workflow
1. **create new migration** `migrate create -ext sql -dir db/migration -seq migration_name`
2. **edit migration up/down sql files**
3. **run migrations** - `make migrateup`
4. **create new query files in** - `db/query`
5. **SQLC - generate sql.go file** `make sqlc-generate`
6. **run mockgen** - `make mock`
7. **run tests** - `make test`
