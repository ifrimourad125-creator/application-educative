export type LevelId = "1ac" | "2ac" | "3ac" | string;
export type SemesterId = "s1" | "s2" | string;
export type ActivityId = number;

export type Unit = {
  id: number;
  title: string;
  emoji?: string;
  levelId?: LevelId;
  semesterId?: SemesterId;
  description?: string;
  badge?: string;
};

export type Semester = {
  id: SemesterId;
  name: string;
  units: Unit[];
};

export type Level = {
  icon?: string;
  id: LevelId;
  name: string;
  short: string;
  gradeLabel?: string;
  semesters: Semester[];
};

export type Activity = {
  id: ActivityId;
  title: string;
  icon: string;
  description: string;
  category?: string;
  estimatedMinutes?: number;
};

export type SelectedUnit = Unit & {
  levelId: LevelId;
  semesterId: SemesterId;
};

export type UserProgress = {
  completedActivities: Record<string, boolean>; // key: `${levelId}_${semesterId}_${unitId}_${activityId}`
  scores: Record<string, number>; // key: activity Key, value: percentage or score
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  bookmarks: string[]; // activity keys
};
