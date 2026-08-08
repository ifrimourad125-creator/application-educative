# V12 — UI/UX polish

Applied without changing the existing content model or route structure:

- Added an accessible skip link to the main content.
- Added working desktop search/statistics controls that activate the existing modals.
- Added Escape-key closing to Search, Recents and Statistics dialogs.
- Added dialog semantics (`role=dialog`, `aria-modal`, labelled titles).
- Improved bottom-navigation semantics with `aria-label` and `aria-current`.
- Prevented the home title from overflowing on narrow screens.
- Added tap/focus accessibility safeguards.
- Added a reusable static UX scan script.

The existing visual language, page content, routes, and data were intentionally preserved.
