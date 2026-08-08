cat << 'INNEREOF' > temp_progress.tsx
function ProgressCard(props: {
  icon: string
  label: string
  score?: number
  total?: number
  answered?: number
  required?: number
  tone?: "cyan" | "emerald" | "amber" | "rose" | "violet"
}) {
  const { icon, label, score, total, answered, required, tone = "cyan" } = props
  
  const tones = {
    cyan: "text-cyan-400 bg-cyan-400/20 border-cyan-400/30",
    emerald: "text-emerald-400 bg-emerald-400/20 border-emerald-400/30",
    amber: "text-amber-400 bg-amber-400/20 border-amber-400/30",
    rose: "text-rose-400 bg-rose-400/20 border-rose-400/30",
    violet: "text-violet-400 bg-violet-400/20 border-violet-400/30",
  }
  
  return (
    <div className={`flex items-center justify-between rounded-xl border p-3 sm:p-4 mb-4 backdrop-blur-md ${tones[tone]}`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl sm:text-3xl">{icon}</span>
        <span className="text-sm sm:text-base font-bold text-white">{label}</span>
      </div>
      {(score !== undefined && total !== undefined) && (
        <div className="text-right">
          <span className="text-lg sm:text-xl font-black text-white">{score}</span>
          <span className="text-sm text-slate-300"> / {total}</span>
        </div>
      )}
      {(answered !== undefined && required !== undefined) && (
        <div className="text-right">
          <span className="text-lg sm:text-xl font-black text-white">{answered}</span>
          <span className="text-sm text-slate-300"> / {required}</span>
        </div>
      )}
    </div>
  )
}
INNEREOF
sed -i '/function ProgressCard(props: {/,+10c\
//REPLACED_PROGRESS_CARD\
' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_PROGRESS_CARD/r temp_progress.tsx' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_PROGRESS_CARD/d' src/features/activities/activityShared.tsx
rm temp_progress.tsx
