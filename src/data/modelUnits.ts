import { extraModelUnits } from "./extraModelUnits"
import { programData } from "./levels"
import type { ModelUnitContent } from "../types/pedagogy"
import { getPedagogicalAudioPath } from "./audioManifest"

export const supportImageGuideline =
  "Images de support toujours ultraréalistes, nettes, pédagogiques, modernes, adaptées à des collégiens et cohérentes avec le thème de l’activité ou du support audio."

function makeModelUnit(config: Record<string, unknown>) {
  return {
    title: config.title,
    theme: config.theme,
    finalTask: config.finalTask,
    vocabulary: {
      title: config.vocabularyTitle,
      objective: config.vocabularyObjective,
      instruction: "Lis chaque phrase, puis clique sur le mot qui convient pour la compléter.",
      sessions: config.vocabularySessions,
      finalMessage: config.vocabularyMessage,
    },
    speechActs: {
      title: config.speechTitle,
      objective: config.speechObjective,
      instruction: "Lis le dialogue, puis complète les paroles avec l'expression qui convient.",
      situation: config.speechSituation,
      expressions: config.speechExpressions,
      options: config.speechExpressions,
      dialogue: config.speechDialogue,
      correction: config.speechCorrection,
      finalMessage: config.speechMessage,
    },
    listening: {
      title: config.listeningTitle,
      audio: config.audio,
      objective: config.listeningObjective,
      instruction:
        "Écoute attentivement le message audio, puis réponds aux questions en cliquant sur les bonnes réponses.",
      script: config.listeningScript,
      supportImagePrompt: config.audioImagePrompt,
      situation: config.listeningSituation,
      heardWords: config.heardWords,
      intruders: config.intruders,
      questions: config.listeningQuestions,
      finalMessage: config.listeningMessage,
    },
    reading: {
      title: config.readingTitle,
      objective: config.readingObjective,
      instruction:
        "Lis le texte, observe le titre, la source et l'image, puis réponds aux questions.",
      image: config.readingImage,
      imageAlt: config.readingImageAlt,
      source: config.readingSource,
      text: config.readingText,
      communication: config.communicationQuestions,
      paratext: config.paratextQuestions,
      direct: config.directQuestions,
      inferenceQuestion: config.inferenceQuestion,
      freeQuestion: config.inferenceQuestion,
      correction: config.readingCorrection,
      finalMessage: config.readingMessage,
    },
    language: {
      title: config.languageTitle,
      objective: config.languageObjective,
      instruction: "Lis le rappel, observe les exemples, puis clique sur la bonne réponse.",
      reminder: config.languageReminder,
      examples: config.languageExamples,
      questions: config.languageQuestions,
      finalMessage: config.languageMessage,
    },
    oralProduction: {
      title: "Situation de production orale",
      objective: config.oralObjective,
      instruction:
        "Lis la situation, prépare tes idées, puis présente ton intervention orale en respectant le plan proposé.",
      situation: config.oralSituation,
      keywords: config.oralKeywords,
      expressions: config.oralExpressions,
      plan: config.oralPlan,
      length: config.oralLength,
      correction: config.oralCorrection,
      finalMessage: config.oralMessage,
    },
    writing: {
      title: "Production écrite",
      objective: config.writingObjective,
      instruction:
        "Lis le sujet, repère les mots-clés, puis rédige un texte organisé en respectant le plan.",
      subject: config.writingSituation,
      situation: config.writingSituation,
      keywords: config.writingKeywords,
      plan: config.writingPlan,
      words: config.writingWords,
      length: config.writingLength,
      correction: config.writingCorrection,
      finalMessage: config.writingMessage,
    },
    fluency: {
      title: "Lecture fluence",
      objective: config.fluencyObjective,
      instruction:
        "Lis le texte à haute voix. Respecte les pauses, articule bien les mots et lis avec une intonation naturelle.",
      explanation: config.fluencyExplanation,
      text: config.fluencyText,
      liaisons: config.liaisons,
      checklist: config.fluencyChecklist || [
        "J'ai respecté les pauses.",
        "J'ai bien articulé.",
        "J'ai gardé un bon rythme.",
        "J'ai mis une intonation naturelle.",
      ],
      finalMessage: config.fluencyMessage,
    },
  }
}

export const modelUnits: Record<string, ModelUnitContent | Record<string, unknown>> = {
  "1ac-s1-1": {
    title: "Prêt pour un petit effort ?",
    theme: "sport, activité physique et bien-être",
    finalTask: "Réaliser un podcast qui incite à la pratique du sport et de l'activité physique.",
    vocabulary: {
      title: "Tu fais du sport ?",
      objective: "Utiliser le vocabulaire du sport, de l'activité physique et du bien-être.",
      instruction: "Lis chaque phrase, puis clique sur le mot qui convient pour la compléter.",
      sessions: [
        {
          title: "Séance 1 : Les activités physiques",
          words: ["sport", "courir", "natation", "s'échauffer", "match", "entraînement"],
          sentences: [
            { text: "Je pratique un ______ pour rester en forme.", answer: "sport" },
            { text: "Avant le match, les joueurs doivent ______.", answer: "s'échauffer" },
            { text: "Mon frère aime ______ dans le parc.", answer: "courir" },
            { text: "La ______ se pratique dans l'eau.", answer: "natation" },
            { text: "Notre équipe prépare un grand ______.", answer: "match" },
            { text: "L'______ aide les joueurs à progresser.", answer: "entraînement" },
          ],
        },
        {
          title: "Séance 2 : Ça fait du bien !",
          words: ["énergie", "santé", "activité physique", "fatigue", "bien-être", "muscles"],
          sentences: [
            { text: "Le sport donne de l'______ au corps.", answer: "énergie" },
            { text: "Dormir tôt protège la ______.", answer: "santé" },
            { text: "Marcher chaque jour est une bonne ______.", answer: "activité physique" },
            { text: "Après un effort long, je ressens de la ______.", answer: "fatigue" },
            { text: "Le sport améliore le ______.", answer: "bien-être" },
            { text: "Les exercices renforcent les ______.", answer: "muscles" },
          ],
        },
      ],
      finalMessage: "Bravo ! Tu maîtrises mieux le vocabulaire du sport et du bien-être.",
    },
    speechActs: {
      title: "Un peu plus de sport !",
      objective: "Formuler des conseils pour encourager quelqu'un à faire du sport.",
      instruction:
        "Lis la situation, puis complète le dialogue en cliquant sur les expressions qui conviennent.",
      situation:
        "Ton ami dit qu'il est fatigué et qu'il ne veut pas faire de sport.\n\nTu lui donnes des conseils simples pour l'encourager à bouger davantage.",
      options: ["faire une activité physique", "marcher", "la natation", "t'échauffer"],
      dialogue: [
        { speaker: "Amine", text: "Je suis souvent fatigué. Je ne veux pas faire de sport." },
        {
          speaker: "Toi",
          text: "Tu devrais ______. Cela peut te donner plus d'énergie.",
          answer: "faire une activité physique",
        },
        { speaker: "Amine", text: "Mais je n'ai pas beaucoup de temps." },
        {
          speaker: "Toi",
          text: "Tu peux ______ seulement vingt minutes par jour.",
          answer: "marcher",
        },
        { speaker: "Amine", text: "Et si je ne sais pas quelle activité choisir ?" },
        {
          speaker: "Toi",
          text: "Choisis une activité simple, par exemple ______.",
          answer: "la natation",
        },
        { speaker: "Amine", text: "D'accord, je vais essayer." },
        {
          speaker: "Toi",
          text: "Très bien ! N'oublie pas de ______ avant de commencer.",
          answer: "t'échauffer",
        },
      ],
      finalMessage:
        "Bravo ! Tu sais utiliser des conseils simples pour encourager quelqu'un à faire du sport.",
    },
    listening: {
      title: "Tu fais du sport ?",
      audio: "/audio/1ac_u1_oral.mp3",
      objective: "Repérer les mots-clés dans un message audio sur le sport.",
      instruction:
        "Écoute attentivement le message audio, puis réponds aux questions en cliquant sur les bonnes réponses.",
      script:
        "Bonjour les élèves.\n\nAujourd'hui, je voudrais vous parler d'une habitude simple qui peut changer notre journée : bouger un peu plus.\n\nLe sport aide le corps à rester en bonne santé. Il donne de l'énergie, renforce les muscles et permet de se sentir plus calme.\n\nIl n'est pas nécessaire de faire un grand effort. On peut marcher dans le quartier, courir doucement, faire du vélo ou pratiquer la natation.\n\nAvant de commencer, pensez toujours à vous échauffer. Après l'activité, buvez de l'eau et laissez votre corps se reposer.\n\nAlors, même si vous avez peu de temps, essayez de bouger vingt minutes par jour. Petit à petit, cette habitude peut vous faire beaucoup de bien.",
      supportImagePrompt:
        "Photo ultraréaliste, nette et pédagogique pour support audio : collégiens de 12 à 14 ans écoutant un message du club média sur le sport et le bien-être, ambiance scolaire moderne, naturelle, sans cartoon.",
      situation: {
        speaker: "un animateur du club média",
        receiver: "aux élèves du collège",
        subject: "du sport et de ses bienfaits",
        purpose: "encourager les élèves à bouger davantage",
      },
      heardWords: ["sport", "santé", "marcher", "natation", "s'échauffer", "énergie"],
      intruders: ["ordinateur", "voyage"],
      questions: [
        {
          question: "Pourquoi faut-il faire une activité physique ?",
          answer: "pour rester en bonne santé",
          options: [
            "pour rester en bonne santé",
            "pour regarder la télévision",
            "pour acheter des vêtements",
            "pour dormir toute la journée",
          ],
        },
        {
          question: "Que faut-il faire avant chaque effort ?",
          answer: "s'échauffer",
          options: ["s'échauffer", "manger beaucoup de sucre", "rester assis", "regarder un film"],
        },
        {
          question: "Quelles activités sont citées dans le message ?",
          answer: "marcher, courir, faire du vélo et pratiquer la natation",
          options: [
            "marcher, courir, faire du vélo et pratiquer la natation",
            "dessiner, chanter et dormir",
            "acheter, vendre et compter",
            "lire, écrire et calculer",
          ],
        },
        {
          question: "Combien de temps par jour peut déjà être utile ?",
          answer: "vingt minutes",
          options: ["vingt minutes", "trois heures", "toute la journée", "cinq secondes"],
        },
      ],
      finalMessage: "Bravo ! Tu as bien repéré les informations importantes dans le message audio.",
    },
    reading: {
      title: "Restez en forme",
      objective:
        "Déduire la thématique d'un texte à partir du titre, de l'image, de la source et des informations importantes.",
      instruction:
        "Observe d'abord le titre, l'image et la source, puis lis le texte et réponds aux questions.",
      source: "Magazine scolaire",
      image: "/images/lecture-sport-parc-realiste.webp",
      imageAlt: "Des collégiens qui font une activité physique dans un parc.",
      imagePrompt:
        "Photo ultraréaliste, nette et lumineuse de collégiens de 12 à 14 ans faisant une activité physique dans un parc, style éducatif moderne, naturel, sans aspect cartoon.",
      text: "Au collège, beaucoup d'élèves passent de longues heures assis. Pourtant, bouger chaque jour aide le corps et l'esprit.\n\nUne marche rapide, une course légère ou une séance de natation peuvent suffire pour se sentir mieux. Le sport donne de l'énergie, renforce les muscles et améliore l'humeur.\n\nAvant l'effort, il faut s'échauffer afin de préparer le corps. Après l'activité, il est important de boire de l'eau et de se reposer.\n\nLe sport n'est pas seulement une compétition. C'est aussi une habitude simple pour protéger sa santé et garder confiance en soi.",
      communication: [
        {
          question: "Qui parle dans ce texte ?",
          answer: "un magazine scolaire",
          options: ["un magazine scolaire", "un médecin", "un vendeur", "un touriste"],
        },
        {
          question: "À qui s'adresse le texte ?",
          answer: "aux jeunes élèves",
          options: ["aux jeunes élèves", "aux touristes", "aux automobilistes", "aux cuisiniers"],
        },
        {
          question: "De quoi parle le texte ?",
          answer: "du sport et de la santé",
          options: [
            "du sport et de la santé",
            "des voyages",
            "des achats en ligne",
            "de la musique",
          ],
        },
        {
          question: "Dans quel but ce texte est-il écrit ?",
          answer: "encourager les jeunes à pratiquer une activité physique",
          options: [
            "encourager les jeunes à pratiquer une activité physique",
            "vendre des chaussures",
            "raconter une histoire drôle",
            "présenter une ville",
          ],
        },
      ],
      paratext: [
        {
          question: "D'après le titre et l'image, de quoi va parler le texte ?",
          answer: "du sport et de la santé",
          options: [
            "du sport et de la santé",
            "des achats en ligne",
            "des monuments historiques",
            "des instruments de musique",
          ],
        },
        {
          question: "Que montre l'image ?",
          answer: "des collégiens qui font une activité physique",
          options: [
            "des collégiens qui font une activité physique",
            "des élèves qui dorment en classe",
            "des touristes devant un monument",
            "des clients dans un magasin",
          ],
        },
        {
          question: "Que signifie le titre « Restez en forme » ?",
          answer: "garder une bonne santé",
          options: [
            "garder une bonne santé",
            "acheter un produit",
            "raconter un voyage",
            "préparer un repas",
          ],
        },
        {
          question: "Quelle information donne la source « Magazine scolaire » ?",
          answer: "le texte est destiné aux élèves",
          options: [
            "le texte est destiné aux élèves",
            "le texte est une facture",
            "le texte est une recette",
            "le texte est une publicité commerciale",
          ],
        },
      ],
      direct: [
        {
          question: "De quoi parle le texte ?",
          answer: "du sport et de ses bienfaits pour la santé",
          options: [
            "du sport et de ses bienfaits pour la santé",
            "des achats en ligne",
            "des monuments historiques",
            "des fêtes scolaires",
          ],
        },
        {
          question: "Comment peut-on pratiquer une activité simple chaque jour ?",
          answer: "en marchant, en courant, en faisant du vélo ou en nageant",
          options: [
            "en marchant, en courant, en faisant du vélo ou en nageant",
            "en regardant la télévision toute la journée",
            "en dormant longtemps",
            "en mangeant beaucoup de sucre",
          ],
        },
        {
          question: "Pourquoi faut-il s'échauffer avant l'effort ?",
          answer: "pour préparer son corps et éviter les blessures",
          options: [
            "pour préparer son corps et éviter les blessures",
            "pour perdre son temps",
            "pour arrêter le sport",
            "pour remplacer l'eau",
          ],
        },
        {
          question: "Quelle information importante le texte donne-t-il après l'activité ?",
          answer: "il faut boire de l'eau et se reposer",
          options: [
            "il faut boire de l'eau et se reposer",
            "il faut courir sans arrêt",
            "il faut oublier la fatigue",
            "il faut manger très vite",
          ],
        },
      ],
      freeQuestion: "Pourquoi peut-on dire que le sport est une bonne habitude de vie ?",
      correction:
        "On peut dire que le sport est une bonne habitude de vie parce qu'il aide à protéger la santé et à se sentir mieux.\n\nIl donne de l'énergie, améliore le bien-être et apprend aussi à prendre soin de son corps régulièrement.",
      finalMessage:
        "Bravo ! Tu as bien observé le paratexte et compris les informations importantes du texte.",
    },
    language: {
      title: "Donner des conseils avec l'impératif",
      objective:
        "Utiliser l'impératif pour donner des conseils en lien avec le sport et l'activité physique.",
      instruction:
        "Lis le rappel, observe les exemples, puis clique sur la forme correcte pour compléter chaque conseil.",
      reminder:
        "À l'impératif, on donne un conseil ou une consigne sans utiliser le pronom sujet.\n\nVerbes du 1er groupe : on enlève souvent le s à la 2e personne du singulier. Exemple : marche, bouge, écoute.\n\nVerbes du 2e groupe : on garde la terminaison -is. Exemple : choisis, finis.\n\nVerbes du 3e groupe : la forme dépend du verbe. Exemple : bois, fais, prends.",
      examples: [
        "Marche chaque jour.",
        "Choisis une activité simple.",
        "Bois de l'eau après l'effort.",
        "Échauffe-toi avant le sport.",
      ],
      questions: [
        {
          question: "______ chaque jour pour rester en forme.",
          verb: "marcher, 1er groupe",
          answer: "Marche",
          options: ["Marche", "Marches", "Marcher", "Marchons"],
        },
        {
          question: "______ une activité que tu aimes.",
          verb: "choisir, 2e groupe",
          answer: "Choisis",
          options: ["Choisis", "Choisit", "Choisir", "Choisissons"],
        },
        {
          question: "______ de l'eau après l'activité physique.",
          verb: "boire, 3e groupe",
          answer: "Bois",
          options: ["Bois", "Boit", "Boire", "Buvez-moi"],
        },
        {
          question: "______ attention à ton corps pendant l'effort.",
          verb: "faire, 3e groupe",
          answer: "Fais",
          options: ["Fais", "Fait", "Faire", "Faisons"],
        },
        {
          question: "______ ton temps pour bien t'échauffer.",
          verb: "prendre, 3e groupe",
          answer: "Prends",
          options: ["Prends", "Prend", "Prendre", "Prenons"],
        },
        {
          question: "______ régulièrement pour progresser.",
          verb: "s'entraîner, 1er groupe",
          answer: "Entraîne-toi",
          options: ["Entraîne-toi", "Entraînes-toi", "S'entraîner", "Entraînement"],
        },
      ],
      finalMessage: "Bravo ! Tu sais utiliser l'impératif pour donner des conseils simples.",
    },
    oralProduction: {
      title: "Situation de production orale",
      objective:
        "Présenter à l'oral des conseils pour encourager les élèves à faire une activité physique.",
      instruction:
        "Lis la situation, prépare tes idées, puis présente ton intervention orale en respectant le plan proposé.",
      situation:
        "Le club média de ton collège prépare un court podcast pour encourager les élèves à bouger davantage.\n\nTu vas prendre la parole devant tes camarades pour présenter deux bienfaits du sport et donner deux conseils simples à suivre au quotidien.",
      keywords: [
        "club média",
        "podcast",
        "encourager",
        "deux bienfaits",
        "deux conseils",
        "au quotidien",
      ],
      expressions: [
        "Bonjour à tous",
        "Aujourd'hui, je vais vous parler de...",
        "Le sport est important parce que...",
        "Il aide à...",
        "Je vous conseille de...",
        "N'oubliez pas de...",
        "Pour rester en forme...",
        "Merci de votre écoute",
      ],
      plan: [
        "Introduction : salue les auditeurs et présente le thème.",
        "Développement : présente deux bienfaits du sport et donne deux conseils.",
        "Conclusion : encourage les élèves à pratiquer une activité physique régulièrement.",
      ],
      length: "6 à 8 phrases simples.",
      correction:
        "Bonjour à tous.\n\nAujourd'hui, je vais vous parler d'une habitude qui peut nous aider à mieux vivre : pratiquer une activité physique.\n\nLe sport aide le corps à rester en bonne santé. Il donne de l'énergie, renforce les muscles et permet aussi de se sentir plus détendu.\n\nJe vous conseille de choisir une activité simple, comme la marche, le football ou la natation. L'important est de bouger régulièrement et de commencer doucement.\n\nN'oubliez pas de vous échauffer avant l'effort et de boire de l'eau après l'activité.\n\nAlors, bougeons un peu chaque jour pour rester en forme.\n\nMerci de votre écoute.",
      finalMessage: "Bravo ! Tu as préparé une intervention orale claire et motivante.",
    },
    writing: {
      title: "Sujet",
      objective:
        "Rédiger un texte organisé pour encourager les jeunes à pratiquer une activité physique.",
      instruction:
        "Lis le sujet, clique sur « Mots-clés soulignés » pour repérer les informations importantes, puis rédige ton texte en respectant le plan proposé.",
      subject:
        "Le club média de ton collège prépare un podcast pour encourager les élèves à bouger davantage.\n\nÉcris le texte que tu vas lire au micro.\n\nPrésente deux bienfaits du sport et donne deux conseils simples pour pratiquer une activité physique régulièrement.",
      keywords: [
        "club média",
        "podcast",
        "encourager les élèves à bouger davantage",
        "texte que tu vas lire au micro",
        "deux bienfaits du sport",
        "deux conseils simples",
        "activité physique régulièrement",
      ],
      plan: [
        "Introduction : présente le thème du podcast.",
        "Développement : explique deux bienfaits du sport et donne deux conseils simples.",
        "Conclusion : termine par une phrase motivante.",
      ],
      words: [
        "santé",
        "énergie",
        "bien-être",
        "muscles",
        "marcher",
        "courir",
        "s'échauffer",
        "boire de l'eau",
        "pratiquer régulièrement",
        "rester en forme",
      ],
      length: "8 à 10 phrases simples.",
      correction:
        "Bonjour à tous.\n\nAujourd'hui, je prends la parole dans notre podcast scolaire pour vous parler du sport et de ses bienfaits.\n\nLe sport aide à rester en bonne santé. Il donne de l'énergie, renforce les muscles et améliore le bien-être.\n\nPour pratiquer régulièrement, vous pouvez marcher chaque jour, courir doucement ou choisir une activité que vous aimez. Avant l'effort, pensez à vous échauffer pour protéger votre corps.\n\nAprès l'activité, buvez de l'eau et reposez-vous quelques minutes.\n\nAlors, faisons du sport avec plaisir et bougeons un peu chaque jour pour rester en forme !",
      finalMessage:
        "Bravo ! Tu as rédigé un texte clair et organisé pour encourager les élèves à faire du sport.",
    },
    fluency: {
      title: "Lecture fluence",
      objective: "Lire à haute voix un texte en respectant les pauses et les liaisons.",
      instruction:
        "Lis le texte à haute voix. Respecte les pauses, articule bien les mots et lis avec une intonation naturelle.",
      explanation:
        "Un groupe de mots se lit comme une petite unité de sens. La pause / aide à respirer au bon moment, la liaison ‿ relie deux mots, et l'intonation rend la lecture plus vivante.",
      text: [
        "Le sport nous aide / à rester en forme chaque jour.",
        "Quand nous bougeons régulièrement / notre corps devient plus fort.",
        "Avant l'effort / nous préparons nos muscles avec soin.",
        "Après l'activité / nous respirons mieux / et nous nous sentons plus calmes.",
      ],
      liaisons: ["un‿effort", "des‿activités", "en‿équipe", "bien‿s'échauffer"],
      checklist: [
        "J'ai respecté les pauses.",
        "J'ai bien articulé.",
        "J'ai gardé un bon rythme.",
        "J'ai mis une intonation naturelle.",
      ],
      finalMessage: "Bravo ! Ta lecture devient plus fluide et plus expressive.",
    },
  },
  "1ac-s1-3": makeModelUnit({
    title: "Achats en ligne",
    theme: "achat en ligne, prudence numérique et choix raisonné",
    finalTask: "Réaliser une capsule de conseils pour acheter en ligne avec prudence.",
    vocabularyTitle: "Acheter en ligne",
    vocabularyObjective: "Utiliser le vocabulaire de l'achat en ligne et de la sécurité numérique.",
    vocabularySessions: [
      {
        title: "Séance 1 : Sur un site marchand",
        words: ["site", "panier", "commande", "livraison", "paiement", "produit"],
        sentences: [
          { text: "Je choisis un ______ avant de lire sa description.", answer: "produit" },
          { text: "Le ______ présente les articles à vendre.", answer: "site" },
          { text: "J'ajoute le livre dans mon ______.", answer: "panier" },
          { text: "Avant de valider la ______, je vérifie le prix.", answer: "commande" },
          { text: "La ______ peut prendre plusieurs jours.", answer: "livraison" },
          { text: "Le ______ doit se faire sur une page sécurisée.", answer: "paiement" },
        ],
      },
      {
        title: "Séance 2 : Acheter avec prudence",
        words: ["avis client", "prix", "réduction", "adresse", "sécurité", "retour"],
        sentences: [
          {
            text: "Je lis un ______ pour connaître l'opinion des autres acheteurs.",
            answer: "avis client",
          },
          { text: "Je compare le ______ avant de choisir.", answer: "prix" },
          { text: "Une ______ peut rendre un produit moins cher.", answer: "réduction" },
          {
            text: "Il faut écrire correctement son ______ pour recevoir le colis.",
            answer: "adresse",
          },
          { text: "La ______ protège les informations personnelles.", answer: "sécurité" },
          { text: "Si le produit ne convient pas, je demande un ______.", answer: "retour" },
        ],
      },
    ],
    vocabularyMessage: "Bravo ! Tu maîtrises mieux le vocabulaire de l'achat en ligne.",
    speechTitle: "Avant d'acheter",
    speechObjective: "Demander et donner un conseil avant un achat en ligne.",
    speechSituation:
      "Ton camarade veut acheter un casque sur Internet.\n\nTu l'aides à vérifier les informations importantes avant de valider sa commande.",
    speechExpressions: [
      "Vérifie d'abord",
      "Je te conseille de",
      "N'oublie pas de",
      "Pourquoi ne pas",
      "Assure-toi que",
    ],
    speechDialogue: [
      { speaker: "Nabil", text: "J'ai trouvé un casque à prix bas. Je vais l'acheter maintenant." },
      {
        speaker: "Toi",
        text: "______ lire les avis des clients avant de payer.",
        answer: "Je te conseille de",
      },
      { speaker: "Nabil", text: "Tu penses que le prix suffit pour décider ?" },
      {
        speaker: "Toi",
        text: "Non. ______ vérifier la sécurité du site.",
        answer: "N'oublie pas de",
      },
      { speaker: "Nabil", text: "Et si le casque ne fonctionne pas ?" },
      { speaker: "Toi", text: "______ le vendeur accepte le retour.", answer: "Assure-toi que" },
    ],
    speechCorrection:
      "Je te conseille de lire les avis, de vérifier la sécurité du site et de t'assurer que le retour est possible avant de payer.",
    speechMessage: "Bravo ! Tu sais donner des conseils utiles avant un achat en ligne.",
    listeningTitle: "Un achat réfléchi",
    audio: "/audio/1ac_s1_u3_oral.mp3",
    listeningObjective:
      "Repérer les informations essentielles dans un message oral sur l'achat en ligne.",
    listeningScript:
      "Bonjour les élèves.\n\nAujourd'hui, nous parlons des achats en ligne. Acheter sur Internet peut être pratique, mais il faut rester attentif.\n\nAvant de choisir un produit, regardez bien sa description, son prix et les avis des clients. Ne vous laissez pas attirer seulement par une grande réduction.\n\nAu moment du paiement, vérifiez que le site est sécurisé et demandez l'aide d'un adulte si vous avez un doute.\n\nEnfin, lisez les conditions de livraison et de retour. Un achat réussi est un achat réfléchi, pas un achat fait trop vite.",
    audioImagePrompt:
      "Photo ultraréaliste de collégiens regardant avec prudence une page d'achat en ligne sur une tablette, ambiance scolaire moderne, lumière naturelle.",
    listeningSituation: {
      speaker: "un animateur du club numérique",
      receiver: "aux élèves du collège",
      subject: "des achats en ligne prudents",
      purpose: "apprendre à acheter sans se précipiter",
    },
    heardWords: ["produit", "prix", "avis", "paiement", "livraison", "retour"],
    intruders: ["stade", "jardin"],
    listeningQuestions: [
      {
        question: "Que faut-il regarder avant de choisir un produit ?",
        answer: "la description, le prix et les avis",
        options: [
          "la description, le prix et les avis",
          "la météo",
          "la couleur du cartable",
          "le nom du voisin",
        ],
      },
      {
        question: "Pourquoi ne faut-il pas se laisser attirer seulement par une réduction ?",
        answer: "parce qu'il faut réfléchir avant d'acheter",
        options: [
          "parce qu'il faut réfléchir avant d'acheter",
          "parce que les réductions sont interdites",
          "parce qu'il faut toujours acheter vite",
          "parce que le paiement est inutile",
        ],
      },
      {
        question: "Que faut-il vérifier au moment du paiement ?",
        answer: "la sécurité du site",
        options: [
          "la sécurité du site",
          "la taille de l'écran",
          "le jour de la semaine",
          "le nom du facteur",
        ],
      },
      {
        question: "Qu'est-ce qu'un achat réussi ?",
        answer: "un achat réfléchi",
        options: [
          "un achat réfléchi",
          "un achat fait trop vite",
          "un achat sans avis",
          "un achat sans retour",
        ],
      },
    ],
    listeningMessage:
      "Bravo ! Tu as compris les conseils essentiels pour acheter en ligne avec prudence.",
    readingTitle: "Acheter sans se précipiter",
    readingObjective: "Comprendre un texte de sensibilisation sur les achats en ligne.",
    readingImage: "/images/lecture-achats-en-ligne-realiste.webp",
    readingImageAlt: "Collégien consultant une page d'achat en ligne avec un adulte à côté.",
    readingSource: "Magazine numérique du collège",
    readingText:
      "Internet permet d'acheter facilement un livre, un vêtement ou un petit appareil. En quelques clics, le produit semble déjà proche de nous.\n\nPourtant, un achat en ligne demande de l'attention. Il faut lire la description, comparer les prix et regarder les avis des clients. Une belle photo ne suffit pas toujours pour faire un bon choix.\n\nAvant de payer, il est important de vérifier la sécurité du site et de demander conseil à un adulte. Il faut aussi connaître les délais de livraison et les conditions de retour.\n\nAcheter en ligne peut être utile, à condition de rester prudent et de ne pas se laisser guider seulement par l'envie du moment.",
    communicationQuestions: [
      {
        question: "Qui informe le lecteur ?",
        answer: "un magazine numérique du collège",
        options: [
          "un magazine numérique du collège",
          "un vendeur dans la rue",
          "un guide sportif",
          "un cuisinier",
        ],
      },
      {
        question: "À qui s'adresse le texte ?",
        answer: "aux élèves",
        options: ["aux élèves", "aux chauffeurs", "aux touristes", "aux médecins"],
      },
      {
        question: "De quoi parle le texte ?",
        answer: "des achats en ligne",
        options: [
          "des achats en ligne",
          "des sports collectifs",
          "des villes anciennes",
          "des repas",
        ],
      },
      {
        question: "Dans quel but ce texte est-il écrit ?",
        answer: "donner des conseils de prudence",
        options: [
          "donner des conseils de prudence",
          "vendre un seul produit",
          "raconter une légende",
          "annoncer un match",
        ],
      },
    ],
    paratextQuestions: [
      {
        question: "D'après le titre, que faut-il éviter ?",
        answer: "acheter trop vite",
        options: ["acheter trop vite", "marcher lentement", "lire un conte", "visiter une ville"],
      },
      {
        question: "Que montre l'image ?",
        answer: "un achat en ligne accompagné",
        options: [
          "un achat en ligne accompagné",
          "un entraînement sportif",
          "un marché ancien",
          "une usine",
        ],
      },
      {
        question: "Que suggère la source ?",
        answer: "le texte donne des conseils numériques",
        options: [
          "le texte donne des conseils numériques",
          "le texte est une recette",
          "le texte est une facture",
          "le texte est un poème",
        ],
      },
      {
        question: "Quel thème annonce le paratexte ?",
        answer: "la prudence sur Internet",
        options: ["la prudence sur Internet", "la météo", "la natation", "la danse"],
      },
    ],
    directQuestions: [
      {
        question: "Que peut-on acheter sur Internet selon le texte ?",
        answer: "un livre, un vêtement ou un petit appareil",
        options: [
          "un livre, un vêtement ou un petit appareil",
          "un arbre dans la cour",
          "une salle de classe",
          "un stade",
        ],
      },
      {
        question: "Pourquoi une belle photo ne suffit-elle pas ?",
        answer: "parce qu'il faut lire et comparer",
        options: [
          "parce qu'il faut lire et comparer",
          "parce que les photos sont interdites",
          "parce qu'il faut fermer le site",
          "parce qu'il faut acheter sans réfléchir",
        ],
      },
      {
        question: "Que faut-il faire avant de payer ?",
        answer: "vérifier la sécurité du site",
        options: [
          "vérifier la sécurité du site",
          "effacer l'adresse",
          "ignorer les avis",
          "choisir au hasard",
        ],
      },
      {
        question: "À quelle condition l'achat en ligne peut-il être utile ?",
        answer: "si l'on reste prudent",
        options: [
          "si l'on reste prudent",
          "si l'on se dépêche",
          "si l'on oublie le retour",
          "si l'on ne lit rien",
        ],
      },
    ],
    inferenceQuestion:
      "Pourquoi l'auteur insiste-t-il sur la présence d'un adulte avant le paiement ?",
    readingCorrection:
      "L'auteur insiste sur la présence d'un adulte parce qu'un paiement en ligne demande de la prudence.\n\nUn adulte peut aider l'élève à reconnaître un site fiable, à éviter les erreurs et à protéger ses informations personnelles.",
    readingMessage:
      "Bravo ! Tu as compris comment lire un texte de conseil sur les achats en ligne.",
    languageTitle: "La phrase interrogative",
    languageObjective:
      "Employer la phrase interrogative pour demander une information avant un achat.",
    languageReminder:
      "On utilise la phrase interrogative pour poser une question et obtenir une information.",
    languageExamples: [
      "Quel est le prix ?",
      "Le site est-il sécurisé ?",
      "Peut-on retourner le produit ?",
    ],
    languageQuestions: [
      {
        question: "______ est le prix de ce casque ?",
        answer: "Quel",
        options: ["Quel", "Parce que", "Toujours", "Donc"],
      },
      {
        question: "Le paiement est-il sécurisé ?",
        answer: "phrase interrogative",
        options: [
          "phrase interrogative",
          "phrase impérative",
          "phrase exclamative",
          "phrase sans verbe",
        ],
      },
      {
        question: "Choisis la question correcte.",
        answer: "Peut-on retourner le produit ?",
        options: [
          "Peut-on retourner le produit ?",
          "Retourner produit peut.",
          "Le produit retourner.",
          "Parce que retourner.",
        ],
      },
      {
        question: "______ la livraison arrive-t-elle ?",
        answer: "Quand",
        options: ["Quand", "Mais", "Avec", "Très"],
      },
    ],
    languageMessage: "Bravo ! Tu sais poser des questions utiles avant un achat.",
    oralObjective: "Présenter oralement des conseils pour acheter en ligne avec prudence.",
    oralSituation:
      "Le club numérique de ton collège prépare une courte intervention pour aider les élèves à acheter en ligne sans se tromper.\n\nTu vas expliquer trois précautions simples avant de valider une commande.",
    oralKeywords: [
      "club numérique",
      "acheter en ligne",
      "trois précautions",
      "valider une commande",
    ],
    oralExpressions: [
      "Bonjour à tous",
      "Avant d'acheter",
      "Je vous conseille de",
      "Il faut vérifier",
      "N'oubliez pas de",
      "Enfin",
      "Merci de votre écoute",
    ],
    oralPlan: [
      "Introduction : présente le thème de l'achat en ligne.",
      "Développement : explique trois précautions à prendre.",
      "Conclusion : donne un conseil final clair.",
    ],
    oralLength: "6 à 8 phrases simples.",
    oralCorrection:
      "Bonjour à tous.\n\nAujourd'hui, je vais vous parler des achats en ligne.\n\nAvant d'acheter, il faut lire la description du produit et comparer les prix. Je vous conseille aussi de regarder les avis des clients, car ils peuvent signaler un problème.\n\nAu moment du paiement, vérifiez que le site est sécurisé et demandez l'aide d'un adulte si vous hésitez.\n\nEnfin, n'oubliez pas de lire les conditions de livraison et de retour.\n\nAcheter en ligne peut être pratique, mais il faut toujours réfléchir avant de cliquer.\n\nMerci de votre écoute.",
    oralMessage: "Bravo ! Tu peux présenter des conseils clairs sur l'achat en ligne.",
    writingObjective: "Rédiger un texte de conseils pour acheter en ligne avec prudence.",
    writingSituation:
      "Le journal du collège publie une rubrique intitulée « Acheter en ligne sans risque ».\n\nÉcris un texte pour conseiller les élèves avant un achat sur Internet.",
    writingKeywords: [
      "journal du collège",
      "acheter en ligne sans risque",
      "conseiller les élèves",
      "achat sur Internet",
    ],
    writingPlan: [
      "Introduction : présente le thème.",
      "Développement : donne trois conseils précis.",
      "Conclusion : rappelle l'importance de la prudence.",
    ],
    writingWords: [
      "site",
      "produit",
      "prix",
      "avis",
      "paiement",
      "sécurité",
      "livraison",
      "retour",
      "adulte",
    ],
    writingLength: "8 à 10 phrases organisées.",
    writingCorrection:
      "Acheter en ligne peut être pratique, mais il faut rester attentif.\n\nAvant de choisir un produit, il est important de lire sa description, de comparer les prix et de consulter les avis des clients.\n\nAvant de payer, il faut vérifier que le site est sécurisé. Si l'on a un doute, on doit demander conseil à un adulte.\n\nIl ne faut pas oublier de lire les conditions de livraison et de retour.\n\nAinsi, l'achat en ligne devient plus sûr et plus réfléchi.",
    writingMessage: "Bravo ! Tu as rédigé un texte clair pour conseiller les élèves.",
    fluencyObjective: "Lire un texte de conseil en marquant les groupes de sens.",
    fluencyExplanation:
      "Un groupe de mots aide à lire par idées. La pause / sépare les conseils, la liaison ‿ rend la lecture plus naturelle et l'intonation montre l'importance de la prudence.",
    fluencyText: [
      "Avant d'acheter / je lis la description.",
      "Je compare les prix / et je consulte les avis.",
      "Le paiement doit être sécurisé / avant de valider la commande.",
      "Un achat réfléchi / évite les mauvaises surprises.",
    ],
    liaisons: ["les‿avis", "un‿achat", "des‿informations", "avant‿un paiement"],
    fluencyMessage: "Bravo ! Ta lecture des conseils devient plus claire et plus naturelle.",
  }),
  "1ac-s1-4": makeModelUnit({
    title: "Gérer son argent",
    theme: "budget, dépenses, économies et choix responsables",
    finalTask: "Préparer un message de sensibilisation pour apprendre à gérer son argent.",
    vocabularyTitle: "Mon budget",
    vocabularyObjective: "Utiliser le vocabulaire de l'argent, du budget et des dépenses.",
    vocabularySessions: [
      {
        title: "Séance 1 : Argent et dépenses",
        words: ["budget", "argent", "dépense", "prix", "besoin", "monnaie"],
        sentences: [
          { text: "Je prépare un ______ avant d'acheter mes fournitures.", answer: "budget" },
          { text: "Il faut utiliser son ______ avec prudence.", answer: "argent" },
          { text: "Acheter un cahier est une ______ utile.", answer: "dépense" },
          { text: "Je vérifie le ______ avant de payer.", answer: "prix" },
          { text: "Un cartable solide est un vrai ______ scolaire.", answer: "besoin" },
          { text: "Le vendeur me rend la ______ après le paiement.", answer: "monnaie" },
        ],
      },
      {
        title: "Séance 2 : Économiser",
        words: ["économies", "envie", "tirelire", "comparer", "facture", "choisir"],
        sentences: [
          { text: "Je garde mes ______ pour acheter un livre.", answer: "économies" },
          { text: "Une ______ n'est pas toujours un besoin.", answer: "envie" },
          { text: "Ma petite sœur met ses pièces dans une ______.", answer: "tirelire" },
          { text: "Avant d'acheter, il faut ______ les prix.", answer: "comparer" },
          { text: "La ______ montre le montant à payer.", answer: "facture" },
          { text: "Savoir ______ aide à ne pas gaspiller son argent.", answer: "choisir" },
        ],
      },
    ],
    vocabularyMessage: "Bravo ! Tu maîtrises mieux le vocabulaire du budget.",
    speechTitle: "Besoin ou envie ?",
    speechObjective: "Exprimer une priorité et justifier un choix.",
    speechSituation:
      "Tu as un petit budget pour acheter tes affaires scolaires.\n\nTon camarade veut acheter un objet amusant, mais tu lui expliques qu'il faut d'abord penser aux besoins.",
    speechExpressions: [
      "À mon avis",
      "Il vaut mieux",
      "J'ai besoin de",
      "Je préfère",
      "Ce n'est pas prioritaire",
    ],
    speechDialogue: [
      { speaker: "Salma", text: "Je veux acheter ce porte-clés lumineux." },
      {
        speaker: "Toi",
        text: "______, il faut d'abord acheter les cahiers.",
        answer: "À mon avis",
      },
      { speaker: "Salma", text: "Mais il est joli !" },
      {
        speaker: "Toi",
        text: "Oui, mais ______ garder ton argent pour ce qui est utile.",
        answer: "Il vaut mieux",
      },
      { speaker: "Salma", text: "Donc je le prendrai plus tard ?" },
      {
        speaker: "Toi",
        text: "Oui, parce que ______ pour aujourd'hui.",
        answer: "ce n'est pas prioritaire",
      },
    ],
    speechCorrection:
      "À mon avis, il vaut mieux acheter d'abord ce qui est nécessaire. L'objet amusant peut attendre, car il n'est pas prioritaire.",
    speechMessage: "Bravo ! Tu sais exprimer une priorité avec politesse.",
    listeningTitle: "Un budget pour la semaine",
    audio: "/audio/1ac_s1_u4_oral.mp3",
    listeningObjective: "Comprendre des conseils oraux pour gérer un petit budget.",
    listeningScript:
      "Bonjour les élèves.\n\nCette semaine, Karim a reçu un peu d'argent de poche. Il voulait acheter une boisson, des autocollants et un nouveau stylo.\n\nAvant de dépenser, il a écrit ses besoins sur une feuille. Le stylo était nécessaire pour la classe, mais les autocollants étaient seulement une envie.\n\nKarim a comparé les prix et a gardé une partie de son argent dans sa tirelire.\n\nÀ la fin de la semaine, il était content : il avait acheté ce qui était utile et il avait encore quelques économies.",
    audioImagePrompt:
      "Photo ultraréaliste d'un collégien préparant un petit budget avec pièces, cahier et fournitures scolaires sur une table.",
    listeningSituation: {
      speaker: "un narrateur",
      receiver: "aux élèves",
      subject: "du budget de Karim",
      purpose: "montrer comment gérer son argent",
    },
    heardWords: ["budget", "argent", "besoin", "envie", "prix", "économies"],
    intruders: ["natation", "monument"],
    listeningQuestions: [
      {
        question: "Que reçoit Karim ?",
        answer: "un peu d'argent de poche",
        options: ["un peu d'argent de poche", "une médaille", "un billet de voyage", "un ballon"],
      },
      {
        question: "Qu'est-ce qui est nécessaire pour la classe ?",
        answer: "un stylo",
        options: ["un stylo", "des autocollants", "une boisson", "un jouet"],
      },
      {
        question: "Que fait Karim avant d'acheter ?",
        answer: "il compare les prix",
        options: ["il compare les prix", "il jette son argent", "il ferme son cahier", "il court"],
      },
      {
        question: "Pourquoi Karim est-il content à la fin ?",
        answer: "il a acheté utile et gardé des économies",
        options: [
          "il a acheté utile et gardé des économies",
          "il a tout dépensé",
          "il a oublié son stylo",
          "il a perdu sa tirelire",
        ],
      },
    ],
    listeningMessage: "Bravo ! Tu as compris comment gérer un petit budget.",
    readingTitle: "Choisir avant de dépenser",
    readingObjective: "Comprendre un texte sur les besoins, les envies et les économies.",
    readingImage: "/images/lecture-budget-college-realiste.webp",
    readingImageAlt: "Collégien comparant des prix avec une liste d'achats scolaires.",
    readingSource: "Carnet pratique du collège",
    readingText:
      "L'argent de poche donne parfois une impression de liberté. On peut acheter une boisson, un cahier décoré ou un petit objet qui fait plaisir.\n\nMais pour bien gérer son argent, il faut apprendre à distinguer un besoin d'une envie. Un besoin aide dans la vie quotidienne ou scolaire. Une envie peut attendre si le budget est limité.\n\nAvant de dépenser, il est utile de faire une liste, de comparer les prix et de garder une petite somme de côté.\n\nAinsi, gérer son argent ne signifie pas se priver de tout. Cela veut dire choisir avec intelligence et éviter les regrets après l'achat.",
    communicationQuestions: [
      {
        question: "Qui donne ces conseils ?",
        answer: "un carnet pratique du collège",
        options: [
          "un carnet pratique du collège",
          "un guide touristique",
          "un entraîneur",
          "un médecin",
        ],
      },
      {
        question: "À qui s'adresse le texte ?",
        answer: "aux élèves",
        options: [
          "aux élèves",
          "aux conducteurs",
          "aux vendeurs seulement",
          "aux sportifs professionnels",
        ],
      },
      {
        question: "De quoi parle le texte ?",
        answer: "de la gestion de l'argent",
        options: ["de la gestion de l'argent", "des monuments", "des jeux olympiques", "du climat"],
      },
      {
        question: "Dans quel but est-il écrit ?",
        answer: "apprendre à dépenser avec intelligence",
        options: [
          "apprendre à dépenser avec intelligence",
          "faire rire",
          "raconter une légende",
          "présenter une recette",
        ],
      },
    ],
    paratextQuestions: [
      {
        question: "Que suggère le titre ?",
        answer: "il faut réfléchir avant d'acheter",
        options: [
          "il faut réfléchir avant d'acheter",
          "il faut courir vite",
          "il faut visiter une ville",
          "il faut dormir tard",
        ],
      },
      {
        question: "Que montre l'image ?",
        answer: "un élève qui prépare ses achats",
        options: ["un élève qui prépare ses achats", "un match", "un monument", "une forêt"],
      },
      {
        question: "La source annonce un texte plutôt...",
        answer: "pratique",
        options: ["pratique", "poétique", "fantastique", "comique"],
      },
      {
        question: "Quel thème va être développé ?",
        answer: "le budget personnel",
        options: ["le budget personnel", "la natation", "la pollution sonore", "la peinture"],
      },
    ],
    directQuestions: [
      {
        question: "Que donne l'argent de poche selon le texte ?",
        answer: "une impression de liberté",
        options: [
          "une impression de liberté",
          "une maladie",
          "une mauvaise note",
          "un entraînement",
        ],
      },
      {
        question: "Qu'est-ce qu'un besoin ?",
        answer: "ce qui aide dans la vie quotidienne ou scolaire",
        options: [
          "ce qui aide dans la vie quotidienne ou scolaire",
          "ce qui peut toujours attendre",
          "un objet inutile",
          "une publicité",
        ],
      },
      {
        question: "Que faut-il faire avant de dépenser ?",
        answer: "faire une liste et comparer les prix",
        options: [
          "faire une liste et comparer les prix",
          "acheter vite",
          "ignorer le budget",
          "oublier la monnaie",
        ],
      },
      {
        question: "Que signifie gérer son argent ?",
        answer: "choisir avec intelligence",
        options: [
          "choisir avec intelligence",
          "tout dépenser",
          "ne jamais acheter",
          "acheter sans regarder",
        ],
      },
    ],
    inferenceQuestion:
      "Pourquoi l'auteur dit-il que gérer son argent ne signifie pas se priver de tout ?",
    readingCorrection:
      "L'auteur veut montrer qu'une bonne gestion n'interdit pas le plaisir.\n\nElle aide surtout à choisir le bon moment, à acheter ce qui est utile et à garder une partie de son argent pour plus tard.",
    readingMessage: "Bravo ! Tu as compris les idées principales sur la gestion de l'argent.",
    languageTitle: "La comparaison",
    languageObjective: "Utiliser la comparaison pour choisir entre deux achats.",
    languageReminder: "On compare avec plus... que, moins... que ou aussi... que.",
    languageExamples: [
      "Ce cahier est moins cher que l'autre.",
      "Ce stylo est plus solide que celui-ci.",
      "Ce sac est aussi pratique que l'ancien.",
    ],
    languageQuestions: [
      {
        question: "Ce cahier est ______ cher que l'autre.",
        answer: "moins",
        options: ["moins", "parce que", "très", "pendant"],
      },
      {
        question: "Cette trousse est ______ pratique que l'ancienne.",
        answer: "aussi",
        options: ["aussi", "quand", "jamais", "chez"],
      },
      {
        question: "Choisis la phrase correcte.",
        answer: "Ce stylo est plus solide que l'autre.",
        options: [
          "Ce stylo est plus solide que l'autre.",
          "Ce stylo plus que solide.",
          "Ce stylo est solide plus.",
          "Ce stylo que plus solide.",
        ],
      },
      {
        question: "Pour comparer deux prix, j'utilise...",
        answer: "plus cher que",
        options: ["plus cher que", "hier", "afin de", "soudain"],
      },
    ],
    languageMessage: "Bravo ! Tu sais comparer pour faire un choix.",
    oralObjective: "Présenter des conseils pour gérer un petit budget.",
    oralSituation:
      "Dans une émission scolaire, tu expliques à tes camarades comment utiliser leur argent de poche.\n\nTu présentes deux conseils et un exemple concret.",
    oralKeywords: ["émission scolaire", "argent de poche", "deux conseils", "exemple concret"],
    oralExpressions: [
      "Bonjour à tous",
      "Pour bien gérer",
      "Il faut d'abord",
      "Je vous conseille de",
      "Par exemple",
      "Ainsi",
      "Merci de votre écoute",
    ],
    oralPlan: [
      "Introduction : présente le thème du budget.",
      "Développement : donne deux conseils et un exemple.",
      "Conclusion : termine par une phrase de prudence.",
    ],
    oralLength: "6 à 8 phrases claires.",
    oralCorrection:
      "Bonjour à tous.\n\nAujourd'hui, je vais parler de l'argent de poche et du budget.\n\nPour bien gérer son argent, il faut d'abord distinguer les besoins des envies. Je vous conseille aussi de comparer les prix avant d'acheter.\n\nPar exemple, si j'ai besoin d'un stylo pour la classe, je l'achète avant un objet décoratif.\n\nJe garde aussi une petite somme dans ma tirelire pour plus tard.\n\nAinsi, on peut se faire plaisir sans gaspiller.\n\nMerci de votre écoute.",
    oralMessage: "Bravo ! Tu peux expliquer simplement comment gérer son argent.",
    writingObjective: "Rédiger un texte de conseils sur la gestion de l'argent.",
    writingSituation:
      "Le club citoyen du collège prépare une affiche intitulée « Je gère mon argent avec intelligence ».\n\nRédige un court texte pour aider les élèves à distinguer leurs besoins de leurs envies.",
    writingKeywords: ["club citoyen", "gérer mon argent", "distinguer", "besoins", "envies"],
    writingPlan: [
      "Introduction : présente le problème.",
      "Développement : explique deux conseils.",
      "Conclusion : encourage à choisir avec prudence.",
    ],
    writingWords: [
      "budget",
      "argent",
      "besoin",
      "envie",
      "prix",
      "économies",
      "comparer",
      "choisir",
    ],
    writingLength: "8 à 10 phrases organisées.",
    writingCorrection:
      "Gérer son argent est une habitude importante, même quand on a un petit budget.\n\nAvant d'acheter, il faut distinguer un besoin d'une envie. Un besoin est utile, comme un cahier ou un stylo. Une envie peut attendre si l'argent est limité.\n\nIl est aussi préférable de comparer les prix et de garder une petite somme de côté.\n\nAinsi, on évite le gaspillage et l'on apprend à choisir avec intelligence.",
    writingMessage: "Bravo ! Tu as rédigé un texte organisé sur la gestion de l'argent.",
    fluencyObjective: "Lire un texte de conseil en respectant les pauses.",
    fluencyExplanation:
      "Une pause / aide à séparer les idées. Le rythme doit rester calme pour que le conseil soit bien compris.",
    fluencyText: [
      "Avant de dépenser / je prépare mon budget.",
      "Je distingue mes besoins / de mes envies.",
      "Je compare les prix / et je garde quelques économies.",
      "Ainsi / je choisis avec prudence.",
    ],
    liaisons: ["mes‿envies", "quelques‿économies", "un‿achat", "des‿objets"],
    fluencyMessage: "Bravo ! Tu lis les conseils avec un rythme clair.",
  }),
  "1ac-s2-1": makeModelUnit({
    title: "Villes mythiques",
    theme: "villes, patrimoine, histoire et lieux légendaires",
    finalTask: "Présenter une ville mythique dans une capsule culturelle.",
    vocabularyTitle: "Découvrir une ville",
    vocabularyObjective: "Utiliser le vocabulaire de la ville, du patrimoine et de la visite.",
    vocabularySessions: [
      {
        title: "Séance 1 : Dans la ville",
        words: ["ville", "monument", "ruelle", "place", "remparts", "médina"],
        sentences: [
          { text: "Fès est une ______ connue pour son histoire.", answer: "ville" },
          { text: "La tour Hassan est un ______ célèbre.", answer: "monument" },
          { text: "Une petite ______ traverse l'ancien quartier.", answer: "ruelle" },
          { text: "Les habitants se retrouvent sur la grande ______.", answer: "place" },
          { text: "Les ______ protégeaient autrefois la cité.", answer: "remparts" },
          { text: "La ______ garde les traces du passé.", answer: "médina" },
        ],
      },
      {
        title: "Séance 2 : Histoire et patrimoine",
        words: ["légende", "patrimoine", "visiteur", "quartier", "musée", "histoire"],
        sentences: [
          { text: "Une ancienne ______ raconte l'origine de la ville.", answer: "légende" },
          { text: "Les monuments font partie du ______.", answer: "patrimoine" },
          { text: "Le ______ admire les portes anciennes.", answer: "visiteur" },
          { text: "Chaque ______ a son ambiance particulière.", answer: "quartier" },
          { text: "Le ______ expose des objets anciens.", answer: "musée" },
          { text: "L'______ de cette ville attire les curieux.", answer: "histoire" },
        ],
      },
    ],
    vocabularyMessage: "Bravo ! Tu maîtrises mieux le vocabulaire des villes et du patrimoine.",
    speechTitle: "Décrire un lieu",
    speechObjective: "Décrire une ville et situer un lieu important.",
    speechSituation:
      "Un correspondant te demande de lui parler d'une ville marocaine connue.\n\nTu lui décris la ville et tu situes un monument important.",
    speechExpressions: [
      "Elle est située",
      "On peut y voir",
      "Elle est connue pour",
      "Au centre de",
      "Je te conseille de visiter",
    ],
    speechDialogue: [
      { speaker: "Lina", text: "Quelle ville me conseilles-tu de découvrir ?" },
      {
        speaker: "Toi",
        text: "Je te conseille Fès. ______ son ancienne médina.",
        answer: "Elle est connue pour",
      },
      { speaker: "Lina", text: "Où se trouve la médina ?" },
      { speaker: "Toi", text: "______ la ville ancienne.", answer: "Au centre de" },
      { speaker: "Lina", text: "Que peut-on visiter là-bas ?" },
      {
        speaker: "Toi",
        text: "______ des ruelles, des portes et des monuments.",
        answer: "On peut y voir",
      },
    ],
    speechCorrection:
      "Elle est connue pour sa médina. Au centre de la ville ancienne, on peut voir des ruelles, des portes et des monuments.",
    speechMessage: "Bravo ! Tu sais décrire une ville et situer un lieu.",
    listeningTitle: "Une promenade dans la médina",
    audio: "/audio/1ac_s2_u1_oral.mp3",
    listeningObjective: "Comprendre une présentation orale d'une ville historique.",
    listeningScript:
      "Bonjour les élèves.\n\nAujourd'hui, je vous emmène dans une ville ancienne où chaque ruelle semble raconter une histoire. En entrant dans la médina, on entend les voix des artisans et les pas des visiteurs.\n\nAu centre, une grande place rassemble les habitants. Plus loin, les remparts rappellent que la ville devait autrefois se protéger.\n\nCette ville n'est pas seulement un lieu à visiter. C'est un patrimoine vivant, fait de monuments, de légendes et de souvenirs.\n\nQuand on la découvre avec attention, on comprend mieux le lien entre le passé et la vie d'aujourd'hui.",
    audioImagePrompt:
      "Photo ultraréaliste d'une médina marocaine ancienne avec collégiens en visite culturelle, ruelles, remparts et lumière naturelle.",
    listeningSituation: {
      speaker: "un guide culturel",
      receiver: "aux élèves",
      subject: "d'une ville ancienne",
      purpose: "faire découvrir son patrimoine",
    },
    heardWords: ["médina", "ruelle", "visiteurs", "place", "remparts", "patrimoine"],
    intruders: ["paiement", "tirelire"],
    listeningQuestions: [
      {
        question: "Où le guide emmène-t-il les élèves ?",
        answer: "dans une ville ancienne",
        options: ["dans une ville ancienne", "dans un magasin", "dans un stade", "dans une usine"],
      },
      {
        question: "Que rappelle les remparts ?",
        answer: "que la ville devait se protéger",
        options: [
          "que la ville devait se protéger",
          "que la ville vend des produits",
          "que la ville manque d'eau",
          "que la ville dort",
        ],
      },
      {
        question: "De quoi est fait le patrimoine vivant ?",
        answer: "de monuments, de légendes et de souvenirs",
        options: [
          "de monuments, de légendes et de souvenirs",
          "de factures",
          "de jouets",
          "de billets",
        ],
      },
      {
        question: "Que comprend-on en découvrant la ville ?",
        answer: "le lien entre le passé et la vie d'aujourd'hui",
        options: [
          "le lien entre le passé et la vie d'aujourd'hui",
          "le prix d'un téléphone",
          "la règle d'un match",
          "la météo de demain",
        ],
      },
    ],
    listeningMessage:
      "Bravo ! Tu as compris les informations importantes sur une ville historique.",
    readingTitle: "La ville aux mille histoires",
    readingObjective: "Comprendre un texte descriptif sur une ville mythique.",
    readingImage: "/images/lecture-ville-mythique-realiste.webp",
    readingImageAlt: "Médina ancienne avec ruelles et monuments historiques.",
    readingSource: "Carnet culturel du collège",
    readingText:
      "Au lever du soleil, la ville ancienne s'éveille doucement. Les portes sculptées s'ouvrent, les ruelles se remplissent de voix et les murs gardent la fraîcheur du matin.\n\nDans la médina, chaque passage semble conduire vers une histoire. Une fontaine oubliée, une petite place ou un vieux rempart rappellent la vie des générations passées.\n\nLes visiteurs viennent pour admirer les monuments, mais ils découvrent aussi une ville vivante. Les artisans travaillent, les enfants traversent les ruelles et les habitants saluent les voisins.\n\nCette ville est mythique parce qu'elle unit le passé et le présent dans un même décor.",
    communicationQuestions: [
      {
        question: "Qui présente la ville ?",
        answer: "un carnet culturel du collège",
        options: ["un carnet culturel du collège", "un vendeur", "un médecin", "un sportif"],
      },
      {
        question: "À qui le texte peut-il s'adresser ?",
        answer: "aux élèves curieux de patrimoine",
        options: [
          "aux élèves curieux de patrimoine",
          "aux acheteurs seulement",
          "aux conducteurs",
          "aux cuisiniers",
        ],
      },
      {
        question: "De quoi parle le texte ?",
        answer: "d'une ville ancienne",
        options: ["d'une ville ancienne", "d'un budget", "d'une compétition", "d'un téléphone"],
      },
      {
        question: "Dans quel but ?",
        answer: "faire découvrir la beauté d'une ville",
        options: [
          "faire découvrir la beauté d'une ville",
          "vendre un produit",
          "donner une recette",
          "raconter un accident",
        ],
      },
    ],
    paratextQuestions: [
      {
        question: "Que suggère le titre ?",
        answer: "la ville a un passé riche",
        options: [
          "la ville a un passé riche",
          "la ville est sans histoire",
          "la ville est un magasin",
          "la ville est un sport",
        ],
      },
      {
        question: "Que montre l'image ?",
        answer: "un lieu historique",
        options: ["un lieu historique", "un achat en ligne", "une plage vide", "un laboratoire"],
      },
      {
        question: "La source annonce un texte...",
        answer: "culturel",
        options: ["culturel", "publicitaire", "médical", "sportif"],
      },
      {
        question: "Quel élément du paratexte évoque le patrimoine ?",
        answer: "la ville et l'image historique",
        options: ["la ville et l'image historique", "le prix", "le panier", "la facture"],
      },
    ],
    directQuestions: [
      {
        question: "Quand la ville s'éveille-t-elle ?",
        answer: "au lever du soleil",
        options: ["au lever du soleil", "à minuit", "pendant un match", "après un achat"],
      },
      {
        question: "Que rappellent les remparts ?",
        answer: "la vie des générations passées",
        options: ["la vie des générations passées", "une réduction", "une panne", "une maladie"],
      },
      {
        question: "Pourquoi les visiteurs viennent-ils ?",
        answer: "pour admirer les monuments",
        options: [
          "pour admirer les monuments",
          "pour acheter un casque",
          "pour dormir",
          "pour jeter des déchets",
        ],
      },
      {
        question: "Pourquoi la ville est-elle mythique ?",
        answer: "elle unit le passé et le présent",
        options: [
          "elle unit le passé et le présent",
          "elle ferme ses portes",
          "elle vend des objets",
          "elle refuse les visiteurs",
        ],
      },
    ],
    inferenceQuestion:
      "Pourquoi l'auteur dit-il que la ville est vivante malgré son passé ancien ?",
    readingCorrection:
      "La ville est vivante parce que les habitants y travaillent, se déplacent et se rencontrent encore.\n\nSon passé existe dans les monuments, mais sa vie continue grâce aux artisans, aux enfants et aux voisins.",
    readingMessage: "Bravo ! Tu as compris la description d'une ville mythique.",
    languageTitle: "Les adjectifs qualificatifs",
    languageObjective: "Employer des adjectifs pour décrire une ville.",
    languageReminder: "L'adjectif qualificatif donne une précision sur un nom.",
    languageExamples: ["une ville ancienne", "des ruelles étroites", "un monument célèbre"],
    languageQuestions: [
      {
        question: "Dans « une ville ancienne », l'adjectif est...",
        answer: "ancienne",
        options: ["ancienne", "ville", "une", "dans"],
      },
      {
        question: "Choisis l'adjectif qui convient : des ruelles ______.",
        answer: "étroites",
        options: ["étroites", "visiter", "patrimoine", "hier"],
      },
      {
        question: "Un monument ______ attire les visiteurs.",
        answer: "célèbre",
        options: ["célèbre", "courir", "budget", "paiement"],
      },
      {
        question: "L'adjectif sert à...",
        answer: "décrire un nom",
        options: [
          "décrire un nom",
          "compter l'argent",
          "remplacer une question",
          "effacer une phrase",
        ],
      },
    ],
    languageMessage: "Bravo ! Tu sais enrichir une description avec des adjectifs.",
    oralObjective: "Présenter oralement une ville mythique.",
    oralSituation:
      "Ta classe prépare une capsule culturelle sur les villes mythiques.\n\nTu présentes une ville, un lieu important et une raison qui donne envie de la visiter.",
    oralKeywords: ["capsule culturelle", "ville mythique", "lieu important", "envie de la visiter"],
    oralExpressions: [
      "Bonjour à tous",
      "Je vais vous présenter",
      "Elle est connue pour",
      "On peut y voir",
      "Ce lieu est important parce que",
      "Je vous conseille de",
      "Merci de votre écoute",
    ],
    oralPlan: [
      "Introduction : nomme la ville choisie.",
      "Développement : décris un lieu important et son intérêt.",
      "Conclusion : invite les auditeurs à découvrir la ville.",
    ],
    oralLength: "7 à 9 phrases claires.",
    oralCorrection:
      "Bonjour à tous.\n\nJe vais vous présenter une ville mythique : Fès.\n\nElle est connue pour son ancienne médina, ses ruelles étroites et ses monuments historiques. Dans cette ville, on peut voir des portes anciennes, des fontaines et des ateliers d'artisans.\n\nCe lieu est important parce qu'il garde la mémoire du passé tout en restant vivant aujourd'hui.\n\nJe vous conseille de visiter cette ville avec attention, car chaque coin raconte une histoire.\n\nMerci de votre écoute.",
    oralMessage: "Bravo ! Tu peux présenter une ville mythique avec clarté.",
    writingObjective: "Rédiger un texte descriptif sur une ville mythique.",
    writingSituation:
      "Le magazine du collège prépare une page intitulée « Ma ville mythique ».\n\nÉcris un texte pour présenter une ville, décrire un lieu important et expliquer pourquoi elle mérite d'être visitée.",
    writingKeywords: [
      "magazine du collège",
      "ville mythique",
      "décrire un lieu important",
      "mérite d'être visitée",
    ],
    writingPlan: [
      "Introduction : présente la ville.",
      "Développement : décris un lieu et son ambiance.",
      "Conclusion : explique pourquoi la ville est spéciale.",
    ],
    writingWords: [
      "ville",
      "médina",
      "ruelle",
      "monument",
      "patrimoine",
      "histoire",
      "visiteur",
      "ancienne",
      "vivante",
    ],
    writingLength: "9 à 11 phrases organisées.",
    writingCorrection:
      "Fès est une ville mythique du Maroc. Elle attire les visiteurs par son histoire et son patrimoine.\n\nDans son ancienne médina, les ruelles sont étroites et pleines de vie. On y trouve des portes sculptées, des fontaines et des ateliers où les artisans travaillent avec patience.\n\nCette ville est spéciale parce qu'elle garde les traces du passé tout en restant vivante. Les habitants y circulent, se parlent et protègent leurs traditions.\n\nPour moi, Fès mérite d'être visitée car chaque rue semble raconter une histoire.",
    writingMessage: "Bravo ! Tu as rédigé une description claire et expressive.",
    fluencyObjective: "Lire une description en respectant les groupes de sens.",
    fluencyExplanation:
      "Dans une description, les pauses / permettent de faire voir les images. L'intonation doit faire sentir l'admiration.",
    fluencyText: [
      "Dans la médina / les ruelles sont étroites.",
      "Les portes anciennes / racontent l'histoire de la ville.",
      "Les visiteurs avancent lentement / pour observer les détails.",
      "Cette ville mythique / unit le passé et le présent.",
    ],
    liaisons: ["les‿anciennes portes", "des‿artisans", "un‿ancien quartier", "ses‿histoires"],
    fluencyMessage: "Bravo ! Ta lecture descriptive devient plus expressive.",
  }),
  "1ac-s2-2": makeModelUnit({
    title: "Figures du monde",
    theme: "personnalités inspirantes, parcours et engagement",
    finalTask: "Présenter une figure inspirante dans une chronique scolaire.",
    vocabularyTitle: "Portraits inspirants",
    vocabularyObjective: "Utiliser le vocabulaire du portrait, du parcours et de l'engagement.",
    vocabularySessions: [
      {
        title: "Séance 1 : Décrire une figure",
        words: ["portrait", "courage", "parcours", "exploit", "invention", "engagement"],
        sentences: [
          { text: "Le ______ présente une personne remarquable.", answer: "portrait" },
          {
            text: "Son ______ lui a permis de continuer malgré les difficultés.",
            answer: "courage",
          },
          { text: "Le ______ de cette scientifique inspire les jeunes.", answer: "parcours" },
          { text: "Traverser l'océan seul est un grand ______.", answer: "exploit" },
          { text: "Cette ______ a changé la vie de nombreuses personnes.", answer: "invention" },
          { text: "Son ______ pour l'éducation est connu.", answer: "engagement" },
        ],
      },
      {
        title: "Séance 2 : Une personne qui inspire",
        words: ["célèbre", "découvrir", "inspirer", "respecter", "réussir", "exemple"],
        sentences: [
          { text: "Cette artiste est ______ dans plusieurs pays.", answer: "célèbre" },
          { text: "Je veux ______ son histoire.", answer: "découvrir" },
          { text: "Son courage peut ______ les élèves.", answer: "inspirer" },
          { text: "Il faut ______ les personnes qui aident les autres.", answer: "respecter" },
          { text: "Pour ______, elle a travaillé avec patience.", answer: "réussir" },
          { text: "Son parcours est un ______ pour les jeunes.", answer: "exemple" },
        ],
      },
    ],
    vocabularyMessage: "Bravo ! Tu maîtrises mieux le vocabulaire des figures inspirantes.",
    speechTitle: "Présenter une personne",
    speechObjective: "Présenter brièvement une personne et expliquer pourquoi elle inspire.",
    speechSituation:
      "Ton camarade prépare une chronique sur une figure du monde.\n\nTu l'aides à présenter cette personne avec des expressions claires.",
    speechExpressions: [
      "Elle est connue pour",
      "Son parcours montre que",
      "Elle a réussi à",
      "Ce qui m'inspire",
      "Je trouve que",
    ],
    speechDialogue: [
      { speaker: "Adam", text: "Comment présenter cette sportive ?" },
      {
        speaker: "Toi",
        text: "Tu peux dire : ______ son courage et ses victoires.",
        answer: "Elle est connue pour",
      },
      { speaker: "Adam", text: "Et pour expliquer son importance ?" },
      {
        speaker: "Toi",
        text: "Dis que ______ le travail peut mener loin.",
        answer: "son parcours montre que",
      },
      { speaker: "Adam", text: "Pourquoi est-elle un exemple ?" },
      { speaker: "Toi", text: "______ elle n'a jamais abandonné.", answer: "Je trouve que" },
    ],
    speechCorrection:
      "Elle est connue pour son courage. Son parcours montre que le travail peut mener loin. Je trouve qu'elle est un exemple parce qu'elle n'a jamais abandonné.",
    speechMessage: "Bravo ! Tu sais présenter une personne inspirante.",
    listeningTitle: "Une vie qui inspire",
    audio: "/audio/1ac_s2_u2_oral.mp3",
    listeningObjective: "Comprendre le portrait oral d'une personne inspirante.",
    listeningScript:
      "Bonjour les élèves.\n\nAujourd'hui, je vous présente une femme qui a marqué son époque par son courage et son engagement. Très jeune, elle aimait apprendre et poser des questions.\n\nPlus tard, elle a travaillé avec patience pour réaliser son rêve. Son parcours n'a pas toujours été facile, mais elle a continué malgré les obstacles.\n\nGrâce à son travail, elle a aidé d'autres personnes et a montré que la réussite demande de l'effort.\n\nSon histoire nous rappelle qu'une figure inspirante n'est pas seulement célèbre. Elle donne envie d'agir, de respecter les autres et de croire en ses capacités.",
    audioImagePrompt:
      "Photo ultraréaliste d'élèves écoutant un portrait de femme inspirante dans une classe moderne, affiches culturelles au mur.",
    listeningSituation: {
      speaker: "une élève chroniqueuse",
      receiver: "aux élèves de sa classe",
      subject: "d'une figure inspirante",
      purpose: "montrer pourquoi son parcours donne envie d'agir",
    },
    heardWords: ["courage", "engagement", "parcours", "rêve", "obstacles", "réussite"],
    intruders: ["livraison", "remparts"],
    listeningQuestions: [
      {
        question: "Par quoi cette femme a-t-elle marqué son époque ?",
        answer: "par son courage et son engagement",
        options: [
          "par son courage et son engagement",
          "par ses achats",
          "par son sommeil",
          "par son cartable",
        ],
      },
      {
        question: "Que faisait-elle très jeune ?",
        answer: "elle aimait apprendre",
        options: [
          "elle aimait apprendre",
          "elle vendait des produits",
          "elle oubliait tout",
          "elle refusait les questions",
        ],
      },
      {
        question: "Que demande la réussite selon le message ?",
        answer: "de l'effort",
        options: ["de l'effort", "de la chance seulement", "du silence", "une réduction"],
      },
      {
        question: "Que donne une figure inspirante ?",
        answer: "envie d'agir",
        options: ["envie d'agir", "envie de gaspiller", "envie de dormir", "envie de mentir"],
      },
    ],
    listeningMessage: "Bravo ! Tu as compris le portrait oral d'une figure inspirante.",
    readingTitle: "Un parcours qui éclaire",
    readingObjective: "Comprendre un portrait écrit d'une personne inspirante.",
    readingImage: "/images/lecture-figure-inspirante-realiste.webp",
    readingImageAlt: "Portrait réaliste d'une jeune scientifique devant des élèves.",
    readingSource: "Revue des jeunes lecteurs",
    readingText:
      "Certaines personnes deviennent des figures du monde parce que leur parcours dépasse leur propre histoire. Elles avancent, tombent parfois, puis se relèvent avec courage.\n\nNadia a grandi dans un petit quartier où les livres circulaient peu. Pourtant, elle posait beaucoup de questions et voulait comprendre le monde autour d'elle.\n\nAvec le temps, elle est devenue ingénieure. Son invention a permis d'économiser de l'eau dans plusieurs écoles. Elle n'a pas cherché seulement la réussite personnelle ; elle a voulu aider les autres.\n\nSon parcours inspire les jeunes parce qu'il montre qu'un rêve peut devenir utile quand il rencontre le travail et la générosité.",
    communicationQuestions: [
      {
        question: "Qui publie ce texte ?",
        answer: "une revue pour jeunes lecteurs",
        options: ["une revue pour jeunes lecteurs", "une boutique", "un club sportif", "une météo"],
      },
      {
        question: "À qui s'adresse-t-il ?",
        answer: "aux jeunes lecteurs",
        options: [
          "aux jeunes lecteurs",
          "aux vendeurs",
          "aux touristes seulement",
          "aux conducteurs",
        ],
      },
      {
        question: "De quoi parle le texte ?",
        answer: "du parcours d'une personne inspirante",
        options: [
          "du parcours d'une personne inspirante",
          "d'une commande",
          "d'un match",
          "d'une recette",
        ],
      },
      {
        question: "Dans quel but ?",
        answer: "montrer un exemple de courage et d'utilité",
        options: [
          "montrer un exemple de courage et d'utilité",
          "vendre un téléphone",
          "annoncer un voyage",
          "interdire la lecture",
        ],
      },
    ],
    paratextQuestions: [
      {
        question: "Que suggère le titre ?",
        answer: "un parcours peut guider les autres",
        options: [
          "un parcours peut guider les autres",
          "un parcours est inutile",
          "une ville ferme",
          "un achat commence",
        ],
      },
      {
        question: "Que montre l'image ?",
        answer: "une personne qui partage son savoir",
        options: ["une personne qui partage son savoir", "un repas", "une facture", "un ballon"],
      },
      {
        question: "La source annonce un texte plutôt...",
        answer: "inspirant",
        options: ["inspirant", "commercial", "météorologique", "amusant seulement"],
      },
      {
        question: "Quel thème annonce le paratexte ?",
        answer: "les figures du monde",
        options: ["les figures du monde", "les dépenses", "les déchets", "la grammaire"],
      },
    ],
    directQuestions: [
      {
        question: "Pourquoi certaines personnes deviennent-elles des figures du monde ?",
        answer: "leur parcours dépasse leur propre histoire",
        options: [
          "leur parcours dépasse leur propre histoire",
          "elles achètent vite",
          "elles restent seules",
          "elles refusent d'aider",
        ],
      },
      {
        question: "Que voulait faire Nadia ?",
        answer: "comprendre le monde autour d'elle",
        options: [
          "comprendre le monde autour d'elle",
          "gaspiller l'eau",
          "fermer l'école",
          "ignorer les livres",
        ],
      },
      {
        question: "Quelle invention a-t-elle réalisée ?",
        answer: "une invention pour économiser l'eau",
        options: ["une invention pour économiser l'eau", "un jeu vidéo", "une route", "un sac"],
      },
      {
        question: "Pourquoi son parcours inspire-t-il ?",
        answer: "il montre qu'un rêve peut devenir utile",
        options: [
          "il montre qu'un rêve peut devenir utile",
          "il montre qu'il faut abandonner",
          "il montre qu'il faut se cacher",
          "il montre qu'il faut tout dépenser",
        ],
      },
    ],
    inferenceQuestion: "Pourquoi l'auteur associe-t-il le rêve au travail et à la générosité ?",
    readingCorrection:
      "L'auteur veut montrer qu'un rêve devient plus fort quand il est accompagné d'efforts.\n\nLa générosité rend ce rêve utile aux autres, comme l'invention de Nadia qui aide les écoles à économiser l'eau.",
    readingMessage: "Bravo ! Tu as compris un portrait inspirant.",
    languageTitle: "Le passé composé",
    languageObjective: "Utiliser le passé composé pour raconter un parcours.",
    languageReminder: "Le passé composé sert à raconter une action terminée dans le passé.",
    languageExamples: [
      "Elle a travaillé longtemps.",
      "Il a réussi son projet.",
      "Ils ont aidé leur village.",
    ],
    languageQuestions: [
      {
        question: "Elle ______ son rêve.",
        answer: "a réalisé",
        options: ["a réalisé", "réalise", "réaliser", "réalisent"],
      },
      {
        question: "Ils ______ les élèves.",
        answer: "ont aidé",
        options: ["ont aidé", "a aidé", "aide", "aider"],
      },
      {
        question: "Dans « elle a travaillé », le temps est...",
        answer: "le passé composé",
        options: ["le passé composé", "le futur", "l'impératif", "le présent seulement"],
      },
      {
        question: "Choisis la phrase correcte.",
        answer: "Il a inventé un outil utile.",
        options: [
          "Il a inventé un outil utile.",
          "Il ont inventé un outil utile.",
          "Il inventé a un outil.",
          "Il inventer un outil.",
        ],
      },
    ],
    languageMessage: "Bravo ! Tu sais raconter un parcours au passé composé.",
    oralObjective: "Présenter oralement une figure inspirante.",
    oralSituation:
      "La radio du collège consacre une chronique aux figures du monde.\n\nTu présentes une personne inspirante, son action et la leçon que les jeunes peuvent retenir.",
    oralKeywords: ["radio du collège", "figure inspirante", "son action", "leçon pour les jeunes"],
    oralExpressions: [
      "Bonjour à tous",
      "Je vais vous présenter",
      "Cette personne est connue pour",
      "Son parcours montre que",
      "Elle a réussi à",
      "Pour moi",
      "Merci de votre écoute",
    ],
    oralPlan: [
      "Introduction : nomme la personne ou le type de figure.",
      "Développement : présente son action et ses qualités.",
      "Conclusion : explique ce qu'elle apprend aux jeunes.",
    ],
    oralLength: "7 à 9 phrases claires.",
    oralCorrection:
      "Bonjour à tous.\n\nJe vais vous présenter une figure inspirante : une jeune ingénieure engagée pour l'eau.\n\nElle est connue pour son invention qui aide des écoles à économiser l'eau. Son parcours montre que la curiosité, le travail et la patience peuvent transformer une idée en projet utile.\n\nElle a réussi à aider les autres sans chercher seulement la célébrité.\n\nPour moi, son histoire apprend aux jeunes qu'il faut croire en ses capacités et travailler avec générosité.\n\nMerci de votre écoute.",
    oralMessage: "Bravo ! Tu peux présenter une figure inspirante avec clarté.",
    writingObjective: "Rédiger le portrait d'une personne inspirante.",
    writingSituation:
      "Le journal scolaire publie une page intitulée « Une personne qui m'inspire ».\n\nRédige un portrait court : présente la personne, son action et la raison pour laquelle elle peut inspirer les jeunes.",
    writingKeywords: [
      "journal scolaire",
      "personne qui m'inspire",
      "portrait",
      "son action",
      "inspirer les jeunes",
    ],
    writingPlan: [
      "Introduction : présente la personne.",
      "Développement : raconte son action et ses qualités.",
      "Conclusion : explique pourquoi elle inspire.",
    ],
    writingWords: [
      "portrait",
      "courage",
      "parcours",
      "engagement",
      "réussir",
      "inspirer",
      "exemple",
      "aider",
    ],
    writingLength: "9 à 11 phrases organisées.",
    writingCorrection:
      "La personne qui m'inspire est une jeune ingénieure engagée pour l'environnement.\n\nDepuis son enfance, elle aime comprendre les problèmes et chercher des solutions. Plus tard, elle a créé un système simple pour économiser l'eau dans les écoles.\n\nSon parcours montre beaucoup de courage. Elle a travaillé avec patience et a pensé aux besoins des autres.\n\nElle m'inspire parce qu'elle prouve qu'une idée peut devenir utile quand on travaille sérieusement.\n\nPour moi, elle est un exemple de réussite et de générosité.",
    writingMessage: "Bravo ! Tu as rédigé un portrait clair et expressif.",
    fluencyObjective: "Lire un portrait en variant l'intonation.",
    fluencyExplanation:
      "Dans un portrait, l'intonation met en valeur les qualités. La pause / sépare les étapes du parcours.",
    fluencyText: [
      "Elle a grandi / avec beaucoup de curiosité.",
      "Son parcours / montre du courage et de la patience.",
      "Grâce à son invention / elle a aidé plusieurs écoles.",
      "Son histoire / inspire les jeunes d'aujourd'hui.",
    ],
    liaisons: ["son‿histoire", "plusieurs‿écoles", "des‿idées", "un‿exemple"],
    fluencyMessage: "Bravo ! Ta lecture du portrait devient plus expressive.",
  }),
  "1ac-s2-3": makeModelUnit({
    title: "Les autres et moi",
    theme: "relations, respect, différence et entraide",
    finalTask: "Préparer un message pour mieux vivre ensemble au collège.",
    vocabularyTitle: "Vivre avec les autres",
    vocabularyObjective: "Utiliser le vocabulaire des relations et du respect.",
    vocabularySessions: [
      {
        title: "Séance 1 : Des relations positives",
        words: ["respect", "amitié", "différence", "entraide", "écoute", "confiance"],
        sentences: [
          {
            text: "Le ______ permet de vivre ensemble sans blesser les autres.",
            answer: "respect",
          },
          { text: "L'______ se construit avec la sincérité.", answer: "amitié" },
          { text: "La ______ rend le groupe plus riche.", answer: "différence" },
          { text: "L'______ aide un camarade en difficulté.", answer: "entraide" },
          { text: "L'______ permet de comprendre l'autre.", answer: "écoute" },
          { text: "La ______ grandit quand on tient ses promesses.", answer: "confiance" },
        ],
      },
      {
        title: "Séance 2 : Résoudre un problème",
        words: ["conflit", "dialogue", "excuse", "partager", "accepter", "groupe"],
        sentences: [
          { text: "Un ______ peut naître d'un malentendu.", answer: "conflit" },
          { text: "Le ______ aide à trouver une solution calme.", answer: "dialogue" },
          { text: "Présenter une ______ peut réparer une erreur.", answer: "excuse" },
          { text: "Il faut savoir ______ les responsabilités.", answer: "partager" },
          { text: "Vivre ensemble, c'est aussi ______ les différences.", answer: "accepter" },
          { text: "Chaque élève a sa place dans le ______.", answer: "groupe" },
        ],
      },
    ],
    vocabularyMessage: "Bravo ! Tu maîtrises mieux le vocabulaire du vivre-ensemble.",
    speechTitle: "Exprimer son avis avec respect",
    speechObjective: "Exprimer son accord ou son désaccord sans blesser l'autre.",
    speechSituation:
      "Un travail de groupe provoque un désaccord.\n\nTu exprimes ton avis calmement et tu proposes une solution.",
    speechExpressions: [
      "Je suis d'accord",
      "Je ne suis pas d'accord",
      "Je pense que",
      "On pourrait",
      "Excuse-moi",
    ],
    speechDialogue: [
      { speaker: "Maha", text: "Je veux présenter seule tout le travail." },
      {
        speaker: "Toi",
        text: "______ avec cette idée, car nous avons tous participé.",
        answer: "Je ne suis pas d'accord",
      },
      { speaker: "Maha", text: "Alors, que proposes-tu ?" },
      {
        speaker: "Toi",
        text: "______ partager les rôles pour que chacun parle.",
        answer: "On pourrait",
      },
      { speaker: "Maha", text: "Tu as raison, je suis allée trop vite." },
      {
        speaker: "Toi",
        text: "______ ; l'important est de travailler ensemble.",
        answer: "Excuse-moi",
      },
    ],
    speechCorrection:
      "Je ne suis pas d'accord avec cette idée. On pourrait partager les rôles pour que chacun participe. Excuse-moi si mon avis te dérange.",
    speechMessage: "Bravo ! Tu sais exprimer ton avis avec respect.",
    listeningTitle: "Un groupe qui s'écoute",
    audio: "/audio/1ac_s2_u3_oral.mp3",
    listeningObjective: "Comprendre un message oral sur le respect et le dialogue.",
    listeningScript:
      "Bonjour les élèves.\n\nDans un groupe, chacun a son caractère, ses idées et sa façon de travailler. Parfois, une différence peut provoquer un conflit.\n\nPour éviter que le problème grandisse, il faut écouter l'autre avant de répondre. Une parole calme peut ouvrir le dialogue et aider chacun à expliquer ce qu'il ressent.\n\nQuand on présente des excuses, quand on partage les tâches et quand on respecte les idées des autres, la confiance revient peu à peu.\n\nVivre ensemble ne veut pas dire être toujours d'accord. Cela veut dire chercher une solution sans humilier personne.",
    audioImagePrompt:
      "Photo ultraréaliste de collégiens en travail de groupe, échange calme, cahiers sur une table, ambiance de classe moderne.",
    listeningSituation: {
      speaker: "un médiateur scolaire",
      receiver: "aux élèves",
      subject: "du dialogue dans un groupe",
      purpose: "apprendre à résoudre un conflit avec respect",
    },
    heardWords: ["groupe", "différence", "conflit", "écouter", "dialogue", "confiance"],
    intruders: ["paiement", "inondation"],
    listeningQuestions: [
      {
        question: "Qu'est-ce qui peut provoquer un conflit ?",
        answer: "une différence",
        options: ["une différence", "une livraison", "un monument", "un prix"],
      },
      {
        question: "Que faut-il faire avant de répondre ?",
        answer: "écouter l'autre",
        options: ["écouter l'autre", "crier", "partir", "effacer le texte"],
      },
      {
        question: "Comment la confiance revient-elle ?",
        answer: "avec des excuses, le partage et le respect",
        options: [
          "avec des excuses, le partage et le respect",
          "avec le silence seulement",
          "avec l'argent",
          "avec une réduction",
        ],
      },
      {
        question: "Que signifie vivre ensemble ?",
        answer: "chercher une solution sans humilier personne",
        options: [
          "chercher une solution sans humilier personne",
          "être toujours d'accord",
          "refuser le dialogue",
          "travailler seul",
        ],
      },
    ],
    listeningMessage: "Bravo ! Tu as compris les idées importantes sur le vivre-ensemble.",
    readingTitle: "Une place pour chacun",
    readingObjective: "Comprendre un texte sur le respect et l'entraide.",
    readingImage: "/images/lecture-vivre-ensemble-realiste.webp",
    readingImageAlt: "Collégiens travaillant ensemble avec respect.",
    readingSource: "Journal de vie scolaire",
    readingText:
      "Dans une classe, chaque élève arrive avec son histoire, ses goûts et sa manière de parler. Ces différences peuvent surprendre, mais elles rendent le groupe plus vivant.\n\nUn jour, Sami a refusé de travailler avec Lina parce qu'elle parlait peu. La séance avançait mal. Alors, la professeure a demandé à chacun d'écouter l'autre pendant deux minutes.\n\nLina a expliqué qu'elle avait de bonnes idées, mais qu'elle avait besoin de temps pour les formuler. Sami l'a entendue et lui a laissé une place dans le travail.\n\nÀ la fin, leur exposé était plus riche. Ils avaient compris qu'un groupe devient plus fort quand chacun est respecté.",
    communicationQuestions: [
      {
        question: "Qui raconte cette situation ?",
        answer: "un journal de vie scolaire",
        options: ["un journal de vie scolaire", "un vendeur", "un guide", "un médecin"],
      },
      {
        question: "À qui s'adresse le texte ?",
        answer: "aux élèves",
        options: ["aux élèves", "aux touristes", "aux clients", "aux conducteurs"],
      },
      {
        question: "De quoi parle le texte ?",
        answer: "du respect dans un groupe",
        options: ["du respect dans un groupe", "d'un achat", "d'une ville", "du climat"],
      },
      {
        question: "Dans quel but ?",
        answer: "montrer l'importance de l'écoute",
        options: [
          "montrer l'importance de l'écoute",
          "vendre un produit",
          "donner un prix",
          "présenter un sport",
        ],
      },
    ],
    paratextQuestions: [
      {
        question: "Que suggère le titre ?",
        answer: "chaque élève doit être accepté",
        options: [
          "chaque élève doit être accepté",
          "un élève doit rester seul",
          "la classe doit se taire",
          "le groupe doit acheter",
        ],
      },
      {
        question: "Que montre l'image ?",
        answer: "un travail de groupe",
        options: ["un travail de groupe", "une commande", "une tempête", "un monument"],
      },
      {
        question: "La source indique un thème...",
        answer: "scolaire",
        options: ["scolaire", "commercial", "touristique", "météorologique"],
      },
      {
        question: "Quel mot du titre annonce le respect ?",
        answer: "chacun",
        options: ["chacun", "prix", "site", "déchet"],
      },
    ],
    directQuestions: [
      {
        question: "Pourquoi les différences sont-elles utiles ?",
        answer: "elles rendent le groupe plus vivant",
        options: [
          "elles rendent le groupe plus vivant",
          "elles détruisent toujours le travail",
          "elles empêchent de parler",
          "elles remplacent les cahiers",
        ],
      },
      {
        question: "Pourquoi Sami refuse-t-il de travailler avec Lina ?",
        answer: "parce qu'elle parlait peu",
        options: [
          "parce qu'elle parlait peu",
          "parce qu'elle criait",
          "parce qu'elle vendait un produit",
          "parce qu'elle dormait",
        ],
      },
      {
        question: "Que demande la professeure ?",
        answer: "d'écouter l'autre pendant deux minutes",
        options: [
          "d'écouter l'autre pendant deux minutes",
          "de quitter la classe",
          "d'acheter un livre",
          "de courir",
        ],
      },
      {
        question: "Pourquoi leur exposé devient-il plus riche ?",
        answer: "chacun a trouvé sa place",
        options: [
          "chacun a trouvé sa place",
          "ils ont refusé de parler",
          "ils ont tout copié",
          "ils ont oublié le sujet",
        ],
      },
    ],
    inferenceQuestion: "Pourquoi Lina avait-elle besoin de temps avant de parler ?",
    readingCorrection:
      "Lina avait besoin de temps parce qu'elle réfléchissait avant de formuler ses idées.\n\nLe texte montre qu'un élève discret peut avoir des idées importantes si le groupe lui laisse la place de s'exprimer.",
    readingMessage: "Bravo ! Tu as compris un texte sur le respect et l'entraide.",
    languageTitle: "Les pronoms personnels",
    languageObjective: "Utiliser les pronoms pour éviter les répétitions.",
    languageReminder: "Le pronom personnel remplace un nom ou un groupe nominal.",
    languageExamples: [
      "Lina parle. Elle explique son idée.",
      "Les élèves écoutent. Ils respectent leur camarade.",
      "Sami aide Lina. Il lui laisse la parole.",
    ],
    languageQuestions: [
      {
        question: "Lina parle. ______ explique son idée.",
        answer: "Elle",
        options: ["Elle", "Ils", "Nous", "Vous"],
      },
      {
        question: "Les élèves écoutent. ______ respectent leur camarade.",
        answer: "Ils",
        options: ["Ils", "Elle", "Tu", "Je"],
      },
      {
        question: "Dans « elle explique », le pronom est...",
        answer: "elle",
        options: ["elle", "explique", "dans", "idée"],
      },
      {
        question: "Choisis la phrase correcte.",
        answer: "Sami aide Lina. Il lui laisse la parole.",
        options: [
          "Sami aide Lina. Il lui laisse la parole.",
          "Sami aide Lina. Elle lui laisse la parole.",
          "Sami aide Lina. Nous lui laisse.",
          "Sami aide Lina. Ils parle.",
        ],
      },
    ],
    languageMessage: "Bravo ! Tu sais utiliser les pronoms personnels.",
    oralObjective: "Présenter oralement un conseil pour mieux vivre ensemble.",
    oralSituation:
      "Le conseil de classe prépare un message sur le respect entre élèves.\n\nTu expliques pourquoi il faut écouter les autres et tu proposes deux gestes simples pour mieux vivre ensemble.",
    oralKeywords: [
      "conseil de classe",
      "respect entre élèves",
      "écouter les autres",
      "deux gestes simples",
    ],
    oralExpressions: [
      "Bonjour à tous",
      "Pour mieux vivre ensemble",
      "Il est important de",
      "Je vous conseille de",
      "Par exemple",
      "Ainsi",
      "Merci de votre écoute",
    ],
    oralPlan: [
      "Introduction : présente le thème du respect.",
      "Développement : explique deux gestes simples.",
      "Conclusion : invite les élèves à agir.",
    ],
    oralLength: "6 à 8 phrases claires.",
    oralCorrection:
      "Bonjour à tous.\n\nAujourd'hui, je vais parler du respect entre élèves.\n\nPour mieux vivre ensemble, il est important d'écouter les autres avant de répondre. Je vous conseille aussi d'accepter les différences, car chaque camarade peut apporter une idée utile.\n\nPar exemple, dans un travail de groupe, on peut partager les rôles et laisser chacun parler.\n\nAinsi, la classe devient plus calme et plus solidaire.\n\nMerci de votre écoute.",
    oralMessage: "Bravo ! Tu peux parler du respect avec clarté.",
    writingObjective: "Rédiger un texte sur le vivre-ensemble.",
    writingSituation:
      "Le journal du collège demande un texte intitulé « Mieux vivre ensemble ».\n\nRédige un texte pour expliquer l'importance du respect, de l'écoute et de l'entraide dans la classe.",
    writingKeywords: [
      "journal du collège",
      "mieux vivre ensemble",
      "respect",
      "écoute",
      "entraide",
      "classe",
    ],
    writingPlan: [
      "Introduction : présente le thème.",
      "Développement : explique trois attitudes positives.",
      "Conclusion : donne un conseil final.",
    ],
    writingWords: [
      "respect",
      "écoute",
      "entraide",
      "différence",
      "dialogue",
      "confiance",
      "groupe",
      "accepter",
    ],
    writingLength: "8 à 10 phrases organisées.",
    writingCorrection:
      "Mieux vivre ensemble est important pour avoir une classe calme et agréable.\n\nD'abord, il faut respecter les autres, même quand ils sont différents de nous. Ensuite, il faut écouter avant de répondre, car le dialogue évite beaucoup de conflits.\n\nL'entraide est aussi nécessaire. Quand un camarade a une difficulté, on peut l'aider sans se moquer de lui.\n\nAinsi, chacun se sent accepté et la confiance grandit dans le groupe.",
    writingMessage: "Bravo ! Tu as rédigé un texte clair sur le vivre-ensemble.",
    fluencyObjective: "Lire un texte de conseil avec une intonation calme.",
    fluencyExplanation:
      "Le rythme doit rester posé. Les pauses / aident à transmettre un message respectueux.",
    fluencyText: [
      "Dans un groupe / chacun a sa place.",
      "J'écoute mon camarade / avant de répondre.",
      "Les différences / peuvent enrichir la classe.",
      "Avec le respect / la confiance revient.",
    ],
    liaisons: ["les‿autres", "un‿avis", "des‿élèves", "mon‿ami"],
    fluencyMessage: "Bravo ! Ta lecture devient plus calme et plus expressive.",
  }),
  "1ac-s2-4": makeModelUnit({
    title: "Ados responsables",
    theme: "responsabilité, règles, sécurité et citoyenneté",
    finalTask: "Créer une charte simple de l'adolescent responsable.",
    vocabularyTitle: "Agir avec responsabilité",
    vocabularyObjective: "Utiliser le vocabulaire de la responsabilité et des règles.",
    vocabularySessions: [
      {
        title: "Séance 1 : Les règles",
        words: ["règle", "responsabilité", "sécurité", "téléphone", "autorisation", "devoir"],
        sentences: [
          { text: "Une ______ protège la vie du groupe.", answer: "règle" },
          { text: "La ______ consiste à réfléchir avant d'agir.", answer: "responsabilité" },
          { text: "Le casque améliore la ______ à vélo.", answer: "sécurité" },
          { text: "Au collège, le ______ doit être utilisé avec prudence.", answer: "téléphone" },
          { text: "Pour sortir, je demande une ______.", answer: "autorisation" },
          { text: "Respecter les autres est un ______ important.", answer: "devoir" },
        ],
      },
      {
        title: "Séance 2 : Des gestes citoyens",
        words: ["citoyen", "respecter", "protéger", "signaler", "prudence", "décision"],
        sentences: [
          { text: "Un bon ______ pense aussi aux autres.", answer: "citoyen" },
          { text: "Il faut ______ les règles de la classe.", answer: "respecter" },
          { text: "Je dois ______ mes informations personnelles.", answer: "protéger" },
          { text: "Il faut ______ un danger à un adulte.", answer: "signaler" },
          { text: "La ______ évite beaucoup d'accidents.", answer: "prudence" },
          { text: "Une bonne ______ se prend après réflexion.", answer: "décision" },
        ],
      },
    ],
    vocabularyMessage: "Bravo ! Tu maîtrises mieux le vocabulaire de la responsabilité.",
    speechTitle: "Autoriser ou interdire",
    speechObjective: "Exprimer une règle, une autorisation ou une interdiction.",
    speechSituation:
      "Un camarade veut publier une photo de classe sans demander l'avis des autres.\n\nTu lui expliques la règle avec respect.",
    speechExpressions: ["Il faut", "Il ne faut pas", "Tu peux", "Tu dois", "C'est interdit de"],
    speechDialogue: [
      { speaker: "Yassine", text: "Je vais publier la photo du groupe." },
      { speaker: "Toi", text: "______ demander l'accord des camarades avant.", answer: "Il faut" },
      { speaker: "Yassine", text: "Même si c'est juste pour rire ?" },
      {
        speaker: "Toi",
        text: "Oui. ______ publier une photo sans autorisation.",
        answer: "Il ne faut pas",
      },
      { speaker: "Yassine", text: "Alors je peux leur demander ?" },
      { speaker: "Toi", text: "Oui, ______ le faire calmement.", answer: "tu peux" },
    ],
    speechCorrection:
      "Il faut demander l'accord des camarades. Il ne faut pas publier une photo sans autorisation. Tu peux demander calmement.",
    speechMessage: "Bravo ! Tu sais exprimer une règle avec respect.",
    listeningTitle: "Une décision responsable",
    audio: "/audio/1ac_s2_u4_oral.mp3",
    listeningObjective: "Comprendre un message oral sur la responsabilité des adolescents.",
    listeningScript:
      "Bonjour les élèves.\n\nÊtre adolescent, ce n'est pas seulement grandir. C'est aussi apprendre à prendre de bonnes décisions.\n\nAu collège, une règle peut parfois sembler gênante, mais elle protège la sécurité de tous. Par exemple, on ne publie pas la photo d'un camarade sans son autorisation.\n\nUn adolescent responsable réfléchit avant d'agir. Il respecte les autres, protège ses informations personnelles et signale un danger à un adulte.\n\nLa responsabilité se construit chaque jour, à travers de petits gestes sérieux.",
    audioImagePrompt:
      "Photo ultraréaliste d'adolescents responsables dans une cour de collège, discussion autour des règles de sécurité numérique.",
    listeningSituation: {
      speaker: "un éducateur scolaire",
      receiver: "aux élèves",
      subject: "de la responsabilité des adolescents",
      purpose: "encourager des comportements prudents",
    },
    heardWords: ["adolescent", "décisions", "règle", "sécurité", "autorisation", "responsable"],
    intruders: ["médina", "tirelire"],
    listeningQuestions: [
      {
        question: "Que signifie être adolescent selon le message ?",
        answer: "apprendre à prendre de bonnes décisions",
        options: [
          "apprendre à prendre de bonnes décisions",
          "tout faire sans règle",
          "refuser les adultes",
          "acheter vite",
        ],
      },
      {
        question: "Pourquoi une règle peut-elle être utile ?",
        answer: "elle protège la sécurité de tous",
        options: [
          "elle protège la sécurité de tous",
          "elle fait perdre du temps",
          "elle remplace les amis",
          "elle interdit de penser",
        ],
      },
      {
        question: "Que ne faut-il pas publier sans autorisation ?",
        answer: "la photo d'un camarade",
        options: ["la photo d'un camarade", "un cahier vide", "une météo", "un prix"],
      },
      {
        question: "Comment se construit la responsabilité ?",
        answer: "chaque jour par de petits gestes sérieux",
        options: [
          "chaque jour par de petits gestes sérieux",
          "en une seule minute",
          "sans réfléchir",
          "en imitant tout le monde",
        ],
      },
    ],
    listeningMessage: "Bravo ! Tu as compris le message sur la responsabilité.",
    readingTitle: "Réfléchir avant d'agir",
    readingObjective: "Comprendre un texte de sensibilisation sur la responsabilité.",
    readingImage: "/images/lecture-ados-responsables-realiste.webp",
    readingImageAlt: "Adolescents discutant calmement d'une règle de vie scolaire.",
    readingSource: "Charte de vie scolaire",
    readingText:
      "Au collège, chaque élève apprend à devenir plus autonome. Cette liberté nouvelle demande aussi de la responsabilité.\n\nUn adolescent responsable ne pense pas seulement à ce qu'il veut faire. Il se demande aussi si son geste respecte les autres et protège la sécurité du groupe.\n\nPublier une photo, traverser la route, utiliser son téléphone ou répondre à un message sont des actions simples. Pourtant, elles peuvent avoir des conséquences si l'on agit trop vite.\n\nRéfléchir avant d'agir permet d'éviter les erreurs et de construire une relation de confiance avec les autres.",
    communicationQuestions: [
      {
        question: "Quelle est la source du texte ?",
        answer: "une charte de vie scolaire",
        options: [
          "une charte de vie scolaire",
          "un catalogue",
          "un guide de voyage",
          "une recette",
        ],
      },
      {
        question: "À qui s'adresse-t-il ?",
        answer: "aux élèves du collège",
        options: [
          "aux élèves du collège",
          "aux clients",
          "aux touristes",
          "aux sportifs professionnels",
        ],
      },
      {
        question: "De quoi parle le texte ?",
        answer: "de la responsabilité",
        options: ["de la responsabilité", "des monuments", "des achats", "des repas"],
      },
      {
        question: "Dans quel but ?",
        answer: "sensibiliser les élèves",
        options: [
          "sensibiliser les élèves",
          "vendre un téléphone",
          "raconter une blague",
          "annoncer une réduction",
        ],
      },
    ],
    paratextQuestions: [
      {
        question: "Que conseille le titre ?",
        answer: "penser avant de faire quelque chose",
        options: [
          "penser avant de faire quelque chose",
          "agir sans réfléchir",
          "dormir en classe",
          "acheter un objet",
        ],
      },
      {
        question: "Que montre l'image ?",
        answer: "des adolescents qui discutent d'une règle",
        options: [
          "des adolescents qui discutent d'une règle",
          "une ville ancienne",
          "une livraison",
          "une forêt",
        ],
      },
      {
        question: "La source annonce un texte...",
        answer: "réglementaire et éducatif",
        options: ["réglementaire et éducatif", "publicitaire", "fantastique", "sportif"],
      },
      {
        question: "Quel thème est annoncé ?",
        answer: "la responsabilité des élèves",
        options: ["la responsabilité des élèves", "la cuisine", "la météo", "la danse"],
      },
    ],
    directQuestions: [
      {
        question: "Que demande la liberté nouvelle ?",
        answer: "de la responsabilité",
        options: ["de la responsabilité", "de l'argent", "du silence", "une commande"],
      },
      {
        question: "À quoi pense un adolescent responsable ?",
        answer: "au respect des autres et à la sécurité",
        options: [
          "au respect des autres et à la sécurité",
          "à lui seul",
          "au prix seulement",
          "à la vitesse",
        ],
      },
      {
        question: "Quelles actions peuvent avoir des conséquences ?",
        answer: "publier une photo ou utiliser son téléphone",
        options: [
          "publier une photo ou utiliser son téléphone",
          "lire calmement",
          "boire de l'eau",
          "ouvrir un cahier",
        ],
      },
      {
        question: "Que permet de faire réfléchir avant d'agir ?",
        answer: "éviter les erreurs",
        options: ["éviter les erreurs", "perdre la confiance", "effacer les règles", "se moquer"],
      },
    ],
    inferenceQuestion: "Pourquoi l'auteur parle-t-il de confiance à la fin du texte ?",
    readingCorrection:
      "Il parle de confiance parce qu'un élève responsable rassure les autres.\n\nQuand il respecte les règles et réfléchit avant d'agir, ses camarades et les adultes peuvent compter sur lui.",
    readingMessage: "Bravo ! Tu as compris un texte sur la responsabilité.",
    languageTitle: "L'obligation et l'interdiction",
    languageObjective: "Exprimer une obligation ou une interdiction.",
    languageReminder:
      "On exprime l'obligation avec il faut ou devoir, et l'interdiction avec il ne faut pas.",
    languageExamples: [
      "Il faut respecter les règles.",
      "Tu dois protéger tes informations.",
      "Il ne faut pas publier une photo sans accord.",
    ],
    languageQuestions: [
      {
        question: "______ respecter les règles.",
        answer: "Il faut",
        options: ["Il faut", "Hier", "Parce que", "Très"],
      },
      {
        question: "Tu ______ demander l'autorisation.",
        answer: "dois",
        options: ["dois", "donc", "jamais", "chez"],
      },
      {
        question: "Choisis l'interdiction.",
        answer: "Il ne faut pas se moquer.",
        options: [
          "Il ne faut pas se moquer.",
          "Il faut écouter.",
          "Tu dois aider.",
          "Je respecte.",
        ],
      },
      {
        question: "Dans « il faut », on exprime...",
        answer: "une obligation",
        options: ["une obligation", "une comparaison", "une description", "un lieu"],
      },
    ],
    languageMessage: "Bravo ! Tu sais exprimer une règle clairement.",
    oralObjective: "Présenter oralement des règles pour être un adolescent responsable.",
    oralSituation:
      "Le collège prépare une charte des ados responsables.\n\nTu présentes trois règles simples à respecter dans la classe, dans la cour ou sur Internet.",
    oralKeywords: ["charte", "ados responsables", "trois règles", "classe", "cour", "Internet"],
    oralExpressions: [
      "Bonjour à tous",
      "Pour être responsable",
      "Il faut",
      "Il ne faut pas",
      "Je vous conseille de",
      "Ainsi",
      "Merci de votre écoute",
    ],
    oralPlan: [
      "Introduction : présente la charte.",
      "Développement : explique trois règles simples.",
      "Conclusion : rappelle l'importance de la confiance.",
    ],
    oralLength: "6 à 8 phrases claires.",
    oralCorrection:
      "Bonjour à tous.\n\nAujourd'hui, je présente trois règles pour être un adolescent responsable.\n\nD'abord, il faut respecter les autres en classe et dans la cour. Ensuite, il ne faut pas publier une photo ou un message sans autorisation. Enfin, je vous conseille de signaler un danger à un adulte.\n\nCes gestes semblent simples, mais ils protègent tout le groupe.\n\nAinsi, chacun peut vivre au collège dans un climat de confiance.\n\nMerci de votre écoute.",
    oralMessage: "Bravo ! Tu peux présenter des règles responsables.",
    writingObjective: "Rédiger une charte courte de l'adolescent responsable.",
    writingSituation:
      "La vie scolaire demande aux élèves de proposer une charte intitulée « Ados responsables ».\n\nRédige un texte qui présente trois règles et explique pourquoi elles sont importantes.",
    writingKeywords: ["vie scolaire", "charte", "ados responsables", "trois règles", "importantes"],
    writingPlan: [
      "Introduction : présente l'objectif de la charte.",
      "Développement : explique trois règles.",
      "Conclusion : montre le résultat attendu.",
    ],
    writingWords: [
      "règle",
      "responsabilité",
      "sécurité",
      "autorisation",
      "respecter",
      "protéger",
      "prudence",
      "confiance",
    ],
    writingLength: "8 à 10 phrases organisées.",
    writingCorrection:
      "Une charte des ados responsables aide les élèves à mieux vivre ensemble.\n\nPremièrement, il faut respecter les camarades et les adultes. Deuxièmement, il ne faut pas publier une photo ou une information personnelle sans autorisation. Troisièmement, il faut signaler un danger à un adulte.\n\nCes règles protègent la sécurité du groupe et évitent les conflits.\n\nQuand chaque élève agit avec prudence, la confiance grandit au collège.",
    writingMessage: "Bravo ! Tu as rédigé une charte claire et utile.",
    fluencyObjective: "Lire une charte avec une voix claire.",
    fluencyExplanation:
      "Dans une charte, la pause / sépare les règles. L'intonation doit être ferme mais calme.",
    fluencyText: [
      "Il faut respecter les autres / en classe et dans la cour.",
      "Il ne faut pas publier une photo / sans autorisation.",
      "Je protège mes informations / avec prudence.",
      "Un adolescent responsable / réfléchit avant d'agir.",
    ],
    liaisons: ["les‿autres", "un‿adolescent", "des‿informations", "avant‿agir"],
    fluencyMessage: "Bravo ! Ta lecture des règles est claire et posée.",
  }),
  "1ac-s2-5": makeModelUnit({
    title: "Défis climatiques",
    theme: "climat, pollution, eau et protection de la planète",
    finalTask: "Préparer un message de sensibilisation aux défis climatiques.",
    vocabularyTitle: "Notre planète change",
    vocabularyObjective: "Utiliser le vocabulaire du climat et de l'environnement.",
    vocabularySessions: [
      {
        title: "Séance 1 : Les problèmes",
        words: ["climat", "pollution", "sécheresse", "chaleur", "inondation", "déchet"],
        sentences: [
          { text: "Le ______ change dans plusieurs régions du monde.", answer: "climat" },
          { text: "La fumée des voitures augmente la ______.", answer: "pollution" },
          { text: "La ______ manque d'eau pendant longtemps.", answer: "sécheresse" },
          { text: "En été, la ______ devient parfois difficile à supporter.", answer: "chaleur" },
          { text: "Une forte pluie peut provoquer une ______.", answer: "inondation" },
          { text: "Un ______ jeté dans la rue salit l'environnement.", answer: "déchet" },
        ],
      },
      {
        title: "Séance 2 : Les solutions",
        words: ["recycler", "économiser l'eau", "énergie", "arbre", "protéger", "planète"],
        sentences: [
          { text: "Il faut ______ le papier et le plastique.", answer: "recycler" },
          { text: "Fermer le robinet permet d'______.", answer: "économiser l'eau" },
          { text: "Le soleil peut produire de l'______.", answer: "énergie" },
          { text: "Planter un ______ aide à rafraîchir l'air.", answer: "arbre" },
          { text: "Chaque geste peut ______ la nature.", answer: "protéger" },
          { text: "La ______ a besoin de notre attention.", answer: "planète" },
        ],
      },
    ],
    vocabularyMessage: "Bravo ! Tu maîtrises mieux le vocabulaire du climat.",
    speechTitle: "Alerter et proposer",
    speechObjective: "Alerter sur un problème climatique et proposer une solution.",
    speechSituation:
      "Ton collège prépare une journée verte.\n\nTu alertes tes camarades sur un problème et tu proposes un geste simple.",
    speechExpressions: [
      "Attention",
      "Il est urgent de",
      "Nous devons",
      "Je propose de",
      "Si nous agissons",
    ],
    speechDialogue: [
      { speaker: "Sara", text: "Il y a beaucoup de déchets dans la cour." },
      { speaker: "Toi", text: "______, cela pollue notre espace.", answer: "Attention" },
      { speaker: "Sara", text: "Que peut-on faire ?" },
      {
        speaker: "Toi",
        text: "______ placer des bacs de tri près des classes.",
        answer: "Je propose de",
      },
      { speaker: "Sara", text: "Tu penses que cela changera quelque chose ?" },
      {
        speaker: "Toi",
        text: "Oui. ______ ensemble, la cour deviendra plus propre.",
        answer: "Si nous agissons",
      },
    ],
    speechCorrection:
      "Attention, les déchets polluent notre espace. Je propose de placer des bacs de tri. Si nous agissons ensemble, la cour deviendra plus propre.",
    speechMessage: "Bravo ! Tu sais alerter et proposer une solution.",
    listeningTitle: "Un défi pour notre collège",
    audio: "/audio/1ac_s2_u5_oral.mp3",
    listeningObjective: "Comprendre un message oral sur les défis climatiques.",
    listeningScript:
      "Bonjour les élèves.\n\nLe climat change et ses effets se voient déjà autour de nous. La chaleur augmente, certaines régions manquent d'eau et les fortes pluies peuvent provoquer des inondations.\n\nAu collège, nous ne pouvons pas tout résoudre, mais nous pouvons agir. Fermer le robinet, trier les déchets, planter un arbre et économiser l'énergie sont des gestes simples.\n\nCes gestes semblent petits, pourtant ils deviennent importants quand tout le monde participe.\n\nProtéger la planète commence souvent par une décision prise dans notre classe, notre cour ou notre maison.",
    audioImagePrompt:
      "Photo ultraréaliste de collégiens participant à une action climatique dans la cour, tri des déchets, arbre planté, ambiance positive.",
    listeningSituation: {
      speaker: "un membre du club environnement",
      receiver: "aux élèves",
      subject: "des défis climatiques",
      purpose: "encourager des gestes écologiques au collège",
    },
    heardWords: ["climat", "chaleur", "eau", "inondations", "déchets", "énergie"],
    intruders: ["panier", "médina"],
    listeningQuestions: [
      {
        question: "Quels effets du climat sont cités ?",
        answer: "chaleur, manque d'eau et inondations",
        options: [
          "chaleur, manque d'eau et inondations",
          "réduction, paiement et retour",
          "match, score et stade",
          "ruelles, remparts et musée",
        ],
      },
      {
        question: "Que peut-on faire au collège ?",
        answer: "agir par des gestes simples",
        options: [
          "agir par des gestes simples",
          "ne rien faire",
          "acheter plus",
          "jeter davantage",
        ],
      },
      {
        question: "Pourquoi les petits gestes deviennent-ils importants ?",
        answer: "quand tout le monde participe",
        options: [
          "quand tout le monde participe",
          "quand personne n'écoute",
          "quand on gaspille",
          "quand on oublie",
        ],
      },
      {
        question: "Où peut commencer la protection de la planète ?",
        answer: "dans la classe, la cour ou la maison",
        options: [
          "dans la classe, la cour ou la maison",
          "dans un panier",
          "dans une facture",
          "dans un jeu",
        ],
      },
    ],
    listeningMessage: "Bravo ! Tu as compris le message sur les défis climatiques.",
    readingTitle: "Petits gestes, grand défi",
    readingObjective: "Comprendre un texte de sensibilisation au climat.",
    readingImage: "/images/lecture-defis-climatiques-realiste.webp",
    readingImageAlt: "Collégiens triant des déchets et plantant un arbre.",
    readingSource: "Club environnement du collège",
    readingText:
      "Le climat change lentement, mais ses effets deviennent visibles. Les périodes de chaleur sont plus longues, l'eau manque parfois et certaines pluies provoquent des dégâts.\n\nFace à ces défis, on peut se sentir petit. Pourtant, chaque établissement scolaire peut devenir un lieu d'action. Trier les déchets, économiser l'eau et planter des arbres sont des gestes simples.\n\nQuand une classe décide de protéger son environnement, elle envoie un message fort aux autres élèves. Elle montre que la protection de la planète n'est pas seulement l'affaire des adultes.\n\nLe grand défi climatique commence aussi par des habitudes quotidiennes.",
    communicationQuestions: [
      {
        question: "Qui publie ce texte ?",
        answer: "le club environnement du collège",
        options: [
          "le club environnement du collège",
          "un magasin",
          "un musée",
          "un club de lecture",
        ],
      },
      {
        question: "À qui s'adresse-t-il ?",
        answer: "aux élèves",
        options: ["aux élèves", "aux vendeurs", "aux touristes", "aux conducteurs"],
      },
      {
        question: "De quoi parle le texte ?",
        answer: "des défis climatiques",
        options: ["des défis climatiques", "des achats", "des portraits", "des villes"],
      },
      {
        question: "Dans quel but ?",
        answer: "sensibiliser et encourager à agir",
        options: [
          "sensibiliser et encourager à agir",
          "vendre un objet",
          "raconter une dispute",
          "annoncer une fête",
        ],
      },
    ],
    paratextQuestions: [
      {
        question: "Que suggère le titre ?",
        answer: "de petits gestes peuvent aider face à un grand problème",
        options: [
          "de petits gestes peuvent aider face à un grand problème",
          "les gestes sont inutiles",
          "le climat n'existe pas",
          "il faut acheter plus",
        ],
      },
      {
        question: "Que montre l'image ?",
        answer: "une action écologique",
        options: ["une action écologique", "une commande", "une médina", "une dispute"],
      },
      {
        question: "La source annonce un texte...",
        answer: "écologique",
        options: ["écologique", "commercial", "historique", "sportif"],
      },
      {
        question: "Quel thème annonce le paratexte ?",
        answer: "la protection de la planète",
        options: ["la protection de la planète", "le budget", "le téléphone", "l'amitié seulement"],
      },
    ],
    directQuestions: [
      {
        question: "Quels effets du climat sont visibles ?",
        answer: "chaleur, manque d'eau et dégâts des pluies",
        options: [
          "chaleur, manque d'eau et dégâts des pluies",
          "prix, commande et retour",
          "portrait, courage et exploit",
          "médina, place et musée",
        ],
      },
      {
        question: "Quels gestes sont proposés ?",
        answer: "trier, économiser l'eau et planter des arbres",
        options: [
          "trier, économiser l'eau et planter des arbres",
          "acheter vite",
          "gaspiller l'eau",
          "jeter les déchets",
        ],
      },
      {
        question: "Que montre une classe qui agit ?",
        answer: "les élèves peuvent participer à la protection de la planète",
        options: [
          "les élèves peuvent participer à la protection de la planète",
          "les adultes agissent seuls",
          "l'école ne sert à rien",
          "les déchets sont utiles partout",
        ],
      },
      {
        question: "Par quoi commence le défi climatique ?",
        answer: "des habitudes quotidiennes",
        options: ["des habitudes quotidiennes", "une seule affiche", "un paiement", "un silence"],
      },
    ],
    inferenceQuestion:
      "Pourquoi l'auteur dit-il qu'on peut se sentir petit face aux défis climatiques ?",
    readingCorrection:
      "Il dit cela parce que le changement climatique est un problème très grand.\n\nMais le texte montre que les élèves peuvent agir à leur niveau grâce à des gestes répétés et partagés.",
    readingMessage: "Bravo ! Tu as compris un texte de sensibilisation au climat.",
    languageTitle: "La cause et la conséquence",
    languageObjective: "Exprimer la cause et la conséquence dans une phrase écologique.",
    languageReminder: "La cause explique pourquoi ; la conséquence indique le résultat.",
    languageExamples: [
      "La chaleur augmente parce que le climat change.",
      "Il pleut beaucoup, donc il y a des inondations.",
      "Comme l'eau manque, il faut l'économiser.",
    ],
    languageQuestions: [
      {
        question: "La pollution augmente ______ on jette trop de déchets.",
        answer: "parce que",
        options: ["parce que", "donc", "mais", "chez"],
      },
      {
        question: "Il fait très chaud, ______ il faut boire de l'eau.",
        answer: "donc",
        options: ["donc", "parce que", "avant", "avec"],
      },
      {
        question: "Dans « parce que », on exprime...",
        answer: "la cause",
        options: ["la cause", "la conséquence", "la comparaison", "le lieu"],
      },
      {
        question: "Choisis la conséquence.",
        answer: "donc la cour devient plus propre",
        options: [
          "donc la cour devient plus propre",
          "parce que les élèves trient",
          "comme il pleut",
          "car il fait chaud",
        ],
      },
    ],
    languageMessage: "Bravo ! Tu sais exprimer la cause et la conséquence.",
    oralObjective: "Sensibiliser oralement aux gestes écologiques.",
    oralSituation:
      "Le club environnement prépare une annonce pour la journée verte.\n\nTu présentes un problème climatique et trois gestes que les élèves peuvent faire au collège.",
    oralKeywords: [
      "club environnement",
      "journée verte",
      "problème climatique",
      "trois gestes",
      "collège",
    ],
    oralExpressions: [
      "Bonjour à tous",
      "Aujourd'hui",
      "Le climat change",
      "Nous pouvons",
      "Je vous propose de",
      "Si chacun participe",
      "Merci de votre écoute",
    ],
    oralPlan: [
      "Introduction : présente le problème.",
      "Développement : propose trois gestes.",
      "Conclusion : encourage la participation.",
    ],
    oralLength: "7 à 9 phrases claires.",
    oralCorrection:
      "Bonjour à tous.\n\nAujourd'hui, je vais parler des défis climatiques.\n\nLe climat change : la chaleur augmente et l'eau devient précieuse. Au collège, nous pouvons agir simplement.\n\nJe vous propose de trier les déchets, d'économiser l'eau et d'éteindre les lumières quand elles ne sont pas nécessaires.\n\nNous pouvons aussi planter des arbres pour rendre la cour plus agréable.\n\nSi chacun participe, notre collège deviendra plus propre et plus responsable.\n\nMerci de votre écoute.",
    oralMessage: "Bravo ! Tu peux sensibiliser tes camarades aux gestes écologiques.",
    writingObjective: "Rédiger un texte de sensibilisation aux défis climatiques.",
    writingSituation:
      "Le club environnement affiche un appel intitulé « Agissons pour la planète ».\n\nRédige un texte pour expliquer un problème climatique et proposer trois gestes simples.",
    writingKeywords: [
      "club environnement",
      "agissons pour la planète",
      "problème climatique",
      "trois gestes simples",
    ],
    writingPlan: [
      "Introduction : présente le problème.",
      "Développement : explique trois gestes.",
      "Conclusion : appelle les élèves à agir.",
    ],
    writingWords: [
      "climat",
      "pollution",
      "eau",
      "déchets",
      "recycler",
      "énergie",
      "arbre",
      "protéger",
      "planète",
    ],
    writingLength: "9 à 11 phrases organisées.",
    writingCorrection:
      "Le climat change et ses effets touchent déjà notre vie quotidienne.\n\nLa chaleur augmente, l'eau devient plus précieuse et les déchets polluent notre environnement. Face à ce problème, les élèves peuvent agir au collège.\n\nD'abord, il faut trier les déchets et recycler le papier. Ensuite, il faut économiser l'eau en fermant bien les robinets. Enfin, on peut économiser l'énergie en éteignant les lumières inutiles.\n\nCes gestes sont simples, mais ils deviennent importants si tout le monde participe.\n\nAgissons ensemble pour protéger notre planète.",
    writingMessage: "Bravo ! Tu as rédigé un texte de sensibilisation clair.",
    fluencyObjective: "Lire un message écologique avec conviction.",
    fluencyExplanation:
      "L'intonation doit montrer l'urgence sans crier. Les pauses / séparent le problème et les solutions.",
    fluencyText: [
      "Le climat change / et la chaleur augmente.",
      "Nous devons économiser l'eau / chaque jour.",
      "Trier les déchets / protège notre cour.",
      "Si chacun agit / la planète respire mieux.",
    ],
    liaisons: ["les‿élèves", "des‿arbres", "notre‿environnement", "petits‿efforts"],
    fluencyMessage: "Bravo ! Ta lecture transmet mieux le message écologique.",
  }),
  "1ac-s2-6": makeModelUnit({
    title: "Créations écolo",
    theme: "recyclage, créativité, objets utiles et écologie",
    finalTask: "Présenter une création écolo réalisée à partir d'objets recyclés.",
    vocabularyTitle: "Créer avec ce qu'on a",
    vocabularyObjective: "Utiliser le vocabulaire du recyclage et de la création.",
    vocabularySessions: [
      {
        title: "Séance 1 : Matières et gestes",
        words: ["recycler", "carton", "bouteille", "tissu", "réparer", "fabriquer"],
        sentences: [
          { text: "Il faut ______ le papier au lieu de le jeter.", answer: "recycler" },
          { text: "Je découpe un morceau de ______ pour faire une boîte.", answer: "carton" },
          { text: "Une ______ vide peut devenir un pot à crayons.", answer: "bouteille" },
          { text: "Un vieux ______ peut servir à décorer un objet.", answer: "tissu" },
          { text: "Avant de jeter, on peut essayer de ______.", answer: "réparer" },
          { text: "Avec peu de matériel, on peut ______ un objet utile.", answer: "fabriquer" },
        ],
      },
      {
        title: "Séance 2 : L'atelier créatif",
        words: ["atelier", "idée", "objet", "utile", "créativité", "réutiliser"],
        sentences: [
          { text: "L'______ écolo se déroule dans la salle d'arts.", answer: "atelier" },
          { text: "Chaque groupe propose une ______ originale.", answer: "idée" },
          { text: "Notre ______ sert à ranger les stylos.", answer: "objet" },
          { text: "Une création écolo doit être belle et ______.", answer: "utile" },
          { text: "La ______ permet de transformer les déchets.", answer: "créativité" },
          {
            text: "Il faut ______ les matériaux avant d'en acheter d'autres.",
            answer: "réutiliser",
          },
        ],
      },
    ],
    vocabularyMessage: "Bravo ! Tu maîtrises mieux le vocabulaire des créations écolo.",
    speechTitle: "Expliquer les étapes",
    speechObjective: "Expliquer oralement les étapes d'une fabrication simple.",
    speechSituation:
      "Ton groupe prépare un objet recyclé pour l'exposition du collège.\n\nTu expliques à un camarade comment le fabriquer.",
    speechExpressions: ["D'abord", "Ensuite", "Puis", "Après cela", "Enfin"],
    speechDialogue: [
      { speaker: "Nora", text: "Comment fabrique-t-on ce pot à crayons ?" },
      { speaker: "Toi", text: "______ on lave une bouteille vide.", answer: "D'abord" },
      { speaker: "Nora", text: "Et après ?" },
      { speaker: "Toi", text: "______ on la découpe avec l'aide d'un adulte.", answer: "Ensuite" },
      { speaker: "Nora", text: "Comment finit-on l'objet ?" },
      { speaker: "Toi", text: "______ on la décore avec du tissu et du carton.", answer: "Enfin" },
    ],
    speechCorrection:
      "D'abord, on lave une bouteille vide. Ensuite, on la découpe avec l'aide d'un adulte. Enfin, on la décore avec du tissu et du carton.",
    speechMessage: "Bravo ! Tu sais expliquer les étapes d'une création.",
    listeningTitle: "L'atelier des idées vertes",
    audio: "/audio/1ac_s2_u6_oral.mp3",
    listeningObjective: "Comprendre les étapes d'une création écolo présentée à l'oral.",
    listeningScript:
      "Bonjour les élèves.\n\nAujourd'hui, notre atelier transforme des objets destinés à la poubelle en créations utiles. Chaque groupe choisit un matériau : carton, bouteille, tissu ou vieux papier.\n\nD'abord, les élèves observent ce qu'ils peuvent réutiliser. Ensuite, ils dessinent leur idée sur une feuille. Puis, ils fabriquent l'objet avec prudence.\n\nUn groupe transforme une bouteille en pot à crayons. Un autre utilise du carton pour créer un organiseur de bureau.\n\nÀ la fin, les élèves présentent leur création et expliquent pourquoi elle protège l'environnement.",
    audioImagePrompt:
      "Photo ultraréaliste de collégiens dans un atelier créatif écolo, bouteilles, carton, tissu, objets recyclés sur les tables.",
    listeningSituation: {
      speaker: "un animateur d'atelier",
      receiver: "aux élèves",
      subject: "d'un atelier de créations écolo",
      purpose: "expliquer comment transformer des déchets en objets utiles",
    },
    heardWords: ["atelier", "carton", "bouteille", "tissu", "fabriquent", "environnement"],
    intruders: ["remparts", "paiement"],
    listeningQuestions: [
      {
        question: "Que transforme l'atelier ?",
        answer: "des objets destinés à la poubelle",
        options: [
          "des objets destinés à la poubelle",
          "des monuments",
          "des prix",
          "des règles de sport",
        ],
      },
      {
        question: "Que font les élèves après avoir observé les matériaux ?",
        answer: "ils dessinent leur idée",
        options: [
          "ils dessinent leur idée",
          "ils quittent la salle",
          "ils achètent tout",
          "ils jettent le carton",
        ],
      },
      {
        question: "En quoi une bouteille est-elle transformée ?",
        answer: "en pot à crayons",
        options: ["en pot à crayons", "en téléphone", "en rempart", "en facture"],
      },
      {
        question: "Que doivent expliquer les élèves à la fin ?",
        answer: "pourquoi leur création protège l'environnement",
        options: [
          "pourquoi leur création protège l'environnement",
          "pourquoi il faut gaspiller",
          "pourquoi le prix augmente",
          "pourquoi la ville dort",
        ],
      },
    ],
    listeningMessage: "Bravo ! Tu as compris les étapes d'un atelier écolo.",
    readingTitle: "Une seconde vie pour les objets",
    readingObjective: "Comprendre un texte sur la création à partir du recyclage.",
    readingImage: "/images/lecture-creations-ecolo-realiste.webp",
    readingImageAlt:
      "Atelier d'élèves fabriquant des objets utiles avec du carton et des bouteilles recyclées.",
    readingSource: "Atelier vert du collège",
    readingText:
      "Dans la salle d'arts, les tables sont couvertes de carton, de bouteilles vides, de morceaux de tissu et de vieux journaux. À première vue, tout cela ressemble à des déchets.\n\nPourtant, les élèves y voient des possibilités. Une bouteille devient un pot à crayons, une boîte en carton se transforme en rangement et un tissu coloré donne une nouvelle beauté à un objet usé.\n\nCréer écolo, ce n'est pas seulement fabriquer quelque chose de joli. C'est apprendre à regarder autrement ce que l'on allait jeter.\n\nÀ la fin de l'atelier, chaque groupe présente un objet utile et explique les étapes de sa réalisation. Les déchets ont gagné une seconde vie.",
    communicationQuestions: [
      {
        question: "Quelle est la source du texte ?",
        answer: "l'atelier vert du collège",
        options: [
          "l'atelier vert du collège",
          "un site marchand",
          "une charte sportive",
          "un guide touristique",
        ],
      },
      {
        question: "À qui s'adresse-t-il ?",
        answer: "aux élèves",
        options: ["aux élèves", "aux clients", "aux chauffeurs", "aux médecins"],
      },
      {
        question: "De quoi parle le texte ?",
        answer: "de créations écolo",
        options: ["de créations écolo", "d'un budget", "d'une dispute", "d'une ville"],
      },
      {
        question: "Dans quel but ?",
        answer: "montrer comment réutiliser des objets",
        options: [
          "montrer comment réutiliser des objets",
          "vendre une bouteille",
          "annoncer un match",
          "raconter une légende",
        ],
      },
    ],
    paratextQuestions: [
      {
        question: "Que signifie le titre ?",
        answer: "les objets peuvent être réutilisés",
        options: [
          "les objets peuvent être réutilisés",
          "les objets doivent toujours être jetés",
          "les objets sont neufs",
          "les objets dorment",
        ],
      },
      {
        question: "Que montre l'image ?",
        answer: "un atelier de recyclage créatif",
        options: ["un atelier de recyclage créatif", "un paiement", "un monument", "un conflit"],
      },
      {
        question: "La source annonce un texte...",
        answer: "écologique et créatif",
        options: ["écologique et créatif", "commercial", "historique", "médical"],
      },
      {
        question: "Quel thème est annoncé par le paratexte ?",
        answer: "la création à partir d'objets recyclés",
        options: [
          "la création à partir d'objets recyclés",
          "l'achat en ligne",
          "la natation",
          "le budget",
        ],
      },
    ],
    directQuestions: [
      {
        question: "Quels matériaux couvrent les tables ?",
        answer: "carton, bouteilles, tissu et journaux",
        options: [
          "carton, bouteilles, tissu et journaux",
          "or, argent et bijoux",
          "livres neufs seulement",
          "ballons et raquettes",
        ],
      },
      {
        question: "Que devient une bouteille ?",
        answer: "un pot à crayons",
        options: ["un pot à crayons", "une facture", "un monument", "un téléphone"],
      },
      {
        question: "Que signifie créer écolo ?",
        answer: "regarder autrement ce qu'on allait jeter",
        options: [
          "regarder autrement ce qu'on allait jeter",
          "acheter sans réfléchir",
          "jeter plus vite",
          "copier un texte",
        ],
      },
      {
        question: "Que fait chaque groupe à la fin ?",
        answer: "il présente un objet utile",
        options: [
          "il présente un objet utile",
          "il cache son travail",
          "il quitte la classe",
          "il vend tout",
        ],
      },
    ],
    inferenceQuestion: "Pourquoi l'auteur dit-il que les déchets ont gagné une seconde vie ?",
    readingCorrection:
      "Il dit cela parce que les objets n'ont pas été jetés.\n\nLes élèves les ont transformés en créations utiles, ce qui leur donne une nouvelle fonction et protège l'environnement.",
    readingMessage: "Bravo ! Tu as compris le texte sur les créations écolo.",
    languageTitle: "Les connecteurs chronologiques",
    languageObjective: "Utiliser des connecteurs pour organiser les étapes d'une fabrication.",
    languageReminder: "Les connecteurs chronologiques indiquent l'ordre des actions.",
    languageExamples: [
      "D'abord, je lave la bouteille.",
      "Ensuite, je la découpe.",
      "Enfin, je la décore.",
    ],
    languageQuestions: [
      {
        question: "______ je lave la bouteille.",
        answer: "D'abord",
        options: ["D'abord", "Parce que", "Donc", "Très"],
      },
      {
        question: "Je découpe le carton. ______ je le colle.",
        answer: "Ensuite",
        options: ["Ensuite", "Hier", "Mais", "Chez"],
      },
      {
        question: "Pour terminer une fabrication, j'utilise...",
        answer: "Enfin",
        options: ["Enfin", "D'abord", "Parce que", "Pendant"],
      },
      {
        question: "Les connecteurs chronologiques servent à...",
        answer: "organiser les étapes",
        options: [
          "organiser les étapes",
          "comparer les prix",
          "décrire une ville",
          "interdire une action",
        ],
      },
    ],
    languageMessage: "Bravo ! Tu sais organiser les étapes d'une fabrication.",
    oralObjective: "Présenter oralement une création écolo.",
    oralSituation:
      "Ton groupe participe à l'exposition « Créations écolo » du collège.\n\nTu présentes l'objet fabriqué, les matériaux utilisés et les étapes de réalisation.",
    oralKeywords: ["exposition", "création écolo", "objet fabriqué", "matériaux", "étapes"],
    oralExpressions: [
      "Bonjour à tous",
      "Nous avons fabriqué",
      "Nous avons utilisé",
      "D'abord",
      "Ensuite",
      "Enfin",
      "Cet objet est utile parce que",
      "Merci de votre écoute",
    ],
    oralPlan: [
      "Introduction : présente l'objet.",
      "Développement : cite les matériaux et les étapes.",
      "Conclusion : explique son utilité écologique.",
    ],
    oralLength: "7 à 9 phrases claires.",
    oralCorrection:
      "Bonjour à tous.\n\nNous avons fabriqué un pot à crayons écolo.\n\nNous avons utilisé une bouteille vide, du carton et un morceau de tissu. D'abord, nous avons lavé la bouteille. Ensuite, nous l'avons découpée avec l'aide d'un adulte. Puis, nous avons collé du carton pour renforcer le fond.\n\nEnfin, nous avons décoré l'objet avec du tissu coloré.\n\nCet objet est utile parce qu'il range les stylos et donne une seconde vie à une bouteille.\n\nMerci de votre écoute.",
    oralMessage: "Bravo ! Tu peux présenter une création écolo clairement.",
    writingObjective: "Rédiger un texte explicatif sur une création écolo.",
    writingSituation:
      "L'exposition du collège demande une fiche pour chaque création écolo.\n\nRédige une fiche qui présente l'objet, les matériaux utilisés, les étapes de fabrication et son utilité.",
    writingKeywords: [
      "exposition du collège",
      "fiche",
      "création écolo",
      "matériaux",
      "étapes",
      "utilité",
    ],
    writingPlan: [
      "Introduction : nomme l'objet.",
      "Développement : explique les matériaux et les étapes.",
      "Conclusion : précise l'utilité écologique.",
    ],
    writingWords: [
      "recycler",
      "carton",
      "bouteille",
      "tissu",
      "fabriquer",
      "atelier",
      "objet",
      "utile",
      "réutiliser",
    ],
    writingLength: "9 à 11 phrases organisées.",
    writingCorrection:
      "Notre création écolo est un pot à crayons fabriqué avec une bouteille vide.\n\nPour réaliser cet objet, nous avons utilisé une bouteille, du carton, un morceau de tissu et de la colle. D'abord, nous avons lavé la bouteille. Ensuite, nous l'avons découpée avec prudence. Puis, nous avons ajouté du carton pour rendre l'objet plus solide.\n\nEnfin, nous avons décoré le pot avec du tissu coloré.\n\nCette création est utile parce qu'elle permet de ranger les stylos. Elle est aussi écologique, car elle réutilise une bouteille qui allait être jetée.",
    writingMessage: "Bravo ! Tu as rédigé une fiche claire pour une création écolo.",
    fluencyObjective: "Lire des étapes de fabrication avec un rythme régulier.",
    fluencyExplanation:
      "Le rythme doit suivre les étapes. Les pauses / aident l'auditeur à comprendre l'ordre des actions.",
    fluencyText: [
      "D'abord / je lave la bouteille.",
      "Ensuite / je découpe le carton.",
      "Puis / je colle les morceaux avec prudence.",
      "Enfin / je présente mon objet écolo.",
    ],
    liaisons: ["un‿objet", "des‿étapes", "les‿élèves", "mon‿atelier"],
    fluencyMessage: "Bravo ! Ta lecture des étapes est claire et organisée.",
  }),
  "1ac-s1-2": {
    title: "Santé et bien-être au quotidien",
    theme: "hygiène de vie, santé et habitudes quotidiennes",
    finalTask:
      "Produire une storytime pour parler des habitudes à suivre pour avoir une bonne hygiène de vie.",
    vocabulary: {
      title: "Parlons hygiène !",
      objective: "Utiliser le vocabulaire de l'hygiène, de la santé et des habitudes de vie.",
      instruction: "Lis chaque phrase, puis clique sur le mot qui convient pour la compléter.",
      sessions: [
        {
          title: "Séance 1 : Parlons hygiène !",
          words: [
            "se brosser",
            "faire des exercices de respiration",
            "le sommeil",
            "se laver",
            "les règles d'hygiène",
            "les gestes d'hygiène",
          ],
          sentences: [
            { text: "Amine doit ______ pour avoir des dents saines.", answer: "se brosser" },
            {
              text: "Pour se détendre, elle peut ______.",
              answer: "faire des exercices de respiration",
            },
            { text: "La nuit, je dors tôt pour avoir un bon ______.", answer: "le sommeil" },
            { text: "Je dois ______ les mains avant de manger.", answer: "se laver" },
            { text: "______ nous aident à rester en bonne santé.", answer: "les règles d'hygiène" },
            {
              text: "Se laver les mains et se brosser les dents sont ______.",
              answer: "les gestes d'hygiène",
            },
          ],
        },
        {
          title: "Séance 2 : Une routine saine",
          words: [
            "produits sains",
            "manger équilibré",
            "prendre soin de sa santé",
            "se protéger",
            "précautions",
            "air frais",
          ],
          sentences: [
            {
              text: "Mehdi et Anas mangent des ______ comme les légumes et les fruits.",
              answer: "produits sains",
            },
            { text: "Il faut ______ pour être en bonne santé.", answer: "manger équilibré" },
            { text: "Je dois ______ chaque jour.", answer: "prendre soin de sa santé" },
            { text: "On vérifie les dates de consommation pour ______.", answer: "se protéger" },
            { text: "Avant une activité, il faut prendre des ______.", answer: "précautions" },
            { text: "Ouvrir la fenêtre apporte de l'______ dans la chambre.", answer: "air frais" },
          ],
        },
      ],
      finalMessage: "Bravo ! Tu maîtrises mieux le vocabulaire de la santé et de l'hygiène.",
    },
    speechActs: {
      title: "Mes habitudes au quotidien",
      objective: "Parler de ses pratiques d'hygiène en utilisant des expressions de fréquence.",
      instruction:
        "Lis la situation, puis complète le dialogue en cliquant sur les expressions qui conviennent.",
      situation:
        "Ton camarade veut améliorer son hygiène de vie.\n\nTu lui expliques tes habitudes quotidiennes et tu lui donnes des conseils simples.",
      options: ["chaque matin", "souvent", "boire de l'eau", "dormir tôt"],
      dialogue: [
        { speaker: "Yasmine", text: "Comment fais-tu pour rester en bonne santé ?" },
        {
          speaker: "Toi",
          text: "______, je me lave le visage et les mains.",
          answer: "chaque matin",
        },
        { speaker: "Yasmine", text: "Et pendant la journée ?" },
        {
          speaker: "Toi",
          text: "Je pense ______, surtout après le sport.",
          answer: "boire de l'eau",
        },
        { speaker: "Yasmine", text: "Tu fais aussi attention au sommeil ?" },
        { speaker: "Toi", text: "Oui, il faut ______ pour être en forme.", answer: "dormir tôt" },
        { speaker: "Yasmine", text: "Et l'activité physique ?" },
        { speaker: "Toi", text: "Je marche ______ avec ma famille.", answer: "souvent" },
      ],
      finalMessage: "Bravo ! Tu sais parler de tes habitudes d'hygiène et de santé.",
    },
    listening: {
      title: "Une bonne routine",
      icon: "⏰",
      audio: "/audio/1ac_u2_oral.mp3",
      objective: "Identifier les grandes étapes d'un discours oral sur l'hygiène de vie.",
      instruction:
        "Écoute attentivement le message audio, puis réponds aux questions en cliquant sur les bonnes réponses.",
      script:
        "Bonjour les élèves.\n\nAujourd'hui, je vais vous raconter une routine simple qui m'aide à rester en bonne santé.\n\nLe matin, je commence par me laver le visage et les mains. Ensuite, je prends un petit-déjeuner équilibré avant d'aller au collège.\n\nPendant la journée, je bois de l'eau et j'essaie de bouger un peu, même quand j'ai beaucoup de travail.\n\nLe soir, je prépare mes affaires, puis je me couche tôt pour récupérer.\n\nCes gestes ne sont pas compliqués. Pourtant, ils me donnent plus d'énergie et m'aident à me sentir mieux.",
      situation: {
        speaker: "une élève",
        receiver: "aux élèves de sa classe",
        subject: "sa routine pour rester en bonne santé",
        purpose: "partager de bonnes habitudes quotidiennes",
      },
      heardWords: ["routine", "santé", "mains", "eau", "dormir", "énergie"],
      intruders: ["ordinateur", "monument"],
      questions: [
        {
          question: "Que fait l'élève le matin ?",
          answer: "elle se lave le visage et les mains",
          options: [
            "elle se lave le visage et les mains",
            "elle achète un téléphone",
            "elle visite une ville",
            "elle regarde un match",
          ],
        },
        {
          question: "Que prend-elle avant d'aller au collège ?",
          answer: "un petit-déjeuner équilibré",
          options: [
            "un petit-déjeuner équilibré",
            "un billet de train",
            "un sac de voyage",
            "un gâteau seulement",
          ],
        },
        {
          question: "Que fait-elle pendant la journée ?",
          answer: "elle boit de l'eau et bouge un peu",
          options: [
            "elle boit de l'eau et bouge un peu",
            "elle dort en classe",
            "elle vend des produits",
            "elle oublie ses affaires",
          ],
        },
        {
          question: "Pourquoi ces habitudes sont-elles utiles ?",
          answer: "elles donnent plus d'énergie",
          options: [
            "elles donnent plus d'énergie",
            "elles fatiguent le corps",
            "elles empêchent de dormir",
            "elles remplacent l'école",
          ],
        },
      ],
      finalMessage: "Bravo ! Tu as bien compris les étapes d'une routine saine.",
    },
    reading: {
      title: "Une journée pour prendre soin de soi",
      objective: "Relever les informations importantes dans un texte sur l'hygiène de vie.",
      instruction:
        "Observe d'abord le titre, l'image et la source, puis lis le texte et réponds aux questions.",
      source: "Magazine santé du collège",
      image: "/images/lecture-sante-routine-realiste.webp",
      imageAlt: "Un élève qui prépare une routine saine avec de l'eau et un repas équilibré.",
      text: "Prendre soin de soi commence par de petits gestes répétés chaque jour.\n\nLe matin, Lina se lave les mains et le visage avant de prendre un petit-déjeuner équilibré. Elle arrive au collège avec plus d'énergie et une meilleure concentration.\n\nPendant la journée, elle boit de l'eau et évite les boissons trop sucrées. Quand elle a un moment libre, elle marche un peu pour rester active.\n\nLe soir, elle prépare ses affaires, puis elle se couche tôt pour récupérer.\n\nGrâce à cette routine simple, Lina protège sa santé et se sent plus à l'aise dans son corps.",
      communication: [
        {
          question: "Qui parle dans ce texte ?",
          answer: "un magazine santé du collège",
          options: [
            "un magazine santé du collège",
            "un vendeur",
            "un guide touristique",
            "un conducteur",
          ],
        },
        {
          question: "À qui s'adresse le texte ?",
          answer: "aux élèves",
          options: ["aux élèves", "aux touristes", "aux clients", "aux mécaniciens"],
        },
        {
          question: "De quoi parle le texte ?",
          answer: "des bonnes habitudes de santé",
          options: [
            "des bonnes habitudes de santé",
            "des monuments",
            "des achats en ligne",
            "des fêtes",
          ],
        },
        {
          question: "Dans quel but ce texte est-il écrit ?",
          answer: "encourager les élèves à prendre soin d'eux",
          options: [
            "encourager les élèves à prendre soin d'eux",
            "vendre un produit",
            "raconter une légende",
            "présenter un match",
          ],
        },
      ],
      paratext: [
        {
          question: "D'après le titre et l'image, de quoi va parler le texte ?",
          answer: "des gestes pour prendre soin de soi",
          options: [
            "des gestes pour prendre soin de soi",
            "des sites historiques",
            "des jeux vidéo",
            "des instruments",
          ],
        },
        {
          question: "Que suggère le titre ?",
          answer: "il faut organiser sa journée avec de bonnes habitudes",
          options: [
            "il faut organiser sa journée avec de bonnes habitudes",
            "il faut voyager souvent",
            "il faut acheter un objet",
            "il faut rester sans bouger",
          ],
        },
        {
          question: "Que montre l'image ?",
          answer: "des éléments liés à la santé",
          options: ["des éléments liés à la santé", "des voitures", "des montagnes", "des billets"],
        },
        {
          question: "Quelle information donne la source ?",
          answer: "le texte vient d'un support scolaire sur la santé",
          options: [
            "le texte vient d'un support scolaire sur la santé",
            "le texte est une facture",
            "le texte est une carte",
            "le texte est une annonce de vente",
          ],
        },
      ],
      direct: [
        {
          question: "De quoi parle le texte ?",
          answer: "des habitudes pour rester en bonne santé",
          options: [
            "des habitudes pour rester en bonne santé",
            "des achats en ligne",
            "des monuments",
            "du budget",
          ],
        },
        {
          question: "Comment commence-t-on la journée selon le texte ?",
          answer: "en se lavant les mains et le visage",
          options: [
            "en se lavant les mains et le visage",
            "en dormant en classe",
            "en oubliant son cartable",
            "en mangeant trop vite",
          ],
        },
        {
          question: "Pourquoi faut-il dormir assez tôt ?",
          answer: "pour récupérer",
          options: [
            "pour récupérer",
            "pour perdre son temps",
            "pour oublier la santé",
            "pour éviter l'eau",
          ],
        },
        {
          question: "Quelle information importante le texte donne-t-il sur l'eau ?",
          answer: "elle aide le corps à bien fonctionner",
          options: [
            "elle aide le corps à bien fonctionner",
            "elle fatigue le corps",
            "elle remplace le sommeil",
            "elle sert à acheter",
          ],
        },
      ],
      freeQuestion:
        "Quelle habitude saine veux-tu améliorer dans ta vie quotidienne ? Explique pourquoi.",
      correction:
        "Je veux améliorer mon sommeil, parce qu'il m'aide à récupérer après la journée.\n\nQuand je dors assez tôt, je me réveille avec plus d'énergie et je me concentre mieux en classe.",
      finalMessage:
        "Bravo ! Tu as compris les informations importantes sur les bonnes habitudes de santé.",
    },
    language: {
      title: "Exprimer le but",
      objective: "Exprimer le but avec pour, afin de ou dans le but de.",
      instruction:
        "Lis le rappel, observe les exemples, puis clique sur l'expression correcte pour compléter chaque phrase.",
      reminder:
        "Pour exprimer le but, on peut utiliser : pour, afin de ou dans le but de.\n\nCes expressions répondent à la question : pourquoi ?",
      examples: [
        "Je dors tôt pour être en forme.",
        "Je me lave les mains afin de protéger ma santé.",
        "Je bois de l'eau dans le but de bien hydrater mon corps.",
      ],
      questions: [
        {
          question: "Je me lave les mains ______ éviter les microbes.",
          verb: "expression du but",
          answer: "pour",
          options: ["pour", "parce que", "mais", "hier"],
        },
        {
          question: "Je dors tôt ______ récupérer.",
          verb: "expression du but",
          answer: "afin de",
          options: ["afin de", "donc", "quand", "car"],
        },
        {
          question: "Je bois de l'eau ______ rester hydraté.",
          verb: "expression du but",
          answer: "pour",
          options: ["pour", "avant", "puis", "avec"],
        },
        {
          question: "Je mange équilibré ______ protéger ma santé.",
          verb: "expression du but",
          answer: "dans le but de",
          options: ["dans le but de", "pendant", "souvent", "alors"],
        },
        {
          question: "Je fais du sport ______ garder mon énergie.",
          verb: "expression du but",
          answer: "afin de",
          options: ["afin de", "et", "ou", "sans"],
        },
        {
          question: "Je prépare mes affaires ______ éviter le stress du matin.",
          verb: "expression du but",
          answer: "pour",
          options: ["pour", "après", "avec", "chez"],
        },
      ],
      finalMessage: "Bravo ! Tu sais exprimer le but dans des phrases simples.",
    },
    oralProduction: {
      title: "Situation de production orale",
      objective: "Raconter une routine et présenter des habitudes de vie saine.",
      instruction:
        "Lis la situation, prépare tes idées, puis présente ta storytime en respectant le plan proposé.",
      situation:
        "La classe prépare une storytime sur les habitudes qui aident à rester en bonne santé.\n\nTu vas raconter ta routine quotidienne et expliquer deux gestes importants pour avoir une bonne hygiène de vie.",
      keywords: [
        "storytime",
        "routine quotidienne",
        "deux gestes importants",
        "bonne hygiène de vie",
        "rester en bonne santé",
      ],
      expressions: [
        "Bonjour à tous",
        "Chaque matin...",
        "Pour rester en bonne santé...",
        "Je fais attention à...",
        "Je vous conseille de...",
        "Grâce à ces habitudes...",
        "Merci de votre écoute",
      ],
      plan: [
        "Introduction : présente le thème de ta storytime.",
        "Développement : raconte ta routine et explique deux habitudes saines.",
        "Conclusion : donne un conseil final à tes camarades.",
      ],
      length: "6 à 8 phrases simples.",
      correction:
        "Bonjour à tous.\n\nAujourd'hui, je vais vous raconter ma routine pour prendre soin de ma santé.\n\nChaque matin, je me lave le visage et les mains. Ensuite, je prends un petit-déjeuner équilibré pour commencer la journée avec de l'énergie.\n\nPendant la journée, je bois de l'eau et je bouge un peu, surtout après de longues heures assis en classe.\n\nLe soir, je prépare mes affaires, puis je me couche tôt pour bien récupérer.\n\nJe vous conseille d'adopter ces gestes simples. Ils protègent la santé et donnent une vraie sensation de bien-être.\n\nMerci de votre écoute.",
      finalMessage: "Bravo ! Tu as préparé une storytime claire sur les bonnes habitudes.",
    },
    writing: {
      title: "Sujet",
      objective: "Écrire un texte court pour raconter des habitudes de vie saine.",
      instruction:
        "Lis le sujet, clique sur « Mots-clés soulignés » pour repérer les informations importantes, puis rédige ton texte en respectant le plan proposé.",
      subject:
        "Tu es influenceur dans une chaîne scolaire.\n\nTu veux partager tes habitudes quotidiennes avec les élèves pour les aider à avoir une bonne hygiène de vie.\n\nÉcris le texte de ta storytime : raconte ta routine, présente deux habitudes saines et explique pourquoi elles sont importantes.",
      keywords: [
        "influenceur",
        "chaîne scolaire",
        "habitudes quotidiennes",
        "bonne hygiène de vie",
        "texte de ta storytime",
        "routine",
        "deux habitudes saines",
        "pourquoi elles sont importantes",
      ],
      plan: [
        "Introduction : présente le thème de la storytime.",
        "Développement : raconte ta routine et explique deux habitudes saines.",
        "Conclusion : donne un conseil motivant.",
      ],
      words: [
        "hygiène",
        "santé",
        "sommeil",
        "eau",
        "alimentation équilibrée",
        "se laver",
        "routine",
        "énergie",
        "bien-être",
      ],
      length: "8 à 10 phrases simples.",
      correction:
        "Bonjour à tous.\n\nAujourd'hui, je partage avec vous ma routine pour rester en bonne santé.\n\nLe matin, je me lave les mains et le visage pour garder une bonne hygiène. Je prends aussi un petit-déjeuner équilibré afin d'avoir de l'énergie.\n\nPendant la journée, je bois de l'eau et je marche un peu dès que je peux.\n\nLe soir, je dors assez tôt pour récupérer et mieux me concentrer le lendemain.\n\nCes habitudes simples protègent ma santé et améliorent mon bien-être.\n\nJe vous conseille de les pratiquer chaque jour, avec régularité et sans attendre d'être fatigué.",
      finalMessage: "Bravo ! Tu as rédigé une storytime claire sur les habitudes saines.",
    },
    fluency: {
      title: "Lecture fluence",
      objective: "Lire un texte à haute voix en respectant les liaisons et les pauses.",
      instruction:
        "Lis le texte à haute voix. Respecte les pauses, articule bien les mots et lis avec une intonation naturelle.",
      explanation:
        "Un groupe de mots rassemble les mots qui vont ensemble. La pause / organise la respiration, la liaison ‿ rend la phrase plus fluide, et le rythme évite de lire trop vite.",
      text: [
        "Chaque matin / je prends soin de mon corps.",
        "Je me lave les mains / avant de passer à table.",
        "Je bois de l'eau régulièrement / et je choisis des aliments variés.",
        "Ces gestes simples / protègent ma santé / et améliorent mon bien-être.",
      ],
      liaisons: ["bonnes‿habitudes", "une‿alimentation", "ces‿habitudes", "avant‿un repas"],
      checklist: [
        "J'ai respecté les pauses.",
        "J'ai bien articulé.",
        "J'ai gardé un bon rythme.",
        "J'ai mis une intonation naturelle.",
      ],
      finalMessage: "Bravo ! Ta lecture devient plus claire et plus fluide.",
    },
  },
  ...extraModelUnits,
}

export function getModelUnit(levelId?: string, semesterId?: string, unitId?: string | number) {
  if (!levelId || !semesterId || unitId === undefined || unitId === null) {
    return null
  }

  return normalizeModelUnit(modelUnits[`${levelId}-${semesterId}-${unitId}`])
}

function normalizeModelUnit(unit: unknown): ModelUnitContent | null {
  if (!unit) return null

  const source = asRecord(unit)
  const speechActs = asRecord(source.speechActs)
  const speechDialogue = Array.isArray(speechActs.dialogue) ? speechActs.dialogue : []
  const speechAnswers = speechDialogue
    .map((line) => asRecord(line).answer)
    .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
  const speechOptions = uniqueStrings([
    ...(Array.isArray(speechActs.options) ? speechActs.options : []),
    ...(Array.isArray(speechActs.expressions) ? speechActs.expressions : []),
    ...speechAnswers,
  ])

  const writing = asRecord(source.writing)
  const oralProduction = asRecord(source.oralProduction)
  const listening = asRecord(source.listening)
  const reading = asRecord(source.reading)

  return {
    ...source,
    speechActs: {
      ...speechActs,
      expressions: speechOptions,
      options: speechOptions,
    },
    listening: {
      ...listening,
      audio: getPedagogicalAudioPath(asString(listening.audio)),
      originalAudio: asString(listening.audio),
      script: asString(listening.script) || asString(listening.text),
      source: asString(listening.source, "Enregistrement sonore officiel - Ministère de l’Éducation Nationale"),
    },
    reading: {
      ...reading,
      text: asString(reading.text) || asString(reading.supportText),
      source: asString(reading.source, "Magazine scolaire"),
    },
    oralProduction: {
      ...oralProduction,
      subject: asString(oralProduction.subject) || asString(oralProduction.situation),
      situation: asString(oralProduction.situation) || asString(oralProduction.subject),
    },
    writing: {
      ...writing,
      subject: asString(writing.subject) || asString(writing.situation),
      situation: asString(writing.situation) || asString(writing.subject),
    },
  } as unknown as ModelUnitContent
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {}
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback
}

function uniqueStrings(values: unknown[]) {
  return Array.from(
    new Set(
      values.filter(
        (value): value is string => typeof value === "string" && value.trim().length > 0
      )
    )
  )
}
