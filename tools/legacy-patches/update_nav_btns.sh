cat << 'INNEREOF' > src/components/PremiumNavButtons.tsx
import React from "react"
import { ArrowLeft, Layers } from "lucide-react"
import { playSound } from "../utils/sound"

type PremiumNavButtonProps = {
  onClick: () => void
  label?: string
  className?: string
}

function PremiumBackButton({ onClick, label = "Retour", className = "" }: PremiumNavButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        playSound("back")
        onClick()
      }}
      className={`group relative inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 active:scale-95 text-white border border-sky-500/40 shadow-lg shadow-sky-900/20 backdrop-blur-xl transition-all duration-300 cursor-pointer shrink-0 ${className}`}
    >
      <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-sm group-hover:scale-110 transition-transform duration-300">
        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </div>
      <span className="text-sm sm:text-base font-bold tracking-wide whitespace-nowrap">
        {label}
      </span>
    </button>
  )
}

function PremiumLevelButton({
  onClick,
  label = "Niveau",
  className = "",
}: PremiumNavButtonProps) {
  const displayLabel = label.includes("/") ? "Niveau" : label
  return (
    <button
      type="button"
      onClick={() => {
        playSound("back")
        onClick()
      }}
      className={`group relative inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 active:scale-95 text-white border border-purple-500/40 shadow-lg shadow-purple-900/20 backdrop-blur-xl transition-all duration-300 cursor-pointer shrink-0 ${className}`}
    >
      <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-purple-400 to-fuchsia-600 text-white shadow-sm group-hover:scale-110 transition-transform duration-300">
        <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </div>
      <span className="text-sm sm:text-base font-bold tracking-wide whitespace-nowrap">
        {displayLabel}
      </span>
    </button>
  )
}

export { PremiumBackButton, PremiumLevelButton }
INNEREOF
