cat << 'INNEREOF' > temp_clean.tsx
  return (
    <Shell onBack={handleBack} onBackToLevel={handleBackToLevel} activityId={activity.id} tone={currentTone}>
      <ActivityErrorBoundary>
        {renderers[activity.id] || <Empty message="Activité en cours de création" />}
      </ActivityErrorBoundary>
    </Shell>
  );
}
INNEREOF
sed -i '151,165c\
//REPLACED_CLEAN\
' src/pages/ActivityDetailPage.tsx
sed -i '/\/\/REPLACED_CLEAN/r temp_clean.tsx' src/pages/ActivityDetailPage.tsx
sed -i '/\/\/REPLACED_CLEAN/d' src/pages/ActivityDetailPage.tsx
rm temp_clean.tsx
