cat << 'INNEREOF' > temp_badge.tsx
          <div className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white border border-emerald-500/40 shadow-lg shadow-emerald-900/20 backdrop-blur-xl shrink-0">
            <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-sm mr-2">
              <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <span className="text-sm sm:text-base font-bold tracking-wide whitespace-nowrap">Activité {activityId}</span>
          </div>
INNEREOF
sed -i '132,135c\
//REPLACED_BADGE\
' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_BADGE/r temp_badge.tsx' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_BADGE/d' src/features/activities/activityShared.tsx
rm temp_badge.tsx
