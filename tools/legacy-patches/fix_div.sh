cat << 'INNEREOF' > temp_div_fix.tsx
          )}
    </Panel>
  )
}
INNEREOF
sed -i '1100,1104c\
//REPLACED_DIV_FIX\
' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_DIV_FIX/r temp_div_fix.tsx' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_DIV_FIX/d' src/features/activities/activityShared.tsx
rm temp_div_fix.tsx
