import { UserProgress } from '../types/app';
import { calculateActivityXp, calculateStreak } from '../features/progression/progressRules';
import { readProgress, writeProgress } from '../services/progress/progressStorage';
const FRAME_KEY = 'francais_college_frame_mode';

export function getStoredProgress(): UserProgress {
  return readProgress();
}

export function saveStoredProgress(progress: UserProgress): void {
  writeProgress(progress);
}

export function markActivityComplete(
  levelId: string,
  semesterId: string,
  unitId: number | string,
  activityId: number | string,
  score: number = 100
): UserProgress {
  const current = getStoredProgress();
  const key = `${levelId}_${semesterId}_${unitId}_${activityId}`;

  const wasCompleted = current.completedActivities[key];
  const updatedCompleted = { ...current.completedActivities, [key]: true };
  const updatedScores = {
    ...current.scores,
    [key]: Math.max(current.scores[key] || 0, score),
  };

  const streak = calculateStreak(current.streakDays, current.lastActiveDate);
  const addedXp = calculateActivityXp(Boolean(wasCompleted), score);

  const updated: UserProgress = {
    ...current,
    completedActivities: updatedCompleted,
    scores: updatedScores,
    xp: current.xp + addedXp,
    streakDays: streak.streakDays,
    lastActiveDate: streak.lastActiveDate,
  };

  saveStoredProgress(updated);
  return updated;
}

export function toggleBookmark(activityKey: string): boolean {
  const current = getStoredProgress();
  const exists = current.bookmarks.includes(activityKey);
  const newBookmarks = exists
    ? current.bookmarks.filter((bookmark) => bookmark !== activityKey)
    : [...current.bookmarks, activityKey];

  saveStoredProgress({ ...current, bookmarks: newBookmarks });
  return !exists;
}

export function getFrameMode(): 'smartphone' | 'fullscreen' {
  if (typeof window === 'undefined') return 'smartphone';
  const stored = localStorage.getItem(FRAME_KEY);
  return stored === 'fullscreen' ? 'fullscreen' : 'smartphone';
}

export function setFrameMode(mode: 'smartphone' | 'fullscreen'): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(FRAME_KEY, mode);
}
