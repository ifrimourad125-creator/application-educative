const SOUND_KEY = 'sound_muted';

export function isSoundMuted(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(SOUND_KEY) === 'true';
}

export function setSoundMuted(muted: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SOUND_KEY, muted ? 'true' : 'false');
  window.dispatchEvent(new Event('sound_preference_change'));
}

export function subscribeSoundPreference(callback: (enabled: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback(!isSoundMuted());
  window.addEventListener('sound_preference_change', handler);
  return () => window.removeEventListener('sound_preference_change', handler);
}
