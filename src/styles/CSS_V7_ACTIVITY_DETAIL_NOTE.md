# V7 activity-detail CSS cleanup

`activity-detail.css` was normalized by removing legacy `!important` flags while preserving declaration order and selector structure. The file is imported late in `src/index.css`, so its normal author rules still override earlier Tailwind/custom rules in the intended cascade.

A byte-for-byte pre-change backup is stored at `src/styles.before-v7-activity-detail.css`.

Do not remove that backup until the rendered UI has been visually checked.
