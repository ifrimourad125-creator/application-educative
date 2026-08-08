# V13 — V12 runtime/parser fix

The V12 test exposed a real JSX parser error in `src/components/AndroidContainer.tsx`.
Two newline escape sequences had been written literally into JSX/props instead of being actual
line breaks. They have been corrected in V13.

No design, content, route, or data changes were made.
