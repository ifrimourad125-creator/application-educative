import fs from 'fs';

let content = fs.readFileSync('src/pages/LevelPage.tsx', 'utf8');

content = content.replace(
  "const semEmoji = isS1 ? '📖' : '🎓';",
  "const semEmoji = isS1 ? '🎒' : '🧭';"
);

content = content.replace(
  "const semEmoji = isS1 ? '📖' : '🎓';",
  "const semEmoji = isS1 ? '🎒' : '🧭';"
);

fs.writeFileSync('src/pages/LevelPage.tsx', content);
