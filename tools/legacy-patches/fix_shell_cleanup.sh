cat << 'INNEREOF' > temp_shell.tsx
function Shell({
  children,
  onBack,
  onBackToLevel,
  activityId = 1,
  tone = "cyan",
}: {
  children: ReactElement
  onBack: () => void
  onBackToLevel?: () => void
  activityId?: number
  tone?: string
}) {
  return (
    <div
      className={`
INNEREOF
sed -i '84,115c\
//REPLACED_SHELL_CLEANUP\
' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_SHELL_CLEANUP/r temp_shell.tsx' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_SHELL_CLEANUP/d' src/features/activities/activityShared.tsx
rm temp_shell.tsx
