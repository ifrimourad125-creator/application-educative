/** Backwards-compatible audio facade. Keep imports stable while audio internals live in services/audio. */
export {
  isSoundMuted,
  setSoundMuted,
  subscribeSoundPreference,
} from '../services/audio/audioPreferences';

import { isSoundMuted, setSoundMuted } from '../services/audio/audioPreferences';
import { playSound, primeAudio } from '../services/audio/audioManager';

export function isSoundEnabled(): boolean {
  return !isSoundMuted();
}

export function setSoundEnabled(enabled: boolean): void {
  setSoundMuted(!enabled);
}

export function primeSounds(): void {
  primeAudio();
}

export function playAnswerFeedback(isCorrect: boolean): void {
  playSound(isCorrect ? 'correct' : 'wrong');
}

export { playSound };
