sed -i 's/activityId?: number/activityId?: number\n  tone?: "cyan" | "emerald" | "amber" | "rose" | "violet" | "orange"/g' src/features/activities/activityShared.tsx
sed -i 's/activityId = 1,/activityId = 1,\n  tone = "cyan",/g' src/features/activities/activityShared.tsx
