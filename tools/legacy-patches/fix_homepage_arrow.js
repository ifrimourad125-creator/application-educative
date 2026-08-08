import fs from 'fs';
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

content = content.replace(
  /<ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" \/>/g,
  '<ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" strokeWidth={3} />'
);

fs.writeFileSync('src/pages/HomePage.tsx', content);
