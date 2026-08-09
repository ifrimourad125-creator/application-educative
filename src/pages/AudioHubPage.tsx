import React, { useEffect, useState } from 'react';
import { Headphones, Play, Pause, RotateCcw, Volume2, Sparkles, BookOpen, Search, CheckCircle2 } from 'lucide-react';
import { audioManifest, getPedagogicalAudioPath } from '../data/audioManifest';
import { playSound } from '../utils/sound';

export default function AudioHubPage() {
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('1AC');
  const [selectedSemester, setSelectedSemester] = useState<string>('S1');
  const [activeAudioObj, setActiveAudioObj] = useState<HTMLAudioElement | null>(null);

  const filteredManifest = audioManifest.filter((item) => {
    const matchesSearch =
      item.session.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.originalText.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (searchQuery.trim().length > 0) {
      return matchesSearch;
    }
    
    const matchesLevel = item.level === selectedLevel;
    const matchesSemester = item.semester === selectedSemester;
    return matchesLevel && matchesSemester;
  });

  const handlePlayTrack = (track: typeof audioManifest[0]) => {
    playSound('click');
    if (activeAudioObj) {
      activeAudioObj.pause();
    }

    if (currentTrackId === track.id && isPlaying) {
      setIsPlaying(false);
      setCurrentTrackId(null);
      setActiveAudioObj(null);
      return;
    }

    const path = getPedagogicalAudioPath(track.oldAudioPath);
    const newAudio = new Audio(path);
    newAudio.play().then(() => {
      setIsPlaying(true);
      setCurrentTrackId(track.id);
      setActiveAudioObj(newAudio);
    }).catch(() => {
      // Audio file fallback simulated playback
      setIsPlaying(true);
      setCurrentTrackId(track.id);
    });

    newAudio.onended = () => {
      setIsPlaying(false);
      setCurrentTrackId(null);
    };
  };

  useEffect(() => {
    return () => {
      if (activeAudioObj) {
        activeAudioObj.pause();
        activeAudioObj.src = '';
      }
    };
  }, [activeAudioObj]);

  const currentTrackObj = audioManifest.find((item) => item.id === currentTrackId);

  const headerStyleMap: Record<string, { bg: string; borderColor: string; shadow: string; subtitleColor: string }> = {
    '1AC': {
      bg: 'from-[#00d2ff] to-[#0033ff]',
      borderColor: 'bg-[#00d2ff]',
      shadow: 'shadow-[0_12px_40px_rgba(0,51,255,0.5)]',
      subtitleColor: 'text-blue-100',
    },
    '2AC': {
      bg: 'from-[#f107a3] to-[#7b2ff7]',
      borderColor: 'bg-[#f107a3]',
      shadow: 'shadow-[0_12px_40px_rgba(123,47,247,0.5)]',
      subtitleColor: 'text-fuchsia-100',
    },
    '3AC': {
      bg: 'from-amber-400 via-orange-500 to-amber-600',
      borderColor: 'bg-amber-400',
      shadow: 'shadow-[0_12px_40px_rgba(245,158,11,0.5)]',
      subtitleColor: 'text-orange-50',
    },
  };

  const headerStyle = headerStyleMap[selectedLevel] || headerStyleMap['1AC'];

  return (
    <div className="flex-1 flex flex-col p-3.5 sm:p-5 space-y-4 max-w-4xl mx-auto w-full pb-4 sm:pb-6">
      {/* Header Card */}
      <div className={`relative overflow-hidden rounded-[24px] p-[1.5px] ${headerStyle.shadow} transition-colors duration-500`}>
        {/* Base border color */}
        <div className={`absolute inset-0 ${headerStyle.borderColor} transition-colors duration-500`} />
        
        {/* Spinning highlight */}
        <div className="absolute inset-[-150%] origin-center animate-spin-continuous bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]" />
        
        {/* Inner Card */}
        <div className={`relative rounded-[23px] bg-gradient-to-b ${headerStyle.bg} p-6 sm:p-8 flex flex-col items-center text-center h-full w-full`}>
          <div className="flex flex-col items-center justify-center gap-3 relative z-10 w-full">
            <div className="flex items-center justify-center text-6xl sm:text-7xl shrink-0 drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] pb-1">
              🎧
            </div>
            <div className="space-y-1 text-center">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">Médiathèque Audio</h1>
              <p className={`text-sm sm:text-base ${headerStyle.subtitleColor} font-bold tracking-wide uppercase transition-colors duration-500`}>
                {filteredManifest.length} Audios - Semestre {selectedSemester === 'S1' ? '1' : '2'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Speed & Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative max-w-lg mx-auto w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un thème (ex: Santé, Villes, Métiers)..."
            className="w-full bg-slate-800 border border-slate-700/80 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm transition-all"
          />
        </div>

        {/* Level Pills */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2 pt-1 text-sm">
          {['1AC', '2AC', '3AC'].map((lvl) => {
            let activeColor = 'bg-cyan-500 text-white shadow-lg border-2 border-cyan-400 scale-105';
            if (lvl === '2AC') activeColor = 'bg-fuchsia-500 text-white shadow-lg border-2 border-fuchsia-400 scale-105';
            else if (lvl === '3AC') activeColor = 'bg-amber-500 text-white shadow-lg border-2 border-amber-400 scale-105';

            return (
            <button
              key={lvl}
              onClick={() => {
                playSound('click');
                setSelectedLevel(lvl);
              }}
              className={`px-5 py-2.5 rounded-xl font-black transition-all shrink-0 ${
                selectedLevel === lvl
                  ? activeColor
                  : 'bg-slate-800 text-slate-300 border-2 border-slate-500 hover:text-white hover:bg-slate-700'
              }`}
            >
              {lvl}
            </button>
            )
          })}
          
          {/* Semester Toggle */}
          <button
            onClick={() => {
              playSound('click');
              setSelectedSemester(prev => prev === 'S1' ? 'S2' : 'S1');
            }}
            className={`px-5 py-2.5 rounded-xl font-black transition-all shrink-0 shadow-lg border-2 active:scale-95 ml-2 ${
              selectedSemester === 'S1'
                ? 'bg-gradient-to-b from-[#eef213] to-[#44d608] border-[#5ce319] text-slate-900 hover:brightness-110'
                : 'bg-gradient-to-b from-[#ff00cc] to-[#ff0033] border-[#ff00cc] text-white hover:brightness-110'
            }`}
          >
            {selectedSemester}
          </button>
        </div>
      </div>

      {/* Currently Playing Sticky Mini Player */}
      {currentTrackObj && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-sky-900/90 to-indigo-900/90 border border-sky-400/40 shadow-xl flex flex-col gap-2 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-sky-400/20 text-sky-300 flex items-center justify-center shrink-0">
                <Volume2 className="w-4 h-4 animate-bounce" />
              </div>
              <div className="truncate">
                <span className="text-[10px] font-extrabold uppercase text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded">
                  {currentTrackObj.level} - Unité {currentTrackObj.unit}
                </span>
                <h4 className="text-xs font-bold text-white truncate mt-0.5">
                  {currentTrackObj.session}
                </h4>
              </div>
            </div>

            <button
              onClick={() => handlePlayTrack(currentTrackObj)}
              className="p-2.5 rounded-full bg-sky-500 text-white shadow-md hover:bg-sky-400 active:scale-95 transition"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80 text-[11px] leading-relaxed text-slate-200 max-h-32 overflow-y-auto">
            <p className="font-semibold text-sky-300 mb-1">Transcription du texte :</p>
            {currentTrackObj.cleanedText || currentTrackObj.originalText}
          </div>
        </div>
      )}

      {/* Audio Track List */}
      <div className="space-y-3">
        {filteredManifest.map((track) => {
          const isSelected = currentTrackId === track.id;

          return (
            <div
              key={track.id}
              className={`p-4 rounded-3xl border-2 shadow-lg transition-all duration-300 flex flex-col gap-3 group relative overflow-hidden ${
                isSelected
                  ? 'bg-sky-900/40 border-sky-400/50 backdrop-blur-md'
                  : 'bg-slate-900/80 hover:bg-slate-800/90 border-slate-700/80 backdrop-blur-md hover:border-slate-600'
              }`}
            >
              {isSelected && <div className="absolute top-0 left-0 w-1 h-full bg-sky-400 rounded-l-3xl" />}
              <div className="flex items-center justify-between gap-3 relative z-10">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-3 rounded-2xl shrink-0 transition-colors duration-300 shadow-inner ${
                    isSelected 
                      ? 'bg-gradient-to-br from-sky-400 to-blue-600 text-white border-transparent shadow-sky-500/30' 
                      : 'bg-slate-800/80 border-slate-700/60 text-sky-400 group-hover:bg-slate-700 group-hover:text-sky-300'
                  }`}>
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${
                        isSelected ? 'text-sky-200 bg-sky-500/30 border-sky-400/40' : 'text-sky-300 bg-sky-500/10 border-sky-500/20'
                      }`}>
                        {track.level} S{track.semester} U{track.unit}
                      </span>
                    </div>
                    <h3 className={`text-sm font-bold truncate mt-1 transition-colors ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                      {track.session}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => handlePlayTrack(track)}
                  className={`p-2.5 sm:px-4 sm:py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-md ${
                    isSelected && isPlaying
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 shadow-amber-500/30 border border-amber-300/30'
                      : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-sky-500/20 border border-sky-400/30'
                  }`}
                >
                  {isSelected && isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" /> <span className="hidden sm:inline">Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" /> <span className="hidden sm:inline">Écouter</span>
                    </>
                  )}
                </button>
              </div>

              {/* Text Preview */}
              <p className={`text-[11px] line-clamp-2 italic px-1 relative z-10 transition-colors ${isSelected ? 'text-sky-100/80' : 'text-slate-400 group-hover:text-slate-300'}`}>
                "{track.cleanedText || track.originalText}"
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
