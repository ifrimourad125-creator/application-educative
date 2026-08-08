export const programData = {
  '1AC': {
    'semestre1': [
      { id: 1, titre: 'Activités de quotidiens', emoji: '☕' },
      { id: 2, titre: 'Moments qui comptent', emoji: '📸' },
      { id: 3, titre: 'Des aventures qui nous font du bien', emoji: '🎒' },
      { id: 4, titre: "Mon temps, un trésor !", emoji: '⏳' }
    ],
    'semestre2': [
      { id: 5, titre: 'Le consommer autrement', emoji: '♻️' },
      { id: 6, titre: 'Villes mythiques', emoji: '🏛️' },
      { id: 7, titre: 'Figures du monde', emoji: '🌍' },
      { id: 8, titre: 'Défis climatiques', emoji: '🌡️' },
      { id: 9, titre: 'Créations écolo', emoji: '🌱' },
      { id: 10, titre: 'Actes responsables', emoji: '🤝' }
    ]
  },
  '2AC': {
    'semestre1': [
      { id: 1, titre: 'Nos passions, notre avenir', emoji: '🎨' },
      { id: 2, titre: 'Histoires de famille', emoji: '👨‍👩‍👧‍👦' },
      { id: 3, titre: 'Histoires de demain', emoji: '🚀' },
      { id: 4, titre: "Qu'est-ce qu'être français aujourd'hui ?", emoji: '🇫🇷' }
    ],
    'semestre2': [
      { id: 5, titre: 'Le commerce de proximité', emoji: '🏪' },
      { id: 6, titre: 'Contes et légendes', emoji: '🧚' },
      { id: 7, titre: 'Habitats et traditions', emoji: '🏡' },
      { id: 8, titre: "L'homme et l'innovation", emoji: '💡' },
      { id: 9, titre: 'Toujours plus loin', emoji: '🌌' },
      { id: 10, titre: 'Loisirs numériques', emoji: '🎮' }
    ]
  },
  '3AC': {
    'semestre1': [
      { id: 1, titre: 'Voyages et découvertes', emoji: '✈️' },
      { id: 2, titre: 'Spectacles à vivre', emoji: '🎭' },
      { id: 3, titre: 'Héros comme nous', emoji: '🦸' },
      { id: 4, titre: 'Plateau télé, leçons de vie', emoji: '📺' }
    ],
    'semestre2': [
      { id: 5, titre: 'Consommer autrement', emoji: '🛒' },
      { id: 6, titre: 'Les villes de demain', emoji: '🏙️' },
      { id: 7, titre: 'Récits de vie', emoji: '📖' },
      { id: 8, titre: 'Vivre pour tous', emoji: '🕊️' },
      { id: 9, titre: "Récits et conseils d'ingénieuses", emoji: '⚙️' },
      { id: 10, titre: 'Les langues pour fendre sur le monde', emoji: '🗣️' }
    ]
  }
};

export const levels = [
  {
    id: "1ac",
    name: "Première Année Collège",
    short: "1AC",
    icon: "📖",
    semesters: [
      {
        id: "s1",
        name: "Semestre 1",
        units: programData['1AC'].semestre1.map(u => ({ id: u.id, title: u.titre, emoji: u.emoji })),
      },
      {
        id: "s2",
        name: "Semestre 2",
        units: programData['1AC'].semestre2.map(u => ({ id: u.id, title: u.titre, emoji: u.emoji })),
      },
    ],
  },
  {
    id: "2ac",
    name: "Deuxième Année Collège",
    short: "2AC",
    icon: "🚀",
    semesters: [
      {
        id: "s1",
        name: "Semestre 1",
        units: programData['2AC'].semestre1.map(u => ({ id: u.id, title: u.titre, emoji: u.emoji })),
      },
      {
        id: "s2",
        name: "Semestre 2",
        units: programData['2AC'].semestre2.map(u => ({ id: u.id, title: u.titre, emoji: u.emoji })),
      },
    ],
  },
  {
    id: "3ac",
    name: "Troisième Année Collège",
    short: "3AC",
    icon: "🏆",
    semesters: [
      {
        id: "s1",
        name: "Semestre 1",
        units: programData['3AC'].semestre1.map(u => ({ id: u.id, title: u.titre, emoji: u.emoji })),
      },
      {
        id: "s2",
        name: "Semestre 2",
        units: programData['3AC'].semestre2.map(u => ({ id: u.id, title: u.titre, emoji: u.emoji })),
      },
    ],
  },
];
