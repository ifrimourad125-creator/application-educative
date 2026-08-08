import fs from 'fs';
let content = fs.readFileSync('src/pages/LevelPage.tsx', 'utf8');
content = content.replace(
  /'1ac': {\s*(.*?)\s*emoji: '🎓',/s,
  "'1ac': {\n$1\n    emoji: '📖',"
);
fs.writeFileSync('src/pages/LevelPage.tsx', content);
