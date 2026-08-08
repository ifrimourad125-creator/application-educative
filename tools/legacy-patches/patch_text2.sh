sed -i '243,244s/text-xs\n            sm:text-sm/text-sm\n            sm:text-base\n            text-justify/' src/features/activities/activityShared.tsx
sed -i 's/<p className="text-xs text-slate-300 mb-4 font-medium">/<p className="text-sm sm:text-base text-justify text-slate-300 mb-4 font-medium">/g' src/features/activities/activityShared.tsx
