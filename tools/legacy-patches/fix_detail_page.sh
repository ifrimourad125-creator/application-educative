cat << 'INNEREOF' > temp_detail.tsx
  const getTone = (id: number) => {
    const tones = ["emerald", "sky", "amber", "rose", "fuchsia", "orange", "violet", "indigo"];
    return tones[(id - 1) % 8] as any;
  };

  return (
    <Shell onBack={handleBack} onBackToLevel={handleBackToLevel} activityId={activity.id} tone={getTone(activity.id)}>
      <ActivityErrorBoundary>
        {renderers[activity.id] || <Empty message="Activité en cours de création" />}
      </ActivityErrorBoundary>
    </Shell>
  );
}
INNEREOF
sed -i '147,154c\
//REPLACED_SHELL\
' src/pages/ActivityDetailPage.tsx
sed -i '/\/\/REPLACED_SHELL/r temp_detail.tsx' src/pages/ActivityDetailPage.tsx
sed -i '/\/\/REPLACED_SHELL/d' src/pages/ActivityDetailPage.tsx
rm temp_detail.tsx
