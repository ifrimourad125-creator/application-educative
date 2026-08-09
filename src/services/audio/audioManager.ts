import { isSoundMuted } from './audioPreferences';

let audioContext: AudioContext | null = null;
let clickAudio: HTMLAudioElement | null = null;
let correctAudio: HTMLAudioElement | null = null;
let wrongAudio: HTMLAudioElement | null = null;

if (typeof window !== 'undefined') {
  clickAudio = new Audio('/clic.mp3');
  correctAudio = new Audio('/correct.mp3');
  wrongAudio = new Audio('/error1.mp3');
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioContext) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) audioContext = new AudioCtx();
  }
  if (audioContext?.state === 'suspended') audioContext.resume().catch(() => {});
  return audioContext;
}

export function primeAudio(): void {
  const ctx = getAudioContext();
  if (ctx?.state === 'suspended') ctx.resume().catch(() => {});
}

function vibrate(type: string): void {
  if (typeof navigator === 'undefined' || !('vibrate' in navigator)) return;
  try {
    if (type === 'correct' || type === 'correct-answer' || type === 'success') navigator.vibrate([15, 30, 15]);
    else if (type === 'wrong' || type === 'wrong-answer' || type === 'error') navigator.vibrate(30);
    else navigator.vibrate(5);
  } catch {
    // Haptics are optional.
  }
}

function playSynthetic(type: string): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  const profiles: Record<string, [number, number, number, number]> = {
    correct: [523.25, 880, 0.08, 0.3],
    'correct-answer': [523.25, 880, 0.08, 0.3],
    success: [523.25, 880, 0.08, 0.3],
    wrong: [300, 150, 0.08, 0.3],
    'wrong-answer': [300, 150, 0.08, 0.3],
    error: [300, 150, 0.08, 0.3],
    'card-open': [800, 400, 0.04, 0.1],
    pop: [800, 400, 0.04, 0.1],
    startup: [392, 659.25, 0.15, 0.2],
    'startup-soft': [392, 659.25, 0.15, 0.2],
  };
  const [from, to, duration, volume] = profiles[type] ?? [600, 600, 0.03, 0.1];

  osc.type = 'sine';
  osc.frequency.setValueAtTime(from, now);
  if (from !== to) osc.frequency.exponentialRampToValueAtTime(to, now + Math.min(duration, 0.1));
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.start(now);
  osc.stop(now + duration);
}

function playElement(audio: HTMLAudioElement | null, fallback: () => void): void {
  if (!audio) return void fallback();
  audio.currentTime = 0;
  audio.play().catch(fallback);
}

export function playSound(type: string): void {
  if (isSoundMuted()) return;
  vibrate(type);

  const clickTypes = new Set(['click', 'back-click', 'back', 'answer-click', 'answerClick', 'sound-toggle']);
  if (clickTypes.has(type)) return playElement(clickAudio, () => playSynthetic(type));
  if (type === 'correct' || type === 'correct-answer' || type === 'success') {
    return playElement(correctAudio, () => playSynthetic(type));
  }
  if (type === 'wrong' || type === 'wrong-answer' || type === 'error') {
    return playElement(wrongAudio, () => playSynthetic(type));
  }
  playSynthetic(type);
}
