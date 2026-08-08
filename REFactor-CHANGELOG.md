## V11 — final CSS cascade normalization

- Removed 828 component/page-level `!important` declarations by scoping safe selectors under `#root`.
- Preserved 26 global/browser/accessibility declarations where `#root` scoping would change semantics.
- Added `tools/audit-css-final.mjs`.
- Added rollback copies under `tools/legacy-css-backups-v11-before-final-cascade/`.
- No intentional React/content/route changes.

# Refactor changelog

## V3 — safe consolidation
- Centralized catalog selectors.
- Separated progress persistence from business rules.
- Separated audio preferences/playback from the compatibility API.
- Extracted shell frame mode and clock hooks.
- Added additive design tokens without changing existing visual values.
- Added project validation tooling.
- Preserved routes, page classes, content, and existing audio/public API.

### V7 — CSS cascade cleanup
- Normalized `activity-detail.css` by removing 1,513 legacy `!important` flags while preserving selector/declaration order.
- Added a pre-change stylesheet backup for rollback.
- Validation and smoke tests continue to pass.
