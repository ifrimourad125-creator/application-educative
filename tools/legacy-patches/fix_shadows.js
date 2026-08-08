import fs from 'fs';

const removeStaticShadows = (content) => {
  // Replace static shadows with hover:shadows in the strings where they are defined.
  // Note: For some elements, the user wants NO static glow, only hover glow.
  
  // In LevelPage and ActivitiesPage, the unit borders have static shadow.
  content = content.replace(/shadow-\[0_0_30px_rgba\([^)]+\)\]/g, 'hover:$&');
  content = content.replace(/shadow-\[0_0_25px_rgba\([^)]+\)\]/g, 'group-hover:$&');
  content = content.replace(/shadow-\[0_0_20px_rgba\([^)]+\)\]/g, 'hover:$&');
  content = content.replace(/shadow-\[0_0_15px_rgba\([^)]+\)\]/g, 'hover:$&');

  // Fix cases where it became hover:hover:shadow... or group-hover:hover:...
  content = content.replace(/hover:hover:/g, 'hover:');
  content = content.replace(/group-hover:hover:/g, 'group-hover:');
  content = content.replace(/hover:group-hover:/g, 'group-hover:');

  // Semester Cards in LevelPage
  content = content.replace(
    /bg-gradient-to-br from-cyan-600 via-sky-600 to-blue-700 border-2 border-cyan-300\/80 hover:shadow-\[0_0_20px_rgba\(6,182,212,0\.3\)\] hover:shadow-\[0_0_30px_rgba\(6,182,212,0\.5\)\] hover:scale-\[1\.02\] text-white/,
    'bg-gradient-to-br from-cyan-600 via-sky-600 to-blue-700 border-2 border-cyan-300/80 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-[1.02] text-white transition-all duration-300'
  );
  content = content.replace(
    /bg-gradient-to-br from-fuchsia-600 via-purple-600 to-pink-700 border-2 border-fuchsia-300\/80 hover:shadow-\[0_0_20px_rgba\(217,70,239,0\.3\)\] hover:shadow-\[0_0_30px_rgba\(217,70,239,0\.5\)\] hover:scale-\[1\.02\] text-white/,
    'bg-gradient-to-br from-fuchsia-600 via-purple-600 to-pink-700 border-2 border-fuchsia-300/80 hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] hover:scale-[1.02] text-white transition-all duration-300'
  );

  return content;
};

const files = [
  'src/pages/LevelPage.tsx',
  'src/pages/ActivitiesPage.tsx',
  'src/pages/ActivityDetailPage.tsx',
  'src/features/activities/activityShared.tsx'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = removeStaticShadows(content);
    fs.writeFileSync(file, content);
  }
}
