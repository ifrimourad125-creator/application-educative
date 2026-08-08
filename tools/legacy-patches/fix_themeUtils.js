import fs from 'fs';

let content = fs.readFileSync('src/utils/themeUtils.ts', 'utf8');

content = content.replace(
  "subTextColor: 'text-slate-900/90',",
  "subTextColor: 'text-white/90',"
);

content = content.replace(
  "textColor: 'text-slate-900',",
  "textColor: 'text-white',"
);

fs.writeFileSync('src/utils/themeUtils.ts', content);

