import React from 'react';
import { motion } from 'motion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronRight, Headphones, Sparkles, Trophy, Volume2, MessageSquare, BookOpen, FileText, Pencil, CheckSquare, Award } from 'lucide-react';
import { activities } from '../data/activities';
import { levels } from '../data/levels';
import { Activity, SelectedUnit } from '../types/app';
import { playSound } from '../utils/sound';
import { getStoredProgress } from '../utils/storage';
import { formatFrenchText } from '../utils/text';
import { BackButton } from '../components/BackButton';
import { useAudioUI } from '../hooks/useAudioUI';

// Unit Header Theme Map
const unitHeaderThemes: Record<number, {
  cardBg: string;
  border: string;
  glow1: string;
  glow2: string;
  badgeBg: string;
  emoji: string;
}> = {
  1: {
    cardBg: 'bg-slate-900/80 backdrop-blur-xl bg-gradient-to-r from-blue-900/40 via-slate-900/80 to-cyan-900/40',
    border: 'border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]',
    glow1: 'bg-blue-500/25',
    glow2: 'bg-cyan-400/25',
    badgeBg: 'bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-white hover:shadow-[0_0_20px_rgba(6,182,212,0.8)]',
    emoji: '📚',
  },
  2: {
    cardBg: 'bg-slate-900/80 backdrop-blur-xl bg-gradient-to-r from-orange-900/40 via-slate-900/80 to-amber-900/40',
    border: 'border-orange-400 hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]',
    glow1: 'bg-orange-500/25',
    glow2: 'bg-amber-400/25',
    badgeBg: 'bg-gradient-to-br from-orange-400 to-amber-500 border-2 border-white hover:shadow-[0_0_20px_rgba(245,158,11,0.8)]',
    emoji: '💡',
  },
  3: {
    cardBg: 'bg-slate-900/80 backdrop-blur-xl bg-gradient-to-r from-fuchsia-900/40 via-slate-900/80 to-pink-900/40',
    border: 'border-fuchsia-400 hover:shadow-[0_0_30px_rgba(217,70,239,0.6)]',
    glow1: 'bg-fuchsia-500/25',
    glow2: 'bg-pink-400/25',
    badgeBg: 'bg-gradient-to-br from-fuchsia-400 to-pink-500 border-2 border-white hover:shadow-[0_0_20px_rgba(217,70,239,0.8)]',
    emoji: '🎯',
  },
  4: {
    cardBg: 'bg-slate-900/80 backdrop-blur-xl bg-gradient-to-r from-lime-900/40 via-slate-900/80 to-green-900/40',
    border: 'border-lime-400 hover:shadow-[0_0_30px_rgba(163,230,53,0.6)]',
    glow1: 'bg-lime-500/25',
    glow2: 'bg-green-400/25',
    badgeBg: 'bg-gradient-to-br from-lime-400 to-green-500 border-2 border-white hover:shadow-[0_0_20px_rgba(163,230,53,0.8)]',
    emoji: '🌍',
  },
  5: {
    cardBg: 'bg-slate-900/80 backdrop-blur-xl bg-gradient-to-r from-violet-900/40 via-slate-900/80 to-purple-900/40',
    border: 'border-violet-400 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]',
    glow1: 'bg-violet-500/25',
    glow2: 'bg-purple-400/25',
    badgeBg: 'bg-gradient-to-br from-violet-400 to-purple-500 border-2 border-white hover:shadow-[0_0_20px_rgba(139,92,246,0.8)]',
    emoji: '🧠',
  },
  6: {
    cardBg: 'bg-slate-900/80 backdrop-blur-xl bg-gradient-to-r from-rose-900/40 via-slate-900/80 to-red-900/40',
    border: 'border-rose-400 hover:shadow-[0_0_30px_rgba(244,63,94,0.6)]',
    glow1: 'bg-rose-500/25',
    glow2: 'bg-red-400/25',
    badgeBg: 'bg-gradient-to-br from-rose-400 to-red-500 border-2 border-white hover:shadow-[0_0_20px_rgba(244,63,94,0.8)]',
    emoji: '🔬',
  },
  7: {
    cardBg: 'bg-slate-900/80 backdrop-blur-xl bg-gradient-to-r from-teal-900/40 via-slate-900/80 to-emerald-900/40',
    border: 'border-teal-400 hover:shadow-[0_0_30px_rgba(45,212,191,0.6)]',
    glow1: 'bg-teal-500/25',
    glow2: 'bg-emerald-400/25',
    badgeBg: 'bg-gradient-to-br from-teal-400 to-emerald-500 border-2 border-white hover:shadow-[0_0_20px_rgba(45,212,191,0.8)]',
    emoji: '🎨',
  },
  8: {
    cardBg: 'bg-slate-900/80 backdrop-blur-xl bg-gradient-to-r from-yellow-900/40 via-slate-900/80 to-amber-900/40',
    border: 'border-yellow-400 hover:shadow-[0_0_30px_rgba(250,204,21,0.6)]',
    glow1: 'bg-yellow-500/25',
    glow2: 'bg-amber-400/25',
    badgeBg: 'bg-gradient-to-br from-yellow-400 to-amber-500 border-2 border-white hover:shadow-[0_0_20px_rgba(250,204,21,0.8)]',
    emoji: '🏆',
  },
};

interface ActivitiesPageProps {
  unitTitle?: string;
  selectedUnit?: SelectedUnit;
  onSelectActivity?: (activity: Activity) => void;
  onBack?: () => void;
}


const VIBRANT_THEMES = [
  { // Vert Émeraude
    cardBg: "bg-gradient-to-r from-emerald-500 to-teal-500",
    border: "border-emerald-300 hover:border-emerald-200 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]",
    badgeBg: "bg-white/20 text-white border-white/40",
    iconBg: "bg-white/20 border-white/40 text-white shadow-sm",
    btnBg: "bg-white/20 hover:bg-white/30 text-white border-white/40",
  },
  { // Bleu Ciel
    cardBg: "bg-gradient-to-r from-sky-500 to-blue-500",
    border: "border-sky-300 hover:border-sky-200 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.5)]",
    badgeBg: "bg-white/20 text-white border-white/40",
    iconBg: "bg-white/20 border-white/40 text-white shadow-sm",
    btnBg: "bg-white/20 hover:bg-white/30 text-white border-white/40",
  },
  { // Jaune Ambre
    cardBg: "bg-gradient-to-r from-amber-500 to-orange-500",
    border: "border-amber-300 hover:border-amber-200 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]",
    badgeBg: "bg-white/20 text-white border-white/40",
    iconBg: "bg-white/20 border-white/40 text-white shadow-sm",
    btnBg: "bg-white/20 hover:bg-white/30 text-white border-white/40",
  },
  { // Rouge Pourpre
    cardBg: "bg-gradient-to-r from-rose-500 to-red-500",
    border: "border-rose-300 hover:border-rose-200 group-hover:shadow-[0_0_20px_rgba(225,29,72,0.5)]",
    badgeBg: "bg-white/20 text-white border-white/40",
    iconBg: "bg-white/20 border-white/40 text-white shadow-sm",
    btnBg: "bg-white/20 hover:bg-white/30 text-white border-white/40",
  },
  { // Rose Fushia
    cardBg: "bg-gradient-to-r from-fuchsia-500 to-pink-500",
    border: "border-fuchsia-300 hover:border-fuchsia-200 group-hover:shadow-[0_0_20px_rgba(192,38,211,0.5)]",
    badgeBg: "bg-white/20 text-white border-white/40",
    iconBg: "bg-white/20 border-white/40 text-white shadow-sm",
    btnBg: "bg-white/20 hover:bg-white/30 text-white border-white/40",
  },
  { // Orange Vif
    cardBg: "bg-gradient-to-r from-orange-500 to-amber-500",
    border: "border-orange-300 hover:border-orange-200 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]",
    badgeBg: "bg-white/20 text-white border-white/40",
    iconBg: "bg-white/20 border-white/40 text-white shadow-sm",
    btnBg: "bg-white/20 hover:bg-white/30 text-white border-white/40",
  },
  { // Violet Intense
    cardBg: "bg-gradient-to-r from-violet-500 to-purple-600",
    border: "border-violet-300 hover:border-violet-200 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]",
    badgeBg: "bg-white/20 text-white border-white/40",
    iconBg: "bg-white/20 border-white/40 text-white shadow-sm",
    btnBg: "bg-white/20 hover:bg-white/30 text-white border-white/40",
  },
  { // Indigo Néon
    cardBg: "bg-gradient-to-r from-indigo-500 to-blue-600",
    border: "border-indigo-300 hover:border-indigo-200 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]",
    badgeBg: "bg-white/20 text-white border-white/40",
    iconBg: "bg-white/20 border-white/40 text-white shadow-sm",
    btnBg: "bg-white/20 hover:bg-white/30 text-white border-white/40",
  }
];

export default function ActivitiesPage({
  unitTitle,
  selectedUnit: propsUnit,
  onSelectActivity,
  onBack,
}: ActivitiesPageProps) {
  const navigate = useNavigate();
  const { levelId, semesterId, unitId } = useParams();
  const { playPop } = useAudioUI();

  // Find unit if not directly passed in props
  let unit = propsUnit;
  if (!unit && levelId && semesterId && unitId) {
    const lvl = levels.find((l) => l.id === levelId);
    const sem = lvl?.semesters.find((s) => s.id === semesterId);
    const u = sem?.units.find((item) => String(item.id) === String(unitId));
    if (lvl && sem && u) {
      unit = { ...u, levelId: lvl.id, semesterId: sem.id };
    }
  }

  const progress = getStoredProgress();

  const handleActivityClick = (activity: Activity) => {
    if (onSelectActivity) {
      onSelectActivity(activity);
    } else if (unit) {
      navigate(
        `/niveau/${unit.levelId}/semestre/${unit.semesterId}/unite/${unit.id}/activite/${activity.id}`
      );
    }
  };

  const uId = unit?.id || Number(unitId) || 1;
  const uHeaderTheme = unitHeaderThemes[uId] || unitHeaderThemes[((uId - 1) % 8) + 1] || unitHeaderThemes[1];

  let finalEmoji = unit?.emoji || uHeaderTheme.emoji;
  const currentTitle = unit?.title || unitTitle || 'Unité';

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-5 gap-3.5 sm:gap-4 max-w-4xl mx-auto w-full pb-4 sm:pb-6">
      {/* Standalone Back Button Row (Outside Unit Title Container) */}
      <div className="flex items-center justify-between">
        <BackButton 
          onClick={() => {
            if (onBack) onBack();
            else if (unit) navigate(`/niveau/${unit.levelId}`);
            else navigate('/');
          }}
          label="Retour au Niveau"
        />

        <span className="flex items-center justify-center px-3.5 py-1.5 text-xs sm:text-sm font-black uppercase text-cyan-200 bg-gradient-to-r from-slate-900 to-slate-800 rounded-full border-2 border-cyan-400/80 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
          Unité {unit?.id || unitId}
        </span>
      </div>

      {/* Unit Header Card (Centered Glassmorphism & Proportional Gradient) */}
      <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl ${uHeaderTheme.cardBg} backdrop-blur-xl border ${uHeaderTheme.border} p-4 flex flex-col items-center justify-center text-center gap-2 shadow-xl transition-all duration-300 shrink-0`}>
        {/* Top Edge Reflection Line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

        {/* Ambient Glowing Background Orbs */}
        <div className={`absolute -top-10 -right-10 w-28 h-28 ${uHeaderTheme.glow1} rounded-full blur-2xl pointer-events-none`} />
        <div className={`absolute -bottom-10 -left-10 w-28 h-28 ${uHeaderTheme.glow2} rounded-full blur-2xl pointer-events-none`} />

        {/* Decorative Proportional Emoji */}
        <span className="text-5xl sm:text-6xl leading-none select-none flex items-center justify-center drop-shadow-lg z-10 relative mt-2 mb-1">
          {finalEmoji}
        </span>

        <div className="relative z-10 text-center space-y-0.5 max-w-md">
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-sm leading-tight text-center">
            {formatFrenchText(currentTitle)}
          </h1>
          <p className="text-xs sm:text-sm text-white/90 font-semibold leading-tight drop-shadow-sm text-center">
            8 activités pédagogiques guidées
          </p>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 gap-3.5">
        {activities.map((act, idx) => {
          const isDone =
            unit &&
            progress.completedActivities[`${unit.levelId}_${unit.semesterId}_${unit.id}_${act.id}`];

                    const theme = VIBRANT_THEMES[idx % VIBRANT_THEMES.length];


          const activityIcons: Record<number, React.ComponentType<{ className?: string }>> = {
            1: Volume2,
            2: MessageSquare,
            3: BookOpen,
            4: FileText,
            5: Pencil,
            6: Sparkles,
            7: CheckSquare,
            8: Award,
          };

          
          const ActIcon = activityIcons[act.id] || Sparkles;

          return (
            <motion.button
              key={act.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05, ease: "easeOut" }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              onPointerDown={playPop}
              onClick={() => handleActivityClick(act)}
              className={`relative overflow-hidden w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 group flex items-center justify-between ${theme.cardBg} ${theme.border} shadow-lg`}
            >
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-white/10 pointer-events-none" />

              <div className="flex items-center gap-3.5 min-w-0 flex-1 z-10 relative">
                {/* Proportional modern emoji icon container */}
                <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200 border ${theme.iconBg}`}>
                  <span className="text-2xl sm:text-3xl leading-none select-none flex items-center justify-center">{act.icon}</span>
                </div>

                <div className="min-w-0 flex-1 pr-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[10px] sm:text-xs font-black uppercase px-2 py-0.5 rounded-md border ${theme.badgeBg}`}>
                      Activité {act.id}
                    </span>
                    {isDone && (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md font-extrabold flex items-center gap-1 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> Complété
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-white transition-colors leading-snug drop-shadow-sm">
                    {formatFrenchText(act.title)}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-medium text-white/80 group-hover:text-white/95 transition-colors line-clamp-1 mt-0.5 drop-shadow-sm">
                    {act.description}
                  </p>
                </div>
              </div>

              <div className={`p-2.5 sm:p-3 rounded-xl border transition-all shrink-0 ml-2 z-10 flex items-center justify-center ${theme.btnBg} group-hover:scale-105`}>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-current" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
