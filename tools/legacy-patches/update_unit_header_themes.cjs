const fs = require('fs');

let content = fs.readFileSync('src/pages/ActivitiesPage.tsx', 'utf8');

const regex = /const unitHeaderThemes: Record<number, \{[\s\S]*?\}> = \{[\s\S]*?  8: \{[\s\S]*?  \},?\n\};\n/m;

const replacement = `const unitHeaderThemes: Record<number, {
  cardBg: string;
  border: string;
  glow1: string;
  glow2: string;
  badgeBg: string;
  emoji: string;
}> = {
  1: {
    cardBg: 'bg-slate-900/80 backdrop-blur-xl bg-gradient-to-r from-blue-900/40 via-slate-900/80 to-cyan-900/40',
    border: 'border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.6)]',
    glow1: 'bg-blue-500/25',
    glow2: 'bg-cyan-400/25',
    badgeBg: 'bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-white shadow-[0_0_20px_rgba(6,182,212,0.8)]',
    emoji: '📚',
  },
  2: {
    cardBg: 'bg-slate-900/80 backdrop-blur-xl bg-gradient-to-r from-orange-900/40 via-slate-900/80 to-amber-900/40',
    border: 'border-orange-400 shadow-[0_0_30px_rgba(249,115,22,0.6)]',
    glow1: 'bg-orange-500/25',
    glow2: 'bg-amber-400/25',
    badgeBg: 'bg-gradient-to-br from-orange-400 to-amber-500 border-2 border-white shadow-[0_0_20px_rgba(245,158,11,0.8)]',
    emoji: '💡',
  },
  3: {
    cardBg: 'bg-slate-900/80 backdrop-blur-xl bg-gradient-to-r from-fuchsia-900/40 via-slate-900/80 to-pink-900/40',
    border: 'border-fuchsia-400 shadow-[0_0_30px_rgba(217,70,239,0.6)]',
    glow1: 'bg-fuchsia-500/25',
    glow2: 'bg-pink-400/25',
    badgeBg: 'bg-gradient-to-br from-fuchsia-400 to-pink-500 border-2 border-white shadow-[0_0_20px_rgba(217,70,239,0.8)]',
    emoji: '🎯',
  },
  4: {
    cardBg: 'bg-slate-900/80 backdrop-blur-xl bg-gradient-to-r from-lime-900/40 via-slate-900/80 to-green-900/40',
    border: 'border-lime-400 shadow-[0_0_30px_rgba(163,230,53,0.6)]',
    glow1: 'bg-lime-500/25',
    glow2: 'bg-green-400/25',
    badgeBg: 'bg-gradient-to-br from-lime-400 to-green-500 border-2 border-white shadow-[0_0_20px_rgba(163,230,53,0.8)]',
    emoji: '🌍',
  },
  5: {
    cardBg: 'bg-slate-900/80 backdrop-blur-xl bg-gradient-to-r from-violet-900/40 via-slate-900/80 to-purple-900/40',
    border: 'border-violet-400 shadow-[0_0_30px_rgba(139,92,246,0.6)]',
    glow1: 'bg-violet-500/25',
    glow2: 'bg-purple-400/25',
    badgeBg: 'bg-gradient-to-br from-violet-400 to-purple-500 border-2 border-white shadow-[0_0_20px_rgba(139,92,246,0.8)]',
    emoji: '🧠',
  },
  6: {
    cardBg: 'bg-slate-900/80 backdrop-blur-xl bg-gradient-to-r from-rose-900/40 via-slate-900/80 to-red-900/40',
    border: 'border-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.6)]',
    glow1: 'bg-rose-500/25',
    glow2: 'bg-red-400/25',
    badgeBg: 'bg-gradient-to-br from-rose-400 to-red-500 border-2 border-white shadow-[0_0_20px_rgba(244,63,94,0.8)]',
    emoji: '🔬',
  },
  7: {
    cardBg: 'bg-slate-900/80 backdrop-blur-xl bg-gradient-to-r from-teal-900/40 via-slate-900/80 to-emerald-900/40',
    border: 'border-teal-400 shadow-[0_0_30px_rgba(45,212,191,0.6)]',
    glow1: 'bg-teal-500/25',
    glow2: 'bg-emerald-400/25',
    badgeBg: 'bg-gradient-to-br from-teal-400 to-emerald-500 border-2 border-white shadow-[0_0_20px_rgba(45,212,191,0.8)]',
    emoji: '🎨',
  },
  8: {
    cardBg: 'bg-slate-900/80 backdrop-blur-xl bg-gradient-to-r from-yellow-900/40 via-slate-900/80 to-amber-900/40',
    border: 'border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.6)]',
    glow1: 'bg-yellow-500/25',
    glow2: 'bg-amber-400/25',
    badgeBg: 'bg-gradient-to-br from-yellow-400 to-amber-500 border-2 border-white shadow-[0_0_20px_rgba(250,204,21,0.8)]',
    emoji: '🏆',
  },
};\n`;

content = content.replace(regex, replacement);
fs.writeFileSync('src/pages/ActivitiesPage.tsx', content);
