import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, Headphones, ClipboardList, Trophy } from 'lucide-react';
import { playSound } from '../../utils/sound';

interface Props { pathname: string; isDarkMode: boolean; }

const items = [
  { path: '/', label: 'Accueil', Icon: Home, active: 'bg-sky-500/15 text-sky-400 font-bold scale-105' },
  { path: '/programme', label: 'Programme', Icon: BookOpen, active: 'bg-sky-500/15 text-sky-400 font-bold scale-105' },
  { path: '/audio-hub', label: 'Audio', Icon: Headphones, active: 'bg-sky-500/15 text-sky-400 font-bold scale-105' },
  { path: '/controles', label: 'Contrôles', Icon: ClipboardList, iconClass: 'text-indigo-400', active: 'bg-indigo-500/20 text-indigo-400 font-bold scale-105' },
  { path: '/progression', label: 'Succès', Icon: Trophy, iconClass: 'text-amber-400', active: 'bg-amber-500/15 text-amber-400 font-bold scale-105' },
];

export default function BottomNavigation({ pathname, isDarkMode }: Props) {
  return (
    <nav aria-label="Navigation principale" className={`w-full px-2 py-1.5 flex items-center justify-around border-t ${isDarkMode ? 'bg-slate-900/98 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'} backdrop-blur-lg sticky bottom-0 z-40 shrink-0 select-none shadow-lg`}>
      {items.map(({ path, label, Icon, iconClass, active }) => {
        const activeRoute = pathname === path;
        return (
          <Link key={path} to={path} onClick={() => playSound('click')} aria-current={activeRoute ? "page" : undefined} className={`flex flex-col items-center py-1 px-3 rounded-2xl transition-all ${activeRoute ? active : 'hover:text-slate-200'}`}>
            <Icon className={`w-5 h-5 mb-0.5 ${iconClass ?? ''}`} />
            <span className="text-[10px]">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
