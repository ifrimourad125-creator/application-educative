# Français Collège — Release Readiness V4

## Applied
1. Build readiness: npm scripts kept/expanded; environment build attempt documented.
2. Navigation/interaction safety: existing routes and UI APIs preserved; lazy route loading retained.
3. Audio: missing generated tracks are now treated as intentional when manifest status is `missing`; runtime keeps the existing `oldAudioPath` fallback.
4. CSS: additive accessibility layer added; no mass cascade rewrite to protect the current design.
5. UX/accessibility: `lang="fr"`, viewport-fit, theme color, description, focus-visible states, reduced-motion support, forced-colors support, and icon-only close labels.
6. Responsive: viewport metadata preserved and strengthened for mobile safe areas; existing responsive classes untouched.
7. Performance: route-level lazy loading retained; searchable catalog is memoized; audio player cleanup added.
8. Reliability: application error boundary added; local progress normalization and audio fallbacks retained.
9. Testing: dependency-free smoke tests added; structural validation strengthened.
10. Flutter preparation: architecture notes/tokens remain additive and continue to separate content, features, services, and UI.

## Validation
- `node tools/validate-project.mjs` — PASS
- `node tools/smoke-tests.mjs` — PASS
- Full `npm run lint` / production build could not be executed in the provided environment because the configured npm registry does not contain `@google/genai@^2.4.0`.

## Intentionally deferred
The project still contains many historical `!important` declarations. They were not removed automatically because doing so without screenshot regression testing can change the latest approved design. The legacy patch scripts remain archived under `tools/legacy-patches/` for traceability.
