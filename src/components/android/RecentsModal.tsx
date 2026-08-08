import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layers, X, ChevronRight, RotateCcw } from 'lucide-react';
import { playSound } from '../../utils/sound';

interface Props { open: boolean; onClose: () => void; }

const tasks = [
  { title: 'Tableau de Bord', path: '/', icon: '🏠', desc: "Vue d'ensemble et niveaux", theme: 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700', iconBg: 'bg-white/10 border-white/10 text-white' },
  { title: '1ère Année (1AC)', path: '/niveau/1ac', icon: '📖', desc: '7ème A.E.C - Semestres 1 & 2', theme: 'bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-cyan-800/50 hover:from-cyan-800/50 hover:to-blue-800/50', iconBg: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300' },
  { title: '2ème Année (2AC)', path: '/niveau/2ac', icon: '🚀', desc: '8ème A.E.C - Semestres 1 & 2', theme: 'bg-gradient-to-br from-fuchsia-900/40 to-purple-900/40 border-fuchsia-800/50 hover:from-fuchsia-800/50 hover:to-purple-800/50', iconBg: 'bg-fuchsia-500/20 border-fuchsia-500/30 text-fuchsia-300' },
  { title: '3ème Année (3AC)', path: '/niveau/3ac', icon: '🏆', desc: '9ème A.E.C - Semestres 1 & 2', theme: 'bg-gradient-to-br from-amber-900/40 to-orange-900/40 border-amber-800/50 hover:from-amber-800/50 hover:to-orange-800/50', iconBg: 'bg-amber-500/20 border-amber-500/30 text-amber-300' },
  { title: "Audios de l'Oral", path: '/audio-hub', icon: '🎧', desc: 'Lecteur audio des dialogues', theme: 'bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-800/50 hover:from-emerald-800/50 hover:to-teal-800/50', iconBg: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' },
  { title: 'Contrôles Continus', path: '/controles', icon: '📝', desc: 'QCM et évaluations interactives', theme: 'bg-gradient-to-br from-indigo-900/40 to-violet-900/40 border-indigo-800/50 hover:from-indigo-800/50 hover:to-violet-800/50', iconBg: 'bg-indigo-500/20 border-indigo-500/30 text-indigo-300' },
  { title: 'Guide du Programme', path: '/programme', icon: '📚', desc: 'Catalogue complet des 30 unités', theme: 'bg-gradient-to-br from-sky-900/40 to-blue-900/40 border-sky-800/50 hover:from-sky-800/50 hover:to-blue-800/50', iconBg: 'bg-sky-500/20 border-sky-500/30 text-sky-300' },
  { title: 'Statistiques & Succès', path: '/progression', icon: '🏅', desc: 'Feuille de route & badges obtenus', theme: 'bg-gradient-to-br from-rose-900/40 to-pink-900/40 border-rose-800/50 hover:from-rose-800/50 hover:to-pink-800/50', iconBg: 'bg-rose-500/20 border-rose-500/30 text-rose-300' },
];

export default function RecentsModal({ open, onClose }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  const go = (path: string, sound: 'card-open' | 'click' = 'card-open') => { onClose(); playSound(sound); navigate(path); };
  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200" role="dialog" aria-modal="true" aria-labelledby="recents-dialog-title">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3"><div className="flex items-center gap-2 text-sky-400 font-black text-sm"><Layers className="w-5 h-5 text-sky-400" /><span id="recents-dialog-title">Tâches Ouvertes</span></div><button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white" aria-label="Fermer"><X className="w-5 h-5" aria-hidden="true" /></button></div>
      <div className="flex-1 overflow-y-auto my-4 space-y-3 max-w-md mx-auto w-full"><p className="text-xs font-semibold text-slate-400 text-center mb-2">Passez d'une section à l'autre</p>
        {tasks.map((task) => (
          <button key={task.path} onClick={() => go(task.path)} className={`relative overflow-hidden w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${location.pathname === task.path ? 'bg-slate-800/90 border-sky-500/60 shadow-[inset_0_0_20px_rgba(14,165,233,0.15)] ring-1 ring-sky-500/50' : task.theme}`}>
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-white/10 pointer-events-none" />
            <div className="flex items-center gap-3.5 min-w-0 flex-1 z-10 relative"><div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200 border ${location.pathname === task.path ? 'bg-sky-500/20 border-sky-500/30 text-sky-300' : task.iconBg}`}><span className="text-2xl leading-none select-none flex items-center justify-center">{task.icon}</span></div><div className="min-w-0 flex-1 pr-1"><h4 className={`text-[13px] font-black transition-colors leading-snug drop-shadow-sm ${location.pathname === task.path ? 'text-sky-300' : 'text-white group-hover:text-white/95'}`}>{task.title}</h4><p className={`text-[11px] font-medium line-clamp-1 mt-0.5 drop-shadow-sm ${location.pathname === task.path ? 'text-sky-200/70' : 'text-white/70 group-hover:text-white/80'}`}>{task.desc}</p></div></div>
            <div className={`p-2 rounded-xl border transition-all shrink-0 ml-2 z-10 flex items-center justify-center group-hover:scale-110 ${location.pathname === task.path ? 'bg-sky-500/20 border-sky-500/30 text-sky-400' : 'bg-white/5 border-white/10 text-white/50 group-hover:bg-white/10 group-hover:text-white/90'}`}><ChevronRight className="w-4 h-4 text-current" /></div>
          </button>
        ))}
      </div>
      <div className="pt-2 border-t border-slate-800 flex items-center justify-center"><button onClick={() => go('/', 'click')} className="px-5 py-2.5 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-400 font-extrabold text-xs flex items-center gap-2 transition"><RotateCcw className="w-3.5 h-3.5" /><span>Tout Fermer & Revenir à l'Accueil</span></button></div>
    </div>
  );
}
