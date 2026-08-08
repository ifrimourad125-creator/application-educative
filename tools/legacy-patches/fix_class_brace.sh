cat << 'INNEREOF' > temp_c_brace.tsx
    return this.props.children
  }
}
const pageBackgrounds: Record<string, string> = {
INNEREOF
sed -i '69,71c\
//REPLACED_C_BRACE\
' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_C_BRACE/r temp_c_brace.tsx' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_C_BRACE/d' src/features/activities/activityShared.tsx
rm temp_c_brace.tsx
