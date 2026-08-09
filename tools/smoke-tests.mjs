import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const rules = fs.readFileSync(path.join(root, 'src/features/progression/progressRules.ts'), 'utf8');
const storage = fs.readFileSync(path.join(root, 'src/services/progress/progressStorage.ts'), 'utf8');
const audio = fs.readFileSync(path.join(root, 'src/services/audio/audioManager.ts'), 'utf8');

assert.match(rules, /lastActiveDate === today/);
assert.match(rules, /lastActiveDate === yesterday/);
assert.match(rules, /wasCompleted \? 10 : 50/);
assert.match(storage, /normalizeProgress/);
assert.match(storage, /JSON\.parse/);
assert.match(audio, /playElement/);
assert.match(audio, /playSynthetic/);
console.log('Smoke tests passed: progression, storage normalization and audio fallback are present.');
