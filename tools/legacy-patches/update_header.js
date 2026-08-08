import fs from 'fs';

let content = fs.readFileSync('src/pages/LevelPage.tsx', 'utf8');

const oldHeader = `<div className="flex items-center gap-3 relative z-10 w-1/3">
                  <div className="w-10 h-10 rounded-lg bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-sm shrink-0">
                    <span className="text-2xl leading-none">{semEmoji}</span>
                  </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10 pointer-events-none w-1/3">
                  <h3 className="text-lg sm:text-xl font-black text-white drop-shadow-sm whitespace-nowrap">
                    {semesterLabel}
                  </h3>
                </div>

                <div className="relative z-10 flex items-center justify-end gap-2 w-1/3">`;

const newHeader = `{/* Left section: Emoji */}
                <div className="flex-1 flex items-center relative z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-sm shrink-0">
                    <span className="text-2xl sm:text-3xl leading-none">{semEmoji}</span>
                  </div>
                </div>

                {/* Center section: Title */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10 pointer-events-none">
                  <h3 className="text-lg sm:text-xl font-black text-white drop-shadow-sm whitespace-nowrap">
                    {semesterLabel}
                  </h3>
                </div>

                {/* Right section: Change button */}
                <div className="flex-1 relative z-10 flex items-center justify-end gap-2">`;

content = content.replace(oldHeader, newHeader);

fs.writeFileSync('src/pages/LevelPage.tsx', content);
