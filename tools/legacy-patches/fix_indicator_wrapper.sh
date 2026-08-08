cat << 'INNEREOF' > temp_indicator.tsx
          </div>
          <div className="inline-flex items-center justify-center px-2 py-1.5 text-slate-300 shrink-0 gap-1.5">
            <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap">Activité {activityId}</span>
          </div>
INNEREOF
sed -i '130,133c\
//REPLACED_INDICATOR\
' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_INDICATOR/r temp_indicator.tsx' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_INDICATOR/d' src/features/activities/activityShared.tsx
rm temp_indicator.tsx
