import fs from 'fs';

let content = fs.readFileSync('src/pages/ActivitiesPage.tsx', 'utf8');

// Jaune-vert
content = content.replace(
  "cardBg: 'bg-gradient-to-r from-lime-400 to-green-400 text-slate-900',",
  "cardBg: 'bg-gradient-to-r from-lime-500 to-green-500 text-white',"
);
content = content.replace(
  "border: 'border-lime-200 shadow-[0_0_25px_rgba(163,230,53,0.7)]',",
  "border: 'border-lime-300 shadow-[0_0_25px_rgba(132,204,22,0.7)]',"
);
content = content.replace(
  "badgeBg: 'bg-black/15 text-slate-900 border-black/20',",
  "badgeBg: 'bg-white/30 text-white border-white/50',"
);
content = content.replace(
  "iconBg: 'bg-black/10 border border-black/20 text-slate-900 shadow-md',",
  "iconBg: 'bg-white/30 border border-white/50 text-white shadow-md',"
);
content = content.replace(
  "btnBg: 'bg-black/10 hover:bg-black/20 text-slate-900 border border-black/20',",
  "btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',"
);

// Turquoise
content = content.replace(
  "cardBg: 'bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-900',",
  "cardBg: 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white',"
);
content = content.replace(
  "border: 'border-teal-200 shadow-[0_0_25px_rgba(45,212,191,0.7)]',",
  "border: 'border-teal-300 shadow-[0_0_25px_rgba(20,184,166,0.7)]',"
);
content = content.replace(
  "badgeBg: 'bg-black/15 text-slate-900 border-black/20',",
  "badgeBg: 'bg-white/30 text-white border-white/50',"
);
content = content.replace(
  "iconBg: 'bg-black/10 border border-black/20 text-slate-900 shadow-md',",
  "iconBg: 'bg-white/30 border border-white/50 text-white shadow-md',"
);
content = content.replace(
  "btnBg: 'bg-black/10 hover:bg-black/20 text-slate-900 border border-black/20',",
  "btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',"
);

// Jaune/Or
content = content.replace(
  "cardBg: 'bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-900',",
  "cardBg: 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white',"
);
content = content.replace(
  "border: 'border-yellow-200 shadow-[0_0_25px_rgba(250,204,21,0.7)]',",
  "border: 'border-yellow-300 shadow-[0_0_25px_rgba(234,179,8,0.7)]',"
);
content = content.replace(
  "badgeBg: 'bg-black/15 text-slate-900 border-black/20',",
  "badgeBg: 'bg-white/30 text-white border-white/50',"
);
content = content.replace(
  "iconBg: 'bg-black/10 border border-black/20 text-slate-900 shadow-md',",
  "iconBg: 'bg-white/30 border border-white/50 text-white shadow-md',"
);
content = content.replace(
  "btnBg: 'bg-black/10 hover:bg-black/20 text-slate-900 border border-black/20',",
  "btnBg: 'bg-white/20 hover:bg-white/35 text-white border border-white/40',"
);


fs.writeFileSync('src/pages/ActivitiesPage.tsx', content);

