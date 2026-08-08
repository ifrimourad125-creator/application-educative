import React, { useEffect } from 'react';
import { Trophy, Flame, CheckCircle2, Award, X, Sparkles, RotateCcw } from 'lucide-react';
import { getStoredProgress, saveStoredProgress } from '../utils/storage';
import { playSound } from '../utils/sound';
import { getLocalDateKey } from '../utils/date';

interface StatsModalProps {
  onClose: () => void;
}

export default function StatsModal({ onClose }: StatsModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const progress = getStoredProgress();
  const completedCount = Object.keys(progress.completedActivities).length;

  const handleReset = () => {
    if (window.confirm("Voulez-vous réinitialiser votre progression ?")) {
      saveStoredProgress({
        completedActivities: {},
        scores: {},
        xp: 0,
        streakDays: 1,
        lastActiveDate: getLocalDateKey(),
        bookmarks: [],
      });
      playSound('click');
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" role="dialog" aria-modal="true" aria-labelledby="stats-dialog-title">
      <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-3xl p-5 shadow-2xl relative">
        <button type="button" aria-label="Fermer les statistiques"
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h3 id="stats-dialog-title" className="text-lg font-black text-white">Vos Succès & Statistiques</h3>
            <p className="text-xs text-amber-300 font-medium">Progression Collège Mobile</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex flex-col items-center text-center">
            <Sparkles className="w-6 h-6 text-indigo-400 mb-1" />
            <span className="text-2xl font-black text-white">{progress.xp} XP</span>
            <span className="text-[11px] text-slate-400">Points d'Expérience</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex flex-col items-center text-center">
            <Flame className="w-6 h-6 text-amber-500 fill-amber-500 mb-1" />
            <span className="text-2xl font-black text-white">{progress.streakDays} Jours</span>
            <span className="text-[11px] text-slate-400">Série d'Assiduité</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex flex-col items-center text-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 mb-1" />
            <span className="text-2xl font-black text-white">{completedCount}</span>
            <span className="text-[11px] text-slate-400">Activités Complétées</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex flex-col items-center text-center">
            <Award className="w-6 h-6 text-sky-400 mb-1" />
            <span className="text-2xl font-black text-white">
              {progress.xp > 300 ? 'Expert' : progress.xp > 100 ? 'Avancé' : 'Débutant'}
            </span>
            <span className="text-[11px] text-slate-400">Niveau d'Élève</span>
          </div>
        </div>

        {/* Badges Earned */}
        <div className="mb-5 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-3.5">
          <h4 className="text-xs font-extrabold uppercase text-slate-300 tracking-wider mb-2">
            Badges Débloqués
          </h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1">
              🚀 Premier Pas
            </span>
            {completedCount >= 5 && (
              <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1">
                📚 Lecteur Assidu
              </span>
            )}
            {progress.streakDays >= 3 && (
              <span className="px-2.5 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1">
                🔥 Toujours Fidèle
              </span>
            )}
            {completedCount >= 10 && (
              <span className="px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center gap-1">
                🎓 Champion du Collège
              </span>
            )}
          </div>
        </div>

        {/* Reset Action */}
        <div className="flex justify-between items-center pt-2 border-t border-slate-800">
          <button
            onClick={handleReset}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 hover:underline transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Réinitialiser
          </button>
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
