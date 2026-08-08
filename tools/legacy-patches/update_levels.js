import fs from 'fs';

const content = `export const programData = {
  '1AC': {
    'semestre1': [
      { id: 1, titre: 'Activités de quotidiens' },
      { id: 2, titre: 'Moments qui comptent' },
      { id: 3, titre: 'Des aventures qui nous font du bien' },
      { id: 4, titre: "Mon temps, un trésor !" },
      { id: 5, titre: 'Le consommer autrement' }
    ],
    'semestre2': [
      { id: 6, titre: 'Villes mythiques' },
      { id: 7, titre: 'Figures du monde' },
      { id: 8, titre: 'Défis climatiques' },
      { id: 9, titre: 'Créations écolo' },
      { id: 10, titre: 'Actes responsables' }
    ]
  },
  '2AC': {
    'semestre1': [
      { id: 1, titre: 'Nos passions, notre avenir' },
      { id: 2, titre: 'Histoires de famille' },
      { id: 3, titre: 'Histoires de demain' },
      { id: 4, titre: "Qu'est-ce qu'être français aujourd'hui ?" },
      { id: 5, titre: 'Le commerce de proximité' }
    ],
    'semestre2': [
      { id: 6, titre: 'Contes et légendes' },
      { id: 7, titre: 'Habitats et traditions' },
      { id: 8, titre: "L'homme et l'innovation" },
      { id: 9, titre: 'Toujours plus loin' },
      { id: 10, titre: 'Loisirs numériques' }
    ]
  },
  '3AC': {
    'semestre1': [
      { id: 1, titre: 'Voyages et découvertes' },
      { id: 2, titre: 'Spectacles à vivre' },
      { id: 3, titre: 'Héros comme nous' },
      { id: 4, titre: 'Plateau télé, leçons de vie' },
      { id: 5, titre: 'Consommer autrement' }
    ],
    'semestre2': [
      { id: 6, titre: 'Les villes de demain' },
      { id: 7, titre: 'Récits de vie' },
      { id: 8, titre: 'Vivre pour tous' },
      { id: 9, titre: "Récits et conseils d'ingénieuses" },
      { id: 10, titre: 'Les langues pour fendre sur le monde' }
    ]
  }
};

export const levels = [
  {
    id: "1ac",
    name: "Première Année Collège",
    short: "1AC",
    semesters: [
      {
        id: "s1",
        name: "Semestre 1",
        units: programData['1AC'].semestre1.map(u => ({ id: u.id, title: u.titre })),
      },
      {
        id: "s2",
        name: "Semestre 2",
        units: programData['1AC'].semestre2.map(u => ({ id: u.id, title: u.titre })),
      },
    ],
  },
  {
    id: "2ac",
    name: "Deuxième Année Collège",
    short: "2AC",
    semesters: [
      {
        id: "s1",
        name: "Semestre 1",
        units: programData['2AC'].semestre1.map(u => ({ id: u.id, title: u.titre })),
      },
      {
        id: "s2",
        name: "Semestre 2",
        units: programData['2AC'].semestre2.map(u => ({ id: u.id, title: u.titre })),
      },
    ],
  },
  {
    id: "3ac",
    name: "Troisième Année Collège",
    short: "3AC",
    semesters: [
      {
        id: "s1",
        name: "Semestre 1",
        units: programData['3AC'].semestre1.map(u => ({ id: u.id, title: u.titre })),
      },
      {
        id: "s2",
        name: "Semestre 2",
        units: programData['3AC'].semestre2.map(u => ({ id: u.id, title: u.titre })),
      },
    ],
  },
];
`;
fs.writeFileSync('src/data/levels.ts', content);
