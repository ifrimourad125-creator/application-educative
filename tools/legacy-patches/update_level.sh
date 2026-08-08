sed -i 's/<h2 className="text-\[11px\] sm:text-xs font-black text-slate-200 uppercase tracking-wider px-0.5 flex items-center gap-1.5">/<h2 className="text-[12px] sm:text-sm font-black text-slate-200 uppercase tracking-wider px-0.5 flex items-center justify-center gap-1.5 text-center mt-2 mb-1">/g' src/pages/LevelPage.tsx

sed -i 's/<BookOpen className="w-3.5 h-3.5 text-sky-400" \/>/Choisissez le Semestre\n          <MousePointerClick className="w-4 h-4 text-sky-400 animate-bounce" \/>/g' src/pages/LevelPage.tsx

sed -i 's/Choisissez le Semestre//2' src/pages/LevelPage.tsx

