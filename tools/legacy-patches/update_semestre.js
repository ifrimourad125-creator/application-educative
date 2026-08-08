import fs from 'fs';
let content = fs.readFileSync('src/pages/LevelPage.tsx', 'utf8');
content = content.replace('Choisissez le Semestre', 'Choisissez votre semestre');
fs.writeFileSync('src/pages/LevelPage.tsx', content);
