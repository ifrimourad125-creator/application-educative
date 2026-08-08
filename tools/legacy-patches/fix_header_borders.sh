cat << 'INNEREOF' > temp_borders.ts
export const TONE_BORDERS: Record<string, string> = {
  cyan: "border-cyan-300/50",
  emerald: "border-emerald-300/50",
  amber: "border-amber-300/50",
  rose: "border-rose-300/50",
  violet: "border-violet-300/50",
  orange: "border-orange-300/50",
};
INNEREOF
sed -i '58r temp_borders.ts' src/features/activities/activityShared.tsx
sed -i 's/${TONE_GRADIENTS\[tone\]}/${TONE_BORDERS[tone]} ${TONE_GRADIENTS[tone]}/g' src/features/activities/activityShared.tsx
rm temp_borders.ts
