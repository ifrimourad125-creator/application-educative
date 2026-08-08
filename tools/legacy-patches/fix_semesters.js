import fs from 'fs';
let content = fs.readFileSync('src/data/levels.ts', 'utf8');

const replacement = `export const programData = {
  '1AC': {
    'semestre1': [
      { id: 1, titre: 'Activités de quotidiens' },
      { id: 2, titre: 'Moments qui comptent' },
      { id: 3, titre: 'Des aventures qui nous font du bien' },
      { id: 4, titre: "Mon temps, un trésor !" }
    ],
    'semestre2': [
      { id: 5, titre: 'Le consommer autrement' },
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
      { id: 4, titre: "Qu'est-ce qu'être français aujourd'hui ?" }
    ],
    'semestre2': [
      { id: 5, titre: 'Le commerce de proximité' },
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
      { id: 4, titre: 'Plateau télé, leçons de vie' }
    ],
    'semestre2': [
      { id: 5, titre: 'Consommer autrement' },
      { id: 6, titre: 'Les villes de demain' },
      { id: 7, titre: 'Récits de vie' },
      { id: 8, titre: 'Vivre pour tous' },
      { id: 9, titre: "Récits et conseils d'ingénieuses" },
      { id: 10, titre: 'Les langues pour fendre sur le monde' }
    ]
  }
};`;

content = content.replace(/export const programData = \{[\s\S]*?\};/, replacement);
fs.writeFileSync('src/data/levels.ts', content);
