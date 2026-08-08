cat << 'INNEREOF' > temp_nav.tsx
      <div className="relative z-50 -mx-2.5 sm:-mx-5 mt-0 px-2.5 sm:px-5 py-3 sm:py-4 flex items-center justify-center bg-transparent border-b-0">
        <div className="flex items-center justify-between w-full max-w-3xl">
          <div className="flex items-center gap-2 shrink-0 min-w-0">
            <PremiumBackButton onClick={onBack} label="Retour" />
            {onBackToLevel && <PremiumLevelButton onClick={onBackToLevel} label="Niveau" />}
          </div>
          <div className="inline-flex items-center justify-center px-2 py-1.5 text-slate-300 shrink-0 gap-1.5">
            <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap">Activité {activityId}</span>
          </div>
        </div>
      </div>
INNEREOF
sed -i '125,138c\
//REPLACED_NAV\
' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_NAV/r temp_nav.tsx' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_NAV/d' src/features/activities/activityShared.tsx
rm temp_nav.tsx
