import fs from 'fs';

let content = fs.readFileSync('src/pages/ActivitiesPage.tsx', 'utf8');

const oldHeader = `<div className="flex items-center justify-between">
        <button
          onClick={() => {
            playSound('back-click');
            if (onBack) onBack();
            else if (unit) navigate(\`/niveau/\${unit.levelId}\`);
            else navigate('/');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 backdrop-blur-md text-sky-400 border border-white/10 hover:bg-white/10 active:scale-95 transition shadow-md font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au Niveau</span>
        </button>

        <span className="text-[11px] sm:text-xs font-black uppercase text-sky-300 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-500/40 shadow-sm">
          Unité {unit?.id || unitId}
        </span>
      </div>`;

const newHeader = `<div className="flex items-center justify-between">
        <button
          onClick={() => {
            playSound('back-click');
            if (onBack) onBack();
            else if (unit) navigate(\`/niveau/\${unit.levelId}\`);
            else navigate('/');
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800/40 backdrop-blur-md text-slate-300 border border-slate-700/50 hover:bg-slate-800/80 hover:text-sky-400 hover:border-sky-500/50 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] active:scale-95 transition-all duration-300 font-bold text-xs sm:text-sm"
        >
          <ArrowLeft className="w-4 h-4 sm:w-4 sm:h-4" />
          <span>Retour au Niveau</span>
        </button>

        <span className="flex items-center justify-center px-3.5 py-1.5 text-xs sm:text-sm font-black uppercase text-sky-300 bg-sky-950/40 rounded-full border border-sky-500/30 shadow-sm">
          Unité {unit?.id || unitId}
        </span>
      </div>`;

content = content.replace(oldHeader, newHeader);

fs.writeFileSync('src/pages/ActivitiesPage.tsx', content);
