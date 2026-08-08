cat << 'INNEREOF' > temp_level_bg.tsx
  return (
    <div className={`flex flex-col justify-start p-4 sm:p-6 gap-4 sm:gap-6 max-w-2xl mx-auto w-full min-h-full pb-4 sm:pb-6 flex-shrink-0 relative overflow-hidden`}>
      {/* Dynamic Ambient Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] sm:w-[500px] sm:h-[500px] ${lvlTheme.glow1} blur-[80px] sm:blur-[120px] rounded-full opacity-40 mix-blend-screen animate-pulse`} style={{ animationDuration: '8s' }} />
        <div className={`absolute -bottom-[10%] -left-[10%] w-[60vw] h-[60vw] sm:w-[400px] sm:h-[400px] ${lvlTheme.glow2} blur-[80px] sm:blur-[100px] rounded-full opacity-30 mix-blend-screen animate-pulse`} style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 flex flex-col gap-4 sm:gap-6 w-full h-full">
        {/* Standalone Back Button Row (Glassmorphism Secondary Action) */}
INNEREOF
sed -i '57,60c\
//REPLACED_LEVEL_BG\
' src/pages/LevelPage.tsx
sed -i '/\/\/REPLACED_LEVEL_BG/r temp_level_bg.tsx' src/pages/LevelPage.tsx
sed -i '/\/\/REPLACED_LEVEL_BG/d' src/pages/LevelPage.tsx
rm temp_level_bg.tsx
