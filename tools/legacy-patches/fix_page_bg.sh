cat << 'INNEREOF' > temp_bg.tsx
const pageBackgrounds: Record<string, string> = {
  emerald: "bg-[radial-gradient(circle_at_11%_8%,_rgba(45,212,191,0.28),_transparent_30%),radial-gradient(circle_at_88%_16%,_rgba(16,185,129,0.24),_transparent_31%),radial-gradient(circle_at_52%_98%,_rgba(52,211,153,0.14),_transparent_36%),linear-gradient(135deg,_#064e3b_0%,_#065f46_46%,_#022c22_100%)]",
  cyan: "bg-[radial-gradient(circle_at_9%_6%,_rgba(56,189,248,0.45),_transparent_28%),radial-gradient(circle_at_91%_14%,_rgba(14,165,233,0.30),_transparent_30%),radial-gradient(circle_at_52%_96%,_rgba(45,212,191,0.22),_transparent_34%),linear-gradient(135deg,_#04162f_0%,_#0b3567_48%,_#061a39_100%)]",
  sky: "bg-[radial-gradient(circle_at_8%_8%,_rgba(56,189,248,0.34),_transparent_30%),radial-gradient(circle_at_90%_15%,_rgba(2,132,199,0.22),_transparent_31%),radial-gradient(circle_at_48%_98%,_rgba(14,165,233,0.18),_transparent_36%),linear-gradient(135deg,_#061a2f_0%,_#0f3b57_46%,_#22145f_100%)]",
  amber: "bg-[radial-gradient(circle_at_11%_9%,_rgba(251,146,60,0.42),_transparent_30%),radial-gradient(circle_at_91%_14%,_rgba(250,204,21,0.30),_transparent_30%),radial-gradient(circle_at_52%_98%,_rgba(245,158,11,0.20),_transparent_35%),linear-gradient(135deg,_#1f1303_0%,_#7c2d12_42%,_#064e3b_100%)]",
  rose: "bg-[radial-gradient(circle_at_10%_10%,_rgba(251,113,133,0.42),_transparent_29%),radial-gradient(circle_at_88%_12%,_rgba(244,63,94,0.36),_transparent_31%),radial-gradient(circle_at_50%_100%,_rgba(225,29,72,0.20),_transparent_35%),linear-gradient(135deg,_#2c0718_0%,_#7f1d1d_45%,_#1e1b4b_100%)]",
  fuchsia: "bg-[radial-gradient(circle_at_12%_10%,_rgba(168,85,247,0.44),_transparent_30%),radial-gradient(circle_at_88%_18%,_rgba(236,72,153,0.34),_transparent_30%),radial-gradient(circle_at_50%_98%,_rgba(217,70,239,0.20),_transparent_36%),linear-gradient(135deg,_#160b36_0%,_#34156b_46%,_#071d3d_100%)]",
  orange: "bg-[radial-gradient(circle_at_10%_8%,_rgba(251,146,60,0.28),_transparent_30%),radial-gradient(circle_at_88%_14%,_rgba(249,115,22,0.24),_transparent_31%),radial-gradient(circle_at_50%_98%,_rgba(234,88,12,0.16),_transparent_35%),linear-gradient(135deg,_#120b2a_0%,_#431407_46%,_#1f1303_100%)]",
  violet: "bg-[radial-gradient(circle_at_10%_8%,_rgba(168,85,247,0.42),_transparent_29%),radial-gradient(circle_at_90%_14%,_rgba(139,92,246,0.36),_transparent_31%),radial-gradient(circle_at_50%_100%,_rgba(124,58,237,0.22),_transparent_35%),linear-gradient(135deg,_#1e1b4b_0%,_#4c1d95_42%,_#1e1b4b_100%)]",
  indigo: "bg-[radial-gradient(circle_at_10%_8%,_rgba(129,140,248,0.42),_transparent_29%),radial-gradient(circle_at_90%_14%,_rgba(99,102,241,0.36),_transparent_31%),radial-gradient(circle_at_50%_100%,_rgba(79,70,229,0.22),_transparent_35%),linear-gradient(135deg,_#0f172a_0%,_#312e81_42%,_#0f172a_100%)]",
};
INNEREOF
sed -i '71,80c\
//REPLACED_PAGEBG\
' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_PAGEBG/r temp_bg.tsx' src/features/activities/activityShared.tsx
sed -i '/\/\/REPLACED_PAGEBG/d' src/features/activities/activityShared.tsx
rm temp_bg.tsx
