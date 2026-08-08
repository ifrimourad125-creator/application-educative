const fs = require('fs');

let content = fs.readFileSync('src/pages/LevelPage.tsx', 'utf8');

const regex = /const unitThemes: Record<number, \{[\s\S]*?\}> = \{[\s\S]*?              };\n/m;

const replacement = `const unitThemes: Record<number, {
                emoji: string;
                cardBg: string;
                border: string;
                badgeBg: string;
                audioIconColor: string;
                btnBg: string;
              }> = {
                1: {
                  emoji: '📚',
                  cardBg: 'bg-gradient-to-r from-blue-500 to-cyan-400',
                  border: 'border-blue-300 shadow-[0_0_25px_rgba(59,130,246,0.6)]',
                  badgeBg: 'bg-white/30 text-white border-white/50',
                  audioIconColor: 'text-white',
                  btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',
                },
                2: {
                  emoji: '🚀',
                  cardBg: 'bg-gradient-to-r from-orange-500 to-amber-400',
                  border: 'border-orange-300 shadow-[0_0_25px_rgba(249,115,22,0.6)]',
                  badgeBg: 'bg-white/30 text-white border-white/50',
                  audioIconColor: 'text-white',
                  btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',
                },
                3: {
                  emoji: '💡',
                  cardBg: 'bg-gradient-to-r from-fuchsia-500 to-pink-400',
                  border: 'border-fuchsia-300 shadow-[0_0_25px_rgba(217,70,239,0.6)]',
                  badgeBg: 'bg-white/30 text-white border-white/50',
                  audioIconColor: 'text-white',
                  btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',
                },
                4: {
                  emoji: '🌍',
                  cardBg: 'bg-gradient-to-r from-lime-400 to-green-400 text-slate-900',
                  border: 'border-lime-200 shadow-[0_0_25px_rgba(163,230,53,0.7)]',
                  badgeBg: 'bg-black/15 text-slate-900 border-black/20',
                  audioIconColor: 'text-slate-900',
                  btnBg: 'bg-black/10 hover:bg-black/20 text-slate-900 border border-black/20',
                },
                5: {
                  emoji: '🧠',
                  cardBg: 'bg-gradient-to-r from-violet-600 to-purple-500',
                  border: 'border-violet-300 shadow-[0_0_25px_rgba(139,92,246,0.6)]',
                  badgeBg: 'bg-white/30 text-white border-white/50',
                  audioIconColor: 'text-white',
                  btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',
                },
                6: {
                  emoji: '🔬',
                  cardBg: 'bg-gradient-to-r from-rose-500 to-red-400',
                  border: 'border-rose-300 shadow-[0_0_25px_rgba(244,63,94,0.6)]',
                  badgeBg: 'bg-white/30 text-white border-white/50',
                  audioIconColor: 'text-white',
                  btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',
                },
                7: {
                  emoji: '🎨',
                  cardBg: 'bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-900',
                  border: 'border-teal-200 shadow-[0_0_25px_rgba(45,212,191,0.7)]',
                  badgeBg: 'bg-black/15 text-slate-900 border-black/20',
                  audioIconColor: 'text-slate-900',
                  btnBg: 'bg-black/10 hover:bg-black/20 text-slate-900 border border-black/20',
                },
                8: {
                  emoji: '🏆',
                  cardBg: 'bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900',
                  border: 'border-yellow-200 shadow-[0_0_25px_rgba(250,204,21,0.7)]',
                  badgeBg: 'bg-black/15 text-slate-900 border-black/20',
                  audioIconColor: 'text-slate-900',
                  btnBg: 'bg-black/10 hover:bg-black/20 text-slate-900 border border-black/20',
                },
              };\n`;

content = content.replace(regex, replacement);
fs.writeFileSync('src/pages/LevelPage.tsx', content);
