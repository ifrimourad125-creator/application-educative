import { levels } from '../data/levels';
import { activities } from '../data/activities';
import { Activity, Level, SelectedUnit } from '../types/app';

export function findLevel(levelId?: string): Level | undefined {
  return levels.find((level) => level.id === levelId);
}

export function findSelectedUnit(
  levelId?: string,
  semesterId?: string,
  unitId?: string,
): SelectedUnit | undefined {
  const level = findLevel(levelId);
  const semester = level?.semesters.find((item) => item.id === semesterId);
  const unit = semester?.units.find((item) => String(item.id) === String(unitId));
  if (!level || !semester || !unit) return undefined;
  return {
    ...unit,
    levelId: level.id,
    semesterId: semester.id,
  };
}

export function findActivity(activityId?: string): Activity | undefined {
  return activities.find((activity) => String(activity.id) === String(activityId));
}

export function getSearchableUnits() {
  return levels.flatMap((level) =>
    level.semesters.flatMap((semester) =>
      semester.units.map((unit) => ({
        ...unit,
        levelId: level.id,
        levelName: level.short,
        semesterId: semester.id,
        semesterName: semester.name,
      })),
    ),
  );
}
