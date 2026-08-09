# APP DE FRANÇAIS — REACT FINAL / FLUTTER HANDOFF

## Statut

Cette version est la **référence React finale à utiliser pour la migration Flutter**.
Le principe est de reproduire le comportement et le contenu validés, sans réinventer la pédagogie.

## Référence pédagogique

- Unités : 30/30
- Séances : 300/300
- Niveaux : 1ac, 2ac, 3ac
- Semestres : s1, s2
- Unités avec contenu de fluence : 30
- Illustrations référencées : 30
- Audios référencés : 18

### Source de vérité du contenu

`src/data/finalUnits.json`

Ce fichier contient la structure pédagogique complète des unités et des séances.
Lors de la migration Flutter, conserver les mêmes données, textes, consignes, réponses, images et audios.

## Architecture à reproduire dans Flutter

- `src/data/finalUnits.json` → modèle de données pédagogique Flutter
- `src/data/levels.ts` → niveaux / organisation du programme
- `src/data/activities.ts` → catalogue des activités
- `src/data/finalModelUnits.ts` et `src/data/modelUnits.ts` → intégration du modèle
- `src/features/progression/` + `src/services/progress/` → logique et persistance de progression
- `src/services/audio/` + `src/data/audioManifest.ts` → audio et préférences audio
- `src/pages/` → écrans principaux
- `src/features/activities/` → logique d'affichage/exécution des activités
- `src/components/` → composants réutilisables
- `src/styles/` → référence visuelle à reproduire en Flutter, sans copier littéralement le CSS

## Règles pédagogiques importantes

### Textes-supports
- Présentation en bloc de lecture confortable.
- Texte justifié lorsque la mise en page le permet.
- Interligne et largeur adaptés au mobile.
- Paragraphes clairement séparés.

### Lecture fluence
Deux marqueurs ont des fonctions différentes :

- `/` = séparation entre groupes de sens / pause.
- Arc vert unique = liaison orale entre deux mots.

**Le signe de liaison doit relier précisément la dernière lettre du premier mot à la première lettre du second mot.**
Exemple : `les élèves` → liaison **s → é**.

Ne pas utiliser un double marqueur.
Ne pas étirer l'arc sur toute la largeur des deux mots.
Ne pas dessiner une forme de cœur.
La justification du texte ne doit jamais déformer le marqueur.

Le rappel pédagogique des liaisons doit rester court et adapté à l'élève, avec les exemples déjà validés.

## Assets

Les assets existants dans `public/images/`, `public/audio/` et `public/sounds/` font partie de la référence.
Ne pas remplacer les illustrations ni les textes sans décision explicite.

## Règle de migration

**React est la référence fonctionnelle. Flutter est une réimplémentation.**

À reproduire :
1. parcours utilisateur ;
2. contenu pédagogique ;
3. progression ;
4. activités ;
5. audio ;
6. images ;
7. responsive mobile ;
8. thème visuel général.

À améliorer ensuite, sans modifier la pédagogie :
- animations ;
- transitions ;
- micro-interactions ;
- effets tactiles ;
- performances ;
- architecture Flutter.

## Validation avant livraison Flutter

La version React de référence doit continuer à passer :

```text
npm install
npm run check
npm run build
```

Après migration, Flutter devra être contrôlé écran par écran par rapport à cette référence.
