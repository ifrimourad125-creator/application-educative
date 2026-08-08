import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Circle, Square } from 'lucide-react';
import { playSound } from '../../utils/sound';

interface Props { isDarkMode: boolean; onShowRecents: () => void; }

export default function SystemNavigationBar({ isDarkMode, onShowRecents }: Props) {
  const navigate = useNavigate();
  return (
    <div className={`w-full py-2 px-12 flex items-center justify-between border-t ${isDarkMode ? 'bg-slate-950 border-slate-800/80 text-slate-300' : 'bg-slate-900 border-slate-800 text-slate-300'} select-none z-50 shrink-0`}>
      <button onClick={() => { playSound('back-click'); navigate(-1); }} className="p-2 rounded-xl hover:bg-slate-800/80 active:scale-90 transition text-slate-300 hover:text-white flex items-center justify-center" title="Retour Android" aria-label="Retour Android">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={() => { playSound('click'); navigate('/'); }} className="p-2 rounded-xl hover:bg-slate-800/80 active:scale-90 transition text-slate-300 hover:text-white flex items-center justify-center" title="Accueil Android" aria-label="Accueil Android">
        <Circle className="w-4 h-4 fill-slate-300/20 stroke-[2.5]" />
      </button>
      <button onClick={() => { playSound('click'); onShowRecents(); }} className="p-2 rounded-xl hover:bg-slate-800/80 active:scale-90 transition text-slate-300 hover:text-white flex items-center justify-center" title="Applications Récentes Android" aria-label="Applications Récentes Android">
        <Square className="w-4 h-4 stroke-[2.5] rounded-xs" />
      </button>
    </div>
  );
}
