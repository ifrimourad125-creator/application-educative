cat << 'INNEREOF' > temp_r_brace.tsx
    8: <Writing unit={unit} onBack={handleBack} onBackToLevel={handleBackToLevel} unitMeta={unitMeta} tone={currentTone} />,
  };
  return (
INNEREOF
sed -i '152,153c\
//REPLACED_R_BRACE\
' src/pages/ActivityDetailPage.tsx
sed -i '/\/\/REPLACED_R_BRACE/r temp_r_brace.tsx' src/pages/ActivityDetailPage.tsx
sed -i '/\/\/REPLACED_R_BRACE/d' src/pages/ActivityDetailPage.tsx
rm temp_r_brace.tsx
