cat << 'INNEREOF' > temp_brace.tsx
    unitId: selectedUnit?.id || 1,
    activityId: activity.id,
  };
  const getTone = (id: number) => {
INNEREOF
sed -i '133,135c\
//REPLACED_BRACE\
' src/pages/ActivityDetailPage.tsx
sed -i '/\/\/REPLACED_BRACE/r temp_brace.tsx' src/pages/ActivityDetailPage.tsx
sed -i '/\/\/REPLACED_BRACE/d' src/pages/ActivityDetailPage.tsx
rm temp_brace.tsx
