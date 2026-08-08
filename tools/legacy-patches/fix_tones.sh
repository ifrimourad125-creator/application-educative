cat << 'INNEREOF' > temp_tones.tsx
}

function Shell({
  children,
  onBack,
  onBackToLevel,
  activityId = 1,
  tone = "cyan",
}: {
  children: ReactElement
  onBack: () => void
  onBackToLevel?: () => void
  activityId?: number
  tone?: "cyan" | "emerald" | "amber" | "rose" | "violet" | "orange" | "sky" | "fuchsia" | "indigo"
}) {
  const bgStyles = {
    cyan: "bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700",
    emerald: "bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700",
    amber: "bg-gradient-to-r from-amber-500 via-orange-500 to-orange-700",
    rose: "bg-gradient-to-r from-rose-500 via-pink-600 to-rose-800",
    violet: "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700",
    orange: "bg-gradient-to-r from-orange-500 via-orange-600 to-red-600",
    sky: "bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600",
    fuchsia: "bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-600",
    indigo: "bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-700",
  }
INNEREOF
sed -i '75,98c\
//REPLACED_TONES\
' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_TONES/r temp_tones.tsx' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_TONES/d' src/features/activities/activityShared.tsx
rm temp_tones.tsx
