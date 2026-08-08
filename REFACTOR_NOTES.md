# Refactor V3 — safe consolidation

## Invariants
- The current page markup/classes and Tailwind visual values were preserved.
- Educational data and routes were not rewritten.
- Audio behavior keeps the same public `utils/sound.ts` API.
- The existing progress storage key remains `francais_college_mobile_progress_v2`.
- Legacy patch scripts remain archived under `tools/legacy-patches/` rather than deleted.

## Changes
- Added `selectors/catalogSelectors.ts` for catalog lookup/search logic.
- Extracted progress persistence to `services/progress/progressStorage.ts`.
- Extracted audio preferences and playback engine to `services/audio/`.
- Kept `utils/sound.ts` as a compatibility facade to avoid touching existing page imports.
- Extracted shell clock and frame-mode concerns into hooks.
- Added additive design tokens in `styles/tokens.css`; existing styles still win exactly as before.
- Added `tools/validate-project.mjs` and an npm `validate` script for import/assets/CSS sanity checks.
- Added safer progress date validation and preserved local-calendar streak behavior.

## Validation
`node tools/validate-project.mjs` passes import/path validation.

The environment could not install the project's npm dependencies because the configured registry does not expose `@google/genai@^2.4.0`. Therefore a full Vite/TypeScript production build could not be run here.

The validator reports the generated oral MP3 paths as missing from this ZIP. These are asset availability warnings, not code changes.
