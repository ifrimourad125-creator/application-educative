import fs from 'fs';
const content = fs.readFileSync('src/data/extraModelUnits.ts', 'utf8');
const matches = content.match(/^[ \t]*"([123]ac-s[12]-[0-9]+)":/gm);
console.log(matches);
