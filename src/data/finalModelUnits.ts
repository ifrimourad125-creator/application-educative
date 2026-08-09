import type { ModelUnitContent } from "../types/pedagogy"
import units from "./finalUnits.json"

const normalizeProductionWords = (value: unknown): string[] | undefined => {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string")
  if (typeof value === "string" && value.trim()) return [value]
  return undefined
}

const normalizeUnit = (unit: ModelUnitContent): ModelUnitContent => ({
  ...unit,
  writing: {
    ...unit.writing,
    words: normalizeProductionWords(unit.writing?.words),
  },
  oralProduction: {
    ...unit.oralProduction,
    words: normalizeProductionWords(unit.oralProduction?.words),
  },
})

type FinalUnit = ModelUnitContent & { key: string }

export const finalModelUnits: Record<string, ModelUnitContent> = Object.fromEntries(
  (units as unknown as FinalUnit[]).map((unit) => {
    const normalized = normalizeUnit(unit)
    return [normalized.key, normalized]
  }),
)
