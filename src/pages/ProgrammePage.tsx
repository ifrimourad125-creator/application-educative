import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search, ChevronRight, Headphones, CheckCircle2, Filter, Rocket, Trophy } from 'lucide-react';
import { levels } from '../data/levels';
import { playSound } from '../utils/sound';
import { getStoredProgress } from '../utils/storage';
import { formatFrenchText } from '../utils/text';

export default function ProgrammePage() {
  const navigate = useNavigate();
  const [selectedLevelId, setSelectedLevelId] = useState<string>('1ac');
  const [selectedSemesterId, setSelectedSemesterId] = useState<string>('s1');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const progress = getStoredProgress();

  const allUnitsWithMeta = levels.flatMap((lvl) =>
    lvl.semesters.flatMap((sem) =>
      sem.units.map((u) => ({
        ...u,
        levelId: lvl.id,
        levelName: lvl.short,
        levelFullName: lvl.name,
        semesterId: sem.id,
        semesterName: sem.name,
      }))
    )
  );

  const filteredUnits = allUnitsWithMeta.filter((unit) => {
    const matchQuery =
      unit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.levelName.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (searchQuery.trim().length > 0) {
      return matchQuery;
    }
    
    const matchLvl = unit.levelId === selectedLevelId;
    const matchSem = unit.semesterId === selectedSemesterId;
    return matchLvl && matchSem;
  });

  const inlineSuggestion = useMemo(() => {
    if (!searchQuery.trim()) return '';
    const searchLower = searchQuery.toLowerCase();
    const match = filteredUnits.find(u => u.title.toLowerCase().startsWith(searchLower));
    return match ? match.title : '';
  }, [searchQuery, filteredUnits]);

  const headerStyleMap: Record<string, { bg: string; borderColor: string; shadow: string; subtitleColor: string }> = {
    '1ac': {
      bg: 'from-[#00d2ff] to-[#0033ff]',
      borderColor: 'bg-[#00d2ff]',
      shadow: 'shadow-[0_12px_40px_rgba(0,51,255,0.5)]',
      subtitleColor: 'text-blue-100',
    },
    '2ac': {
      bg: 'from-[#f107a3] to-[#7b2ff7]',
      borderColor: 'bg-[#f107a3]',
      shadow: 'shadow-[0_12px_40px_rgba(123,47,247,0.5)]',
      subtitleColor: 'text-fuchsia-100',
    },
    '3ac': {
      bg: 'from-amber-400 via-orange-500 to-amber-600',
      borderColor: 'bg-amber-400',
      shadow: 'shadow-[0_12px_40px_rgba(245,158,11,0.5)]',
      subtitleColor: 'text-orange-50',
    },
  };

  const headerStyle = headerStyleMap[selectedLevelId] || headerStyleMap['1ac'];

  return (
    <div className="flex-1 flex flex-col p-3.5 sm:p-5 space-y-4 max-w-4xl mx-auto w-full pb-4 sm:pb-6">
      {/* Programme Header */}
      <div className={`relative overflow-hidden rounded-[24px] p-[1.5px] ${headerStyle.shadow} transition-colors duration-500`}>
        {/* Base border color */}
        <div className={`absolute inset-0 ${headerStyle.borderColor} transition-colors duration-500`} />
        
        {/* Spinning highlight */}
        <div className="absolute inset-[-150%] origin-center animate-spin-continuous bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]" />
        
        {/* Inner Card */}
        <div className={`relative rounded-[23px] bg-gradient-to-b ${headerStyle.bg} p-6 sm:p-8 flex flex-col items-center text-center h-full w-full`}>
          <div className="flex flex-col items-center justify-center gap-3 relative z-10 w-full">
            <div className="flex items-center justify-center text-6xl sm:text-7xl shrink-0 drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] pb-1">
              📖
            </div>
            <div className="space-y-1 text-center">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">Programme de Français</h1>
              <p className={`text-sm sm:text-base ${headerStyle.subtitleColor} font-bold tracking-wide uppercase transition-colors duration-500`}>
                {filteredUnits.length} Unités - Semestre {selectedSemesterId === 's1' ? '1' : '2'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-lg mx-auto w-full bg-slate-800 border border-slate-700/80 rounded-2xl focus-within:ring-2 focus-within:ring-sky-500 shadow-sm transition-all overflow-hidden group">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 z-20 pointer-events-none group-focus-within:text-sky-400 transition-colors" />
          
          <div className="relative w-full flex">
            {/* Inline Suggestion */}
            {inlineSuggestion && inlineSuggestion.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
              <div className="absolute inset-0 pl-11 pr-4 py-3 text-sm pointer-events-none whitespace-pre overflow-hidden z-20 text-left">
                <span className="text-transparent">{searchQuery}</span>
                <span 
                  className="text-slate-400/60 font-semibold pointer-events-auto cursor-pointer hover:text-slate-300"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setSearchQuery(inlineSuggestion);
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setSearchQuery(inlineSuggestion);
                  }}
                >
                  {inlineSuggestion.slice(searchQuery.length)}
                </span>
              </div>
            )}
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if ((e.key === 'Tab' || e.key === 'ArrowRight') && inlineSuggestion) {
                  e.preventDefault();
                  setSearchQuery(inlineSuggestion);
                } else if (e.key === 'Enter' && searchQuery.trim().length > 0) {
                  e.preventDefault();
                  const match = filteredUnits.find(u => u.title.toLowerCase() === inlineSuggestion.toLowerCase()) || filteredUnits[0];
                  if (match) {
                    playSound('card-open');
                    navigate(`/niveau/${match.levelId}/semestre/${match.semesterId}/unite/${match.id}`);
                  }
                }
              }}
              placeholder="Rechercher une unité ou un mot-clé..."
              className="w-full bg-transparent pl-11 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none z-10 relative"
            />
          </div>
        </div>

        {/* Level Filters */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2 pt-1 text-sm">
          {['1ac', '2ac', '3ac'].map((lvlId) => {
            let activeColor = 'bg-cyan-500 text-white shadow-lg border-2 border-cyan-400 scale-105';
            if (lvlId === '2ac') activeColor = 'bg-fuchsia-500 text-white shadow-lg border-2 border-fuchsia-400 scale-105';
            else if (lvlId === '3ac') activeColor = 'bg-amber-500 text-white shadow-lg border-2 border-amber-400 scale-105';

            return (
            <button
              key={lvlId}
              onClick={() => {
                playSound('click');
                setSelectedLevelId(lvlId);
              }}
              className={`px-5 py-2.5 rounded-xl font-black transition-all shrink-0 ${
                selectedLevelId === lvlId
                  ? activeColor
                  : 'bg-slate-800 text-slate-300 border-2 border-slate-500 hover:text-white hover:bg-slate-700'
              }`}
            >
              {lvlId.toUpperCase()}
            </button>
          )})}
          {/* Semester Toggle */}
          <button
            onClick={() => {
              playSound('click');
              setSelectedSemesterId(prev => prev === 's1' ? 's2' : 's1');
            }}
            className={`px-5 py-2.5 rounded-xl font-black transition-all shrink-0 shadow-lg border-2 active:scale-95 ml-2 ${
              selectedSemesterId === 's1'
                ? 'bg-gradient-to-b from-[#eef213] to-[#44d608] border-[#5ce319] text-slate-900 hover:brightness-110'
                : 'bg-gradient-to-b from-[#ff00cc] to-[#ff0033] border-[#ff00cc] text-white hover:brightness-110'
            }`}
          >
            {selectedSemesterId === 's1' ? 'S1' : 'S2'}
          </button>
        </div>
      </div>

      {/* Units List Grid */}
      <div className="space-y-3">
        {filteredUnits.map((unit) => {
          let doneCount = 0;
          for (let actId = 1; actId <= 8; actId++) {
            if (progress.completedActivities[`${unit.levelId}_${unit.semesterId}_${unit.id}_${actId}`]) {
              doneCount++;
            }
          }

          const levelStyleMap: Record<string, { iconBg: string; iconBorder: string; badge: string; emoji: string }> = {
            '1ac': {
              emoji: '📖',
              iconBg: 'bg-gradient-to-br from-cyan-400 to-blue-600',
              iconBorder: 'border-cyan-300/50',
              badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
            },
            '2ac': {
              emoji: '🚀',
              iconBg: 'bg-gradient-to-br from-fuchsia-400 to-purple-600',
              iconBorder: 'border-fuchsia-300/50',
              badge: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
            },
            '3ac': {
              emoji: '🏆',
              iconBg: 'bg-gradient-to-br from-amber-400 to-orange-600',
              iconBorder: 'border-amber-300/50',
              badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
            },
          };

          const style = levelStyleMap[unit.levelId] || levelStyleMap['1ac'];

          return (
            <button
              key={`${unit.levelId}-${unit.semesterId}-${unit.id}`}
              onClick={() => {
                playSound('card-open');
                navigate(`/niveau/${unit.levelId}/semestre/${unit.semesterId}/unite/${unit.id}`);
              }}
              className="w-full text-left p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border-2 border-slate-700/80 hover:bg-slate-800/90 hover:border-slate-600 transition-all duration-200 group relative flex items-center justify-between gap-3 shadow-lg"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${style.iconBg} border ${style.iconBorder} flex items-center justify-center shrink-0 shadow-md z-10 group-hover:scale-105 transition-transform`}>
                <span className="text-2xl sm:text-3xl leading-none select-none filter drop-shadow flex items-center justify-center">{unit.emoji || style.emoji}</span>
              </div>

              <div className="min-w-0 flex-1 pr-1 z-10">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] sm:text-xs font-black uppercase px-2 py-0.5 rounded-md border ${style.badge}`}>
                    {unit.levelName}
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-400 font-bold">{unit.semesterName}</span>
                  <span className="text-[10px] sm:text-xs text-slate-500 font-bold">• Unité {unit.id}</span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-100 leading-snug group-hover:text-white transition-colors">
                  {formatFrenchText(unit.title)}
                </h3>

                <div className="mt-2.5 flex items-center gap-3">
                  <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden border border-slate-700">
                    <div
                      className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(doneCount / 8) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-black text-emerald-400 shrink-0">
                    {doneCount}/8 Complété
                  </span>
                </div>
              </div>

              <div className="p-2 sm:p-2.5 rounded-xl bg-slate-800 border border-slate-700 group-hover:bg-slate-700 group-hover:border-slate-600 transition shrink-0 z-10 flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
