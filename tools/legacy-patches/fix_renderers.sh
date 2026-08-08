cat << 'INNEREOF' > temp_renderers.tsx
  const getTone = (id: number) => {
    const tones = ["emerald", "sky", "amber", "rose", "fuchsia", "orange", "violet", "indigo"];
    return tones[(id - 1) % 8] as any;
  };

  const currentTone = getTone(activity.id);

  const renderers: Record<number, React.ReactElement> = {
    1: <Vocabulary unit={unit} onBack={handleBack} onBackToLevel={handleBackToLevel} unitMeta={unitMeta} tone={currentTone} />,
    2: <SpeechActs unit={unit} onBack={handleBack} onBackToLevel={handleBackToLevel} unitMeta={unitMeta} tone={currentTone} />,
    3: <Listening unit={unit} onBack={handleBack} onBackToLevel={handleBackToLevel} unitMeta={unitMeta} tone={currentTone} />,
    4: <Reading unit={unit} onBack={handleBack} onBackToLevel={handleBackToLevel} unitMeta={unitMeta} tone={currentTone} />,
    5: <Fluency unit={unit} onBack={handleBack} onBackToLevel={handleBackToLevel} unitMeta={unitMeta} tone={currentTone} />,
    6: <Language unit={unit} onBack={handleBack} onBackToLevel={handleBackToLevel} unitMeta={unitMeta} tone={currentTone} />,
    7: <OralProduction unit={unit} onBack={handleBack} onBackToLevel={handleBackToLevel} unitMeta={unitMeta} tone={currentTone} />,
    8: <Writing unit={unit} onBack={handleBack} onBackToLevel={handleBackToLevel} unitMeta={unitMeta} tone={currentTone} />,
  };
INNEREOF
sed -i '135,148c\
//REPLACED_RENDERERS\
' src/pages/ActivityDetailPage.tsx
sed -i '/\/\/REPLACED_RENDERERS/r temp_renderers.tsx' src/pages/ActivityDetailPage.tsx
sed -i '/\/\/REPLACED_RENDERERS/d' src/pages/ActivityDetailPage.tsx
rm temp_renderers.tsx
