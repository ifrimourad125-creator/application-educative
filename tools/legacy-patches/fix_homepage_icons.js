import fs from 'fs';
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

content = content.replace(
  /icon: \(\s*<div className="relative flex items-center justify-center">\s*<div className="absolute inset-0 bg-cyan-100 blur-lg opacity-60 rounded-full scale-150"><\/div>\s*<BookOpen[^>]+>\s*<\/div>\s*\),/m,
  `icon: (
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-cyan-100 blur-lg opacity-40 rounded-full scale-150"></div>
        <span className="relative text-4xl sm:text-[5rem] select-none leading-none drop-shadow-md">📖</span>
      </div>
    ),`
);

content = content.replace(
  /icon: \(\s*<div className="relative flex items-center justify-center">\s*<div className="absolute inset-0 bg-fuchsia-100 blur-lg opacity-60 rounded-full scale-150"><\/div>\s*<Rocket[^>]+>\s*<\/div>\s*\),/m,
  `icon: (
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-fuchsia-100 blur-lg opacity-40 rounded-full scale-150"></div>
        <span className="relative text-4xl sm:text-[5rem] select-none leading-none drop-shadow-md">🚀</span>
      </div>
    ),`
);

content = content.replace(
  /icon: \(\s*<div className="relative flex items-center justify-center">\s*<div className="absolute inset-0 bg-amber-100 blur-lg opacity-60 rounded-full scale-150"><\/div>\s*<Trophy[^>]+>\s*<\/div>\s*\),/m,
  `icon: (
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-amber-100 blur-lg opacity-40 rounded-full scale-150"></div>
        <span className="relative text-4xl sm:text-[5rem] select-none leading-none drop-shadow-md">🏆</span>
      </div>
    ),`
);

fs.writeFileSync('src/pages/HomePage.tsx', content);
