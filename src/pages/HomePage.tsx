import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, BookOpen, Rocket, Trophy } from 'lucide-react';
import { levels } from '../data/levels';
import { Level } from '../types/app';
import { playSound } from '../utils/sound';
import { getStoredProgress } from '../utils/storage';

interface HomePageProps {
  onSelectLevel?: (level: Level) => void;
}

const LEVEL_CONFIGS: Record<string, {
  badge: string;
  emoji: string;
  gradientBg: string;
  borderColor: string;
  shadowGlow: string;
  subTitle: string;
  gradientRing: string;
  ringGlow: string;
}> = {
  '1ac': {
    badge: '1AC',
    emoji: '📖',
    gradientBg: 'bg-gradient-to-r sm:bg-gradient-to-b from-cyan-500 via-sky-600 to-blue-700',
    borderColor: 'bg-cyan-400',
    shadowGlow: 'hover:shadow-[0_12px_30px_rgba(6,182,212,0.6)] hover:shadow-cyan-500/50 transition-all duration-300',
    subTitle: 'Première Année',
    gradientRing: 'from-cyan-300 via-teal-200 via-emerald-300 to-blue-400',
    ringGlow: 'group-hover:shadow-[0_0_20px_rgba(34,211,238,0.9)]',
  },
  '2ac': {
    badge: '2AC',
    emoji: '🚀',
    gradientBg: 'bg-gradient-to-r sm:bg-gradient-to-b from-fuchsia-500 via-purple-600 to-pink-600',
    borderColor: 'bg-fuchsia-400',
    shadowGlow: 'hover:shadow-[0_12px_30px_rgba(217,70,239,0.6)] hover:shadow-fuchsia-500/50 transition-all duration-300',
    subTitle: 'Deuxième Année',
    gradientRing: 'from-fuchsia-300 via-rose-300 via-purple-200 to-amber-300',
    ringGlow: 'group-hover:shadow-[0_0_20px_rgba(232,121,249,0.9)]',
  },
  '3ac': {
    badge: '3AC',
    emoji: '🏆',
    gradientBg: 'bg-gradient-to-r sm:bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600',
    borderColor: 'bg-amber-400',
    shadowGlow: 'hover:shadow-[0_12px_30px_rgba(245,158,11,0.6)] hover:shadow-amber-500/50 transition-all duration-300',
    subTitle: 'Troisième Année',
    gradientRing: 'from-amber-200 via-yellow-300 via-orange-300 to-rose-400',
    ringGlow: 'group-hover:shadow-[0_0_20px_rgba(251,191,36,0.9)]',
  }
};

export default function HomePage({ onSelectLevel }: HomePageProps) {
  const navigate = useNavigate();
  const progress = getStoredProgress();

  const handleLevelClick = (level: Level) => {
    playSound('card-open');
    if (onSelectLevel) {
      onSelectLevel(level);
    } else {
      navigate(`/niveau/${level.id}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-start p-3 sm:p-5 gap-3 sm:gap-6 max-w-4xl mx-auto w-full">
      {/* Title Header Panel - Compact & Sleek Glassmorphism Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="shrink-0 relative overflow-hidden rounded-3xl bg-slate-900/85 backdrop-blur-xl border-2 border-cyan-400/50 px-4 py-6 sm:px-8 sm:py-8 text-center shadow-[0_0_40px_rgba(34,211,238,0.25)] flex flex-col items-center justify-center gap-2 sm:gap-3"
      >
        {/* Specular Highlight & Glass Reflection */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-100/90 to-transparent pointer-events-none shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
        <div className="absolute -top-[50%] -left-[10%] w-[120%] h-[150%] bg-gradient-to-b from-white/10 to-transparent -rotate-6 pointer-events-none" />
        
        <div className="flex items-center justify-center gap-3 relative z-10 w-full">
          <motion.span 
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.15, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-xl sm:text-2xl text-cyan-300 select-none shrink-0"
          >
            ✦
          </motion.span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none text-center whitespace-normal break-words drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
            Collège Pionnier
          </h1>
          <motion.span 
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.15, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="text-xl sm:text-2xl text-cyan-300 select-none shrink-0"
          >
            ✦
          </motion.span>
        </div>
        <p className="text-base sm:text-xl font-bold text-cyan-300 tracking-wide relative z-10 leading-tight">
          Révision interactive avec Mourad Ifri
        </p>
      </motion.div>

      {/* 3 Level Cards - Flexible Grid filling available height */}
      <div className="flex-1 flex flex-col sm:grid sm:grid-cols-3 gap-4 sm:gap-6 mt-0 items-stretch py-1 w-full">
        {levels.map((level, idx) => {
          const config = LEVEL_CONFIGS[level.id] || LEVEL_CONFIGS['1ac'];
          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: idx * 0.1,
                type: 'spring',
                stiffness: 300,
                damping: 22,
              }}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => handleLevelClick(level)}
              className="group relative cursor-pointer w-[92%] sm:w-full mx-auto flex-1 sm:h-full"
            >
              {/* Vibrant Glassmorphism Card (Horizontal on Mobile, Vertical Tile on Desktop) */}
              <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-[2px] ${config.shadowGlow} flex transition-all duration-300 w-full h-full sm:min-h-[300px]`}>
                
                {/* Base border color */}
                <div className={`absolute inset-0 ${config.borderColor} transition-colors duration-500`} />
                
                {/* Spinning highlight */}
                <div className="absolute inset-[-150%] origin-center animate-spin-continuous bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]" />

                {/* Inner Card */}
                <div className={`relative rounded-[15px] sm:rounded-[23px] ${config.gradientBg} p-3.5 sm:p-8 flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-3 sm:gap-6 w-full h-full`}>
                
                {/* Glossy Top Highlight Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none rounded-t-[15px] sm:rounded-t-[23px]" />
                
                {/* Crystal-Clear Translucent Glass Circle Icon Container */}
                <div className="relative shrink-0 w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center">
                  
                  {/* 1. Static Perfect-Circle Mask for the Spinning Contour Ring */}
                  {/* We use a static mask and rotate a block inside it to avoid any wobbling or deformation */}
                  <div
                    className="absolute inset-0 rounded-full border-[3px] sm:border-[4px] border-transparent pointer-events-none z-0"
                    style={{
                      WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  >
                    {/* The Rotating Gradient Background (Oversized to ensure coverage) */}
                    <div className={`absolute -inset-[100%] bg-gradient-to-tr ${config.gradientRing} group-hover:animate-[spin_4s_linear_infinite] transition-all duration-300 opacity-90 ${config.ringGlow}`} />
                  </div>
                  {/* 2. Crystal-Clear Transparent Glass Lens (Static, NO blur, NO opacity) */}
                  <div className="absolute inset-[3px] sm:inset-[4px] rounded-full bg-transparent border border-white/20 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_8px_16px_rgba(0,0,0,0.2)] flex items-center justify-center overflow-hidden transition-all duration-300 z-10">
                    
                    {/* Sharp Glass Glare Reflection (Clear, not blurry) */}
                    <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none" />
                    {/* Sharp Specular Glint Highlight (No blur) */}
                    <div className="absolute top-[8px] left-[12px] sm:top-[12px] sm:left-[16px] w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-white/70 rounded-full pointer-events-none" />
                    
                    {/* Big Prominent Icon - Perfectly Centered */}
                    <span className="relative z-10 text-[3rem] sm:text-[4.5rem] flex items-center justify-center w-full h-full select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform duration-300 pb-1 sm:pb-2">
                      {config.emoji}
                    </span>
                  </div>
                </div>

                {/* Text Info */}
                <div className="text-center flex-1 min-w-0 space-y-0.5 sm:space-y-1 flex flex-col justify-center px-1 sm:px-2 overflow-hidden">
                  <h2 className="text-[32px] sm:text-5xl font-black text-white tracking-tight leading-none drop-shadow-md whitespace-nowrap">
                    {config.badge}
                  </h2>
                  <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-white/95 leading-tight drop-shadow-sm whitespace-nowrap tracking-tight">
                    {config.subTitle}
                  </p>
                </div>

                {/* Arrow Action Circular Button */}
                <div className="w-12 sm:w-full shrink-0 flex justify-end sm:justify-center sm:mt-2">
                  <div className="flex w-8 h-8 sm:w-12 sm:h-12 rounded-full border border-white/60 bg-white/20 backdrop-blur-md items-center justify-center text-white group-hover:bg-white/35 transition-all shadow-md">
                    <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" strokeWidth={3} />
                  </div>
                </div>
              </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
