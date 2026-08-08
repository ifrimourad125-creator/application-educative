import fs from 'fs';

let content = fs.readFileSync('src/pages/LevelPage.tsx', 'utf8');

const regexToReplace = /\{\/\* Semester Selection Containers - Vibrant & Eye-Catching \*\/\}.*?\{\/\* Units List Section - Rendered dynamically when a semester card is clicked \*\/\}/s;

const replacement = `{/* Semester Selection Containers - Vibrant & Eye-Catching */}
      {!activeSemester ? (
        <div className="flex flex-col gap-4 flex-1 justify-center">
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-2 mb-4 mt-2"
          >
            <h2 className="text-sm sm:text-base md:text-lg font-black text-slate-300 uppercase tracking-[0.2em] drop-shadow-sm text-center flex items-center gap-3">
              <span className="w-10 sm:w-16 h-[2px] rounded-full bg-gradient-to-r from-transparent to-cyan-500/80"></span>
              Choisissez le Semestre
              <span className="w-10 sm:w-16 h-[2px] rounded-full bg-gradient-to-l from-transparent to-cyan-500/80"></span>
            </h2>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="text-cyan-400 flex items-center justify-center"
            >
              <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg" />
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {currentLevel.semesters.map((sem) => {
              const isS1 = sem.id === 's1';
              const semesterLabel = isS1 ? 'Semestre 1' : 'Semestre 2';
              const semesterBadge = isS1 ? 'S1' : 'S2';
              const SemIcon = isS1 ? BookOpen : GraduationCap;
              
              // Vibrant filled background styling for Semester Cards
              const cardStyle = isS1
                ? 'bg-gradient-to-br from-cyan-600 via-sky-600 to-blue-700 border-2 border-cyan-300/80 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-[1.02] text-white'
                : 'bg-gradient-to-br from-fuchsia-600 via-purple-600 to-pink-700 border-2 border-fuchsia-300/80 shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] hover:scale-[1.02] text-white';

              return (
                <motion.button
                  key={sem.id}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                  onClick={() => {
                    playSound('click');
                    setActiveSemester(sem.id as SemesterId);
                  }}
                  className={\`relative overflow-hidden rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 flex flex-col items-center justify-center gap-3 sm:gap-4 cursor-pointer min-h-[200px] \${cardStyle}\`}
                >
                  {/* Glossy top edge highlight */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col items-center justify-center gap-2 sm:gap-2.5 w-full">
                    <span className="text-base sm:text-xl font-black px-4 py-2 rounded-xl border transition-all shadow-md flex items-center gap-2 bg-white/25 border-white/40 text-white backdrop-blur-md">
                      <SemIcon className="w-5 h-5 shrink-0" />
                      <span>{semesterBadge}</span>
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-sm leading-none mt-2">
                      {semesterLabel}
                    </h3>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Compact Header for Selected Semester */
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full"
        >
          {(() => {
            const isS1 = activeSemester === 's1';
            const semesterLabel = isS1 ? 'Semestre 1' : 'Semestre 2';
            const SemIcon = isS1 ? BookOpen : GraduationCap;
            const bannerStyle = isS1
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-300/80 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
              : 'bg-gradient-to-r from-fuchsia-500 to-pink-600 border-fuchsia-300/80 shadow-[0_0_20px_rgba(217,70,239,0.4)]';

            return (
              <div 
                onClick={() => {
                  playSound('back-click');
                  setActiveSemester(null);
                }}
                className={\`relative overflow-hidden rounded-xl border \${bannerStyle} p-3 sm:p-4 flex items-center justify-between cursor-pointer group active:scale-[0.98] transition-transform\`}
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
                
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-sm">
                    <SemIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white drop-shadow-sm">
                    {semesterLabel}
                  </h3>
                </div>

                <div className="relative z-10 flex items-center gap-2">
                  <span className="text-xs font-bold text-white/90 bg-black/20 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                    Changer
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white border border-white/30 group-hover:bg-white/30 transition-colors">
                    <ChevronDown className="w-4 h-4 rotate-180" />
                  </div>
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}

      {/* Units List Section - Rendered dynamically when a semester card is clicked */}`;

content = content.replace(regexToReplace, replacement);

fs.writeFileSync('src/pages/LevelPage.tsx', content);
