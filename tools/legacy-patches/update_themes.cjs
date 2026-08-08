const fs = require('fs');

let content = fs.readFileSync('src/pages/ActivitiesPage.tsx', 'utf8');

const regex = /\/\/ 8 distinct vibrant ultramodern activity themes matching the palette[\s\S]*?          };\n/m;

const replacement = fs.readFileSync('replacement.txt', 'utf8') + '\n';

content = content.replace(regex, replacement);

fs.writeFileSync('src/pages/ActivitiesPage.tsx', content);
