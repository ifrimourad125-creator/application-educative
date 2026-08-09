import { UserProgress } from '../../types/app';
import { getLocalDateKey } from '../../utils/date';

export const PROGRESS_STORAGE_KEY = 'francais_college_mobile_progress_v2';

type StoredProgress = Partial<UserProgress> & Record<string, unknown>;

export function createDefaultProgress(): UserProgress {
  return {
    completedActivities: {},
    scores: {},
    xp: 120,
    streakDays: 1,
    lastActiveDate: getLocalDateKey(),
    bookmarks: [],
  };
}

export function normalizeProgress(value: unknown): UserProgress {
  const defaults = createDefaultProgress();
  if (!value || typeof value !== 'object') return defaults;
  const parsed = value as StoredProgress;

  return {
    completedActivities:
      parsed.completedActivities && typeof parsed.completedActivities === 'object'
        ? parsed.completedActivities as Record<string, boolean>
        : defaults.completedActivities,
    scores:
      parsed.scores && typeof parsed.scores === 'object'
        ? parsed.scores as Record<string, number>
        : defaults.scores,
    xp: typeof parsed.xp === 'number' && Number.isFinite(parsed.xp) ? parsed.xp : defaults.xp,
    streakDays:
      typeof parsed.streakDays === 'number' && Number.isFinite(parsed.streakDays)
        ? parsed.streakDays
        : defaults.streakDays,
    lastActiveDate:
      typeof parsed.lastActiveDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(parsed.lastActiveDate)
        ? parsed.lastActiveDate
        : defaults.lastActiveDate,
    bookmarks: Array.isArray(parsed.bookmarks)
      ? parsed.bookmarks.filter((bookmark): bookmark is string => typeof bookmark === 'string')
      : defaults.bookmarks,
  };
}

export function readProgress(): UserProgress {
  if (typeof window === 'undefined') return createDefaultProgress();
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return raw ? normalizeProgress(JSON.parse(raw)) : createDefaultProgress();
  } catch {
    return createDefaultProgress();
  }
}

export function writeProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(normalizeProgress(progress)));
  } catch {
    // Storage may be unavailable or quota-limited.
  }
}
