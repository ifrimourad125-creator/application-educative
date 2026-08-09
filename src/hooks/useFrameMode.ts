import { useCallback, useState } from 'react';
import { getFrameMode, setFrameMode } from '../utils/storage';

export function useFrameMode() {
  const [frameMode, setFrameState] = useState<'smartphone' | 'fullscreen'>(() => getFrameMode());

  const toggleFrameMode = useCallback(() => {
    const next = frameMode === 'smartphone' ? 'fullscreen' : 'smartphone';
    setFrameState(next);
    setFrameMode(next);
    return next;
  }, [frameMode]);

  return { frameMode, toggleFrameMode };
}
