# V14 — JSX fragment fix

V13 had a JSX parser error because the return statement contained two adjacent root elements:
the accessibility skip link and the main shell `<div>`.

V14 wraps the return value in a React fragment (`<>...</>`), which is the correct JSX structure.

No visual styling, routes, content, or application data were changed.
