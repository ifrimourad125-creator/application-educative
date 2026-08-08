import { getLocalDateKey, getPreviousLocalDateKey } from '../../utils/date';

export function calculateStreak(
  currentStreak: number,
  lastActiveDate: string,
  now: Date = new Date(),
): { streakDays: number; lastActiveDate: string } {
  const today = getLocalDateKey(now);

  if (lastActiveDate === today) {
    return { streakDays: currentStreak, lastActiveDate: today };
  }

  const yesterday = getPreviousLocalDateKey(now);
  return {
    streakDays: lastActiveDate === yesterday ? currentStreak + 1 : 1,
    lastActiveDate: today,
  };
}

export function calculateActivityXp(
  wasCompleted: boolean,
  score: number,
): number {
  return wasCompleted ? 10 : 50 + Math.round(score / 2);
}
