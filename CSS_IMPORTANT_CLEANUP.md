# CSS !important cleanup

## V6 safe cascade pass

The active stylesheet set started at **3,275** `!important` declarations.

This pass removed **756** declarations using only safe cascade-preserving cases:

1. exact duplicate declarations with the same selector, property, value and at-rule context;
2. earlier `!important` declarations superseded by a later `!important` declaration for the same selector/property/context.

The active count is now **2,519**.

### Intentionally not changed

The remaining declarations are not removed automatically. Cases involving specificity, responsive overrides, state selectors, selector lists, or cross-file cascade require visual regression checks.

The archived directory `src/styles.before-important-cleanup/` remains untouched as a rollback reference.

### Next CSS pass

Use screenshot comparisons for each major screen before replacing `!important` with normal declarations or selector specificity changes.


## V7 — activity-detail normalization

- Removed 1,513 legacy `!important` flags from `src/styles/activity-detail.css`.
- Preserved selector order and declaration order.
- Kept a byte-for-byte backup at `src/styles.before-v7-activity-detail.css`.
- Active stylesheet count is now 1,006 `!important` declarations (4 intentional accessibility safeguards plus remaining legacy cascade rules in the other stylesheets).
- Full visual regression still requires running the app in a browser; dependency installation is unavailable in this environment because `@google/genai@^2.4.0` is not cached.

## V7 — activity-detail normalization

- Removed 1,513 legacy `!important` flags from `src/styles/activity-detail.css`.
- Preserved selector order and declaration order.
- Kept a byte-for-byte backup at `src/styles.before-v7-activity-detail.css`.
- Active stylesheet count is now 1,006 `!important` declarations.
- Full visual regression still requires running the app in a browser; dependency installation is unavailable in this environment because `@google/genai@^2.4.0` is not cached.
