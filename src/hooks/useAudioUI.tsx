import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { isSoundMuted, setSoundMuted, playSound as playGlobalSound } from '../utils/sound';

interface AudioUIContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playClick: () => void;
  playPop: () => void;
}

const AudioUIContext = createContext<AudioUIContextType | undefined>(undefined);

export const AudioUIProvider = ({ children }: { children: ReactNode }) => {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(isSoundMuted());
    const handlePrefChange = () => setIsMuted(isSoundMuted());
    window.addEventListener('sound_preference_change', handlePrefChange);
    return () => window.removeEventListener('sound_preference_change', handlePrefChange);
  }, []);

  const toggleMute = useCallback(() => {
    setSoundMuted(!isSoundMuted());
  }, []);

  const playClick = useCallback(() => {
    playGlobalSound('click');
  }, []);

  const playPop = useCallback(() => {
    playGlobalSound('card-open');
  }, []);

  return (
    <AudioUIContext.Provider value={{ isMuted, toggleMute, playClick, playPop }}>
      {children}
    </AudioUIContext.Provider>
  );
};

export const useAudioUI = () => {
  const context = useContext(AudioUIContext);
  if (context === undefined) {
    throw new Error('useAudioUI must be used within an AudioUIProvider');
  }
  return context;
};
