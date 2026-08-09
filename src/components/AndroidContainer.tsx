import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { isSoundMuted, setSoundMuted, playSound } from '../utils/sound';
import { getStoredProgress } from '../utils/storage';
import { getSearchableUnits } from '../selectors/catalogSelectors';
import { useClock } from '../hooks/useClock';
import { useFrameMode } from '../hooks/useFrameMode';
import StatsModal from './StatsModal';
import DesktopControls from './android/DesktopControls';
import BottomNavigation from './android/BottomNavigation';
import SystemNavigationBar from './android/SystemNavigationBar';
import SearchModal from './android/SearchModal';
import RecentsModal from './android/RecentsModal';

interface AndroidContainerProps {
  children: React.ReactNode;
}

export default function AndroidContainer({ children }: AndroidContainerProps) {
  const [muted, setMutedState] = useState(isSoundMuted());
  const [showSearch, setShowSearch] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showRecents, setShowRecents] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const location = useLocation();
  // Keep progress initialization here for compatibility with the existing shell.
  getStoredProgress();

  const { frameMode, toggleFrameMode } = useFrameMode();
  useClock(); // Kept available for shell integrations without changing the existing visual shell.

  const allUnits = useMemo(() => getSearchableUnits(), []);

  const filteredUnits = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return allUnits.filter((u) =>
      u.title.toLowerCase().includes(query) ||
      u.levelName.toLowerCase().includes(query) ||
      u.semesterName.toLowerCase().includes(query)
    );
  }, [allUnits, searchQuery]);

  const handleToggleMute = () => {
    const newMuted = !muted;
    setMutedState(newMuted);
    setSoundMuted(newMuted);
    if (!newMuted) playSound('click');
  };

  const handleToggleFrame = () => {
    toggleFrameMode();
    playSound('click');
  };

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-3 focus:left-3 focus:rounded-xl focus:bg-sky-500 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white">Aller au contenu principal</a>
    <div className={`h-[100dvh] sm:h-auto sm:min-h-screen w-full transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'} flex flex-col items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden sm:overflow-x-hidden font-sans`}>
      <DesktopControls
        frameMode={frameMode}
        muted={muted}
        isDarkMode={isDarkMode}
        onToggleFrame={handleToggleFrame}
        onToggleMute={handleToggleMute}
        onToggleTheme={() => setIsDarkMode((value) => !value)}
        onOpenSearch={() => setShowSearch(true)}
        onOpenStats={() => setShowStats(true)}
      />

      <div className={`w-full h-full sm:h-auto transition-all duration-300 relative flex flex-col ${
        frameMode === 'smartphone'
          ? 'sm:max-w-[430px] sm:h-[860px] sm:max-h-[92vh] sm:rounded-[48px] sm:border-[10px] sm:border-slate-800 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] sm:ring-1 sm:ring-slate-700/50'
          : 'max-w-4xl sm:min-h-[90vh] sm:rounded-2xl sm:border sm:border-slate-800 sm:shadow-2xl'
      } ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'} overflow-hidden`}>
        {frameMode === 'smartphone' && (
          <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-800 rounded-b-xl z-50 pointer-events-none">
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-950 rounded-full border border-slate-700" />
          </div>
        )}

        <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col overflow-y-auto min-h-0 relative scrollbar-thin scrollbar-thumb-slate-700">
          {children}
        </main>

        <BottomNavigation pathname={location.pathname} isDarkMode={isDarkMode} />
        <SystemNavigationBar isDarkMode={isDarkMode} onShowRecents={() => setShowRecents(true)} />
      </div>

      <SearchModal
        open={showSearch}
        query={searchQuery}
        units={filteredUnits}
        onClose={() => setShowSearch(false)}
        onQueryChange={setSearchQuery}
      />

      {showStats && <StatsModal onClose={() => setShowStats(false)} />}

      <RecentsModal open={showRecents} onClose={() => setShowRecents(false)} />
    </div>
    </>
  );
}
