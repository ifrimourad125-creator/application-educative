import fs from 'fs';

let content = fs.readFileSync('src/pages/LevelPage.tsx', 'utf8');

const oldCard = `<div className="relative z-10 flex flex-col items-center justify-center gap-2 sm:gap-2.5 w-full">
                    <span className="text-base sm:text-xl font-black px-4 py-2 rounded-xl border transition-all shadow-md flex items-center gap-2 bg-white/25 border-white/40 text-white backdrop-blur-md">
                      <span className="text-xl leading-none">{semEmoji}</span>
                      <span>{semesterBadge}</span>
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-sm leading-none mt-2">
                      {semesterLabel}
                    </h3>
                  </div>`;

const newCard = `<div className="relative z-10 flex flex-col items-center justify-center gap-4 w-full h-full">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/30 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-4xl sm:text-5xl drop-shadow-md">{semEmoji}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-bold text-white/80 uppercase tracking-[0.2em]">{semesterBadge}</span>
                      <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md leading-none">
                        {semesterLabel}
                      </h3>
                    </div>
                  </div>`;

content = content.replace(oldCard, newCard);

fs.writeFileSync('src/pages/LevelPage.tsx', content);
