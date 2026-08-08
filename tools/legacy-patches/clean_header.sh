sed -i '181,200d' src/features/activities/activityShared.tsx
sed -i 's/${bgStyles\[tone\]}/${TONE_GRADIENTS[tone]}/g' src/features/activities/activityShared.tsx
