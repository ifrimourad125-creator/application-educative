#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('src/styles');
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);}
const files=walk(root).filter(f=>f.endsWith('.css'));
let total=0;
for(const f of files){const n=fs.readFileSync(f,'utf8').match(/!important\b/g)?.length||0; total+=n; console.log(`${path.relative(process.cwd(),f)}: ${n}`);}
console.log(`TOTAL: ${total}`);
