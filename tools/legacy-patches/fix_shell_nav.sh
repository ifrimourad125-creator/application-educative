cat << 'INNEREOF' > temp_shell_nav.tsx
      {/* Mobile Top Navigation Bar - Static (Scrolls naturally) */}
      <div className="relative z-50 -mx-2.5 sm:-mx-5 mt-0 px-2.5 sm:px-5 py-3 sm:py-4 flex items-center justify-center bg-transparent border-b-0">
        <div className="flex items-center justify-between w-full max-w-3xl">
          <div className="flex items-center gap-2 shrink-0 min-w-0">
            <PremiumBackButton onClick={onBack} label="Retour" />
            {onBackToLevel && <PremiumLevelButton onClick={onBackToLevel} label="Niveau" />}
          </div>
          <div className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white border border-emerald-500/40 shadow-lg shadow-emerald-900/20 backdrop-blur-xl shrink-0">
            <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-sm mr-2">
              <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <span className="text-sm sm:text-base font-bold tracking-wide whitespace-nowrap">Activité {activityId}</span>
          </div>
        </div>
      </div>
INNEREOF
sed -i '123,138c\
//REPLACED_SHELL_NAV\
' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_SHELL_NAV/r temp_shell_nav.tsx' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_SHELL_NAV/d' src/features/activities/activityShared.tsx
rm temp_shell_nav.tsx
