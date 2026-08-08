import fs from 'fs';

let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

content = content.replace(
  "import { ChevronRight } from 'lucide-react';",
  "import { ChevronRight, BookOpen, Rocket, Trophy } from 'lucide-react';"
);

content = content.replace(
  /icon: <span className="text-4xl sm:text-\[5rem\] select-none leading-none drop-shadow-md">📖<\/span>,/,
  `icon: (
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-cyan-100 blur-lg opacity-60 rounded-full scale-150"></div>
        <BookOpen className="relative w-8 h-8 sm:w-14 sm:h-14 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" strokeWidth={2.5} />
      </div>
    ),`
);

content = content.replace(
  /icon: <span className="text-4xl sm:text-\[5rem\] select-none leading-none drop-shadow-md">🚀<\/span>,/,
  `icon: (
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-fuchsia-100 blur-lg opacity-60 rounded-full scale-150"></div>
        <Rocket className="relative w-8 h-8 sm:w-14 sm:h-14 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" strokeWidth={2.5} />
      </div>
    ),`
);

content = content.replace(
  /icon: <span className="text-4xl sm:text-\[5rem\] select-none leading-none drop-shadow-md">🏆<\/span>,/,
  `icon: (
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-amber-100 blur-lg opacity-60 rounded-full scale-150"></div>
        <Trophy className="relative w-8 h-8 sm:w-14 sm:h-14 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" strokeWidth={2.5} />
      </div>
    ),`
);

fs.writeFileSync('src/pages/HomePage.tsx', content);
