import React from 'react';
import { Smartphone, Maximize2, Volume2, VolumeX, Sun, Moon, Search, BarChart3 } from 'lucide-react';

interface Props {
  frameMode: 'smartphone' | 'fullscreen';
  muted: boolean;
  isDarkMode: boolean;
  onToggleFrame: () => void;
  onToggleMute: () => void;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenStats: () => void;
}

export default function DesktopControls({ frameMode, muted, isDarkMode, onToggleFrame, onToggleMute, onToggleTheme, onOpenSearch, onOpenStats }: Props) {
  return (
    <div className="hidden sm:flex items-center gap-3 mb-4 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800 shadow-xl z-50 text-xs text-slate-300">
      <span className="flex items-center gap-1.5 font-medium text-emerald-400">
        <Smartphone className="w-4 h-4" /> Mode Smartphone Android
      </span>
      <div className="h-4 w-px bg-slate-700" />
      <button onClick={onToggleFrame} className="hover:text-white transition flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800" title="Changer le mode d'affichage">
        {frameMode === 'smartphone' ? <><Maximize2 className="w-3.5 h-3.5 text-sky-400" /> Plein Écran</> : <><Smartphone className="w-3.5 h-3.5 text-sky-400" /> Cadre Smartphone</>}
      </button>
      <div className="h-4 w-px bg-slate-700" />
      <button onClick={onToggleMute} className="hover:text-white transition flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800" title={muted ? 'Activer le son' : 'Couper le son'} aria-pressed={!muted} aria-label="Basculer le son">
        {muted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-sky-400" />}
        {muted ? 'Son Désactivé' : 'Son Activé'}
      </button>
      <div className="h-4 w-px bg-slate-700" />
      <button type="button" onClick={onOpenSearch} className="hover:text-white transition flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800" title="Rechercher une unité" aria-label="Rechercher une unité">
        <Search className="w-3.5 h-3.5 text-sky-400" /> Rechercher
      </button>
      <button type="button" onClick={onOpenStats} className="hover:text-white transition flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800" title="Afficher les statistiques" aria-label="Afficher les statistiques">
        <BarChart3 className="w-3.5 h-3.5 text-amber-400" /> Statistiques
      </button>
      <div className="h-4 w-px bg-slate-700" />
      <button type="button" onClick={onToggleTheme} className="hover:text-white transition flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800" aria-pressed={isDarkMode}>
        {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
        {isDarkMode ? 'Thème Clair' : 'Thème Sombre'}
      </button>
    </div>
  );
}
