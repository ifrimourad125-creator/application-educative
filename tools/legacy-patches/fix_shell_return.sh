cat << 'INNEREOF' > temp_shell.tsx
    indigo: "bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-700",
  }

  return (
    <div
INNEREOF
sed -i '96,98c\
//REPLACED_RETURN\
' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_RETURN/r temp_shell.tsx' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_RETURN/d' src/features/activities/activityShared.tsx
rm temp_shell.tsx
