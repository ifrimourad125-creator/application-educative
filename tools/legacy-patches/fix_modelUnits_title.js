import fs from 'fs';
let content = fs.readFileSync('src/data/modelUnits.ts', 'utf8');

// We want to override the returned unit's title with the one from programData if available.
// First, import programData.
if (!content.includes("import { programData }")) {
  content = content.replace(
    /import { extraModelUnits } from "\.\/extraModelUnits"/,
    'import { extraModelUnits } from "./extraModelUnits"\nimport { programData } from "./levels"'
  );
}

// Modify normalizeModelUnit or getModelUnit.
// getModelUnit looks like:
// export function getModelUnit(levelId?: string, semesterId?: string, unitId?: string | number) {
//   if (!levelId || !semesterId || unitId === undefined || unitId === null) {
//     return null
//   }
//   return normalizeModelUnit(modelUnits[`${levelId}-${semesterId}-${unitId}`])
// }

const replaceTarget = `export function getModelUnit(levelId?: string, semesterId?: string, unitId?: string | number) {
  if (!levelId || !semesterId || unitId === undefined || unitId === null) {
    return null
  }
  return normalizeModelUnit(modelUnits[\`\${levelId}-\${semesterId}-\${unitId}\`])
}`;

const replaceWith = `export function getModelUnit(levelId?: string, semesterId?: string, unitId?: string | number) {
  if (!levelId || !semesterId || unitId === undefined || unitId === null) {
    return null
  }
  const unit = normalizeModelUnit(modelUnits[\`\${levelId}-\${semesterId}-\${unitId}\`]);
  if (unit) {
    const levelKey = levelId.toUpperCase();
    const semKey = semesterId === 's1' ? 'semestre1' : 'semestre2';
    // @ts-ignore
    const progLevel = programData[levelKey];
    if (progLevel && progLevel[semKey]) {
      // @ts-ignore
      const found = progLevel[semKey].find((u: any) => u.id === Number(unitId));
      if (found) {
        unit.title = found.titre;
      }
    }
  }
  return unit;
}`;

content = content.replace(replaceTarget, replaceWith);

fs.writeFileSync('src/data/modelUnits.ts', content);
