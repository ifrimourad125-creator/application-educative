import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAudioUI } from '../hooks/useAudioUI';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export function BackButton({ onClick, label = "Retour", className = "" }: BackButtonProps) {
  const { playClick } = useAudioUI();

  return (
    <button
      onClick={onClick}
      onPointerDown={playClick}
      className={`group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-cyan-400/80 text-cyan-200 font-bold text-xs sm:text-sm shadow-[0_0_10px_rgba(34,211,238,0.2)] transition-all duration-300 active:scale-95 hover:border-cyan-300 hover:text-cyan-100 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] ${className}`}
    >
      <ArrowLeft className="w-4 h-4 sm:w-4 sm:h-4 transition-colors duration-300" strokeWidth={2.5} />
      <span>{label}</span>
    </button>
  );
}
