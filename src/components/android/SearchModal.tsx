import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ChevronRight } from 'lucide-react';
import { playSound } from '../../utils/sound';

interface Unit {
  id: string | number; title: string; levelId: string; levelName: string; semesterId: string; semesterName: string;
}
interface Props { open: boolean; query: string; units: Unit[]; onClose: () => void; onQueryChange: (q: string) => void; }

export default function SearchModal({ open, query, units, onClose, onQueryChange }: Props) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-16" role="dialog" aria-modal="true" aria-labelledby="search-dialog-title">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-sky-400 font-bold"><Search className="w-5 h-5" aria-hidden="true" /><span id="search-dialog-title">Recherche d'Unités & Leçons</span></div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white" aria-label="Fermer"><X className="w-5 h-5" aria-hidden="true" /></button>
        </div>
        <input ref={inputRef} aria-label="Rechercher une unité ou une leçon" type="text" value={query} onChange={(e) => onQueryChange(e.target.value)} placeholder="Tapez le nom d'une unité, thème (ex: Santé, Villes, Métiers)..." autoFocus className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-2xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 mb-4" />
        <div className="max-h-72 overflow-y-auto space-y-2">
          {units.length > 0 ? units.map((unit) => (
            <button key={`${unit.levelId}-${unit.semesterId}-${unit.id}`} onClick={() => { onClose(); playSound('click'); navigate(`/niveau/${unit.levelId}/semestre/${unit.semesterId}/unite/${unit.id}`); }} className="w-full text-left p-3 rounded-2xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 flex items-center justify-between group transition">
              <div><div className="flex items-center gap-2"><span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">{unit.levelName}</span><span className="text-xs text-slate-400">{unit.semesterName}</span></div><p className="text-sm font-semibold text-slate-100 mt-1">Unité {unit.id}: {unit.title}</p></div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition" />
            </button>
          )) : query.trim() ? <p className="text-center py-6 text-slate-400 text-sm">Aucune unité ne correspond à "{query}".</p> : <p className="text-center py-6 text-slate-500 text-xs">Recherchez parmi les 30 unités du programme 1AC, 2AC et 3AC.</p>}
        </div>
      </div>
    </div>
  );
}
