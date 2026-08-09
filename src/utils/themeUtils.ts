export interface CardTheme {
  cardBg: string;
  border: string;
  badgeBg: string;
  iconBg: string;
  btnBg: string;
  textColor: string;
  subTextColor: string;
  isDarkText?: boolean;
}

// 8 distinct non-repeating vibrant themes inspired directly by the user palette
export const PALETTE_THEMES: CardTheme[] = [
  // 1: Orange -> Red Flare
  {
    cardBg: 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-600',
    border: 'border-amber-300/80 shadow-lg shadow-orange-500/25 hover:border-white',
    badgeBg: 'bg-white/25 text-white border-white/40',
    iconBg: 'bg-white/25 border border-white/40 text-white shadow-md',
    btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/35',
    textColor: 'text-white',
    subTextColor: 'text-white/90',
  },
  // 2: Electric Cyan -> Royal Blue
  {
    cardBg: 'bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-700',
    border: 'border-cyan-300/80 shadow-lg shadow-cyan-500/25 hover:border-white',
    badgeBg: 'bg-white/25 text-white border-white/40',
    iconBg: 'bg-white/25 border border-white/40 text-white shadow-md',
    btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/35',
    textColor: 'text-white',
    subTextColor: 'text-white/90',
  },
  // 3: Neon Pink -> Fuchsia Magenta
  {
    cardBg: 'bg-gradient-to-r from-pink-500 via-fuchsia-600 to-rose-700',
    border: 'border-pink-300/80 shadow-lg shadow-pink-500/25 hover:border-white',
    badgeBg: 'bg-white/25 text-white border-white/40',
    iconBg: 'bg-white/25 border border-white/40 text-white shadow-md',
    btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/35',
    textColor: 'text-white',
    subTextColor: 'text-white/90',
  },
  // 4: Yellow -> Lime Green
  {
    cardBg: 'bg-gradient-to-r from-yellow-300 via-lime-400 to-emerald-600',
    border: 'border-yellow-200/80 shadow-lg shadow-lime-500/25 hover:border-white',
    badgeBg: 'bg-slate-950/20 text-slate-950 border-slate-950/30 font-black',
    iconBg: 'bg-slate-950/15 border border-slate-950/25 text-slate-950 shadow-md',
    btnBg: 'bg-slate-950/20 hover:bg-slate-950/30 text-slate-950 border border-slate-950/30',
    textColor: 'text-slate-950',
    subTextColor: 'text-white/90',
    isDarkText: true,
  },
  // 5: Purple -> Fuchsia Cyan
  {
    cardBg: 'bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-500',
    border: 'border-purple-300/80 shadow-lg shadow-purple-500/25 hover:border-white',
    badgeBg: 'bg-white/25 text-white border-white/40',
    iconBg: 'bg-white/25 border border-white/40 text-white shadow-md',
    btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/35',
    textColor: 'text-white',
    subTextColor: 'text-white/90',
  },
  // 6: Teal -> Emerald Cyan
  {
    cardBg: 'bg-gradient-to-r from-teal-400 via-emerald-600 to-cyan-800',
    border: 'border-teal-300/80 shadow-lg shadow-teal-500/25 hover:border-white',
    badgeBg: 'bg-white/25 text-white border-white/40',
    iconBg: 'bg-white/25 border border-white/40 text-white shadow-md',
    btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/35',
    textColor: 'text-white',
    subTextColor: 'text-white/90',
  },
  // 7: Rose -> Sunset Amber
  {
    cardBg: 'bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500',
    border: 'border-rose-300/80 shadow-lg shadow-orange-500/25 hover:border-white',
    badgeBg: 'bg-white/25 text-white border-white/40',
    iconBg: 'bg-white/25 border border-white/40 text-white shadow-md',
    btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/35',
    textColor: 'text-white',
    subTextColor: 'text-white/90',
  },
  // 8: Indigo -> Royal Purple Pink
  {
    cardBg: 'bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600',
    border: 'border-indigo-300/80 shadow-lg shadow-indigo-500/25 hover:border-white',
    badgeBg: 'bg-white/25 text-white border-white/40',
    iconBg: 'bg-white/25 border border-white/40 text-white shadow-md',
    btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/35',
    textColor: 'text-white',
    subTextColor: 'text-white/90',
  },
];

export function getThemeById(id: number | string): CardTheme {
  const numericId = typeof id === 'number' ? id : parseInt(id, 10) || 1;
  const index = Math.abs(numericId - 1) % PALETTE_THEMES.length;
  return PALETTE_THEMES[index];
}

/**
 * Format titles to replace spaces before punctuation like ? or !
 * with non-breaking spaces (\u00A0) so punctuation is NEVER wrapped alone to a new line.
 */
export function formatTitle(title: string): string {
  if (!title) return '';
  return title
    .replace(/\s+\?/g, '\u00A0?')
    .replace(/\s+\!/g, '\u00A0!')
    .replace(/\s+:/g, '\u00A0:');
}

/**
 * Logically assign an emoji icon based on title keywords.
 */
export function getUnitEmoji(title: string, unitId?: number): string {
  const lower = (title || '').toLowerCase();

  if (lower.includes('effort') || lower.includes('santé') || lower.includes('sport') || lower.includes('bien-être')) {
    return '🏃';
  }
  if (lower.includes('achat') || lower.includes('ligne') || lower.includes('boutique')) {
    return '🛒';
  }
  if (lower.includes('argent') || lower.includes('gérer') || lower.includes('budget') || lower.includes('consommer')) {
    return '💰';
  }
  if (lower.includes('ville') || lower.includes('mythique') || lower.includes('monument')) {
    return '🏰';
  }
  if (lower.includes('figure') || lower.includes('monde') || lower.includes('personnage')) {
    return '🌟';
  }
  if (lower.includes('autres') || lower.includes('moi') || lower.includes('ensemble') || lower.includes('respect')) {
    return '🤝';
  }
  if (lower.includes('ado') || lower.includes('responsable') || lower.includes('citoyen')) {
    return '🎯';
  }
  if (lower.includes('climat') || lower.includes('défis') || lower.includes('écologie') || lower.includes('écolo') || lower.includes('environnement')) {
    return '🌍';
  }
  if (lower.includes('création') || lower.includes('art') || lower.includes('recyclage')) {
    return '🎨';
  }
  if (lower.includes('parcours') || lower.includes('avenir') || lower.includes('orienter') || lower.includes('projet')) {
    return '🧭';
  }
  if (lower.includes('métier') || lower.includes('travail') || lower.includes('profession')) {
    return '💼';
  }
  if (lower.includes('science') || lower.includes('curieux') || lower.includes('recherche')) {
    return '🔬';
  }
  if (lower.includes('inventeur') || lower.includes('graine') || lower.includes('idée') || lower.includes('innovation')) {
    return '💡';
  }
  if (lower.includes('conte') || lower.includes('légende') || lower.includes('histoire')) {
    return '📜';
  }
  if (lower.includes('fête') || lower.includes('célébration') || lower.includes('carnaval')) {
    return '🎉';
  }
  if (lower.includes('voyage') || lower.includes('découverte') || lower.includes('explor')) {
    return '✈️';
  }
  if (lower.includes('spectacle') || lower.includes('théâtre') || lower.includes('scène')) {
    return '🎭';
  }
  if (lower.includes('héros') || lower.includes('courage') || lower.includes('champion')) {
    return '🦸';
  }
  if (lower.includes('leçon') || lower.includes('vie')) {
    return '📖';
  }

  // Fallback defaults if title keywords don't match
  const fallbacks = ['📚', '🚀', '💡', '🌍', '🎭', '🔬', '🎨', '🏆'];
  if (unitId && unitId >= 1 && unitId <= fallbacks.length) {
    return fallbacks[unitId - 1];
  }
  return '📖';
}
