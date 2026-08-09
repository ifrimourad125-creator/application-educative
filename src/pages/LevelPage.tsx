import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronRight, ChevronDown, Headphones, Sparkles, GraduationCap, Rocket, Lightbulb, Globe, FlaskConical, Palette, Trophy, Brain, Touchpad, MousePointerClick, CalendarDays } from 'lucide-react';
import { levels } from '../data/levels';
import { Level, SelectedUnit, SemesterId } from '../types/app';
import { playSound } from '../utils/sound';
import { getStoredProgress } from '../utils/storage';
import { formatFrenchText } from '../utils/text';
import { BackButton } from '../components/BackButton';
import { useAudioUI } from '../hooks/useAudioUI';

// Level Header Theme Map
const levelHeaderThemes: Record<string, {
  cardBg: string;
  border: string;
  glow1: string;
  glow2: string;
  badgeBg: string;
  emoji: string;
}> = {
  '1ac': {
cardBg: 'bg-slate-900/85 backdrop-blur-xl bg-gradient-to-r from-blue-900/40 via-slate-900/90 to-cyan-900/40',
    border: 'border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]',
    glow1: 'bg-blue-500/25',
    glow2: 'bg-cyan-400/25',
    badgeBg: 'bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-white hover:shadow-[0_0_20px_rgba(6,182,212,0.8)]',
    emoji: '📖',
  },
  '2ac': {
    cardBg: 'bg-slate-900/85 backdrop-blur-xl bg-gradient-to-r from-fuchsia-900/40 via-slate-900/90 to-pink-900/40',
    border: 'border-fuchsia-400 hover:shadow-[0_0_30px_rgba(217,70,239,0.6)]',
    glow1: 'bg-fuchsia-500/25',
    glow2: 'bg-pink-400/25',
    badgeBg: 'bg-gradient-to-br from-fuchsia-400 to-pink-500 border-2 border-white hover:shadow-[0_0_20px_rgba(217,70,239,0.8)]',
    emoji: '🚀',
  },
  '3ac': {
    cardBg: 'bg-slate-900/85 backdrop-blur-xl bg-gradient-to-r from-orange-900/40 via-slate-900/90 to-amber-900/40',
    border: 'border-orange-400 hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]',
    glow1: 'bg-orange-500/25',
    glow2: 'bg-amber-400/25',
    badgeBg: 'bg-gradient-to-br from-orange-400 to-amber-500 border-2 border-white hover:shadow-[0_0_20px_rgba(245,158,11,0.8)]',
    emoji: '🏆',
  },
};

export interface LevelPageProps {
  level?: Level;
  onSelectUnit?: (unit: SelectedUnit) => void;
  onBack?: () => void;
}
export default function LevelPage({ level: propsLevel, onSelectUnit, onBack }: LevelPageProps) {
  const navigate = useNavigate();
  const { levelId } = useParams();
  const { playPop } = useAudioUI();
  const currentLevel = propsLevel || levels.find((l) => l.id === levelId) || levels[0];
  const [activeSemester, setActiveSemester] = useState<SemesterId | null>(null);

  const progress = getStoredProgress();

  const handleUnitClick = (unit: SelectedUnit) => {
    if (onSelectUnit) {
      onSelectUnit(unit);
    } else {
      navigate(`/niveau/${unit.levelId}/semestre/${unit.semesterId}/unite/${unit.id}`);
    }
  };

  const selectedSemesterData = activeSemester ? currentLevel.semesters.find((s) => s.id === activeSemester) : null;
  const lvlTheme = levelHeaderThemes[currentLevel.id] || levelHeaderThemes['1ac'];

  return (
    <div className={`flex flex-col justify-start p-4 sm:p-6 gap-4 sm:gap-6 max-w-2xl mx-auto w-full min-h-full pb-4 sm:pb-6 flex-shrink-0 relative overflow-hidden`}>
      {/* Dynamic Ambient Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] sm:w-[500px] sm:h-[500px] ${lvlTheme.glow1} blur-[80px] sm:blur-[120px] rounded-full opacity-40 mix-blend-screen animate-pulse`} style={{ animationDuration: '8s' }} />
        <div className={`absolute -bottom-[10%] -left-[10%] w-[60vw] h-[60vw] sm:w-[400px] sm:h-[400px] ${lvlTheme.glow2} blur-[80px] sm:blur-[100px] rounded-full opacity-30 mix-blend-screen animate-pulse`} style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 flex flex-col gap-4 sm:gap-6 w-full h-full">
        {/* Standalone Back Button Row (Glassmorphism Secondary Action) */}
      {/* Standalone Back Button Row (Glassmorphism Secondary Action) */}
      <div className="flex items-center justify-between">
        <BackButton 
          onClick={() => {
            if (onBack) onBack();
            else navigate('/');
          }}
          label="Retour"
        />

        <span className="flex items-center justify-center px-3.5 py-1.5 text-xs sm:text-sm font-black uppercase text-cyan-200 bg-gradient-to-r from-slate-900 to-slate-800 rounded-full border-2 border-cyan-400/80 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
          {currentLevel.short}
        </span>
      </div>

      {/* Level Header Banner (Centered Glassmorphism & Proportional Gradient) */}
      <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl ${lvlTheme.cardBg} backdrop-blur-xl border-2 ${lvlTheme.border} p-4 flex flex-col items-center justify-center text-center gap-2 shadow-xl transition-all duration-300 shrink-0`}>
        {/* Top Edge Reflection Line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

        {/* Ambient Glowing Background Orbs */}
        <div className={`absolute -top-10 -right-10 w-28 h-28 ${lvlTheme.glow1} rounded-full blur-2xl pointer-events-none`} />
        <div className={`absolute -bottom-10 -left-10 w-28 h-28 ${lvlTheme.glow2} rounded-full blur-2xl pointer-events-none`} />

        {/* Decorative Proportional Emoji */}
        <span className="text-5xl sm:text-6xl leading-none select-none flex items-center justify-center drop-shadow-lg z-10 relative mt-2 mb-1">
          {lvlTheme.emoji}
        </span>

        <div className="relative z-10 text-center space-y-1 max-w-md">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md leading-tight text-center">
            {currentLevel.name}
          </h1>
          <p className="text-sm sm:text-base text-cyan-200 font-bold tracking-wide uppercase text-center">
            Unités et activités interactives
          </p>
        </div>
      </div>

      {/* Semester Selection Containers - Vibrant & Eye-Catching */}
      {!activeSemester ? (
        <div className="flex flex-col gap-4 flex-1 mt-4">
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center mb-5 mt-3 space-y-4"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-6 w-full">
              <span className="h-[4px] w-8 sm:w-20 rounded-full bg-gradient-to-r from-transparent to-cyan-500/80"></span>
              <div className="relative group shrink-0">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl blur opacity-60 group-hover:opacity-90 transition duration-500 animate-pulse"></div>
                <div className="relative px-6 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl border-2 border-cyan-400/80 flex items-center shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                  <span className="text-[13px] sm:text-lg leading-snug sm:leading-none font-black text-cyan-200 uppercase tracking-widest sm:tracking-[0.2em] text-center drop-shadow-md whitespace-nowrap">
                    Choisissez votre semestre
                  </span>
                </div>
              </div>
              <span className="h-[4px] w-8 sm:w-20 rounded-full bg-gradient-to-l from-transparent to-cyan-500/80"></span>
            </div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="text-cyan-200 flex items-center justify-center"
            >
              <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-md" strokeWidth={3} />
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {currentLevel.semesters.map((sem) => {
              const isS1 = sem.id === 's1';
              const semesterLabel = isS1 ? 'Semestre 1' : 'Semestre 2';
              // Custom Calendar Icon for Semester 1 (November)
              const NovCalendarIcon = (
                <div className="relative flex flex-col items-center justify-start w-[1em] h-[1em] bg-white rounded-[0.15em] shadow-[inset_0_-0.05em_0_rgba(0,0,0,0.2),_0_0.05em_0.1em_rgba(0,0,0,0.1)] overflow-hidden border-[0.02em] border-slate-200 shrink-0">
                  <div className="bg-[#ff3b30] w-full h-[0.35em] flex items-center justify-center relative border-b border-red-700/20 pt-[0.1em]">
                     {/* Spirals */}
                     <div className="absolute top-[-0.08em] flex justify-around w-full px-[0.15em] z-20">
                       <div className="w-[0.1em] h-[0.2em] bg-gradient-to-b from-slate-100 to-slate-400 rounded-full border border-slate-500 shadow-sm"></div>
                       <div className="w-[0.1em] h-[0.2em] bg-gradient-to-b from-slate-100 to-slate-400 rounded-full border border-slate-500 shadow-sm"></div>
                     </div>
                     <span className="text-white text-[0.24em] font-black uppercase leading-none tracking-wide relative z-10">Nov</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center items-center w-full p-[0.1em] bg-slate-50/90">
                    <div className="grid grid-cols-4 gap-[0.05em] w-full h-full p-[0.05em]">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className={`rounded-[0.02em] ${i === 8 ? 'bg-sky-500 shadow-[0_0_0.05em_rgba(14,165,233,0.5)]' : 'bg-slate-300'}`}></div>
                      ))}
                    </div>
                  </div>
                </div>
              );

              const semEmoji = isS1 ? NovCalendarIcon : '📈';
              
              // Vibrant filled background styling for Semester Cards
              const borderAnim = isS1
                ? 'conic-gradient(from 0deg, #a3e635, #22c55e, #16a34a, #a3e635)'
                : 'conic-gradient(from 0deg, #ff00cc, #ff0033, #e11d48, #ff00cc)';
              const cardInner = isS1
                ? 'bg-gradient-to-b from-[#eef213] to-[#44d608]'
                : 'bg-gradient-to-b from-[#ff00cc] to-[#ff0033]';
              const shadowGlow = isS1
                ? 'hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]'
                : 'hover:shadow-[0_0_30px_rgba(225,29,72,0.6)]';

              return (
                <motion.button
                  key={sem.id}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                  onPointerDown={playPop}
                  onClick={() => {
                    setActiveSemester(sem.id as SemesterId);
                  }}
                  className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-[2px] sm:p-[3px] text-center transition-all duration-300 cursor-pointer group aspect-[4/3] sm:aspect-auto sm:min-h-[220px] max-h-[160px] sm:max-h-[260px] shadow-lg ${shadowGlow}`}
                >
                  {/* Rotating Gradient Border Background */}
                  <div 
                    className="absolute top-1/2 left-1/2 w-[150%] h-[200%] sm:w-[150%] sm:h-[150%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite]" 
                    style={{ background: borderAnim }} 
                  />
                  
                  {/* Inner Content Card */}
                  <div className={`relative w-full h-full rounded-[14px] sm:rounded-[22px] flex flex-col items-center justify-center gap-2 sm:gap-4 z-10 ${cardInner} p-4 sm:p-8 text-white overflow-hidden`}>
                    {/* Glossy top edge highlight */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none opacity-90" />
                    
                    <div className="flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-5xl sm:text-[5.5rem] leading-none drop-shadow-md">{semEmoji}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 sm:gap-2">
                      <h3 className="text-lg sm:text-3xl font-black tracking-tight leading-none text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                        {semesterLabel}
                      </h3>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Compact Header for Selected Semester */
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-[85%] max-w-xs mx-auto"
        >
          {(() => {
            const isS1 = activeSemester === 's1';
            const semesterLabel = isS1 ? 'Semestre 1' : 'Semestre 2';
            const NovCalendarIconSmall = (
              <div className="relative flex flex-col items-center justify-start w-[1em] h-[1em] bg-white rounded-[0.15em] shadow-sm overflow-hidden border-[0.02em] border-slate-200 shrink-0">
                <div className="bg-[#ff3b30] w-full h-[0.38em] flex items-center justify-center relative border-b border-red-700/20 pt-[0.12em]">
                   <div className="absolute top-[-0.08em] flex justify-around w-full px-[0.15em] z-20">
                     <div className="w-[0.1em] h-[0.2em] bg-slate-200 rounded-full border border-slate-400"></div>
                     <div className="w-[0.1em] h-[0.2em] bg-slate-200 rounded-full border border-slate-400"></div>
                   </div>
                   <span className="text-white text-[0.26em] font-black uppercase leading-none tracking-wide relative z-10">Nov</span>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center w-full p-[0.1em] bg-slate-50/90">
                  <div className="grid grid-cols-4 gap-[0.05em] w-full h-full p-[0.05em]">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className={`rounded-[0.02em] ${i === 8 ? 'bg-sky-500' : 'bg-slate-300'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            );
            const semEmoji = isS1 ? NovCalendarIconSmall : '📈';
            const bannerStyle = isS1
              ? 'bg-gradient-to-b from-[#eef213] to-[#44d608] border-white/60 hover:shadow-[0_0_20px_rgba(132,204,22,0.5)] text-white'
              : 'bg-gradient-to-b from-[#ff00cc] to-[#ff0033] border-white/60 hover:shadow-[0_0_20px_rgba(225,29,72,0.5)] text-white';

            return (
              <div 
                onClick={() => {
                  playSound('back-click');
                  setActiveSemester(null);
                }}
                className={`relative overflow-hidden rounded-xl border ${bannerStyle} p-3 sm:p-4 flex items-center justify-between cursor-pointer group active:scale-[0.98] transition-transform shadow-lg`}
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none opacity-90" />
                
                {/* Left section: Icon */}
                <div className="flex-1 flex items-center relative z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-sm shrink-0">
                    <span className="text-2xl sm:text-3xl leading-none">{semEmoji}</span>
                  </div>
                </div>

                {/* Center section: Title */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10 pointer-events-none">
                  <h3 className="text-lg sm:text-xl font-black whitespace-nowrap text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                    {semesterLabel}
                  </h3>
                </div>

                {/* Right section: Change button */}
                <div className="flex-1 relative z-10 flex items-center justify-end gap-2">
                  <span className="text-xs font-bold text-white/90 bg-black/20 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                    Changer
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white border border-white/30 group-hover:bg-white/30 transition-colors">
                    <ChevronDown className="w-4 h-4 rotate-180" />
                  </div>
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}

      {/* Units List Section - Rendered dynamically when a semester card is clicked */}
      <AnimatePresence mode="wait">
        {selectedSemesterData && (
          <motion.div
            key={selectedSemesterData.id}
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.03,
                },
              },
              exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
            }}
            className="flex flex-col gap-2.5 pt-1"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -10 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 25 } },
              }}
              className="flex items-center justify-between px-0.5"
            >
              <h2 className="text-[11px] sm:text-xs font-black text-slate-200 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Unités du {selectedSemesterData.id === 's1' ? 'Semestre 1' : 'Semestre 2'}
              </h2>
              <span className="text-[10px] font-bold text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded-full border border-sky-500/30 shadow-sm">
                {selectedSemesterData.units.length} Unités
              </span>
            </motion.div>

            {selectedSemesterData.units.map((unit, idx) => {
              const selectedUnitObj: SelectedUnit = {
                ...unit,
                levelId: currentLevel.id,
                semesterId: selectedSemesterData.id,
              };

              let completedCount = 0;
              for (let actId = 1; actId <= 8; actId++) {
                if (
                  progress.completedActivities[`${currentLevel.id}_${selectedSemesterData.id}_${unit.id}_${actId}`]
                ) {
                  completedCount++;
                }
              }

              const unitThemes: Record<number, {
                emoji: string;
                cardBg: string;
                border: string;
                badgeBg: string;
                audioIconColor: string;
                btnBg: string;
              }> = {
                1: {
                  emoji: '📚',
                  cardBg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
                  border: 'border-blue-300 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]',
                  badgeBg: 'bg-white/30 text-white border-white/50',
                  audioIconColor: 'text-white',
                  btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',
                },
                2: {
                  emoji: '🚀',
                  cardBg: 'bg-gradient-to-r from-orange-500 to-amber-500',
                  border: 'border-orange-300 group-hover:shadow-[0_0_25px_rgba(249,115,22,0.6)]',
                  badgeBg: 'bg-white/30 text-white border-white/50',
                  audioIconColor: 'text-white',
                  btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',
                },
                3: {
                  emoji: '💡',
                  cardBg: 'bg-gradient-to-r from-fuchsia-500 to-pink-500',
                  border: 'border-fuchsia-300 group-hover:shadow-[0_0_25px_rgba(217,70,239,0.6)]',
                  badgeBg: 'bg-white/30 text-white border-white/50',
                  audioIconColor: 'text-white',
                  btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',
                },
                4: {
                  emoji: '🌍',
                  cardBg: 'bg-gradient-to-r from-lime-500 to-green-500',
                  border: 'border-lime-300 group-hover:shadow-[0_0_25px_rgba(132,204,22,0.7)]',
                  badgeBg: 'bg-white/30 text-white border-white/50',
                  audioIconColor: 'text-white',
                  btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',
                },
                5: {
                  emoji: '🧠',
                  cardBg: 'bg-gradient-to-r from-violet-600 to-purple-500',
                  border: 'border-violet-300 group-hover:shadow-[0_0_25px_rgba(139,92,246,0.6)]',
                  badgeBg: 'bg-white/30 text-white border-white/50',
                  audioIconColor: 'text-white',
                  btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',
                },
                6: {
                  emoji: '🔬',
                  cardBg: 'bg-gradient-to-r from-rose-500 to-red-500',
                  border: 'border-rose-300 group-hover:shadow-[0_0_25px_rgba(244,63,94,0.6)]',
                  badgeBg: 'bg-white/30 text-white border-white/50',
                  audioIconColor: 'text-white',
                  btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',
                },
                7: {
                  emoji: '🎨',
                  cardBg: 'bg-gradient-to-r from-teal-500 to-emerald-500',
                  border: 'border-teal-300 group-hover:shadow-[0_0_25px_rgba(20,184,166,0.7)]',
                  badgeBg: 'bg-white/30 text-white border-white/50',
                  audioIconColor: 'text-white',
                  btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',
                },
                8: {
                  emoji: '🏆',
                  cardBg: 'bg-gradient-to-r from-yellow-500 to-amber-500',
                  border: 'border-yellow-300 group-hover:shadow-[0_0_25px_rgba(234,179,8,0.7)]',
                  badgeBg: 'bg-white/30 text-white border-white/50',
                  audioIconColor: 'text-white',
                  btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',
                },
              };

              const unitTheme = unitThemes[unit.id] || unitThemes[((unit.id - 1) % 8) + 1] || unitThemes[1];

              let finalEmoji = unit.emoji || unitTheme.emoji;

              return (
                <motion.button
                  key={unit.id}
                  variants={{
                    hidden: { opacity: 0, y: 24, scale: 0.94 },
                    show: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: 'spring',
                        stiffness: 350,
                        damping: 22,
                      },
                    },
                  }}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.015, y: -2 }}
                  onPointerDown={playPop}
                  onClick={() => handleUnitClick(selectedUnitObj)}
                  className={`w-full text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 group relative overflow-hidden backdrop-blur-md cursor-pointer ${unitTheme.cardBg} ${unitTheme.border}`}
                >
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-white/40 pointer-events-none" />

                  <div className="flex items-center gap-2.5 sm:gap-3 relative z-10">
                    {/* Proportional modern emoji badge */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200 backdrop-blur-md">
                      <span className="text-3xl sm:text-4xl leading-none select-none flex items-center justify-center drop-shadow-md">{finalEmoji}</span>
                    </div>

                    {/* Central text div with flex-1 min-w-0 for proper flexbox spacing */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className={`text-[10px] sm:text-xs font-black uppercase px-2 py-0.5 rounded-md sm:rounded-lg border ${unitTheme.badgeBg}`}>
                          Unité {unit.id}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-bold flex items-center gap-0.5 text-white/95">
                          <Headphones className={`w-3 h-3 ${unitTheme.audioIconColor}`} /> Audio
                        </span>
                      </div>

                      <h3 className="text-xs sm:text-base font-black text-white leading-snug line-clamp-2">
                        {formatFrenchText(unit.title)}
                      </h3>

                      {/* Progress Indicator */}
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="flex-1 rounded-full h-1.5 sm:h-2 overflow-hidden border bg-black/30 border-white/25">
                          <div
                            className="h-full rounded-full transition-all duration-300 bg-emerald-300"
                            style={{ width: `${(completedCount / 8) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-black shrink-0 text-emerald-200">
                          {completedCount}/8 Complété
                        </span>
                      </div>
                    </div>

                    <div className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl ${unitTheme.btnBg} group-hover:scale-110 transition-transform shrink-0 self-center`}>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}


