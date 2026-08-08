import React from 'react';

export function getReadingContent(levelId: string, unitTitle: string) {
  if (levelId === '1AC') {
    return {
      text: `Il était une fois, dans un village lointain caché au cœur de la vallée verdoyante, un jeune garçon nommé Sami. Sami n'était pas un enfant comme les autres. Alors que ses camarades passaient leurs journées à jouer près de la rivière, il préférait s'aventurer dans la forêt des Murmures, un endroit que les anciens évitaient jalousement. Un matin, alors que le soleil perçait timidement à travers les feuillages denses, Sami découvrit une clairière illuminée par une lueur étrange. Au centre, posé sur un vieux tronc moussu, se trouvait un livre à la couverture dorée. Ce livre semblait palpiter, comme s'il respirait au rythme de la forêt. L'aventure, liée au thème "${unitTitle}", ne faisait que commencer...`,
      source: "Conte du Vieux Chêne / Éditions Pédagogiques du Collège",
      svg: <SvgConte />
    };
  } else if (levelId === '2AC') {
    return {
      text: `La Médina s'éveillait doucement sous les premiers rayons du soleil. Les ruelles étroites et sinueuses, pavées de pierres usées par le temps, étaient bordées de murs blancs éclatants aux portes en bois massif finement sculptées. L'air était déjà chargé des effluves enivrants d'épices, de menthe fraîche et de cuir chaud provenant des souks voisins. Au détour de la ruelle principale, la place centrale s'ouvrait comme une vaste scène théâtrale, encadrée par des arcades majestueuses. Les marchands commençaient à installer leurs étals colorés, apportant vie et animation à ce lieu chargé d'histoire. Ce décor fascinant, témoin silencieux de la thématique "${unitTitle}", offrait un spectacle où chaque recoin racontait une époque oubliée.`,
      source: "Description du Patrimoine / Anthologie 2ème Année",
      svg: <SvgLieu />
    };
  } else {
    return {
      text: `Le train filait à travers la nuit noire, secouant doucement les passagers endormis. Assis près de la vitre froide, l'inspecteur Lemaire fixait son reflet, l'esprit troublé par sa dernière enquête. Le compartiment baignait dans une lumière blafarde, et le silence n'était brisé que par le cliquetis régulier des roues sur les rails. Soudain, la porte coulissante s'ouvrit dans un grincement sourd. Une silhouette enveloppée dans un long manteau sombre se tenait sur le seuil. Sans prononcer un mot, l'inconnu déposa un petit carnet relié en cuir noir sur la banquette vide avant de disparaître dans le couloir. Lemaire savait que ce mystère, intimement lié à "${unitTitle}", allait changer le cours de son voyage...`,
      source: "Nouvelles Mystérieuses / Recueil pour 3AC",
      svg: <SvgNouvelle />
    };
  }
}

export function getListeningContent(levelId: string, unitTitle: string) {
  if (levelId === '1AC') {
    return {
      script: "- Bonjour Adam ! Tu as vu le nouveau club de théâtre du collège ?\n- Salut Sarah. Oui, j'ai vu l'affiche ce matin. Ça a l'air génial !\n- Tu vas t'inscrire ?\n- Je ne sais pas trop, je suis un peu timide... \n- Mais non, c'est l'occasion de découvrir de nouvelles choses et d'apprendre à s'exprimer ! En plus, le thème de cette année c'est : " + unitTitle + ".\n- Tu as raison. On y va ensemble à la récréation pour s'inscrire ?",
      svg: <SvgAudio1AC />
    };
  } else if (levelId === '2AC') {
    return {
      script: "- Bienvenue à tous dans notre émission 'Découvertes'. Aujourd'hui, nous avons l'honneur d'accueillir M. Karim, architecte.\n- Bonjour à tous.\n- M. Karim, pouvez-vous nous décrire l'importance de préserver notre patrimoine architectural ?\n- Absolument. Nos villes regorgent de trésors cachés. Les bâtiments anciens racontent notre histoire. En rénovant les vieux quartiers, nous protégeons notre identité tout en l'adaptant aux besoins modernes. C'est exactement le cœur de notre projet autour de : " + unitTitle + ".",
      svg: <SvgAudio2AC />
    };
  } else {
    return {
      script: "- Je pense fermement que l'intelligence artificielle va révolutionner notre façon d'apprendre.\n- Je ne suis pas entièrement d'accord. Bien sûr, c'est un outil puissant, mais il ne remplacera jamais l'esprit critique humain et le débat d'idées.\n- Mais regarde les avancées ! L'accès à l'information est instantané.\n- L'information n'est pas le savoir. Savoir trier, analyser et remettre en question, c'est cela la vraie éducation. D'ailleurs, notre prochain débat portera sur : " + unitTitle + ". Je suis sûr que nous aurons l'occasion d'en reparler de vive voix !",
      svg: <SvgAudio3AC />
    };
  }
}

const SvgConte = () => (
  <svg viewBox="0 0 400 250" className="w-full h-48 sm:h-64 object-cover rounded-xl" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="bgConte" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
      <linearGradient id="glowConte" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
      </linearGradient>
      <filter id="blurGlow">
        <feGaussianBlur stdDeviation="10" />
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgConte)" />
    <circle cx="200" cy="120" r="60" fill="url(#glowConte)" filter="url(#blurGlow)" />
    <path d="M120 180 Q200 220 280 180 L260 80 Q200 120 140 80 Z" fill="#38bdf8" fillOpacity="0.2" stroke="#818cf8" strokeWidth="2" />
    <path d="M190 195 L190 105 M210 195 L210 105" stroke="#e0e7ff" strokeWidth="2" strokeDasharray="4,4" />
    <circle cx="200" cy="110" r="15" fill="#fef08a" filter="url(#blurGlow)" />
    <path d="M185 110 L215 110 M200 95 L200 125" stroke="#fff" strokeWidth="2" />
  </svg>
);

const SvgLieu = () => (
  <svg viewBox="0 0 400 250" className="w-full h-48 sm:h-64 object-cover rounded-xl" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="bgLieu" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#450a0a" />
        <stop offset="50%" stopColor="#7c2d12" />
        <stop offset="100%" stopColor="#450a0a" />
      </linearGradient>
      <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgLieu)" />
    <circle cx="200" cy="150" r="80" fill="url(#sun)" />
    <path d="M0 250 L80 150 L120 180 L200 120 L280 170 L350 130 L400 250 Z" fill="#2e1005" />
    <path d="M0 250 L150 180 L250 200 L400 250 Z" fill="#1a0903" />
    <rect x="180" y="140" width="40" height="60" fill="#431407" rx="4" />
    <path d="M180 140 Q200 110 220 140 Z" fill="#7c2d12" />
  </svg>
);

const SvgNouvelle = () => (
  <svg viewBox="0 0 400 250" className="w-full h-48 sm:h-64 object-cover rounded-xl" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="bgNouvelle" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#020617" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
      <linearGradient id="lightBeam" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgNouvelle)" />
    <polygon points="120,40 160,20 240,20 280,40 280,220 120,220" fill="#0f172a" stroke="#334155" strokeWidth="2" />
    <rect x="185" y="100" width="30" height="40" rx="2" fill="#334155" />
    <circle cx="210" cy="120" r="3" fill="#94a3b8" />
    <polygon points="20,0 180,250 380,250 200,0" fill="url(#lightBeam)" />
  </svg>
);

const SvgAudio1AC = () => (
  <svg viewBox="0 0 400 200" className="w-full h-32 sm:h-48 object-cover rounded-xl" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="bgAudio1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#064e3b" />
        <stop offset="100%" stopColor="#022c22" />
      </linearGradient>
      <linearGradient id="wave1" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="50%" stopColor="#6ee7b7" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgAudio1)" />
    <path d="M0 100 Q 50 50, 100 100 T 200 100 T 300 100 T 400 100" fill="none" stroke="url(#wave1)" strokeWidth="6" strokeLinecap="round" />
    <path d="M0 100 Q 50 150, 100 100 T 200 100 T 300 100 T 400 100" fill="none" stroke="url(#wave1)" strokeWidth="3" opacity="0.5" />
    <circle cx="200" cy="100" r="30" fill="#065f46" stroke="#34d399" strokeWidth="2" />
    <polygon points="190,85 190,115 215,100" fill="#a7f3d0" />
  </svg>
);

const SvgAudio2AC = () => (
  <svg viewBox="0 0 400 200" className="w-full h-32 sm:h-48 object-cover rounded-xl" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="bgAudio2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4c1d95" />
        <stop offset="100%" stopColor="#2e1065" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgAudio2)" />
    <g fill="#c4b5fd">
      <rect x="100" y="80" width="10" height="40" rx="5" />
      <rect x="130" y="50" width="10" height="100" rx="5" />
      <rect x="160" y="20" width="10" height="160" rx="5" />
      <rect x="190" y="60" width="10" height="80" rx="5" />
      <rect x="220" y="30" width="10" height="140" rx="5" />
      <rect x="250" y="70" width="10" height="60" rx="5" />
      <rect x="280" y="90" width="10" height="20" rx="5" />
    </g>
  </svg>
);

const SvgAudio3AC = () => (
  <svg viewBox="0 0 400 200" className="w-full h-32 sm:h-48 object-cover rounded-xl" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="bgAudio3" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7c2d12" />
        <stop offset="100%" stopColor="#431407" />
      </linearGradient>
      <filter id="glow3">
        <feGaussianBlur stdDeviation="4" />
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgAudio3)" />
    <circle cx="150" cy="100" r="40" fill="none" stroke="#fdba74" strokeWidth="4" />
    <circle cx="250" cy="100" r="40" fill="none" stroke="#fdba74" strokeWidth="4" />
    <path d="M190 100 L210 100 M200 90 L200 110" stroke="#fdbA74" strokeWidth="3" />
    <circle cx="200" cy="100" r="20" fill="#ea580c" filter="url(#glow3)" />
  </svg>
);
