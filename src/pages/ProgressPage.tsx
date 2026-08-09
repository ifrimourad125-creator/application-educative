import React from 'react';
import { Trophy, Flame, CheckCircle2, Award, Sparkles, BookOpen, Star, RefreshCw, Bookmark } from 'lucide-react';
import { getStoredProgress, saveStoredProgress } from '../utils/storage';
import { levels } from '../data/levels';
import { playSound } from '../utils/sound';

export default function ProgressPage() {
  const progress = getStoredProgress();
  const completedKeys = Object.keys(progress.completedActivities);
  const totalPossible = 30 * 8; // 30 units total x 8 activities per unit

  const levelProgressData = levels.map((lvl) => {
    let done = 0;
    const totalInLevel = lvl.semesters.reduce((acc, sem) => acc + sem.units.length * 8, 0);

    lvl.semesters.forEach((sem) => {
      sem.units.forEach((unit) => {
        for (let actId = 1; actId <= 8; actId++) {
          if (progress.completedActivities[`${lvl.id}_${sem.id}_${unit.id}_${actId}`]) {
            done++;
          }
        }
      });
    });

    return {
      id: lvl.id,
      name: lvl.name,
      short: lvl.short,
      icon: lvl.icon,
      done,
      total: totalInLevel,
      pct: Math.round((done / Math.max(1, totalInLevel)) * 100),
    };
  });

  const levelStyleMap: Record<string, { iconBg: string; barBg: string; text: string; badgeBg: string; badgeBorder: string }> = {
    '1ac': {
      iconBg: 'bg-gradient-to-br from-cyan-400 to-blue-600',
      barBg: 'bg-gradient-to-r from-cyan-400 to-blue-500',
      text: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/10',
      badgeBorder: 'border-cyan-500/20',
    },
    '2ac': {
      iconBg: 'bg-gradient-to-br from-fuchsia-400 to-purple-600',
      barBg: 'bg-gradient-to-r from-fuchsia-400 to-purple-500',
      text: 'text-fuchsia-400',
      badgeBg: 'bg-fuchsia-500/10',
      badgeBorder: 'border-fuchsia-500/20',
    },
    '3ac': {
      iconBg: 'bg-gradient-to-br from-amber-400 to-orange-600',
      barBg: 'bg-gradient-to-r from-amber-400 to-orange-500',
      text: 'text-amber-400',
      badgeBg: 'bg-amber-500/10',
      badgeBorder: 'border-amber-500/20',
    },
  };

  return (
    <div className="flex-1 flex flex-col p-3.5 sm:p-5 space-y-4 max-w-4xl mx-auto w-full pb-4 sm:pb-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/50 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-orange-600/20 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-amber-500/0 via-amber-400/50 to-amber-500/0 pointer-events-none" />
        <div className="flex items-center gap-3 mb-2 relative z-10">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-600/20 border border-amber-500/30 flex items-center justify-center text-3xl sm:text-4xl shadow-lg backdrop-blur-md shrink-0">
            🏆
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-white tracking-tight drop-shadow-sm">Tableau de Bord & Succès</h1>
            <p className="text-xs text-amber-300 font-bold">Progression Officielle Collège</p>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-3 space-y-1.5 relative z-10">
          <div className="flex justify-between text-xs font-bold text-slate-200">
            <span>Progression Globale (30 Unités)</span>
            <span className="text-amber-400">
              {completedKeys.length} / {totalPossible} Activités
            </span>
          </div>
          <div className="w-full bg-slate-950/80 rounded-full h-3 overflow-hidden p-0.5 border border-slate-800 shadow-inner">
            <div
              className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
              style={{ width: `${Math.min(100, (completedKeys.length / totalPossible) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 flex flex-col items-center text-center shadow-lg relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
             <Sparkles className="w-16 h-16" />
          </div>
          <Sparkles className="w-7 h-7 text-indigo-400 mb-1 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
          <span className="text-2xl font-black text-white">{progress.xp} XP</span>
          <span className="text-[11px] text-slate-400 font-medium mt-1">Points Gagnés</span>
        </div>

        <div className="p-4 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 flex flex-col items-center text-center shadow-lg relative overflow-hidden group hover:border-amber-500/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
             <Flame className="w-16 h-16" />
          </div>
          <Flame className="w-7 h-7 text-amber-500 fill-amber-500 mb-1 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          <span className="text-2xl font-black text-white">{progress.streakDays} Jours</span>
          <span className="text-[11px] text-slate-400 font-medium mt-1">Série d'Assiduité</span>
        </div>
      </div>

      {/* Progress per Level */}
      <div className="space-y-3">
        <h2 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider px-1 text-center">
          Progression par Niveau
        </h2>

        {levelProgressData.map((lvl) => {
          const style = levelStyleMap[lvl.id] || levelStyleMap['1ac'];
          return (
          <div
            key={lvl.id}
            className="p-4 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 hover:bg-slate-800/90 hover:border-slate-600 transition-all duration-200 shadow-lg space-y-3"
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-white font-extrabold flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg ${style.iconBg} flex items-center justify-center shadow-md text-lg leading-none`}>
                  {lvl.icon}
                </div>
                {lvl.name}
              </span>
              <span className={`${style.text} ${style.badgeBg} border ${style.badgeBorder} px-2 py-0.5 rounded-md`}>{lvl.pct}% Complété</span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
              <div
                className={`${style.barBg} h-full rounded-full transition-all duration-300`}
                style={{ width: `${lvl.pct}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
              <span><strong className="text-slate-300">{lvl.done}</strong> activités faites</span>
              <span><strong className="text-slate-300">{lvl.total}</strong> au total</span>
            </div>
          </div>
        )})}
      </div>

      {/* Badges Section */}
      <div className="p-4 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 shadow-lg space-y-3">
        <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center justify-center gap-2 text-center">
          <div className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
             <Award className="w-3.5 h-3.5 text-amber-400" />
          </div>
          Vos Trophées & Badges
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-2 text-xs hover:bg-slate-800 hover:border-slate-600 transition-colors shadow-sm">
            <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center shrink-0">
              <span className="text-xl">🚀</span>
            </div>
            <div>
              <p className="font-bold text-slate-200">Premier Pas</p>
              <p className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded inline-block mt-0.5">Débloqué</p>
            </div>
          </div>

          <div className={`p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-2 text-xs hover:bg-slate-800 hover:border-slate-600 transition-colors shadow-sm ${completedKeys.length < 5 ? 'opacity-70 grayscale-[50%]' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center shrink-0">
              <span className="text-xl">📚</span>
            </div>
            <div>
              <p className="font-bold text-slate-200">5 Activités</p>
              <p className={`text-[10px] font-semibold mt-0.5 px-1.5 py-0.5 rounded inline-block ${completedKeys.length >= 5 ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400 bg-slate-700'}`}>
                {completedKeys.length >= 5 ? 'Débloqué' : 'En cours'}
              </p>
            </div>
          </div>

          <div className={`p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-2 text-xs hover:bg-slate-800 hover:border-slate-600 transition-colors shadow-sm ${progress.streakDays < 3 ? 'opacity-70 grayscale-[50%]' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center shrink-0">
              <span className="text-xl">🔥</span>
            </div>
            <div>
              <p className="font-bold text-slate-200">3 Jours</p>
              <p className={`text-[10px] font-semibold mt-0.5 px-1.5 py-0.5 rounded inline-block ${progress.streakDays >= 3 ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400 bg-slate-700'}`}>
                {progress.streakDays >= 3 ? 'Débloqué' : 'En cours'}
              </p>
            </div>
          </div>

          <div className={`p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-2 text-xs hover:bg-slate-800 hover:border-slate-600 transition-colors shadow-sm ${completedKeys.length < 20 ? 'opacity-70 grayscale-[50%]' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center shrink-0">
              <span className="text-xl">🎓</span>
            </div>
            <div>
              <p className="font-bold text-slate-200">Expert</p>
              <p className={`text-[10px] font-semibold mt-0.5 px-1.5 py-0.5 rounded inline-block ${completedKeys.length >= 20 ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400 bg-slate-700'}`}>
                {completedKeys.length >= 20 ? 'Débloqué' : 'En cours'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
