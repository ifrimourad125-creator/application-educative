import fs from 'fs';
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

content = content.replace(
  /icon: \(\s*<div className="relative flex items-center justify-center">\s*<div className="absolute inset-0 bg-cyan-100 blur-lg opacity-40 rounded-full scale-150"><\/div>\s*<span className="relative text-4xl sm:text-\[5rem\] select-none leading-none drop-shadow-md">📖<\/span>\s*<\/div>\s*\),/m,
  `icon: <span className="relative text-4xl sm:text-[5rem] select-none leading-none drop-shadow-md z-10">📖</span>,`
);

content = content.replace(
  /icon: \(\s*<div className="relative flex items-center justify-center">\s*<div className="absolute inset-0 bg-fuchsia-100 blur-lg opacity-40 rounded-full scale-150"><\/div>\s*<span className="relative text-4xl sm:text-\[5rem\] select-none leading-none drop-shadow-md">🚀<\/span>\s*<\/div>\s*\),/m,
  `icon: <span className="relative text-4xl sm:text-[5rem] select-none leading-none drop-shadow-md z-10">🚀</span>,`
);

content = content.replace(
  /icon: \(\s*<div className="relative flex items-center justify-center">\s*<div className="absolute inset-0 bg-amber-100 blur-lg opacity-40 rounded-full scale-150"><\/div>\s*<span className="relative text-4xl sm:text-\[5rem\] select-none leading-none drop-shadow-md">🏆<\/span>\s*<\/div>\s*\),/m,
  `icon: <span className="relative text-4xl sm:text-[5rem] select-none leading-none drop-shadow-md z-10">🏆</span>,`
);

const oldContainer = `<div className="relative w-16 h-16 sm:w-28 sm:h-28 mx-auto flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {/* The spinning glowing glass border */}
                    <div className={\`absolute inset-0 rounded-full border-[3px] border-dashed \${config.iconGlow} animate-pulse group-hover:animate-[spin_3s_linear_infinite] transition-all duration-300\`} />
                    {/* Glass background */}
                    <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-md" />
                    {/* Icon */}
                    <div className="relative z-10 flex items-center justify-center">
                      {config.icon}
                    </div>
                  </div>`;

const newContainer = `<div className="relative w-20 h-20 sm:w-32 sm:h-32 mx-auto flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {/* The glowing solid border that spins on hover */}
                    <div className={\`absolute inset-0 rounded-full border-[3px] border-t-white \${config.iconGlow} group-hover:animate-[spin_3s_linear_infinite] transition-all duration-300\`} />
                    {/* Glass background */}
                    <div className="absolute inset-[3px] rounded-full bg-white/20 backdrop-blur-md border border-white/30" />
                    {/* Icon */}
                    <div className="relative z-10 flex items-center justify-center">
                      {config.icon}
                    </div>
                  </div>`;

if(content.includes('border-dashed')) {
  content = content.replace(oldContainer, newContainer);
  console.log("Container Replaced");
} else {
  console.log("Could not find the container to replace.");
}

content = content.replace(
  /iconGlow: 'shadow-\[0_0_25px_rgba\(34,211,238,0\.7\)\] border-cyan-400',/,
  "iconGlow: 'shadow-[0_0_20px_rgba(34,211,238,0.8)] border-cyan-400',"
);

content = content.replace(
  /iconGlow: 'shadow-\[0_0_25px_rgba\(232,121,249,0\.7\)\] border-fuchsia-400',/,
  "iconGlow: 'shadow-[0_0_20px_rgba(232,121,249,0.8)] border-fuchsia-400',"
);

content = content.replace(
  /iconGlow: 'shadow-\[0_0_25px_rgba\(251,191,36,0\.7\)\] border-amber-400',/,
  "iconGlow: 'shadow-[0_0_20px_rgba(251,191,36,0.8)] border-amber-400',"
);

fs.writeFileSync('src/pages/HomePage.tsx', content);
