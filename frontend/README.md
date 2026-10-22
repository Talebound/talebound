# Talebound frontend

Use Node.js 24.22.1 or later on the Node 24 LTS line and the checked-in Yarn 4.18.1.
For local development, follow the isolated worktree setup in
[the development guide](../scripts/worktree-dev/README.md). Use the URL printed
by `talebound-worktree-dev status` for this worktree's frontend and backend.

From this directory, with Node installed:

```sh
node .yarn/releases/yarn-4.18.1.cjs install --immutable
node .yarn/releases/yarn-4.18.1.cjs lint
node .yarn/releases/yarn-4.18.1.cjs format:check
node .yarn/releases/yarn-4.18.1.cjs typecheck
node .yarn/releases/yarn-4.18.1.cjs build
node .yarn/releases/yarn-4.18.1.cjs build-storybook
```

`build` runs Oxlint before Next.js compilation and type checking.
Development and production builds explicitly use
Webpack to preserve the existing SVG component loader. The Pages Router remains
in use.

## TypeScript and rich text editor

`typescript` is the native TypeScript 7 compiler, used by `yarn typecheck` and
Next.js builds through Next's default CLI integration. Storybook uses its default
`react-docgen` parser. Neither needs a TypeScript 6 alias. The API generator still
installs its own TypeScript 6 dependency internally. Node types track the Node 24
runtime used in CI and the worktree container.

Lexical packages are pinned together at 0.52.0. The editor keeps the existing
JSON document and custom image schemas; no stored-content migration is needed.
The Editor stories load a fixture produced by 0.12.2, including formatting,
lists, code, a table, a link, and an image with a nested caption. Use these stories
to check rendering and editing when updating Lexical. Syntax highlighting now
comes from `@lexical/code-prism`.

## Linting and formatting

`yarn lint` runs native Oxlint rules and `yarn lint:fix` applies their safe fixes.
The explicit rules in `.oxlintrc.json` cover JavaScript, TypeScript, React, and
Hooks. Default rule categories are disabled because the migrated rules are listed
individually with their original severities.
Oxlint handles TypeScript and JSX variable usage natively; parsing rejects legacy
octal literals in modules, and Oxfmt handles redundant semicolons and indentation.

ESLint, its plugins, and the JavaScript plugin bridge are removed. Native
`react/no-unsafe` checks both legacy and `UNSAFE_` lifecycle names, alongside the
existing React rules. Native import restrictions keep stories on
`@storybook/nextjs` and prevent imports from retired Storybook testing packages.

Some former plugin checks have no native equivalent and are no longer linted:
TanStack Query's query-key exhaustiveness and stable QueryClient rules; Storybook's
CSF conventions, interaction assertions, and addon-installation checks; and the
full React deprecated-API catalog. Type checking (`yarn typecheck`) and the
production/Storybook builds remain required in CI. These checks are complementary
and do not replace the removed lint rules.

`yarn format` (also available as `yarn pretty`) runs Oxfmt. `yarn format:check`
checks formatting without writing files and runs in CI. `.oxfmtrc.json` preserves
the existing two-space indentation, single quotes, semicolons, and 100-column
width. Import sorting is not enabled. Generated API files and Storybook MDX are
formatted too; build output, dependencies, assets, and the Yarn lockfile are excluded.

## API generation

Run `make api-generate` from the repository root, or `yarn generate` here. The
generator reads `../backend/doc/swagger/talebound.swagger.json`; a running backend
is not required. Commit changes to `generated/api-types/` with schema or generator
changes. CI regenerates the client and verifies that it matches the committed files.

`scripts/generate-api.mjs` preserves protobuf `bytes` as base64 strings in JSON,
formats the output with the repository's Oxfmt configuration, and keeps
TypeScript checking enabled for generated files. Do not edit generated files by
hand. When running generation in the worktree's frontend container, additionally
mount `backend/doc/swagger` read-only at `/backend/doc/swagger`.

## React 19 and Storybook

React and React DOM are upgraded together with their types. Ant Design 6 supports
React 19 directly; the v5 compatibility patch is removed from both the app and
Storybook. `@ant-design/cssinjs` is kept on the same major version used by Ant
Design so `_document.tsx` can extract the server-rendered styles from a shared
cache. Redux, Radix, Query, Motion, and icon dependencies were updated for
React 19 compatibility; existing stored names for renamed map icons remain valid.

Storybook 10 uses `@storybook/nextjs` for story types. Removed essentials and
interaction addons are provided by Storybook itself. Docs use `Canvas of={story}`
for stories and ordinary JSX for custom examples.
