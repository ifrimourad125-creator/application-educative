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
                  cardBg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
                  border: 'border-blue-300 shadow-[0_0_25px_rgba(59,130,246,0.6)]',
                  badgeBg: 'bg-white/30 text-white border-white/50',
                  audioIconColor: 'text-white',
                  btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',
                },
                2: {
                  emoji: '🚀',
                  cardBg: 'bg-gradient-to-r from-orange-500 to-amber-500',
                  border: 'border-orange-300 shadow-[0_0_25px_rgba(249,115,22,0.6)]',
                  badgeBg: 'bg-white/30 text-white border-white/50',
                  audioIconColor: 'text-white',
                  btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',
                },
                3: {
                  emoji: '💡',
                  cardBg: 'bg-gradient-to-r from-fuchsia-500 to-pink-500',
                  border: 'border-fuchsia-300 shadow-[0_0_25px_rgba(217,70,239,0.6)]',
                  badgeBg: 'bg-white/30 text-white border-white/50',
                  audioIconColor: 'text-white',
                  btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',
                },
                4: {
                  emoji: '🌍',
                  cardBg: 'bg-gradient-to-r from-lime-500 to-green-500',
                  border: 'border-lime-300 shadow-[0_0_25px_rgba(132,204,22,0.7)]',
                  badgeBg: 'bg-white/30 text-white border-white/50',
                  audioIconColor: 'text-white',
                  btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',
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
                  cardBg: 'bg-gradient-to-r from-rose-500 to-red-500',
                  border: 'border-rose-300 shadow-[0_0_25px_rgba(244,63,94,0.6)]',
                  badgeBg: 'bg-white/30 text-white border-white/50',
                  audioIconColor: 'text-white',
                  btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',
                },
                7: {
                  emoji: '🎨',
                  cardBg: 'bg-gradient-to-r from-teal-500 to-emerald-500',
                  border: 'border-teal-300 shadow-[0_0_25px_rgba(20,184,166,0.7)]',
                  badgeBg: 'bg-white/30 text-white border-white/50',
                  audioIconColor: 'text-white',
                  btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',
                },
                8: {
                  emoji: '🏆',
                  cardBg: 'bg-gradient-to-r from-yellow-500 to-amber-500',
                  border: 'border-yellow-300 shadow-[0_0_25px_rgba(234,179,8,0.7)]',
                  badgeBg: 'bg-white/30 text-white border-white/50',
                  audioIconColor: 'text-white',
                  btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',
                },
              };\n`;

content = content.replace(regex, replacement);
fs.writeFileSync('src/pages/LevelPage.tsx', content);
