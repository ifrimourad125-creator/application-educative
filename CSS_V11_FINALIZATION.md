# CSS V11 — final cascade normalization

## What changed

The active CSS was normalized conservatively.

For rules where every selector can safely be scoped below the application root, declarations using
`!important` were converted to ordinary declarations and the selector was scoped with `#root`.

This preserves the intended author-level precedence against generic/global styles while removing
the need for `!important` in component/page rules.

## What was deliberately kept

Global rules that target `html`, `body`, `#root`, browser scrollbar pseudo-elements, universal scrollbar
selectors, or accessibility reduction rules were **not** rewritten. These are the cases where turning the
selector into a `#root` descendant would change its meaning.

## Validation

Before V11 active stylesheet count: 854
Removed by this pass: 828
Remaining active stylesheet count: 26

The remaining declarations are restricted to global/browser/scrollbar/accessibility cases.

A rollback copy of every modified active stylesheet is stored in:

`tools/legacy-css-backups-v11-before-final-cascade/`

## Design protection

No React page, route, pedagogical data, Tailwind class, animation definition, or content asset was intentionally
changed by this CSS-only pass.
