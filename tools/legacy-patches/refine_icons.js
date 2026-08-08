import fs from 'fs';
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

content = content.replace(
  /iconGlow: 'animate-pulse shadow-\[0_0_20px_rgba\(34,211,238,0\.7\)\] border-cyan-400\/80',/,
  "iconGlow: 'shadow-[0_0_25px_rgba(34,211,238,0.7)] border-cyan-400',"
);

content = content.replace(
  /iconGlow: 'animate-pulse shadow-\[0_0_20px_rgba\(232,121,249,0\.7\)\] border-fuchsia-400\/80',/,
  "iconGlow: 'shadow-[0_0_25px_rgba(232,121,249,0.7)] border-fuchsia-400',"
);

content = content.replace(
  /iconGlow: 'animate-pulse shadow-\[0_0_20px_rgba\(251,191,36,0\.7\)\] border-amber-400\/80',/,
  "iconGlow: 'shadow-[0_0_25px_rgba(251,191,36,0.7)] border-amber-400',"
);

const oldContainer = `<div className={\`w-16 h-16 sm:w-28 sm:h-28 rounded-full border-2 bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-105 transition-transform duration-200 \${config.iconGlow}\`}>
                    {config.icon}
                  </div>`;

const newContainer = `<div className="relative w-16 h-16 sm:w-28 sm:h-28 mx-auto flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {/* The spinning glowing glass border */}
                    <div className={\`absolute inset-0 rounded-full border-[3px] border-dashed \${config.iconGlow} animate-pulse group-hover:animate-[spin_3s_linear_infinite] transition-all duration-300\`} />
                    {/* Glass background */}
                    <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-md" />
                    {/* Icon */}
                    <div className="relative z-10 flex items-center justify-center">
                      {config.icon}
                    </div>
                  </div>`;

if(content.includes('group-hover:scale-105 transition-transform duration-200 ${config.iconGlow}')) {
  content = content.replace(oldContainer, newContainer);
  fs.writeFileSync('src/pages/HomePage.tsx', content);
  console.log("Replaced");
} else {
  console.log("Could not find the container to replace.");
}

