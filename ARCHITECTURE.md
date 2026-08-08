# Architecture notes

This project keeps the current React UI and pedagogy content as the visual/functional reference.

## Current boundaries

- `src/pages/` — route-level screens
- `src/components/` — shared UI and app shell
- `src/features/` — feature-specific behavior and domain rules
- `src/data/` — pedagogical content and static manifests
- `src/utils/storage.ts` — persistence adapter
- `src/features/progression/progressRules.ts` — pure progression/XP rules
- `src/utils/date.ts` — local-calendar date helpers
- `src/styles/` — existing visual system (kept unchanged in this refactor)

## Refactor rule

The current design, routes, interactions, audio feedback, and pedagogical data are treated as the reference behavior. Structural refactors must preserve them unless a visual/UX change is explicitly requested.

## Flutter preparation

Domain rules are being isolated from React UI so the same rules can later be reimplemented in Dart without translating JSX/CSS mechanically.

## Android shell decomposition

The Android shell is now split into focused components under `src/components/android/`:
- `DesktopControls.tsx` — frame, sound, and theme controls
- `BottomNavigation.tsx` — primary app navigation
- `SystemNavigationBar.tsx` — Android-style system navigation
- `SearchModal.tsx` — unit search UI
- `RecentsModal.tsx` — recent-sections/task switcher

`AndroidContainer.tsx` remains the composition boundary. Existing Tailwind class strings and interaction callbacks were kept intact so this refactor does not intentionally change the visual design or user flows.
