cat << 'INNEREOF' > temp_badge_color.tsx
          <div className={`inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white border shadow-lg backdrop-blur-xl shrink-0 ${TONE_BORDERS[tone || "cyan"]}`}>
            <div className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-white shadow-sm mr-2 ${TONE_GRADIENTS[tone || "cyan"]}`}>
              <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <span className="text-sm sm:text-base font-bold tracking-wide whitespace-nowrap">Activité {activityId}</span>
          </div>
INNEREOF
sed -i '129,134c\
//REPLACED_BADGE_COLOR\
' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_BADGE_COLOR/r temp_badge_color.tsx' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_BADGE_COLOR/d' src/features/activities/activityShared.tsx
rm temp_badge_color.tsx
