cat << 'INNEREOF' > temp_tones2.ts
export const TONE_GRADIENTS: Record<string, string> = {
  cyan: "bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700",
  emerald: "bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700",
  amber: "bg-gradient-to-r from-amber-500 via-orange-500 to-orange-700",
  rose: "bg-gradient-to-r from-rose-500 via-pink-600 to-rose-800",
  violet: "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700",
  orange: "bg-gradient-to-r from-orange-500 via-orange-600 to-red-600",
};
export const TONE_BORDERS: Record<string, string> = {
  cyan: "border-cyan-300/50",
  emerald: "border-emerald-300/50",
  amber: "border-amber-300/50",
  rose: "border-rose-300/50",
  violet: "border-violet-300/50",
  orange: "border-orange-300/50",
};
INNEREOF
sed -i '15r temp_tones2.ts' src/features/activities/activityShared.tsx
rm temp_tones2.ts
