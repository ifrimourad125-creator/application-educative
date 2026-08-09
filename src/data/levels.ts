export const programData = {
  '1AC': {
    'semestre1': [
      { id: 1, titre: 'Ambiances du quotidien', emoji: '☕' },
      { id: 2, titre: 'Moments qui comptent', emoji: '📸' },
      { id: 3, titre: 'Des habitudes qui nous font du bien', emoji: '🎒' },
      { id: 4, titre: "Mon temps, un trésor !", emoji: '⏳' }
    ],
    'semestre2': [
      { id: 5, titre: 'Les autres et moi', emoji: '♻️' },
      { id: 6, titre: 'Villes mythiques', emoji: '🏛️' },
      { id: 7, titre: 'Figures du monde', emoji: '🌍' },
      { id: 8, titre: 'Défis climatiques', emoji: '🌡️' },
      { id: 9, titre: 'Créations écolo', emoji: '🌱' },
      { id: 10, titre: 'Ados responsables', emoji: '🤝' }
    ]
  },
  '2AC': {
    'semestre1': [
      { id: 1, titre: 'Mon parcours, mon avenir', emoji: '🎨' },
      { id: 2, titre: 'Fêtes du monde', emoji: '👨‍👩‍👧‍👦' },
      { id: 3, titre: 'Métiers de demain', emoji: '🚀' },
      { id: 4, titre: "Écrans : trop ou pas assez ?", emoji: '🇫🇷' }
    ],
    'semestre2': [
      { id: 5, titre: 'La science à notre service', emoji: '🏪' },
      { id: 6, titre: 'Contes et légendes', emoji: '🧚' },
      { id: 7, titre: 'Habits et traditions', emoji: '🏡' },
      { id: 8, titre: "Graines d’inventeurs", emoji: '💡' },
      { id: 9, titre: 'Toujours plus loin', emoji: '🌌' },
      { id: 10, titre: 'Loisirs numériques', emoji: '🎮' }
    ]
  },
  '3AC': {
    'semestre1': [
      { id: 1, titre: 'Voyages et découvertes', emoji: '✈️' },
      { id: 2, titre: 'Spectacles à vivre', emoji: '🎭' },
      { id: 3, titre: 'Héros comme nous', emoji: '🦸' },
      { id: 4, titre: 'Petites histoires, leçons de vie', emoji: '📺' }
    ],
    'semestre2': [
      { id: 5, titre: 'Consommer autrement', emoji: '🛒' },
      { id: 6, titre: 'Les villes de demain', emoji: '🏙️' },
      { id: 7, titre: 'Récits de vie', emoji: '📖' },
      { id: 8, titre: 'L’école pour tous', emoji: '🕊️' },
      { id: 9, titre: "Récits et univers imaginaires", emoji: '⚙️' },
      { id: 10, titre: 'Les langues : une fenêtre sur le monde', emoji: '🗣️' }
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
