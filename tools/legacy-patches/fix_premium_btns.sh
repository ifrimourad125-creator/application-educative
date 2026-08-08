cat << 'INNEREOF' > temp_btns.tsx
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
      className={`group relative inline-flex items-center gap-1.5 px-2 py-1.5 active:scale-95 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer shrink-0 ${className}`}
    >
      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap">
        {label}
      </span>
    </button>
  )
}

function PremiumLevelButton({
  onClick,
  label = "Niveau / semestre",
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
      className={`group relative inline-flex items-center gap-1.5 px-2 py-1.5 active:scale-95 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer shrink-0 ${className}`}
    >
      <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap">
        {displayLabel}
      </span>
    </button>
  )
}

export { PremiumBackButton, PremiumLevelButton }
INNEREOF
cat temp_btns.tsx > src/components/PremiumNavButtons.tsx
rm temp_btns.tsx
