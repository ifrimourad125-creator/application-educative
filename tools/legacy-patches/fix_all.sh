sed -i '125,127d' src/features/activities/activityShared.tsx
cat << 'INNEREOF' > temp_insert.tsx
function Empty({ message }: { message: string }) {
  return (
    <Panel>
      <h1 className="text-xl font-black mb-2">{message}</h1>
      <p className="text-slate-300 text-sm">Le modèle sera ajouté progressivement.</p>
    </Panel>
  )
}

function Header({
  icon,
  title,
  category,
  objective,
  instruction,
  tone = "cyan",
}: {
  icon: string
  title: string
  category?: string
  objective: string
  instruction: string
  tone?: "cyan" | "emerald" | "amber" | "rose" | "violet" | "orange"
}) {
  const bgStyles = {
    cyan: "border-cyan-300/50 bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700",
    emerald: "border-emerald-300/50 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700",
    amber: "border-amber-300/50 bg-gradient-to-r from-amber-500 via-orange-500 to-orange-700",
    rose: "border-rose-300/50 bg-gradient-to-r from-rose-500 via-pink-600 to-rose-800",
    violet: "border-violet-300/50 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700",
    orange: "border-orange-300/50 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600",
  }
  return (
    <div
      className={`
      relative
      mb-3.5
      overflow-hidden
      rounded-2xl
      border
      ${bgStyles[tone]}
      p-3.5
      sm:p-4.5
      shadow-xl
      backdrop-blur-xl
      w-full
      min-w-0
    `}
    >
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/20 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 left-8 h-28 w-28 rounded-full bg-sky-300/20 blur-2xl pointer-events-none" />

      <div className="relative flex flex-col gap-3 sm:gap-3.5 w-full min-w-0">
        <div className="flex flex-col items-center justify-center text-center gap-3 w-full min-w-0">
          <div
            className="
            flex
            h-16
            w-16
            sm:h-20
            sm:w-20
            shrink-0
            items-center
            justify-center
            rounded-3xl
            border-2
            border-white/60
            bg-gradient-to-br
            from-white/35
            via-white/20
            to-white/10
            shadow-lg
            backdrop-blur-md
          "
          >
            <span className="text-4xl sm:text-5xl leading-none select-none flex items-center justify-center transform hover:scale-105 transition-transform duration-200">
              {icon}
            </span>
          </div>
          <div className="min-w-0 w-full flex flex-col items-center">
            <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-cyan-100 mb-1 drop-shadow-sm">
              {category || "Activité interactive"}
            </p>
            <h1 className="text-xl sm:text-2xl font-black text-white leading-tight break-words mb-2 drop-shadow-md">
              {title}
            </h1>
            <p className="text-xs sm:text-sm font-medium leading-relaxed text-white/95 break-words text-center">
              {objective}
            </p>
          </div>
        </div>

        {instruction && (
          <div
            className="
            rounded-xl
            border
            border-white/30
            bg-black/20
            backdrop-blur-md
            p-2.5
            sm:p-3
            text-xs
            sm:text-sm
            font-medium
            leading-relaxed
            text-white
            shadow-inner
            w-full
            break-words
            flex
            items-start
            gap-2
          "
          >
            <span className="shrink-0 text-sm sm:text-base" aria-hidden="true">
              💡
            </span>
            <span>{instruction}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function ProgressCard(props: {
  icon: string
  label: string
  score?: number
  total?: number
  answered?: number
  required?: number
  tone?: "cyan" | "emerald" | "amber" | "rose" | "violet"
}) {
  void props
  return null
}

function Panel({ children, className = "" }: { children: ReactNode; className?: string; key?: React.Key }) {
  return (
    <div
      className={`
        relative
        w-full
        mb-3.5
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/90
        p-4
        sm:p-5
        shadow-xl
        backdrop-blur-xl
        ${className}
      `}
    >
      <div className="relative z-10 w-full">{children}</div>
    </div>
  )
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-2.5 flex items-center gap-2 text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider">
      <span
        className="h-3.5 w-1 rounded-full bg-cyan-400 shadow-sm shadow-cyan-500/50"
        aria-hidden="true"
      />
      {children}
    </h2>
  )
}

function TextBlock({ text }: { text?: string }) {
  const safeText = text || "Contenu à compléter."
INNEREOF
sed -i '124r temp_insert.tsx' src/features/activities/activityShared.tsx
rm temp_insert.tsx
