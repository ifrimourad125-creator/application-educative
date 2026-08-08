# CSS cleanup — V8

The active stylesheet set now contains 1,006 `!important` declarations.

This pass intentionally made **no unsafe deletions**: there were no additional same-block dead declarations that could be removed without changing cascade behavior.

## What changed
- CSS backup snapshots were moved out of `src/` into `tools/legacy-css-backups-v7/` so production audits only inspect active stylesheets.
- Validation tooling continues to audit only active `src/styles/*.css` files.
- The previous V7 activity-detail snapshot remains available for rollback.

## Next safe phase
Remaining `!important` rules must be refactored by component/page with rendered before/after comparison. Do not bulk-delete them.
