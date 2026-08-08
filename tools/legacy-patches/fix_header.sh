sed -i '130,150c\
function Header({\
  icon,\
  title,\
  category,\
  objective,\
  instruction,\
  tone = "cyan",\
}: {\
  icon: string\
  title: string\
  category?: string\
  objective: string\
  instruction: string\
  tone?: "cyan" | "emerald" | "amber" | "rose" | "violet" | "orange"\
}) {\
  const bgStyles = {\
    cyan: "border-cyan-300/50 bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700",\
    emerald: "border-emerald-300/50 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700",\
    amber: "border-amber-300/50 bg-gradient-to-r from-amber-500 via-orange-500 to-orange-700",\
    rose: "border-rose-300/50 bg-gradient-to-r from-rose-500 via-pink-600 to-rose-800",\
    violet: "border-violet-300/50 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700",\
    orange: "border-orange-300/50 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600",\
  }\
  return (\
    <div\
      className={`\
      relative\
      mb-3.5\
      overflow-hidden\
      rounded-2xl\
      border\
      ${bgStyles[tone]}\
      p-3.5\
      sm:p-4.5\
      shadow-xl\
      backdrop-blur-xl\
      w-full\
      min-w-0\
    `}\
    >' src/features/activities/activityShared.tsx
