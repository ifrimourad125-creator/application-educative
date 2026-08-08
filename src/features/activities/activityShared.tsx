import React, { Component, useEffect, useRef, useState } from "react"
import type { ErrorInfo, ReactElement, ReactNode } from "react"
import { ArrowLeft, Layers, RotateCcw, Gamepad2, Play, Pause, Square } from "lucide-react"
import { PremiumBackButton, PremiumLevelButton } from "../../components/PremiumNavButtons"
import { playAnswerFeedback, playSound } from "../../utils/sound"
import {
  asArray,
  asText,
  cardAccent,
  normalizeQuestion,
  stableShuffleChoices,
  uniqueTexts,
} from "./activityUtils"
import type { PedagogicalQuestion } from "./activityUtils"

export const TONE_GRADIENTS: Record<string, string> = {
  cyan: "bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700",
  emerald: "bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700",
  amber: "bg-gradient-to-r from-amber-500 via-orange-500 to-orange-700",
  rose: "bg-gradient-to-r from-rose-500 via-pink-600 to-rose-800",
  violet: "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700",
  orange: "bg-gradient-to-r from-orange-500 via-orange-600 to-red-600",
  sky: "bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600",
  fuchsia: "bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-600",
  indigo: "bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-700",
};
export const TONE_BORDERS: Record<string, string> = {
  cyan: "border-cyan-300/50",
  emerald: "border-emerald-300/50",
  amber: "border-amber-300/50",
  rose: "border-rose-300/50",
  violet: "border-violet-300/50",
  orange: "border-orange-300/50",
  sky: "border-sky-300/50",
  fuchsia: "border-fuchsia-300/50",
  indigo: "border-indigo-300/50",
};

class ActivityErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.props = props
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Activity rendering error", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Panel>
          <h1 className="premium-heading mb-4 text-4xl font-black text-white">
            Activité à vérifier
          </h1>
          <p className="text-xl font-semibold leading-relaxed text-white/82">
            Le contenu de cette activité doit être complété ou corrigé. La page reste ouverte pour
            éviter l'écran noir.
          </p>
        </Panel>
      )
    }

    return this.props.children
  }
}
const pageBackgrounds: Record<string, string> = {

  emerald: "bg-[radial-gradient(circle_at_11%_8%,_rgba(45,212,191,0.28),_transparent_30%),radial-gradient(circle_at_88%_16%,_rgba(16,185,129,0.24),_transparent_31%),radial-gradient(circle_at_52%_98%,_rgba(52,211,153,0.14),_transparent_36%),linear-gradient(135deg,_#064e3b_0%,_#065f46_46%,_#022c22_100%)]",
  cyan: "bg-[radial-gradient(circle_at_9%_6%,_rgba(56,189,248,0.45),_transparent_28%),radial-gradient(circle_at_91%_14%,_rgba(14,165,233,0.30),_transparent_30%),radial-gradient(circle_at_52%_96%,_rgba(45,212,191,0.22),_transparent_34%),linear-gradient(135deg,_#04162f_0%,_#0b3567_48%,_#061a39_100%)]",
  sky: "bg-[radial-gradient(circle_at_8%_8%,_rgba(56,189,248,0.34),_transparent_30%),radial-gradient(circle_at_90%_15%,_rgba(2,132,199,0.22),_transparent_31%),radial-gradient(circle_at_48%_98%,_rgba(14,165,233,0.18),_transparent_36%),linear-gradient(135deg,_#061a2f_0%,_#0f3b57_46%,_#22145f_100%)]",
  amber: "bg-[radial-gradient(circle_at_11%_9%,_rgba(251,146,60,0.42),_transparent_30%),radial-gradient(circle_at_91%_14%,_rgba(250,204,21,0.30),_transparent_30%),radial-gradient(circle_at_52%_98%,_rgba(245,158,11,0.20),_transparent_35%),linear-gradient(135deg,_#1f1303_0%,_#7c2d12_42%,_#064e3b_100%)]",
  rose: "bg-[radial-gradient(circle_at_10%_10%,_rgba(251,113,133,0.42),_transparent_29%),radial-gradient(circle_at_88%_12%,_rgba(244,63,94,0.36),_transparent_31%),radial-gradient(circle_at_50%_100%,_rgba(225,29,72,0.20),_transparent_35%),linear-gradient(135deg,_#2c0718_0%,_#7f1d1d_45%,_#1e1b4b_100%)]",
  fuchsia: "bg-[radial-gradient(circle_at_12%_10%,_rgba(168,85,247,0.44),_transparent_30%),radial-gradient(circle_at_88%_18%,_rgba(236,72,153,0.34),_transparent_30%),radial-gradient(circle_at_50%_98%,_rgba(217,70,239,0.20),_transparent_36%),linear-gradient(135deg,_#160b36_0%,_#34156b_46%,_#071d3d_100%)]",
  orange: "bg-[radial-gradient(circle_at_10%_8%,_rgba(251,146,60,0.28),_transparent_30%),radial-gradient(circle_at_88%_14%,_rgba(249,115,22,0.24),_transparent_31%),radial-gradient(circle_at_50%_98%,_rgba(234,88,12,0.16),_transparent_35%),linear-gradient(135deg,_#120b2a_0%,_#431407_46%,_#1f1303_100%)]",
  violet: "bg-[radial-gradient(circle_at_10%_8%,_rgba(168,85,247,0.42),_transparent_29%),radial-gradient(circle_at_90%_14%,_rgba(139,92,246,0.36),_transparent_31%),radial-gradient(circle_at_50%_100%,_rgba(124,58,237,0.22),_transparent_35%),linear-gradient(135deg,_#1e1b4b_0%,_#4c1d95_42%,_#1e1b4b_100%)]",
  indigo: "bg-[radial-gradient(circle_at_10%_8%,_rgba(129,140,248,0.42),_transparent_29%),radial-gradient(circle_at_90%_14%,_rgba(99,102,241,0.36),_transparent_31%),radial-gradient(circle_at_50%_100%,_rgba(79,70,229,0.22),_transparent_35%),linear-gradient(135deg,_#0f172a_0%,_#312e81_42%,_#0f172a_100%)]",
};

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
  tone?: string
}) {
  return (
    <div
      className={`

      flex-1 w-full min-h-full
      overflow-x-hidden
      bg-slate-950
      text-white
      px-2.5
      py-2.5
      sm:px-5
      sm:py-5
      pb-4
      sm:pb-6
      flex
      flex-col
      justify-between
    `}
    >

      {/* Mobile Top Navigation Bar - Static (Scrolls naturally) */}
      <div className="relative z-50 -mx-2.5 sm:-mx-5 mt-0 px-2.5 sm:px-5 py-3 sm:py-4 flex items-center justify-center bg-transparent border-b-0">
        <div className="flex items-center justify-between w-full max-w-3xl">
          <div className="flex items-center gap-2 shrink-0 min-w-0">
            <PremiumBackButton onClick={onBack} label="Retour" />
            {onBackToLevel && <PremiumLevelButton onClick={onBackToLevel} label="Niveau" />}
          <div className={`inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white border shadow-lg backdrop-blur-xl shrink-0 ${TONE_BORDERS[tone || "cyan"]}`}>
            <div className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-white shadow-sm mr-2 ${TONE_GRADIENTS[tone || "cyan"]}`}>
              <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <span className="text-sm sm:text-base font-bold tracking-wide whitespace-nowrap">Activité {activityId}</span>
          </div>

          </div>
        </div>
      </div>


      <div className="relative z-10 mx-auto max-w-3xl w-full min-w-0">
        <div className="activity-detail-content min-w-0 w-full pt-1 sm:pt-2">
          {children}
        </div>
      </div>
    </div>
  )
}
function Empty({ message }: { message: string }) {
  const bgStyles = {
    cyan: "bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700",
    emerald: "bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700",
    amber: "bg-gradient-to-r from-amber-500 via-orange-500 to-orange-700",
    rose: "bg-gradient-to-r from-rose-500 via-pink-600 to-rose-800",
    violet: "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700",
    orange: "bg-gradient-to-r from-orange-500 via-orange-600 to-red-600",
  }
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
  tone?: string
}) {
  return (
    <div
      className={`
      relative
      mb-3.5
      overflow-hidden
      rounded-2xl
      border
      ${TONE_BORDERS[tone]} ${TONE_GRADIENTS[tone]}
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
            <span className="text-5xl sm:text-6xl leading-none select-none flex items-center justify-center transform hover:scale-105 transition-transform duration-200">
              {icon}
            </span>
          </div>
          <div className="min-w-0 w-full flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight break-words mb-2 drop-shadow-md">
              {title}
            </h1>
            <p className="text-base sm:text-lg font-bold leading-relaxed text-white/95 break-words text-center">
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
            text-sm
            sm:text-base
            text-justify
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
  tone?: string
}) {
  const bgStyles = {
    cyan: "bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700",
    emerald: "bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700",
    amber: "bg-gradient-to-r from-amber-500 via-orange-500 to-orange-700",
    rose: "bg-gradient-to-r from-rose-500 via-pink-600 to-rose-800",
    violet: "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700",
    orange: "bg-gradient-to-r from-orange-500 via-orange-600 to-red-600",
  }
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


function Panel({ children, className = "" }: { children: ReactNode; className?: string; key?: React.Key }) {
  const bgStyles = {
    cyan: "bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700",
    emerald: "bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700",
    amber: "bg-gradient-to-r from-amber-500 via-orange-500 to-orange-700",
    rose: "bg-gradient-to-r from-rose-500 via-pink-600 to-rose-800",
    violet: "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700",
    orange: "bg-gradient-to-r from-orange-500 via-orange-600 to-red-600",
  }
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
  const bgStyles = {
    cyan: "bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700",
    emerald: "bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700",
    amber: "bg-gradient-to-r from-amber-500 via-orange-500 to-orange-700",
    rose: "bg-gradient-to-r from-rose-500 via-pink-600 to-rose-800",
    violet: "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700",
    orange: "bg-gradient-to-r from-orange-500 via-orange-600 to-red-600",
  }
  return (
    <h2 className="mb-2.5 flex items-center gap-2 text-sm sm:text-base text-justify font-extrabold text-white uppercase tracking-wider">
      <span
        className="h-3.5 w-1 rounded-full bg-cyan-400 shadow-sm shadow-cyan-500/50"
        aria-hidden="true"
      />
      {children}
    </h2>
  )
}

function TextBlock({ text }: { text?: string }) {
  const bgStyles = {
    cyan: "bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700",
    emerald: "bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700",
    amber: "bg-gradient-to-r from-amber-500 via-orange-500 to-orange-700",
    rose: "bg-gradient-to-r from-rose-500 via-pink-600 to-rose-800",
    violet: "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700",
    orange: "bg-gradient-to-r from-orange-500 via-orange-600 to-red-600",
  }
  const safeText = text || "Contenu à compléter."
    <Panel>
  return (
    <div className="space-y-2.5 text-justify [text-justify:inter-word] hyphens-auto text-sm sm:text-base text-justify leading-relaxed text-slate-200 font-normal break-words">
      {safeText.split("\n\n").map((paragraph: string, index: number) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}

function ChoiceButton({
  option,
  selected,
  correct,
  onClick,
}: {
  key?: React.Key
  option: string
  selected?: string
  correct: string
  onClick: () => void
}) {
  const bgStyles = {
    cyan: "bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700",
    emerald: "bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700",
    amber: "bg-gradient-to-r from-amber-500 via-orange-500 to-orange-700",
    rose: "bg-gradient-to-r from-rose-500 via-pink-600 to-rose-800",
    violet: "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700",
    orange: "bg-gradient-to-r from-orange-500 via-orange-600 to-red-600",
  }
  const answered = selected !== undefined
  const isSelected = selected === option
  const isCorrect = option === correct

  let style =
    "bg-slate-900/90 border-2 border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.25)] text-slate-100 hover:border-cyan-400/80 hover:bg-slate-800/90 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all"

  if (answered && isSelected && isCorrect) {
    style = "bg-gradient-to-r from-emerald-400 to-green-400 border-emerald-300 text-slate-900 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] font-bold scale-[1.02]"
  } else if (answered && isSelected && !isCorrect) {
    style = "bg-gradient-to-r from-rose-600 to-red-500 border-rose-400 text-white hover:shadow-[0_0_20px_rgba(225,29,72,0.6)] font-bold scale-[1.02]"
  } else if (answered && isCorrect) {
    style = "bg-gradient-to-r from-emerald-400 to-green-400 border-emerald-300 text-slate-900 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] font-bold scale-[1.02]"
  } else if (answered) {
    style = "bg-slate-950/60 border-slate-800/80 text-slate-500 shadow-none opacity-50"
  }

  return (
    <button
      type="button"
      disabled={answered}
      onClick={() => {
        playAnswerFeedback(isCorrect)
        onClick()
      }}
      className={`
        w-full
        rounded-xl
        border
        px-3
        py-2.5
        text-center
        text-sm
        sm:text-base
        font-medium
        leading-snug
        shadow-sm
        transition-all
        active:scale-[0.98]
        disabled:cursor-default
        ${style}
      `}
    >
      {answered && isSelected && isCorrect && <span className="font-bold mr-1">✓</span>}
      {answered && isSelected && !isCorrect && <span className="font-bold mr-1">✕</span>}
      {answered && !isSelected && isCorrect && <span className="font-bold mr-1">✓</span>}
      {option}
    </button>
  )
}


function getScoreFeedback(percentage: number, hasScore: boolean) {
  if (!hasScore) {
    return {
      icon: "✨",
      title: "Activité terminée",
      message:
        "Ton travail est enregistré. Relis ton texte, améliore-le si nécessaire, puis continue ton entraînement.",
    }
  }

  if (percentage === 100) {
    return {
      icon: "🏆",
      title: "Parfait",
      message: "Parfait ! Tu as tout réussi. Tu maîtrises très bien cette activité.",
    }
  }

  if (percentage >= 80) {
    return {
      icon: "🌟",
      title: "Très bien",
      message:
        "Très bon travail ! Tu as bien compris l’essentiel. Relis seulement les réponses corrigées pour consolider tes acquis.",
    }
  }

  if (percentage >= 60) {
    return {
      icon: "🎯",
      title: "Bien",
      message:
        "Bon résultat. Tu avances dans la bonne direction, mais quelques points doivent encore être revus attentivement.",
    }
  }

  if (percentage >= 40) {
    return {
      icon: "💪",
      title: "À renforcer",
      message:
        "Résultat moyen. Revois les consignes et les réponses corrigées, puis recommence l’activité pour progresser.",
    }
  }

  return {
    icon: "🔁",
    title: "À reprendre",
    message:
      "Ce n’est pas grave. Reprends calmement l’activité depuis le début\u00A0: lis bien chaque consigne et observe les corrections.",
  }
}

function FinalPage({
  icon,
  score,
  total,
  message,
  onRestart,
  onBack,
  onBackToLevel,
}: {
  icon: string
  score?: number
  total?: number
  message: string
  onRestart: () => void
  onBack: () => void
  onBackToLevel: () => void
}) {
  const bgStyles = {
    cyan: "bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700",
    emerald: "bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700",
    amber: "bg-gradient-to-r from-amber-500 via-orange-500 to-orange-700",
    rose: "bg-gradient-to-r from-rose-500 via-pink-600 to-rose-800",
    violet: "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700",
    orange: "bg-gradient-to-r from-orange-500 via-orange-600 to-red-600",
  }
  const hasScore = score !== undefined && total !== undefined && total > 0
  const percentage = hasScore ? Math.round(((score ?? 0) / (total ?? 1)) * 100) : 0
  const feedback = getScoreFeedback(percentage, hasScore)
  const finalMessage = hasScore ? feedback.message : message

  return (
    <div className="premium-final-page min-h-[58vh] flex items-center justify-center py-6 md:py-8">
      <div className="premium-final-card relative w-full max-w-[760px] overflow-hidden rounded-[34px] border-2 border-emerald-100/30 bg-gradient-to-br from-emerald-400/16 via-cyan-400/12 to-fuchsia-500/14 p-6 text-center shadow-2xl shadow-emerald-950/24 backdrop-blur-2xl md:p-7">
        <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-emerald-300/25 blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-52 w-52 rounded-full bg-fuchsia-400/20 blur-3xl" />

        <div className="relative z-10">
          <div className="premium-final-icon mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-[30px] border-2 border-white/30 bg-white/16 text-6xl shadow-2xl shadow-black/18">
            {icon}
          </div>

          <p className="premium-final-title mb-3 text-sm font-black uppercase tracking-[0.32em] text-emerald-100">
            Résultat final
          </p>

          {score !== undefined && total !== undefined && (
            <div className="premium-final-stats mb-6 grid gap-5 md:grid-cols-3">
              {/* SCORE */}
              <div className="relative overflow-hidden premium-final-stat premium-final-stat--score rounded-[24px] border border-white/15 bg-white/[0.03] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_0_30px_rgba(34,211,238,0.2),0_0_30px_rgba(34,211,238,0.3)] backdrop-blur-md">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-40 pointer-events-none" />
                <div className="absolute -inset-4 bg-cyan-500/20 blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-3 flex items-center justify-center">
                    <span className="text-4xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]" aria-hidden="true">🏆</span>
                  </div>
                  <p className="premium-final-label text-sm font-black uppercase tracking-[0.22em] text-cyan-200 drop-shadow-sm">
                    Score
                  </p>
                  <p className="premium-final-value mt-1 text-3xl font-black text-white drop-shadow-md">
                    {score} / {total}
                  </p>
                </div>
              </div>

              {/* RÉUSSITE */}
              <div className="relative overflow-hidden premium-final-stat premium-final-stat--success rounded-[24px] border border-white/15 bg-white/[0.03] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_0_30px_rgba(139,92,246,0.2),0_0_30px_rgba(139,92,246,0.3)] backdrop-blur-md">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-40 pointer-events-none" />
                <div className="absolute -inset-4 bg-violet-500/20 blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-3 flex items-center justify-center">
                    <span className="text-4xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]" aria-hidden="true">🎯</span>
                  </div>
                  <p className="premium-final-label text-sm font-black uppercase tracking-[0.22em] text-violet-200 drop-shadow-sm">
                    Réussite
                  </p>
                  <p className="premium-final-value mt-1 text-3xl font-black text-white drop-shadow-md">{percentage}%</p>
                </div>
              </div>

              {/* APPRÉCIATION */}
              <div className="relative overflow-hidden premium-final-stat premium-final-stat--appreciation rounded-[24px] border border-white/15 bg-white/[0.03] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_0_30px_rgba(245,158,11,0.2),0_0_30px_rgba(245,158,11,0.3)] backdrop-blur-md">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-40 pointer-events-none" />
                <div className="absolute -inset-4 bg-amber-500/20 blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-3 flex items-center justify-center">
                    <span className="text-4xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]" aria-hidden="true">{feedback.icon}</span>
                  </div>
                  <p className="premium-final-label text-sm font-black uppercase tracking-[0.22em] text-amber-200 drop-shadow-sm">
                    Appréciation
                  </p>
                  <p className="premium-final-value mt-1 text-xl font-black text-white drop-shadow-md">
                    {feedback.title}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="relative overflow-hidden premium-final-message mb-8 rounded-[24px] border border-white/40 bg-gradient-to-br from-slate-800/80 to-slate-900/90 p-10 sm:p-12 shadow-[0_0_25px_rgba(255,255,255,0.15)] backdrop-blur-md">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
            <div className="absolute -inset-4 bg-white/5 blur-2xl rounded-full pointer-events-none" />
            <div className="relative z-10">
              <p className="text-[1.15rem] md:text-[1.35rem] font-bold leading-[1.8] text-white drop-shadow-md">
                {finalMessage}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mt-8 w-full">
            <button
              onClick={() => {
                playSound("answerClick")
                onRestart()
              }}
              className="group relative flex items-center justify-center gap-3 w-[85%] max-w-[280px] sm:w-auto sm:max-w-none min-w-[200px] px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 hover:from-blue-400 hover:via-sky-400 hover:to-cyan-400 text-white font-black text-sm sm:text-base uppercase tracking-wider shadow-[0_8px_30px_rgba(6,182,212,0.4)] border-2 border-cyan-300 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <RotateCcw className="w-6 h-6 group-hover:-rotate-180 transition-transform duration-500" />
              <span>Revoir l'activité</span>
            </button>

            <button
              onClick={() => {
                playSound("back")
                onBack()
              }}
              className="group relative flex items-center justify-center gap-3 w-[85%] max-w-[280px] sm:w-auto sm:max-w-none min-w-[200px] px-5 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-400 hover:via-amber-400 hover:to-yellow-400 text-white font-black text-sm sm:text-base uppercase tracking-wider shadow-[0_8px_30px_rgba(245,158,11,0.4)] border-2 border-amber-300 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Retour</span>
            </button>

            <button
              onClick={() => {
                playSound("back")
                onBackToLevel()
              }}
              className="group relative flex items-center justify-center gap-3 w-[85%] max-w-[280px] sm:w-auto sm:max-w-none min-w-[200px] px-5 py-2.5 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500 hover:from-fuchsia-400 hover:via-purple-400 hover:to-pink-400 text-white font-black text-sm sm:text-base uppercase tracking-wider shadow-[0_8px_30px_rgba(217,70,239,0.4)] border-2 border-fuchsia-300 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Layers className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span>Niveau</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AudioPlayer({
  title,
  src,
  script,
  image,
  imageAlt,
  source,
}: {
  title: string
  src?: string
  script?: string
  image?: string
  imageAlt?: string
  source?: string
}) {
  const bgStyles = {
    cyan: "bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700",
    emerald: "bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700",
    amber: "bg-gradient-to-r from-amber-500 via-orange-500 to-orange-700",
    rose: "bg-gradient-to-r from-rose-500 via-pink-600 to-rose-800",
    violet: "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700",
    orange: "bg-gradient-to-r from-orange-500 via-orange-600 to-red-600",
  }
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const playPromiseRef = useRef<Promise<void> | null>(null)
  const synthUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const synthTimerRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [spectrum, setSpectrum] = useState<number[]>([])
  const [audioError, setAudioError] = useState(false)
  const useTTS = !src || audioError
  
  const guidedSegments = script ? splitGuidedScript(script) : []
  const activeSegment = getActiveGuidedSegment(guidedSegments, currentTime, duration)

  const stopSpectrumLoop = () => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
  }

  const startSpectrumLoop = () => {
    if (useTTS) return // no spectrum for TTS
    const analyser = analyserRef.current
    if (!analyser) return

    const rawData = new Uint8Array(analyser.frequencyBinCount)
    const tick = () => {
      analyser.getByteFrequencyData(rawData)
      const barCount = 48
      const groupSize = Math.max(1, Math.floor(rawData.length / barCount))
      const nextSpectrum = Array.from({ length: barCount }, (_, index) => {
        const start = index * groupSize
        const end = Math.min(start + groupSize, rawData.length)
        let sum = 0

        for (let cursor = start; cursor < end; cursor += 1) {
          sum += rawData[cursor]
        }

        return Math.round(sum / Math.max(end - start, 1))
      })

      setSpectrum(nextSpectrum)
      animationFrameRef.current = window.requestAnimationFrame(tick)
    }

    tick()
  }

  const prepareAudioAnalysis = async () => {
    if (useTTS) return
    const audio = audioRef.current
    if (!audio) return

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext
      if (!AudioContextClass) return

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass()
      }

      const context = audioContextRef.current
      if (context.state === "suspended") {
        await context.resume()
      }

      if (!analyserRef.current) {
        const analyser = context.createAnalyser()
        analyser.fftSize = 128
        analyser.smoothingTimeConstant = 0.72
        analyserRef.current = analyser
      }

      if (!sourceRef.current) {
        sourceRef.current = context.createMediaElementSource(audio)
        sourceRef.current.connect(analyserRef.current)
        analyserRef.current.connect(context.destination)
      }
    } catch {
      analyserRef.current = null
    }
  }
  
  useEffect(() => {
    if (useTTS && script && ('speechSynthesis' in window)) {
      const u = new SpeechSynthesisUtterance(script)
      u.lang = 'fr-FR'
      u.rate = 0.92 // slightly slower for better comprehension
      u.pitch = 1.05 // slightly higher pitch for a more natural feel

      const setBestVoice = () => {
        const voices = window.speechSynthesis.getVoices()
        const frVoices = voices.filter(v => v.lang.startsWith('fr-') || v.lang === 'fr')
        let bestVoice = frVoices.find(v => 
          v.name.includes('Google') || 
          v.name.includes('Premium') || 
          v.name.includes('Natural') ||
          v.name.includes('Thomas') ||
          v.name.includes('Audrey') ||
          v.name.includes('Aurelie') ||
          v.name.includes('Microsoft Hortense') ||
          v.name.includes('Microsoft Paul')
        )
        if (!bestVoice && frVoices.length > 0) {
          bestVoice = frVoices.sort((a, b) => {
            // Prefer local voices if no premium found
            if (a.localService && !b.localService) return -1
            if (!a.localService && b.localService) return 1
            return 0
          })[0]
        }
        if (bestVoice) {
          u.voice = bestVoice
        }
      }
      
      setBestVoice()
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', setBestVoice, { once: true })
      }
      
      const estDuration = Math.max(1, script.length / 15)
      setDuration(estDuration)
      
      u.onend = () => {
        setIsPlaying(false)
        setCurrentTime(estDuration)
        if (synthTimerRef.current) window.clearInterval(synthTimerRef.current)
      }
      u.onerror = () => {
        setIsPlaying(false)
        if (synthTimerRef.current) window.clearInterval(synthTimerRef.current)
      }
      
      synthUtteranceRef.current = u
    }
    
    return () => {
      stopSpectrumLoop()
      audioContextRef.current?.close().catch(() => {})
      if (synthTimerRef.current) window.clearInterval(synthTimerRef.current)
      if ('speechSynthesis' in window) {
         window.speechSynthesis.cancel()
      }
    }
  }, [useTTS, script])

  const playAudio = () => {
    if (useTTS) {
      if ('speechSynthesis' in window && synthUtteranceRef.current) {
        if (window.speechSynthesis.paused) {
           window.speechSynthesis.resume()
        } else {
           window.speechSynthesis.cancel() // clear queue
           window.speechSynthesis.speak(synthUtteranceRef.current)
           setCurrentTime(0)
        }
        setIsPlaying(true)
        setHasStarted(true)
        
        if (synthTimerRef.current) window.clearInterval(synthTimerRef.current)
        synthTimerRef.current = window.setInterval(() => {
           setCurrentTime(prev => {
             const estDuration = Math.max(1, (script || '').length / 15)
             if (prev >= estDuration) return estDuration
             return prev + 0.1
           })
        }, 100)
      }
      return
    }
    
    const audio = audioRef.current
    if (!audio) return
    prepareAudioAnalysis().finally(() => startSpectrumLoop())
    const promise = audio.play()
    if (promise !== undefined) {
      playPromiseRef.current = promise
      promise.catch(error => {
        console.error("Audio playback error:", error)
        setAudioError(true)
      }).finally(() => {
        playPromiseRef.current = null
      })
    }
    setIsPlaying(true)
    setHasStarted(true)
  }

  const pauseAudio = () => {
    if (useTTS) {
       if ('speechSynthesis' in window) window.speechSynthesis.pause()
       setIsPlaying(false)
       if (synthTimerRef.current) window.clearInterval(synthTimerRef.current)
       return
    }
    const audio = audioRef.current
    if (!audio) return
    if (playPromiseRef.current !== null) {
      playPromiseRef.current.then(() => {
        audio.pause()
      }).catch(() => {})
    } else {
      audio.pause()
    }
    stopSpectrumLoop()
    setIsPlaying(false)
  }

  const replayAudio = () => {
    if (useTTS) {
       if ('speechSynthesis' in window && synthUtteranceRef.current) {
          window.speechSynthesis.cancel()
          window.speechSynthesis.speak(synthUtteranceRef.current)
          setCurrentTime(0)
          setIsPlaying(true)
          setHasStarted(true)
          if (synthTimerRef.current) window.clearInterval(synthTimerRef.current)
          synthTimerRef.current = window.setInterval(() => {
             setCurrentTime(prev => {
               const estDuration = Math.max(1, (script || '').length / 15)
               if (prev >= estDuration) return estDuration
               return prev + 0.1
             })
          }, 100)
       }
       return
    }
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = 0
    prepareAudioAnalysis().finally(() => startSpectrumLoop())
    const promise = audio.play()
    if (promise !== undefined) {
      playPromiseRef.current = promise
      promise.catch(error => {
        console.error("Audio replay error:", error)
        setAudioError(true)
      }).finally(() => {
        playPromiseRef.current = null
      })
    }
    setIsPlaying(true)
    setHasStarted(true)
  }

  const stopAudio = () => {
    if (useTTS) {
       if ('speechSynthesis' in window) window.speechSynthesis.cancel()
       setIsPlaying(false)
       setCurrentTime(0)
       if (synthTimerRef.current) window.clearInterval(synthTimerRef.current)
       return
    }
    const audio = audioRef.current
    if (!audio) return
    if (playPromiseRef.current !== null) {
      playPromiseRef.current.then(() => {
        audio.pause()
        audio.currentTime = 0
        setCurrentTime(0)
      }).catch(() => {})
    } else {
      audio.pause()
      audio.currentTime = 0
      setCurrentTime(0)
    }
    stopSpectrumLoop()
    setIsPlaying(false)
  }

  return (
    <Panel className="border-pink-500/30 bg-slate-900 shadow-xl">
      <SectionTitle>Document sonore et support d'écoute</SectionTitle>
      
      {/* Illustrative High-Quality Image Box */}
      {image && (
        <div className="relative w-full overflow-hidden rounded-2xl border border-cyan-400/40 bg-slate-950/90 p-2 sm:p-3 shadow-xl hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] transition-all duration-300 flex flex-col justify-center items-center group mb-4">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-pink-500/10 blur-xl pointer-events-none" />
          
          <div className="relative z-10 w-full overflow-hidden rounded-xl border border-slate-700/60 shadow-lg bg-slate-900/50">
            <img
              src={image}
              alt={imageAlt || title || "Support d'écoute audio"}
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-72 sm:max-h-[380px] object-cover rounded-xl group-hover:scale-[1.01] transition-transform duration-300"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
              <span className="text-cyan-400 text-sm">🎧</span>
              <span className="text-[11px] font-bold text-cyan-200 uppercase tracking-wider">Illustration de l'écoute</span>
            </div>
          </div>
        </div>
      )}
      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-slate-950/80 p-4 shadow-xl mb-4">
        <div className="relative z-10 grid gap-4">
          {/* Audio Player Controls */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-3.5 shadow-md flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="min-w-10 text-sm font-mono font-bold text-slate-300">
                {formatAudioTime(currentTime)}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-lime-400 via-cyan-400 to-sky-400 transition-all duration-300"
                  style={{
                    width: `${duration ? Math.min((currentTime / duration) * 100, 100) : 0}%`,
                  }}
                />
              </div>
              <span className="min-w-10 text-right text-sm font-mono font-bold text-slate-300">
                {formatAudioTime(duration)}
              </span>
            </div>
            
            <VoiceSpectrum
              isPlaying={isPlaying}
              currentTime={currentTime}
              spectrum={useTTS && isPlaying ? Array.from({length: 48}, () => Math.random() * 100) : spectrum}
            />
            
            <div className="flex items-center justify-center gap-4 mt-2">
              <AudioControlButton onClick={playAudio} disabled={isPlaying}>
                <Play className="w-5 h-5 ml-1" />
              </AudioControlButton>
              <AudioControlButton onClick={pauseAudio} disabled={!isPlaying}>
                <Pause className="w-5 h-5" />
              </AudioControlButton>
              <AudioControlButton onClick={replayAudio}>
                <RotateCcw className="w-5 h-5" />
              </AudioControlButton>
              <AudioControlButton onClick={stopAudio}>
                <Square className="w-5 h-5 fill-current" />
              </AudioControlButton>
            </div>

          </div>

              </div>

              <audio
                ref={audioRef}
                src={src}
                preload="metadata"
                className="sr-only"
                onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
                onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime || 0)}
                onEnded={() => {
                  stopSpectrumLoop()
                  setIsPlaying(false)
                }}
                onError={() => {
                  setAudioError(true)
                }}
              >
                {src && (
                  <source src={src} type={src?.endsWith(".mp3") ? "audio/mpeg" : "audio/wav"} />
                )}
                Votre navigateur ne peut pas lire ce fichier audio.
              </audio>
          </div>

          {/* Full Script Block */}
          {script && (
            <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-4 shadow-inner">
              <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/20 text-lg">
                    📄
                  </span>
                  <p className="text-sm font-black text-white">Script Intégral du Document</p>
                </div>
                <span className="text-[10px] sm:text-base
            text-justify font-semibold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Transcription Officielle
                </span>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3.5 text-justify [text-justify:inter-word] text-sm sm:text-base text-justify font-medium leading-relaxed sm:leading-loose text-slate-200 whitespace-pre-line shadow-sm">
                {hasStarted && guidedSegments.length > 0 ? (
                  guidedSegments.map((segment, index) => (
                    <span
                      key={`${segment}-${index}`}
                      className={`mx-0.5 inline rounded px-1 py-0.5 transition duration-150 ${
                        index === activeSegment
                          ? "bg-cyan-500/30 text-white font-bold underline decoration-cyan-400 decoration-2 underline-offset-4"
                          : "text-slate-300"
                      }`}
                    >
                      {segment}
                    </span>
                  ))
                ) : (
                  <div className="text-slate-200">
                    {script}
                  </div>
                )}
              </div>
            </div>
          )}
    </Panel>
  )
}



function AudioControlButton({
  children,
  disabled,
  onClick,
}: {
  children: ReactNode
  disabled?: boolean
  onClick: () => void
}) {
  const bgStyles = {
    cyan: "bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700",
    emerald: "bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700",
    amber: "bg-gradient-to-r from-amber-500 via-orange-500 to-orange-700",
    rose: "bg-gradient-to-r from-rose-500 via-pink-600 to-rose-800",
    violet: "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700",
    orange: "bg-gradient-to-r from-orange-500 via-orange-600 to-red-600",
  }
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        playSound("answerClick")
        onClick()
      }}
      className="rounded-full w-12 h-12 flex items-center justify-center border border-slate-700 bg-slate-800 hover:bg-slate-700 text-lg font-bold text-white shadow transition disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  )
}

function VoiceSpectrum({
  isPlaying,
  currentTime,
  spectrum,
}: {
  isPlaying: boolean
  currentTime: number
  spectrum?: number[]
}) {
  const bgStyles = {
    cyan: "bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700",
    emerald: "bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700",
    amber: "bg-gradient-to-r from-amber-500 via-orange-500 to-orange-700",
    rose: "bg-gradient-to-r from-rose-500 via-pink-600 to-rose-800",
    violet: "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700",
    orange: "bg-gradient-to-r from-orange-500 via-orange-600 to-red-600",
  }
  const bars = spectrum && spectrum.length > 0 ? spectrum : []

  return (
    <div className="mt-3 flex h-12 items-end justify-center gap-[2px] rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2">
      {Array.from({ length: 48 }, (_, index) => {
        const wave = Math.abs(Math.sin(currentTime * 3.8 + index * 0.62))
        const secondWave = Math.abs(Math.cos(currentTime * 2.2 + index * 0.33))
        const realValue = bars[index] ?? 0
        const activeHeight =
          realValue > 0
            ? 6 + Math.round((realValue / 255) * 32)
            : 8 + Math.round((wave * 0.68 + secondWave * 0.32) * 28)
        const idleHeight = 6 + ((index * 5) % 12)
        return (
          <span
            key={index}
            className={`w-0.5 rounded-full transition-all duration-150 ${
              isPlaying
                ? "bg-gradient-to-t from-lime-400 via-cyan-400 to-white"
                : "bg-slate-700"
            }`}
            style={{ height: `${isPlaying ? activeHeight : idleHeight}px` }}
            aria-hidden="true"
          />
        )
      })}
    </div>
  )
}

function formatAudioTime(value: number) {
  if (!Number.isFinite(value)) return "0:00"
  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0")
  return `${minutes}:${seconds}`
}

function splitGuidedScript(script: string) {
  return script
    .split(/\n+|(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
}

function getActiveGuidedSegment(segments: string[], currentTime: number, duration: number) {
  if (!segments.length || !duration) return 0
  const getSegmentWeight = (segment: string) => {
    const words = segment.split(/\s+/).filter(Boolean).length
    const punctuationPause = (segment.match(/[,:;]/g)?.length || 0) * 2
    const sentencePause = (segment.match(/[.!?]/g)?.length || 0) * 4

    return Math.max(words * 6 + punctuationPause + sentencePause, 18)
  }
  const totalWeight = segments.reduce((sum, segment) => sum + getSegmentWeight(segment), 0)
  const progressWeight = Math.min(currentTime / duration, 1) * totalWeight
  let cursor = 0

  for (let index = 0; index < segments.length; index += 1) {
    cursor += getSegmentWeight(segments[index])
    if (progressWeight <= cursor) return index
  }

  return segments.length - 1
}

function QuestionPanel({
  title,
  questions,
  answers,
  setAnswers,
  offset = 0,
  onAnswered,
}: {
  title: string
  questions: unknown[]
  answers: Record<string, string>
  setAnswers: (answers: Record<string, string>) => void
  offset?: number
  onAnswered?: (nextAnswers: Record<string, string>) => void
}) {
  const bgStyles = {
    cyan: "bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700",
    emerald: "bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700",
    amber: "bg-gradient-to-r from-amber-500 via-orange-500 to-orange-700",
    rose: "bg-gradient-to-r from-rose-500 via-pink-600 to-rose-800",
    violet: "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700",
    orange: "bg-gradient-to-r from-orange-500 via-orange-600 to-red-600",
  }
  const safeQuestions = asArray<unknown>(questions).map(normalizeQuestion)

  return (
    <Panel>
      <SectionTitle>{title}</SectionTitle>
      <p className="text-sm sm:text-base text-justify text-slate-300 mb-4 font-medium">
        Clique sur la bonne réponse pour chaque question.
      </p>
      <div className="grid gap-3">
        {safeQuestions.map((question: PedagogicalQuestion, index: number) => {
          const key = String(index + offset)
          return (
            <div
              key={`${question.question}-${index}`}
              className={`rounded-xl border p-3 sm:p-3.5 shadow-sm ${cardAccent(index + offset)}`}
            >
              <p className="text-sm sm:text-base text-justify font-bold mb-2.5 whitespace-pre-line leading-relaxed text-white break-words text-justify [text-justify:inter-word]">
                {index + 1}. {question.question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {stableShuffleChoices<string>(
                  question.options,
                  question.answer,
                  `question-${key}-${question.question}`
                ).map((option: string) => (
                  <ChoiceButton
                    key={option}
                    option={option}
                    selected={answers[key]}
                    correct={question.answer}
                    onClick={() => {
                      const nextAnswers = {
                        ...answers,
                        [key]: option,
                      }
                      setAnswers(nextAnswers)
                      onAnswered?.(nextAnswers)
                    }}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}

function GuidedProduction({
  data,
  text,
  setText,
  showCorrection,
  setShowCorrection,
  mode,
}: {
  data: {
    plan?: unknown
    expressions?: unknown
    words?: unknown
    length?: string
    correction?: string
  }
  text: string
  setText: (text: string) => void
  showCorrection: boolean
  setShowCorrection: (show: boolean) => void
  mode: string
}) {
  const bgStyles = {
    cyan: "bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700",
    emerald: "bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700",
    amber: "bg-gradient-to-r from-amber-500 via-orange-500 to-orange-700",
    rose: "bg-gradient-to-r from-rose-500 via-pink-600 to-rose-800",
    violet: "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700",
    orange: "bg-gradient-to-r from-orange-500 via-orange-600 to-red-600",
  }
  const plan = asArray<string>(data?.plan)
  const expressionBank = uniqueTexts([
    ...asArray<string>(data?.expressions),
    ...asArray<string>(data?.words),
  ])

  return (
    <>
      <Panel>
        <SectionTitle>Plan guidé</SectionTitle>
        <div className="grid gap-2.5">
          {plan.map((item: string, index: number) => (
            <div
              key={item}
              className={`rounded-2xl border p-3.5 text-sm sm:text-base text-justify leading-relaxed shadow-md ${cardAccent(index)}`}
            >
              {item.includes(":") ? (
                <>
                  <strong className="text-white">{item.split(":")[0]}&nbsp;:</strong>
                  {item.slice(item.indexOf(":") + 1)}
                </>
              ) : (
                item
              )}
            </div>
          ))}
        </div>
      </Panel>
      <Panel>
        <SectionTitle>Banque d'expressions utiles</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {expressionBank.map((item: string) => (
            <span
              key={item}
              className="rounded-xl bg-cyan-500/15 border border-cyan-400/30 px-3 py-1.5 text-sm font-bold text-cyan-200"
            >
              {item}
            </span>
          ))}
        </div>
        <p className="text-slate-300 text-sm mt-4">
          <strong className="text-white">Longueur attendue&nbsp;:</strong> {data.length}
        </p>
      </Panel>
      <Panel>
        <SectionTitle>{mode}</SectionTitle>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="min-h-36 w-full rounded-2xl border border-slate-700 bg-slate-950 p-3.5 text-sm sm:text-base text-justify text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
          placeholder="Écris tes idées ici..."
        />
        <button
          onClick={() => {
            playSound("answerClick")
            setShowCorrection(true)
          }}
          className="w-full mt-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-3 text-sm sm:text-base text-justify font-bold text-white shadow-lg transition active:scale-95"
        >
          <span>Voir la suggestion de corrigé</span>
        </button>
        {showCorrection && (
          <div className="mt-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 p-4">
            <TextBlock text={data.correction} />
          </div>
        )}
      </Panel>
    </>
  )
}

export {
  ActivityErrorBoundary,
  AudioPlayer,
  ChoiceButton,
  Empty,
  FinalPage,
  GuidedProduction,
  Header,
  Panel,
  ProgressCard,
  QuestionPanel,
  SectionTitle,
  Shell,
  TextBlock,
}
