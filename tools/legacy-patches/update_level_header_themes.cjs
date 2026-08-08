const fs = require('fs');

let content = fs.readFileSync('src/pages/LevelPage.tsx', 'utf8');

const regex = /const levelHeaderThemes: Record<string, \{[\s\S]*?\}> = \{[\s\S]*?  '3ac': \{[\s\S]*?  \},?\n\};\n/m;

const replacement = `const levelHeaderThemes: Record<string, {
  cardBg: string;
  border: string;
  glow1: string;
  glow2: string;
  badgeBg: string;
  emoji: string;
}> = {
  '1ac': {
    cardBg: 'bg-slate-900/85 backdrop-blur-xl bg-gradient-to-r from-blue-900/40 via-slate-900/90 to-cyan-900/40',
    border: 'border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.6)]',
    glow1: 'bg-blue-500/25',
    glow2: 'bg-cyan-400/25',
    badgeBg: 'bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-white shadow-[0_0_20px_rgba(6,182,212,0.8)]',
    emoji: '🎓',
  },
  '2ac': {
    cardBg: 'bg-slate-900/85 backdrop-blur-xl bg-gradient-to-r from-fuchsia-900/40 via-slate-900/90 to-pink-900/40',
    border: 'border-fuchsia-400 shadow-[0_0_30px_rgba(217,70,239,0.6)]',
    glow1: 'bg-fuchsia-500/25',
    glow2: 'bg-pink-400/25',
    badgeBg: 'bg-gradient-to-br from-fuchsia-400 to-pink-500 border-2 border-white shadow-[0_0_20px_rgba(217,70,239,0.8)]',
    emoji: '🚀',
  },
  '3ac': {
    cardBg: 'bg-slate-900/85 backdrop-blur-xl bg-gradient-to-r from-orange-900/40 via-slate-900/90 to-amber-900/40',
    border: 'border-orange-400 shadow-[0_0_30px_rgba(249,115,22,0.6)]',
    glow1: 'bg-orange-500/25',
    glow2: 'bg-amber-400/25',
    badgeBg: 'bg-gradient-to-br from-orange-400 to-amber-500 border-2 border-white shadow-[0_0_20px_rgba(245,158,11,0.8)]',
    emoji: '🏆',
  },
};\n`;

content = content.replace(regex, replacement);
fs.writeFileSync('src/pages/LevelPage.tsx', content);
