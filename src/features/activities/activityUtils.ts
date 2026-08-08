export type PedagogicalQuestion = {
  question: string
  answer: string
  options: string[]
  verb?: string
  [key: string]: unknown
}

const panelAccents = [
  "border-cyan-200/30 bg-gradient-to-br from-cyan-300/18 via-white/[0.075] to-blue-500/10 shadow-cyan-950/22",
  "border-fuchsia-200/30 bg-gradient-to-br from-fuchsia-300/18 via-white/[0.075] to-violet-500/10 shadow-fuchsia-950/22",
  "border-amber-200/34 bg-gradient-to-br from-amber-300/20 via-white/[0.075] to-orange-500/12 shadow-amber-950/22",
  "border-emerald-200/30 bg-gradient-to-br from-emerald-300/18 via-white/[0.075] to-teal-500/10 shadow-emerald-950/22",
  "border-rose-200/30 bg-gradient-to-br from-rose-300/18 via-white/[0.075] to-pink-500/10 shadow-rose-950/22",
]

function cardAccent(index: number) {
  return panelAccents[index % panelAccents.length]
}

function hashString(value: string) {
  let hash = 0

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0
  }

  return hash
}

function stableShuffle<T>(items: T[], seed: string): T[] {
  return [...items]
    .map((item, index) => ({
      item,
      order: hashString(`${seed}-${index}-${String(item)}`),
    }))
    .sort((first, second) => first.order - second.order)
    .map(({ item }) => item)
}

function stableShuffleChoices<T>(items: T[], correct: T, seed: string): T[] {
  const shuffled = stableShuffle(items, seed)

  if (shuffled.length > 1 && shuffled[0] === correct) {
    const swapIndex = (hashString(`${seed}-avoid-first-answer`) % (shuffled.length - 1)) + 1
    const replacement = shuffled[swapIndex]

    shuffled[swapIndex] = shuffled[0]
    shuffled[0] = replacement
  }

  return shuffled
}

function asArray<T = unknown>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : []
}

function asText(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {}
}

function uniqueTexts(values: unknown[]) {
  return Array.from(
    new Set(
      values.filter(
        (value): value is string => typeof value === "string" && value.trim().length > 0
      )
    )
  )
}

function normalizeQuestion(question: unknown, fallbackIndex: number): PedagogicalQuestion {
  const source = asRecord(question)
  const answer = asText(source.answer, "Réponse correcte")
  const questionText = asText(source.question, `Question ${fallbackIndex + 1}`)
  const options = uniqueTexts([answer, ...asArray<string>(source.options)])

  return {
    ...source,
    question: questionText,
    answer,
    options: options.length > 0 ? options : [answer],
    verb: asText(source.verb),
  }
}

export function getListeningThemeImage(title: string = ''): string {
  const t = title.toLowerCase()
  if (t.includes('sport') || t.includes('physique') || t.includes('bouger') || t.includes('sante') || t.includes('santé')) {
    if (t.includes('routine') || t.includes('hygiène') || t.includes('mieux') || t.includes('corps')) {
      return '/images/lecture-sante-routine-realiste.webp'
    }
    return '/images/lecture-sport-parc-realiste.webp'
  }
  if (t.includes('achat') || t.includes('ligne') || t.includes('magasin') || t.includes('commerce') || t.includes('numérique')) {
    return '/images/lecture-achats-en-ligne-realiste.webp'
  }
  if (t.includes('ado') || t.includes('collège') || t.includes('responsable') || t.includes('élève') || t.includes('classe')) {
    return '/images/lecture-ados-responsables-realiste.webp'
  }
  if (t.includes('budget') || t.includes('argent') || t.includes('poche') || t.includes('gestion')) {
    return '/images/lecture-budget-college-realiste.webp'
  }
  if (t.includes('consommer') || t.includes('autrement') || t.includes('recycler') || t.includes('déchet')) {
    return '/images/lecture-consommer-autrement-realiste.webp'
  }
  if (t.includes('conte') || t.includes('légende') || t.includes('histoire') || t.includes('récit') || t.includes('mémoire') || t.includes('ruelles')) {
    return '/images/lecture-contes-legendes-realiste.webp'
  }
  if (t.includes('création') || t.includes('bricolage') || t.includes('écolo') || t.includes('projet')) {
    return '/images/lecture-creations-ecolo-realiste.webp'
  }
  if (t.includes('climat') || t.includes('environnement') || t.includes('nature') || t.includes('planète') || t.includes('défi')) {
    return '/images/lecture-defis-climatiques-realiste.webp'
  }
  if (t.includes('fête') || t.includes('monde') || t.includes('culture') || t.includes('tradition')) {
    return '/images/lecture-fetes-monde-realiste.webp'
  }
  if (t.includes('figure') || t.includes('inspirant') || t.includes('personne') || t.includes('portrait')) {
    return '/images/lecture-figure-inspirante-realiste.webp'
  }
  if (t.includes('héros') || t.includes('quotidien') || t.includes('courage') || t.includes('entraide')) {
    return '/images/lecture-heros-quotidiens-realiste.webp'
  }
  if (t.includes('inventeur') || t.includes('invention') || t.includes('science') || t.includes('techno')) {
    return '/images/lecture-inventeurs-realiste.webp'
  }
  if (t.includes('métier') || t.includes('avenir') || t.includes('travail') || t.includes('profession') || t.includes('chemin')) {
    return '/images/lecture-metiers-demain-realiste.webp'
  }
  if (t.includes('spectacle') || t.includes('théâtre') || t.includes('musique') || t.includes('art')) {
    return '/images/lecture-spectacles-realiste.webp'
  }
  if (t.includes('ville') || t.includes('cité') || t.includes('mythique') || t.includes('futur')) {
    return '/images/lecture-villes-demain-realiste.webp'
  }
  if (t.includes('voyage') || t.includes('découverte') || t.includes('aventure') || t.includes('toujours plus loin')) {
    return '/images/lecture-voyages-decouvertes-realiste.webp'
  }
  if (t.includes('habitat') || t.includes('tradition') || t.includes('patrimoine')) {
    return '/images/lecture-fetes-monde-realiste.webp'
  }
  if (t.includes('innovation') || t.includes('homme et l’innovation') || t.includes("homme et l'innovation")) {
    return '/images/lecture-inventeurs-realiste.webp'
  }
  if (t.includes('loisirs numériques') || t.includes('écran') || t.includes('jeu vidéo')) {
    return '/images/lecture-achats-en-ligne-realiste.webp'
  }
  if (t.includes('récits de vie') || t.includes('moments qui comptent') || t.includes('leçons de vie')) {
    return '/images/lecture-lecons-vie-realiste.webp'
  }
  if (t.includes('école pour tous') || t.includes('les autres et moi') || t.includes('vivre pour tous')) {
    return '/images/lecture-vivre-ensemble-realiste.webp'
  }
  if (t.includes('langues') || t.includes('ouverture au monde')) {
    return '/images/lecture-fetes-monde-realiste.webp'
  }
  if (t.includes('temps') || t.includes('habitudes') || t.includes('ambiances du quotidien')) {
    return '/images/lecture-sante-routine-realiste.webp'
  }
  if (t.includes('figures du monde')) {
    return '/images/lecture-figure-inspirante-realiste.webp'
  }
  if (t.includes('héros comme nous')) {
    return '/images/lecture-heros-quotidiens-realiste.webp'
  }
  return '/images/lecture-ados-responsables-realiste.webp'
}

export {
  asArray,
  asRecord,
  asText,
  cardAccent,
  normalizeQuestion,
  stableShuffle,
  stableShuffleChoices,
  uniqueTexts,
}
