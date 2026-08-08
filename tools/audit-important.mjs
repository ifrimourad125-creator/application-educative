import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('src/styles');
const files = fs.readdirSync(root).filter(f => f.endsWith('.css'));
const rows=[];
for (const file of files) {
  const text=fs.readFileSync(path.join(root,file),'utf8');
  rows.push({file,count:(text.match(/!important/g)||[]).length});
}
rows.sort((a,b)=>b.count-a.count);
console.log('!important audit');
for (const r of rows) console.log(`${String(r.count).padStart(5)}  ${r.file}`);
console.log(`TOTAL ${rows.reduce((n,r)=>n+r.count,0)}`);
