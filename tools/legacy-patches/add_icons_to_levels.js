import fs from 'fs';
let content = fs.readFileSync('src/data/levels.ts', 'utf8');

content = content.replace(
  /short: "1AC",/,
  'short: "1AC",\n    icon: "📖",'
);

content = content.replace(
  /short: "2AC",/,
  'short: "2AC",\n    icon: "🚀",'
);

content = content.replace(
  /short: "3AC",/,
  'short: "3AC",\n    icon: "🏆",'
);

fs.writeFileSync('src/data/levels.ts', content);
