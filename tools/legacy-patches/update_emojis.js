import fs from 'fs';

let content = fs.readFileSync('src/pages/LevelPage.tsx', 'utf8');

content = content.replace(
  "const SemIcon = isS1 ? BookOpen : GraduationCap;",
  "const semEmoji = isS1 ? '1️⃣' : '2️⃣';"
);

content = content.replace(
  "<SemIcon className=\"w-5 h-5 shrink-0\" />",
  "<span className=\"text-xl leading-none\">{semEmoji}</span>"
);

content = content.replace(
  "const SemIcon = isS1 ? BookOpen : GraduationCap;",
  "const semEmoji = isS1 ? '1️⃣' : '2️⃣';"
);

content = content.replace(
  "<SemIcon className=\"w-5 h-5\" />",
  "<span className=\"text-2xl leading-none\">{semEmoji}</span>"
);

fs.writeFileSync('src/pages/LevelPage.tsx', content);
