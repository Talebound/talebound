# Talebound Todoist task plan

The screenshot contains five main tasks and one tentative subtask. Most describe
unfinished behavior in existing features. The proposed work is to finish those
features, with backend fixes where the interface alone cannot guarantee the
expected result.

Prepared on 19 November 2026 against `origin/main` at `906ebdc42af9ab998b888725dc7efecd576ccf27`.
Branch: `feature/tasks-from-todoist`.
Worktree: `/home/medo/dev/talebound/worktrees/tasks-from-todoist`.
Implementation authorized on 19 November 2026, with the optional ID column explicitly excluded.
The evidence and current-state descriptions below record the baseline at the planning commit above.

## What the old notes mean

| Original Todoist note | Likely intended behavior | State when planned |
| --- | --- | --- |
| Don't let MapLayer with position 1 be NOT enabled | The bottom map image must always remain visible. | The interface prevents toggling it off, but the backend does not enforce that rule. |
| Fix sorting in entity tables | Clicking a column heading should sort all matching records, including other pages. | Maps and locations have backend sorting defects; posts have incomplete sort and pagination state handling. |
| Keep column widths in entity tables (now they change when going to another page) | Columns should stay in the same place when paging through short and long content. | Some widths are supplied, but the tables still use content-dependent layout. |
| Add ID column? | Possibly display a stable record number to distinguish similarly named records. | No ID column exists in these tables. This is a product option, not a prerequisite for stable widths. |
| Make it possible to create posts from location table | Create a location's descriptive article directly from its row. | The button, API, and initial creation flow exist, but the flow is incomplete. |
| Disable buttons when not possible to upload / change | Gray out avatar upload and password change until they can actually submit. | Submission guards exist, but the buttons do not receive the corresponding disabled state. |

“Entity groups + content” is an empty section in the screenshot, so it adds no
work. “Entity tables” is interpreted as the post, map, and location tables,
including their uses in selection dialogs and menu administration.

## Recommended delivery order

| Order | Deliverable | Relative size | Dependency |
| --- | --- | --- | --- |
| 1 | Make location post creation authorized, atomic, and immediately visible | Medium | Independent; first because its existing permission error is ignored. |
| 2 | Enforce the enabled base map layer rule | Medium | Independent. |
| 3 | Correct sorting and pagination across entity lists | Medium to large | Independent of 1 and 2. |
| 4 | Stabilize table column widths | Small | Prefer after 3 so table changes can be reviewed together. |
| 5 | Connect settings button states to validation and requests | Small | Independent. |
| Optional | Add a compact ID column to management tables | Small | Defer until its usefulness is established; coordinate with 3 and 4 if adopted. |

Use separate reviewable commits for these deliverables on the requested branch.
The relative sizes include the acceptance checks below, not just UI edits.

## 1 Complete post creation from a location

**Meaning:** A location is a named place; its post holds the longer article. An
editor should be able to create that article from the location row and start
editing it immediately.

**Evidence:** [LocationTablePostCell](../../frontend/component-sections/Location/LocationTablePostCell.tsx)
already offers “Assign Post” and passes a creation callback to
[AssignPostModal](../../frontend/component-sections/Post/AssignPostModal/AssignPostModal.tsx).
The [creation mutation](../../frontend/api/locations/useCreateLocationPost.ts)
neither stores the returned location nor invalidates its cached queries. The
existing-post callback is empty. The
[backend endpoint](../../backend/api/services/locations/rpc_create_location_post.go)
creates a post, links it to the location, and adds it to the module in separate
writes. It overwrites the permission-check error without checking it and does
not guard against a location already having a post. Depending on the failed
permission check, this can continue without authorization or dereference a nil
authentication payload.

**Implementation:**

1. Return permission errors before any creation. Require both location and post
   permissions in the location's module, preserving existing administrator rules.
2. Add a transaction using the existing `SQLStore.execTx` pattern: lock the
   location, inspect its current post, create the post and module entity, then
   link the location. Roll back every write if any step fails. For repeat or
   concurrent requests, return the already-linked location without creating a
   second post. Never silently replace a linked post.
3. Keep the existing title-from-location behavior and current publication flags
   in this task. Changing draft/privacy defaults is a separate product decision.
4. Store the returned location in Redux, refresh relevant location detail/list
   queries and the module post list, and load the returned post ID. Reuse the
   existing editable post detail modal so the user can write the article.
5. Offer a clear “Create post” action when no post exists and the user has both
   required permissions. Disable it while pending, show failures, and make the
   linked post openable after success. Avoid presenting the empty “Choose
   existing post” action in this flow; implementing assignment is separate work.

**Acceptance:** An authorized editor creates one linked post in the same module,
sees its title immediately without reloading, and can open/edit it. A repeat
request or double click creates no duplicate. Logged-out users, viewers, and
collaborators missing either permission cannot create anything. A simulated
failure in any write leaves no orphan post/entity or partial link. Selection
tables remain selection-only.

## 2 Keep the base map layer enabled

**Meaning:** Position 1 is the base image underneath optional overlays. Disabling
it can remove the map's background, including for ordinary viewers.

**Evidence:** [MapLayerSectionContent](../../frontend/component-sections/Map/MapAdministrationModals/MapLayerAdministrationModal/MapLayerSectionContent.tsx)
already disables its Enabled checkbox at position 1, and
[map creation](../../backend/api/services/maps/rpc_create_map.go) creates that
layer enabled. However,
[UpdateMapLayer](../../backend/api/services/maps/rpc_update_map_layer.go) accepts
`enabled: false` for any layer. Creation and movement can also target position 1.
[MapLayerReorder](../../frontend/component-sections/Map/MapAdministrationModals/MapLayerAdministrationModal/MapLayerReorder.tsx)
includes the base in the reorder group even though its own drag handle is
inactive. [MapLayout](../../frontend/component-sections/Map/MapLayout/MapLayout.tsx)
omits disabled images, and the layer-list endpoint omits disabled layers for
viewers without edit permissions.

**Implementation:**

1. Adopt the existing interface's apparent policy: the original base stays at
   position 1; overlays occupy positions 2 and above. Reject disabling, moving,
   deleting, or displacing that base. This is a proposed interpretation of the
   old note; deliberate replacement of the base remains possible through its
   existing image-edit action.
2. Load the addressed layer before updates/deletes and verify it belongs to the
   map whose permissions were checked. Validate creation/reorder positions before
   mutation; keep any multi-row position changes atomic and serialize changes
   per map to avoid concurrent reorder/create races.
3. Add a new migration that enables existing disabled position-1 rows and adds
   a database check enforcing `position <> 1 OR enabled`. Audit malformed
   position sequences before choosing any additional repair; do not rewrite old
   applied migrations or silently choose between duplicate base layers.
4. Keep the base outside the movable overlay group. Label it “Base layer — always
   enabled” and retain normal enable/disable controls for overlays.

**Acceptance:** A direct API request cannot disable the base, move it, insert an
overlay beneath it, or alter a layer through another map's ID. Disabled overlays
remain supported. Invalid image/position requests leave the previous order
intact. Existing disabled base rows are repaired by migration, and the database
rejects attempts to disable them afterward. Both editors and ordinary viewers
see the base after reload.

## 3 Make sorting apply to the complete entity list

**Meaning:** Sorting should change the order of every matching post, map, or
location before pagination, with the arrows matching the actual order.

**Evidence:**

- [GetMaps](../../backend/api/services/maps/rpc_get_maps.go) and
  [GetLocations](../../backend/api/services/locations/rpc_get_locations.go) omit
  `OrderDirection` when building database parameters. Their
  [map](../../backend/db/query/map.sql) and
  [location](../../backend/db/query/location.sql) queries then explicitly order
  by `id DESC`, overriding the order selected inside the SQL functions.
- Posts already forward the direction. Their
  [query](../../backend/db/query/post.sql) does **not** contain that ID override.
  It relies on an inner function's order, and the function has no unique
  tie-breaker for equal titles/dates. Treat deterministic pagination as a separate
  concern from the confirmed map/location defects.
- The shared [tableSorter](../../frontend/utils/types/tables.ts) has no explicit
  clear-sort behavior: an absent direction can become descending or leave the
  previous state unchanged. [PostList](../../frontend/component-sections/Post/PostList.tsx)
  and [MapList](../../frontend/component-sections/Map/MapList.tsx) track the page
  separately without passing a controlled current page to their tables.
- [LocationTable](../../frontend/component-sections/Location/LocationTable.tsx)
  sorts in the browser, while [LocationList](../../frontend/component-sections/Location/LocationList.tsx)
  only loads three records initially. Thus its initial sort covers only the
  loaded subset, not every matching location.

**Implementation:**

1. Forward and normalize requested directions in map/location handlers. Keep
   field allowlists and define consistent direction validation.
2. Make the outermost paginated query use the requested, allowlisted ordering;
   do not simply remove `ORDER BY id DESC` and assume inner ordering is enough.
   Add a stable ID tie-breaker to all three list queries. Preserve filters and
   correct totals. Update versioned SQL function definitions if needed, then
   regenerate sqlc code and mocks rather than hand-editing generated files.
3. Control sort arrows and current page from the same list state. A sort change,
   clear, or module change resets the page to 1. Clearing restores the existing
   list default: newest-created first for posts/maps, descending ID for locations.
   Ordinary paging must preserve the selected sort and avoid resetting it.
4. Give locations the same server-driven sorting/pagination contract, including
   their selection-list usage. Replace the combination of “Load more” and
   client-only sorting with one controlled paginated list. Preserve row-selection
   behavior. Retain the current infinite-query infrastructure where practical;
   a wholesale data-fetching rewrite is unnecessary.

**Acceptance:** Use at least three pages with titles/names deliberately out of
ID order and duplicate names/timestamps. Verify ascending, descending, and clear
for every exposed sortable column; include map width/height. Sort from a later
page and verify page 1 is displayed. Concatenated API pages must equal the full
expected order with no missing/duplicate rows for an unchanged dataset. Check
empty results, one page, loading, module changes, and selection/drag table uses.
Add database/API regression coverage for order, ties, filters, and pagination.

## 4 Keep table widths stable while paging

**Meaning:** At the same viewport size, a long title on page 2 should not push the
date and action columns sideways. This does not imply user-resizable columns or
saved width preferences.

**Evidence:** [PostsTable](../../frontend/component-sections/Post/PostsTable.tsx),
[MapsTable](../../frontend/component-sections/Map/MapsTable.tsx), and
[LocationTable](../../frontend/component-sections/Location/LocationTable.tsx)
provide some widths but no explicit fixed table layout. Locations also leave
thumbnail and action widths unspecified. Editable post/map tables use the same
`action-buttons` key for two different columns.

**Implementation:** Use a fixed layout with explicit widths for thumbnails,
selection, dates, dimensions, linked-post controls, and action/drag columns.
Allocate predictable remaining space to title/name/description, with overflow
handling and access to the full text. Set a minimum table width and horizontal
scrolling on narrow screens. Give each column a unique key. Apply the same
rules in list, selection, and drag contexts; extract small shared constants only
where they remove actual duplication.

**Acceptance:** Compare column boundaries on pages containing short text, long
unbroken text, missing images, and different action states at a fixed viewport.
Paging and loading do not change those boundaries. Desktop and narrow-screen
tables remain usable, with readable full values and reachable controls. Browser
inspection is appropriate; no new test framework is needed for width constants.

## 5 Disable unavailable settings actions

**Meaning:** “Upload” and “Change” should visibly reflect whether a valid action
is ready, rather than allowing a click that silently does nothing.

**Evidence:** [AvatarChange](../../frontend/component-sections/UserSettings/AvatarChange.tsx)
guards against missing upload data but never disables its button and clears the
selection before knowing whether upload succeeded.
[PasswordChange](../../frontend/component-sections/UserSettings/PasswordChange.tsx)
calculates `buttonDisabled` but never passes it to the button.
[PasswordChangeInputs](../../frontend/components/PasswordChangeInputs/PasswordChangeInputs.tsx)
checks the minimum password length for disabling but omits the maximum of 100
characters already used by frontend/backend validation. The shared Button's
`loading` prop alone does not disable interaction.

**Implementation:**

1. Disable avatar upload without prepared file data, while reading a file, while
   uploading, or without a valid user. Prevent stale file-read results from
   enabling an older selection. Disable file replacement during upload, retain
   the selection on failure for retry, and clear it after success. Show errors.
2. Connect the password button's disabled and loading props to validation and
   request state. Use the existing 6–100-character rule and matching confirmation
   consistently. Keep handler guards, show request failures, and preserve the
   existing success state.

**Acceptance:** Check empty/mismatched passwords and lengths 5, 6, 100, and 101;
only matching values within the supported range enable Change. Check avatar
selection, cancellation/clearing, pending conversion/upload, success, and failure
with retry. Rapid clicks must not send duplicate requests. Do not invent new
file-size or format limits in this task. Real upload verification requires
development Cloudflare credentials; otherwise use a controlled response and
report that integration as unverified.

## Optional ID column

Deferred at the user's explicit request. No ID column was added.

## Implementation and validation

Implemented the five required tasks in this worktree. The location-post endpoint
now checks permissions before a transaction, locks the location, and returns its
existing post on retries. Map-layer changes lock their map and preserve the base.
Migration 32 repairs disabled base layers and adds a database constraint; it
refuses malformed position sequences instead of guessing how to repair them.

All three entity lists now sort on the server with a stable ID tie-breaker,
controlled arrows/page state, and fixed column layout with internal horizontal
scrolling. Module map lists also pass their module ID to the screen, correcting
an existing omission that previously displayed maps from other modules. New
optional map/location sort-direction fields were regenerated through protobuf,
Swagger, and the frontend API client. Settings buttons use validation, file-read,
and request state, with duplicate-submission guards and visible failures.

Validation used this worktree's isolated PostgreSQL/Redis/Mailpit stack and local
fixture user/world. Docker was available at `/home/medo/.local/bin/docker`; adding
that directory to PATH resolved the planning-time tooling failure. Generated
configuration and browser credentials remain in ignored local files.

- `scripts/worktree-dev/talebound-worktree-dev migrate`: passed.
- `scripts/worktree-dev/talebound-worktree-dev test-backend`: passed the full
  supported short Go suite. Added tests cover denied/allowed permissions,
  concurrent post creation, rollback on a failed write, base-layer/ownership
  guards, concurrent layer positions, migration repair/constraint, and both sort
  directions across multiple pages with repeated values and module filters.
- Containerized Yarn `lint` and `typecheck`: passed, including Storybook types.
- Containerized Yarn `build`: passed lint, TypeScript, compilation, and all 64
  static pages. The frontend was stopped during the build, then restarted.
- Chromium browser checks passed for settings password boundaries (5, 6, 100,
  101 and mismatches); password pending/double-click/failure/retry/success;
  avatar pending/failure/retry/success states; location
  creation, opening, editing, saving, and repeated HTTP creation; list sort
  changes/clearing/page resets; and stable header widths across pages. Post/map
  table scrolling was checked at a 390px viewport. The existing world-header
  menu button still extends beyond that viewport; the tables themselves remain
  inside their containers.
- Map browser checks passed for the disabled, checked base control, an editable
  overlay with persisted changes, anonymous base-layer rendering, and direct
  HTTP rejection of base disable and cross-map updates.
  No JavaScript runtime errors occurred in the checked flows.
- `git diff --check`: passed.

Password submission states used controlled responses without changing the
fixture account password. Avatar upload responses were controlled because
development Cloudflare credentials are not configured; real external image upload remains
unverified. Map fixtures likewise use placeholder image URLs, so external image
loading was not part of the check. Selection-dialog and drag-and-drop variants
share the updated table components but were not exhaustively browser-tested.

Before deployment, apply migration 32 and deploy the backend/API changes with
the frontend. A malformed historical layer sequence will deliberately stop the
migration and needs manual repair. Backend deployment remains manual.

Separate existing issues observed during this work: the general `CreatePost`
endpoint also ignores a permission-check error, and the development Next.js
insights overlay reports a security update for the installed version. Those are
follow-ups outside these Todoist fixes. The overlay was dismissed for browser
checks; package versions and production configuration were not changed.

The primary monorepo checkout and historical frontend/backend clones remain
outside this task's implementation area. Todoist itself has not been edited.
