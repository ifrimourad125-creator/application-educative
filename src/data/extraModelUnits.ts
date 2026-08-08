import type { ModelUnitContent } from "../types/pedagogy"

function q(question: string, answer: string, options: string[]) {
  return {
    question,
    answer,
    options: [answer, ...options.filter((option) => option !== answer)].slice(0, 4),
  }
}

type GeneratedQuestion = ReturnType<typeof q>

type ListeningSituation = {
  speaker: string
  receiver: string
  subject?: string
  purpose?: string
}

type ExtraUnitConfig = {
  key: string
  title: string
  theme: string
  themeLabel?: string
  finalTask: string
  vocabularyTitle: string
  vocab1: string[]
  vocab2: string[]
  speechTitle: string
  speechObjective: string
  speechSituation: string
  dialogueStart: string
  expressions: string[]
  listeningTitle: string
  audio: string
  script: string
  imagePrompt: string
  listeningSituation: ListeningSituation
  heardWords: string[]
  intruders: string[]
  listeningQuestions: GeneratedQuestion[]
  readingTitle: string
  image: string
  imageAlt: string
  source: string
  subject: string
  purpose: string
  titleMeaning: string
  imageMeaning: string
  textType: string
  readingText: string
  directQuestions: GeneratedQuestion[]
  inferenceQuestion: string
  readingCorrection: string
  languageTitle: string
  languageObjective: string
  languageReminder: string
  languageExamples: string[]
  languageQuestions: GeneratedQuestion[]
  oralObjective: string
  oralSituation: string
  oralKeywords: string[]
  oralLength: string
  oralCorrection: string
  writingObjective: string
  writingSituation: string
  writingKeywords: string[]
  writingLength: string
  writingCorrection: string
  fluencyLine1: string
  fluencyLine2: string
}

type ExtraUnitBaseConfig = Omit<ExtraUnitConfig, "key" | "title" | "audio">
type CompactConfigItem = [
  key: string,
  title: string,
  theme: string,
  imageName: string,
  finalTask: string,
  vocab1: string[],
  vocab2: string[],
]

function deTheme(theme: string) {
  const value = theme.trim()
  if (!value) return "du thème"

  return value
    .replace(/^les\s+/i, "des ")
    .replace(/^le\s+/i, "du ")
    .replace(/^la\s+/i, "de la ")
    .replace(/^l'/i, "de l'")
    .replace(/\set les\s+/gi, " et des ")
    .replace(/\set le\s+/gi, " et du ")
    .replace(/\set la\s+/gi, " et de la ")
    .replace(/\set l'/gi, " et de l'")
    .replace(/^(?!d[eu]\s|des\s|de l'|de la\s)/i, "de ")
}

function vocabularySession(title: string, words: string[], theme: string) {
  return {
    title,
    words,
    sentences: words.map((word, index) => ({
      text: [
        `Dans cette unité, le mot ______ aide à parler ${deTheme(theme)}.`,
        `Pour expliquer une idée liée à ${theme}, j'utilise le mot ______.`,
        `Le mot ______ convient dans une phrase sur ${theme}.`,
        `Quand je prépare mon activité, je pense au mot ______.`,
        `Dans un texte sur ${theme}, on peut rencontrer le mot ______.`,
        `Pour enrichir ma réponse, je peux employer le mot ______.`,
      ][index],
      answer: word,
    })),
  }
}

function makeExtraUnit(config: ExtraUnitConfig): ModelUnitContent {
  const allWords = [...config.vocab1, ...config.vocab2]
  const first = config.vocab1[0]
  const second = config.vocab1[1]
  const third = config.vocab2[0]

  return {
    title: config.title,
    theme: config.theme,
    finalTask: config.finalTask,
    vocabulary: {
      title: config.vocabularyTitle,
      objective: `Utiliser un vocabulaire précis pour parler ${deTheme(config.theme)}.`,
      instruction: "Lis chaque phrase, puis clique sur le mot qui convient pour la compléter.",
      sessions: [
        vocabularySession("Séance 1 : mots essentiels", config.vocab1, config.theme),
        vocabularySession("Séance 2 : mots pour expliquer", config.vocab2, config.theme),
      ],
      finalMessage: `Bravo ! Tu maîtrises mieux le vocabulaire lié à ${config.theme}.`,
    },
    speechActs: {
      title: config.speechTitle,
      objective: config.speechObjective,
      instruction: "Lis le dialogue, puis complète les paroles avec l'expression qui convient.",
      situation: config.speechSituation,
      expressions: config.expressions,
      options: config.expressions,
      dialogue: [
        { speaker: "Élève 1", text: config.dialogueStart },
        {
          speaker: "Élève 2",
          text: "______ présenter ton idée clairement.",
          answer: config.expressions[0],
        },
        { speaker: "Élève 1", text: "Et comment donner un exemple ?" },
        {
          speaker: "Élève 2",
          text: "______ utiliser une situation proche de la vie des élèves.",
          answer: config.expressions[1],
        },
        { speaker: "Élève 1", text: "Comment terminer ?" },
        {
          speaker: "Élève 2",
          text: "______ par une phrase qui donne envie d'agir.",
          answer: config.expressions[2],
        },
      ],
      correction: `${config.expressions[0]} présenter ton idée clairement. ${config.expressions[1]} utiliser une situation proche de la vie des élèves. ${config.expressions[2]} par une phrase qui donne envie d'agir.`,
      finalMessage: "Bravo ! Tu sais utiliser des expressions adaptées à la situation.",
    },
    listening: {
      title: config.listeningTitle,
      audio: config.audio,
      objective: `Comprendre un document oral sur ${config.theme}.`,
      instruction:
        "Écoute attentivement le message audio, puis réponds aux questions en cliquant sur les bonnes réponses.",
      script: config.script,
      supportImagePrompt: config.imagePrompt,
      situation: config.listeningSituation,
      heardWords: config.heardWords,
      intruders: config.intruders,
      questions: config.listeningQuestions,
      finalMessage: `Bravo ! Tu as compris les informations importantes sur ${config.theme}.`,
    },
    reading: {
      title: config.readingTitle,
      objective: `Comprendre un texte en lien avec ${config.theme}.`,
      instruction:
        "Lis le texte, observe le titre, la source et l'image, puis réponds aux questions.",
      image: config.image,
      imageAlt: config.imageAlt,
      source: config.source,
      text: config.readingText,
      communication: [
        q("Qui présente ce texte ?", config.source, ["un vendeur", "un sportif", "un touriste"]),
        q("À qui le texte s'adresse-t-il ?", "aux élèves", [
          "aux clients",
          "aux conducteurs",
          "aux touristes seulement",
        ]),
        q("De quoi parle le texte ?", config.subject, [
          "d'un achat rapide",
          "d'un match",
          "d'une recette",
        ]),
        q("Dans quel but ce texte est-il écrit ?", config.purpose, [
          "vendre un produit",
          "raconter une blague",
          "annoncer une réduction",
        ]),
      ],
      paratext: [
        q("Que suggère le titre ?", config.titleMeaning, [
          "un sujet sans importance",
          "une simple publicité",
          "une liste de prix",
        ]),
        q("Que montre l'image ?", config.imageMeaning, [
          "un objet sans lien",
          "un paysage vide",
          "un ticket de caisse",
        ]),
        q("La source annonce un texte plutôt...", config.textType, [
          "commercial",
          "fantastique",
          "médical",
        ]),
        q("Quel thème annonce le paratexte ?", config.themeLabel ?? config.theme, [
          "le sport seulement",
          "les achats",
          "la cuisine",
        ]),
      ],
      direct: config.directQuestions,
      inferenceQuestion: config.inferenceQuestion,
      freeQuestion: config.inferenceQuestion,
      correction: config.readingCorrection,
      finalMessage: `Bravo ! Tu as compris le texte sur ${config.theme}.`,
    },
    language: {
      title: config.languageTitle,
      objective: config.languageObjective,
      instruction: "Lis le rappel, observe les exemples, puis clique sur la bonne réponse.",
      reminder: config.languageReminder,
      examples: config.languageExamples,
      questions: config.languageQuestions,
      finalMessage: "Bravo ! Tu sais appliquer le point de langue dans des phrases liées au thème.",
    },
    oralProduction: {
      title: "Situation de production orale",
      objective: config.oralObjective,
      instruction:
        "Lis la situation, prépare tes idées, puis présente ton intervention orale en respectant le plan proposé.",
      situation: config.oralSituation,
      keywords: config.oralKeywords,
      expressions: [
        "Bonjour à tous",
        "Aujourd'hui, je vais parler de...",
        "Il est important de...",
        "Par exemple",
        "Je vous conseille de",
        "Pour conclure",
        "Merci de votre écoute",
      ],
      plan: [
        "Introduction : présente clairement le thème.",
        "Développement : explique deux idées et donne un exemple.",
        "Conclusion : termine par un conseil ou une ouverture.",
      ],
      length: config.oralLength,
      correction: config.oralCorrection,
      finalMessage: "Bravo ! Tu as préparé une production orale claire et organisée.",
    },
    writing: {
      title: "Production écrite",
      objective: config.writingObjective,
      instruction:
        "Lis le sujet, repère les mots-clés, puis rédige un texte organisé en respectant le plan.",
      subject: config.writingSituation,
      situation: config.writingSituation,
      keywords: config.writingKeywords,
      plan: [
        "Introduction : présente le sujet.",
        "Développement : développe deux ou trois idées avec exemples.",
        "Conclusion : termine par une phrase claire.",
      ],
      words: allWords,
      length: config.writingLength,
      correction: config.writingCorrection,
      finalMessage: "Bravo ! Tu as rédigé un texte clair, organisé et adapté au thème.",
    },
    fluency: {
      title: "Lecture fluence",
      objective: "Lire un texte à haute voix avec rythme, pauses et intonation.",
      instruction:
        "Lis le texte à haute voix. Respecte les pauses, articule bien les mots et lis avec une intonation naturelle.",
      explanation:
        "Un groupe de mots rassemble les mots qui vont ensemble. La pause / aide à respirer, la liaison ‿ relie certains mots, et l'intonation donne du sens.",
      text: [
        `${config.fluencyLine1} / ${config.fluencyLine2}.`,
        `Je repère les mots importants / comme ${first} et ${second}.`,
        `Je lis calmement / pour mieux faire comprendre mon idée.`,
        `À la fin / le mot ${third} donne plus de force au message.`,
      ],
      liaisons: [`les‿élèves`, `un‿exemple`, `des‿idées`, `mon‿avis`],
      checklist: [
        "J'ai respecté les pauses.",
        "J'ai bien articulé.",
        "J'ai gardé un bon rythme.",
        "J'ai mis une intonation naturelle.",
      ],
      finalMessage: "Bravo ! Ta lecture devient plus fluide et plus expressive.",
    },
  }
}

const configs: ExtraUnitConfig[] = [
  {
    key: "2ac-s1-1",
    title: "Villes mythiques",
    theme: "les villes mythiques et leur patrimoine",
    themeLabel: "le patrimoine urbain",
    finalTask: "Présenter une ville mythique dans une chronique culturelle.",
    vocabularyTitle: "Ville, mémoire et patrimoine",
    vocab1: ["cité", "patrimoine", "remparts", "ruelle", "monument", "médina"],
    vocab2: ["légende", "mémoire", "visiteur", "quartier", "architecture", "tradition"],
    speechTitle: "Présenter un lieu historique",
    speechObjective: "Décrire une ville et expliquer son importance culturelle.",
    speechSituation:
      "Tu prépares une chronique culturelle sur une ville ancienne et tu dois aider ton camarade à organiser sa présentation.",
    dialogueStart: "Je veux présenter une ville mythique, mais je ne sais pas par où commencer.",
    expressions: ["Tu peux d'abord", "Je te conseille de", "Termine"],
    listeningTitle: "Dans les ruelles de la mémoire",
    audio: "/audio/2ac_s1_1_oral.mp3",
    script:
      "Bonjour les élèves.\n\nAujourd'hui, nous partons à la découverte d'une ville mythique. Ses remparts, ses ruelles et ses monuments racontent une histoire longue et vivante.\n\nDans la médina, les visiteurs avancent lentement. Ils observent les portes anciennes, écoutent les artisans et découvrent des traces du passé.\n\nCette ville n'est pas seulement belle. Elle garde la mémoire des habitants et transmet une tradition.\n\nLa visiter, c'est comprendre que le patrimoine appartient à tous et qu'il faut le protéger.",
    imagePrompt:
      "Photo ultraréaliste d'élèves visitant une médina historique, ruelles et remparts, patrimoine marocain.",
    listeningSituation: {
      speaker: "un guide culturel",
      receiver: "aux élèves",
      subject: "d'une ville mythique",
      purpose: "faire découvrir son patrimoine",
    },
    heardWords: ["remparts", "ruelles", "monuments", "médina", "visiteurs", "patrimoine"],
    intruders: ["laboratoire", "robot"],
    listeningQuestions: [
      q("Que racontent les remparts et les monuments ?", "une histoire longue et vivante", [
        "un prix",
        "une recette",
        "un match",
      ]),
      q(
        "Que font les visiteurs dans la médina ?",
        "ils observent les portes et écoutent les artisans",
        ["ils achètent des robots", "ils dorment", "ils ferment la ville"]
      ),
      q("Que garde la ville ?", "la mémoire des habitants", [
        "une facture",
        "un téléphone",
        "un ballon",
      ]),
      q("Que faut-il faire avec le patrimoine ?", "le protéger", [
        "le cacher",
        "l'oublier",
        "le vendre vite",
      ]),
    ],
    readingTitle: "La cité qui garde ses secrets",
    image: "/images/lecture-ville-mythique-realiste.webp",
    imageAlt: "Médina ancienne et élèves en visite culturelle.",
    source: "Carnet culturel du collège",
    subject: "d'une ville mythique",
    purpose: "faire découvrir la valeur du patrimoine",
    titleMeaning: "la ville possède une histoire mystérieuse",
    imageMeaning: "un lieu historique à visiter",
    textType: "culturel",
    readingText:
      "La cité ancienne s'étend derrière ses remparts comme un livre ouvert. Chaque ruelle mène vers une porte sculptée, une fontaine discrète ou une place animée.\n\nLes habitants y vivent au rythme des traditions, tandis que les visiteurs découvrent un patrimoine qui ne se limite pas aux pierres. Dans les gestes des artisans et les récits des anciens, la ville continue de parler.\n\nCette cité est mythique parce qu'elle garde ses secrets tout en les partageant avec ceux qui savent regarder.",
    directQuestions: [
      q("Où s'étend la cité ancienne ?", "derrière ses remparts", [
        "dans une usine",
        "sur un terrain de sport",
        "dans un magasin",
      ]),
      q("Que découvre-t-on dans les ruelles ?", "des portes, des fontaines et des places", [
        "des robots",
        "des factures",
        "des affiches de vente",
      ]),
      q("Qui transmet aussi le patrimoine ?", "les artisans et les anciens", [
        "les machines seulement",
        "les clients",
        "les touristes pressés",
      ]),
      q("Pourquoi la cité est-elle mythique ?", "elle garde ses secrets et les partage", [
        "elle refuse les visiteurs",
        "elle est vide",
        "elle change de place",
      ]),
    ],
    inferenceQuestion: "Pourquoi l'auteur compare-t-il la ville à un livre ouvert ?",
    readingCorrection:
      "L'auteur compare la ville à un livre ouvert parce que chaque rue et chaque monument racontent une partie de son histoire.\n\nIl invite le lecteur à observer la ville comme on lit un récit vivant.",
    languageTitle: "Les expansions du nom",
    languageObjective: "Enrichir un nom avec un adjectif ou un complément.",
    languageReminder: "Une expansion du nom ajoute une précision au nom.",
    languageExamples: ["une ville ancienne", "les remparts de la cité", "une ruelle étroite"],
    languageQuestions: [
      q("Dans « une ville ancienne », l'expansion est...", "ancienne", ["ville", "une", "dans"]),
      q("Choisis le groupe enrichi.", "les remparts de la cité", ["les remparts", "la cité", "de"]),
      q("Une ruelle ______ donne plus de précision.", "étroite", ["visiter", "mémoire", "hier"]),
      q("L'expansion du nom sert à...", "préciser un nom", [
        "poser une question",
        "compter",
        "ordonner",
      ]),
    ],
    oralObjective: "Présenter une ville mythique avec des détails culturels.",
    oralSituation:
      "La classe prépare une chronique audio sur les villes mythiques. Présente une ville, décris un lieu et explique pourquoi il faut protéger son patrimoine.",
    oralKeywords: [
      "chronique audio",
      "ville mythique",
      "décrire un lieu",
      "protéger le patrimoine",
    ],
    oralLength: "8 à 10 phrases.",
    oralCorrection:
      "Bonjour à tous.\n\nAujourd'hui, je vais vous présenter une ville mythique connue pour sa médina et ses remparts.\n\nDans ses ruelles, on découvre des portes anciennes, des monuments et des ateliers d'artisans. Ce patrimoine raconte la mémoire des habitants et montre la richesse de leur tradition.\n\nIl est important de protéger ces lieux, car ils appartiennent à notre histoire commune.\n\nPour conclure, visiter une ville mythique, c'est apprendre à respecter le passé tout en regardant le présent.\n\nMerci de votre écoute.",
    writingObjective: "Rédiger une chronique culturelle sur une ville mythique.",
    writingSituation:
      "Rédige une chronique pour le magazine du collège : présente une ville mythique, décris son patrimoine et explique pourquoi elle mérite d'être protégée.",
    writingKeywords: ["chronique", "ville mythique", "patrimoine", "mérite d'être protégée"],
    writingLength: "10 à 12 phrases.",
    writingCorrection:
      "Une ville mythique n'est pas seulement un lieu ancien. C'est un espace où l'histoire continue de vivre.\n\nDans sa médina, les ruelles étroites, les remparts et les monuments racontent le passage des générations. Les artisans, les habitants et les visiteurs donnent encore de la vie à ce patrimoine.\n\nCette ville mérite d'être protégée parce qu'elle garde une partie de notre mémoire collective.\n\nLa découvrir, c'est apprendre à respecter les traces du passé.",
    fluencyLine1: "La ville ancienne garde sa mémoire",
    fluencyLine2: "dans ses ruelles et ses remparts",
  },
]

function buildUnitConfig(
  base: ExtraUnitBaseConfig,
  overrides: Pick<ExtraUnitConfig, "key" | "title" | "audio"> & Partial<ExtraUnitConfig>
): ExtraUnitConfig {
  return { ...base, ...overrides }
}

const parcoursBase = {
  theme: "le parcours personnel et l'avenir",
  themeLabel: "l'orientation et l'avenir",
  finalTask: "Présenter son parcours et son projet d'avenir.",
  vocabularyTitle: "Parcours et avenir",
  vocab1: ["parcours", "objectif", "projet", "choix", "effort", "réussite"],
  vocab2: ["orientation", "avenir", "compétence", "stage", "motivation", "expérience"],
  speechTitle: "Parler de son projet",
  speechObjective: "Exprimer un projet personnel et demander un conseil.",
  speechSituation:
    "Tu échanges avec un camarade sur ton avenir et tu présentes ton projet avec prudence.",
  dialogueStart: "J'ai une idée pour mon avenir, mais je ne sais pas comment l'expliquer.",
  expressions: ["Tu peux d'abord", "Je te conseille de", "Termine"],
  listeningTitle: "Un projet qui se construit",
  script:
    "Bonjour les élèves.\n\nUn projet d'avenir ne se construit pas en un seul jour. Il commence souvent par une envie, une matière que l'on aime ou une expérience qui nous marque.\n\nPour avancer, il faut connaître ses compétences, écouter les conseils et accepter de faire des efforts. L'orientation n'est pas une route fermée : elle se prépare étape par étape.\n\nChaque élève peut réfléchir à ses qualités et choisir un parcours qui lui ressemble.",
  imagePrompt:
    "Photo ultraréaliste de collégiens discutant de leur orientation avec une conseillère, ambiance scolaire moderne.",
  listeningSituation: {
    speaker: "une conseillère d'orientation",
    receiver: "aux élèves",
    subject: "du projet d'avenir",
    purpose: "aider les élèves à réfléchir à leur parcours",
  },
  heardWords: ["projet", "avenir", "compétences", "conseils", "efforts", "parcours"],
  intruders: ["remparts", "bouteille"],
  listeningQuestions: [
    q("Quand se construit un projet d'avenir ?", "étape par étape", [
      "en un seul jour",
      "sans effort",
      "pendant les vacances seulement",
    ]),
    q("Par quoi commence souvent un projet ?", "une envie ou une expérience", [
      "une facture",
      "un rempart",
      "une affiche",
    ]),
    q("Que faut-il accepter pour avancer ?", "faire des efforts", [
      "tout refuser",
      "ne jamais demander conseil",
      "changer chaque jour",
    ]),
    q(
      "Pourquoi faut-il réfléchir à ses qualités ?",
      "pour choisir un parcours qui nous ressemble",
      ["pour copier les autres", "pour oublier l'école", "pour éviter tout choix"]
    ),
  ],
  readingTitle: "Tracer son chemin",
  image: "/images/lecture-parcours-avenir-realiste.webp",
  imageAlt: "Élèves réfléchissant à leur avenir avec une conseillère.",
  source: "Dossier orientation du collège",
  subject: "du parcours personnel",
  purpose: "encourager les élèves à construire leur avenir",
  titleMeaning: "chacun peut préparer son avenir progressivement",
  imageMeaning: "des élèves en réflexion sur leur orientation",
  textType: "informatif et motivant",
  readingText:
    "Préparer son avenir peut sembler difficile quand on est encore au collège. Pourtant, chaque élève possède déjà des goûts, des qualités et des expériences qui peuvent l'aider à choisir.\n\nUn parcours ne se résume pas à une seule décision. Il se construit avec des efforts, des conseils et des essais. Parfois, une activité, une rencontre ou un stage permet de découvrir une voie nouvelle.\n\nTracer son chemin, c'est apprendre à mieux se connaître pour avancer avec confiance.",
  directQuestions: [
    q("Pourquoi l'avenir peut-il sembler difficile ?", "parce qu'on est encore au collège", [
      "parce qu'il n'existe pas",
      "parce qu'il faut acheter",
      "parce qu'il pleut",
    ]),
    q("Avec quoi un parcours se construit-il ?", "des efforts, des conseils et des essais", [
      "des remparts",
      "des déchets",
      "des réductions",
    ]),
    q(
      "Qu'est-ce qui peut faire découvrir une voie nouvelle ?",
      "une activité, une rencontre ou un stage",
      ["une facture", "un oubli", "un conflit"]
    ),
    q("Que signifie tracer son chemin ?", "mieux se connaître pour avancer", [
      "se perdre",
      "copier les autres",
      "tout refuser",
    ]),
  ],
  inferenceQuestion: "Pourquoi le texte insiste-t-il sur la connaissance de soi ?",
  readingCorrection:
    "Le texte insiste sur la connaissance de soi parce qu'un bon choix d'avenir doit tenir compte des goûts, des qualités et des efforts de l'élève.\n\nMieux se connaître aide à choisir un parcours plus réaliste et plus motivant.",
  languageTitle: "Le futur simple",
  languageObjective: "Utiliser le futur simple pour parler d'un projet.",
  languageReminder: "Le futur simple sert à exprimer une action à venir.",
  languageExamples: [
    "Je choisirai une voie qui me plaît.",
    "Nous visiterons un centre de formation.",
    "Elle préparera son projet.",
  ],
  languageQuestions: [
    q("Demain, je ______ mon projet.", "présenterai", ["présente", "présentais", "présenter"]),
    q("Nous ______ nos compétences.", "développerons", ["développons", "développé", "développer"]),
    q("Le futur simple sert à parler...", "de l'avenir", [
      "du passé",
      "d'un ordre",
      "d'une comparaison",
    ]),
    q("Choisis la phrase correcte.", "Je réfléchirai à mon orientation.", [
      "Je réfléchira à mon orientation.",
      "Je réfléchir à mon orientation.",
      "Je réfléchissais demain.",
    ]),
  ],
  oralObjective: "Présenter oralement son projet d'avenir.",
  oralSituation:
    "La classe prépare une rencontre sur l'orientation. Présente ton projet, tes qualités et les efforts que tu devras faire.",
  oralKeywords: ["orientation", "projet d'avenir", "qualités", "efforts"],
  oralLength: "8 à 10 phrases.",
  oralCorrection:
    "Bonjour à tous.\n\nAujourd'hui, je vais parler de mon projet d'avenir.\n\nJ'aimerais choisir un parcours qui me permette d'apprendre, de progresser et d'aider les autres. Pour réussir, je devrai développer mes compétences, écouter les conseils et travailler avec régularité.\n\nJe sais que ce projet peut évoluer, mais je veux avancer étape par étape.\n\nPour conclure, construire son avenir demande de la confiance et des efforts.\n\nMerci de votre écoute.",
  writingObjective: "Rédiger un texte sur son parcours et son avenir.",
  writingSituation:
    "Rédige un texte pour présenter ton projet d'avenir, tes qualités et les étapes qui peuvent t'aider à le construire.",
  writingKeywords: ["projet d'avenir", "qualités", "étapes", "construire"],
  writingLength: "10 à 12 phrases.",
  writingCorrection:
    "Mon projet d'avenir se construit peu à peu.\n\nJ'aimerais choisir une voie qui correspond à mes qualités et à mes centres d'intérêt. Pour y arriver, je dois travailler régulièrement, poser des questions et profiter des expériences proposées au collège.\n\nJe sais que l'orientation peut changer avec le temps. C'est pourquoi je veux rester curieux et attentif aux conseils.\n\nConstruire son avenir, c'est avancer avec sérieux, mais aussi avec confiance.",
  fluencyLine1: "Mon avenir se prépare peu à peu",
  fluencyLine2: "avec des efforts et des conseils",
}

const configsMore: ExtraUnitConfig[] = [
  buildUnitConfig(parcoursBase, {
    key: "2ac-s2-1",
    title: "Mon parcours, mon avenir",
    audio: "/audio/2ac_s2_1_oral.mp3",
  }),
  buildUnitConfig(parcoursBase, {
    key: "3ac-s1-1",
    title: "Mon parcours, mon avenir",
    audio: "/audio/3ac_s1_1_oral.mp3",
    oralLength: "10 à 12 phrases.",
    writingLength: "12 à 14 phrases.",
  }),
]

const compactConfigs: CompactConfigItem[] = [
  [
    "1ac-s2-7",
    "Figures du monde",
    "les figures inspirantes du monde",
    "lecture-figures-monde-realiste.webp",
    "Présenter une personne qui inspire par son parcours.",
    ["portrait", "personnalité", "parcours", "courage", "réussite", "exemple"],
    ["inspirer", "agir", "valeur", "effort", "solidarité", "mémoire"],
  ],
  [
    "1ac-s2-8",
    "Défis climatiques",
    "les défis climatiques",
    "lecture-defis-climatiques-realiste.webp",
    "Proposer des gestes simples face aux défis climatiques.",
    ["climat", "chaleur", "sécheresse", "pollution", "eau", "nature"],
    ["protéger", "réduire", "économiser", "planter", "recycler", "agir"],
  ],
  [
    "1ac-s2-9",
    "Créations écolo",
    "les créations écologiques",
    "lecture-creations-ecolo-realiste.webp",
    "Présenter une création écologique utile.",
    ["création", "matière", "recyclage", "objet", "déchet", "idée"],
    ["réutiliser", "transformer", "fabriquer", "imaginer", "réduire", "créer"],
  ],
  [
    "1ac-s2-10",
    "Actes responsables",
    "les actes responsables au quotidien",
    "lecture-actes-responsables-realiste.webp",
    "Créer une charte des actes responsables.",
    ["responsabilité", "règle", "respect", "sécurité", "citoyen", "engagement"],
    ["protéger", "respecter", "signaler", "choisir", "coopérer", "s'engager"],
  ],
  [
    "2ac-s2-7",
    "Habitats et traditions",
    "les habitats et traditions",
    "lecture-habitats-traditions-realiste.webp",
    "Présenter un habitat traditionnel et expliquer ce qu'il révèle d'une culture.",
    ["habitat", "tradition", "maison", "village", "architecture", "culture"],
    ["construire", "habiter", "préserver", "transmettre", "patrimoine", "famille"],
  ],
  [
    "2ac-s2-8",
    "L'homme et l'innovation",
    "les relations entre l'homme et l'innovation",
    "lecture-homme-innovation-realiste.webp",
    "Présenter une innovation et discuter de son utilité.",
    ["innovation", "invention", "technologie", "outil", "progrès", "usage"],
    ["imaginer", "améliorer", "utiliser", "transformer", "inventer", "responsabilité"],
  ],
  [
    "2ac-s2-9",
    "Toujours plus loin",
    "les défis, voyages et découvertes",
    "lecture-toujours-plus-loin-realiste.webp",
    "Raconter un défi ou une découverte qui permet d'aller plus loin.",
    ["défi", "voyage", "découverte", "objectif", "effort", "aventure"],
    ["oser", "explorer", "progresser", "réussir", "dépasser", "apprendre"],
  ],
  [
    "2ac-s2-10",
    "Loisirs numériques",
    "les loisirs numériques",
    "lecture-loisirs-numeriques-realiste.webp",
    "Présenter un usage responsable des loisirs numériques.",
    ["écran", "jeu", "réseau", "vidéo", "loisir", "temps"],
    ["jouer", "partager", "protéger", "limiter", "choisir", "équilibrer"],
  ],
  [
    "3ac-s2-7",
    "Récits de vie",
    "les récits de vie",
    "lecture-recits-vie-realiste.webp",
    "Raconter un moment important de la vie d'une personne.",
    ["récit", "souvenir", "parcours", "témoignage", "enfance", "expérience"],
    ["raconter", "témoigner", "se souvenir", "évoluer", "apprendre", "transmettre"],
  ],
  [
    "3ac-s2-8",
    "Vivre pour tous",
    "la solidarité et le vivre-ensemble",
    "lecture-vivre-pour-tous-realiste.webp",
    "Proposer des actions pour mieux vivre ensemble.",
    ["solidarité", "égalité", "respect", "entraide", "citoyen", "communauté"],
    ["aider", "partager", "respecter", "inclure", "coopérer", "agir"],
  ],
  [
    "3ac-s2-9",
    "Récits et conseils d'ingénieuses",
    "les femmes ingénieuses et leurs inventions",
    "lecture-ingenieuses-realiste.webp",
    "Présenter une femme ingénieuse et expliquer l'utilité de son invention.",
    ["ingénieure", "invention", "science", "créativité", "recherche", "parcours"],
    ["concevoir", "inventer", "résoudre", "chercher", "innover", "inspirer"],
  ],
  [
    "3ac-s2-10",
    "Les langues pour fendre sur le monde",
    "les langues et l'ouverture au monde",
    "lecture-langues-ouverture-monde-realiste.webp",
    "Expliquer comment les langues permettent de s'ouvrir au monde.",
    ["langue", "culture", "échange", "communication", "voyage", "monde"],
    ["apprendre", "communiquer", "découvrir", "échanger", "comprendre", "s'ouvrir"],
  ],

  [
    "2ac-s1-2",
    "Figures du monde",
    "les figures inspirantes",
    "lecture-figure-inspirante-realiste.webp",
    "Présenter une personnalité inspirante.",
    ["portrait", "parcours", "courage", "engagement", "réussite", "exemple"],
    ["inspirer", "agir", "valeur", "effort", "solidarité", "mémoire"],
  ],
  [
    "2ac-s1-3",
    "Les autres et moi",
    "le vivre-ensemble et le respect",
    "lecture-vivre-ensemble-realiste.webp",
    "Préparer un message pour mieux vivre ensemble.",
    ["respect", "écoute", "dialogue", "différence", "entraide", "confiance"],
    ["conflit", "excuse", "groupe", "coopérer", "accepter", "partager"],
  ],
  [
    "2ac-s1-4",
    "Ados responsables",
    "la responsabilité des adolescents",
    "lecture-ados-responsables-realiste.webp",
    "Créer une charte d'ados responsables.",
    ["règle", "sécurité", "prudence", "autorisation", "devoir", "citoyen"],
    ["protéger", "signaler", "décision", "respecter", "numérique", "confiance"],
  ],
  [
    "2ac-s2-2",
    "Métiers de demain",
    "les métiers de demain",
    "lecture-metiers-demain-realiste.webp",
    "Présenter un métier d'avenir.",
    ["métier", "robot", "énergie", "numérique", "formation", "compétence"],
    ["innovation", "technologie", "créativité", "équipe", "solution", "avenir"],
  ],
  [
    "2ac-s2-3",
    "Curieux de science",
    "la curiosité scientifique",
    "lecture-science-college-realiste.webp",
    "Expliquer une expérience scientifique.",
    ["science", "expérience", "hypothèse", "observation", "résultat", "laboratoire"],
    ["chercher", "comprendre", "prouver", "mesurer", "curiosité", "découverte"],
  ],
  [
    "2ac-s2-4",
    "Graines d'inventeurs",
    "l'invention et la créativité",
    "lecture-inventeurs-realiste.webp",
    "Présenter une invention utile.",
    ["inventeur", "prototype", "idée", "outil", "essai", "erreur"],
    ["améliorer", "imaginer", "fabriquer", "tester", "utile", "solution"],
  ],
  [
    "2ac-s2-5",
    "Contes et légendes",
    "les contes et légendes",
    "lecture-contes-legendes-realiste.webp",
    "Raconter une légende avec expressivité.",
    ["conte", "légende", "héros", "épreuve", "forêt", "mystère"],
    ["récit", "personnage", "morale", "aventure", "imaginaire", "sagesse"],
  ],
  [
    "2ac-s2-6",
    "Fêtes du monde",
    "les fêtes et traditions du monde",
    "lecture-fetes-monde-realiste.webp",
    "Présenter une fête traditionnelle.",
    ["fête", "tradition", "costume", "musique", "repas", "danse"],
    ["célébrer", "partager", "famille", "culture", "invité", "souvenir"],
  ],
  [
    "3ac-s1-2",
    "Métiers de demain",
    "les métiers et compétences du futur",
    "lecture-metiers-demain-realiste.webp",
    "Défendre un choix de métier d'avenir.",
    ["métier", "orientation", "compétence", "innovation", "formation", "responsabilité"],
    ["technologie", "créativité", "adaptation", "équipe", "projet", "avenir"],
  ],
  [
    "3ac-s1-3",
    "Curieux de science",
    "la démarche scientifique",
    "lecture-science-college-realiste.webp",
    "Présenter une démarche scientifique.",
    ["hypothèse", "expérience", "preuve", "observation", "analyse", "résultat"],
    ["chercheur", "laboratoire", "mesurer", "découverte", "question", "méthode"],
  ],
  [
    "3ac-s1-4",
    "Graines d'inventeurs",
    "l'innovation utile",
    "lecture-inventeurs-realiste.webp",
    "Présenter une innovation qui répond à un besoin.",
    ["innovation", "prototype", "besoin", "solution", "matériau", "test"],
    ["améliorer", "imaginer", "concevoir", "réparer", "utilité", "créativité"],
  ],
  [
    "3ac-s2-1",
    "Voyages et découvertes",
    "les voyages et découvertes",
    "lecture-voyages-decouvertes-realiste.webp",
    "Raconter un voyage formateur.",
    ["voyage", "itinéraire", "découverte", "paysage", "rencontre", "culture"],
    ["explorer", "observer", "apprendre", "souvenir", "carnet", "horizon"],
  ],
  [
    "3ac-s2-2",
    "Spectacles à vivre !",
    "les spectacles vivants",
    "lecture-spectacles-realiste.webp",
    "Rédiger un avis sur un spectacle.",
    ["spectacle", "scène", "acteur", "public", "émotion", "lumière"],
    ["applaudir", "jouer", "interpréter", "rythme", "décor", "critique"],
  ],
  [
    "3ac-s2-3",
    "Héros comme nous",
    "les héros du quotidien",
    "lecture-heros-quotidiens-realiste.webp",
    "Présenter un héros ordinaire.",
    ["héros", "courage", "geste", "aider", "discret", "solidarité"],
    ["admiration", "exemple", "choix", "risque", "générosité", "respect"],
  ],
  [
    "3ac-s2-4",
    "Petites histoires, leçons de vie",
    "les récits porteurs de leçons",
    "lecture-lecons-vie-realiste.webp",
    "Raconter une histoire avec une leçon.",
    ["histoire", "leçon", "erreur", "choix", "conséquence", "sagesse"],
    ["comprendre", "apprendre", "réparer", "pardonner", "morale", "récit"],
  ],
  [
    "3ac-s2-5",
    "Consommer autrement",
    "la consommation responsable",
    "lecture-consommer-autrement-realiste.webp",
    "Argumenter pour consommer autrement.",
    ["consommer", "besoin", "envie", "gaspillage", "réparer", "local"],
    ["choisir", "réduire", "réutiliser", "qualité", "budget", "impact"],
  ],
  [
    "3ac-s2-6",
    "Les villes de demain",
    "les villes durables de demain",
    "lecture-villes-demain-realiste.webp",
    "Imaginer une ville durable.",
    ["ville", "transport", "énergie", "jardin", "quartier", "pollution"],
    ["durable", "intelligent", "citoyen", "propre", "partagé", "avenir"],
  ],
]

function makeCompactConfig(item: CompactConfigItem): ExtraUnitConfig {
  const [key, title, theme, imageName, finalTask, vocab1, vocab2] = item
  const audio = `/audio/${key.replaceAll("-", "_")}_oral.mp3`
  const subject = deTheme(theme)
  const purpose = "informer, faire réfléchir et encourager les élèves à agir"
  const readingTitle =
    title === "Métiers de demain"
      ? "Un avenir à inventer"
      : title === "Curieux de science"
        ? "La question qui ouvre la porte"
        : title === "Graines d'inventeurs"
          ? "Une idée devient utile"
          : title === "Contes et légendes"
            ? "La parole des anciens"
            : title === "Fêtes du monde"
              ? "Quand la fête rassemble"
              : title === "Voyages et découvertes"
                ? "Partir pour mieux comprendre"
                : title === "Spectacles à vivre !"
                  ? "La scène allume les émotions"
                  : title === "Héros comme nous"
                    ? "Un geste peut changer une journée"
                    : title === "Petites histoires, leçons de vie"
                      ? "Une erreur qui fait grandir"
                      : title === "Consommer autrement"
                        ? "Acheter moins, choisir mieux"
                        : title === "Les villes de demain"
                          ? "Habiter autrement"
                          : title

  return {
    key,
    title,
    theme,
    themeLabel: theme,
    finalTask,
    vocabularyTitle: title,
    vocab1,
    vocab2,
    speechTitle: "Exprimer et organiser ses idées",
    speechObjective: `Utiliser des expressions adaptées pour parler ${subject}.`,
    speechSituation: `Tu prépares une activité orale sur ${theme}. Tu aides ton camarade à organiser une réponse claire.`,
    dialogueStart: "Je dois préparer ma réponse, mais je ne veux pas rester vague.",
    expressions: ["Tu peux d'abord", "Je te conseille de", "Termine"],
    listeningTitle: title,
    audio,
    script: `Bonjour les élèves.\n\nAujourd'hui, nous allons parler ${subject}. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle.\n\nPour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème : elle montre une situation, un problème et une solution possible.\n\nDans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle.\n\nL'essentiel est de rester clair, expressif et capable de justifier son point de vue.`,
    imagePrompt: `Photo ultraréaliste pédagogique pour collégiens sur ${theme}, ambiance scolaire moderne, naturelle, sans texte lisible.`,
    listeningSituation: {
      speaker: "un animateur scolaire",
      receiver: "aux élèves",
      subject,
      purpose,
    },
    heardWords: [vocab1[0], vocab1[1], vocab1[2], vocab2[0], vocab2[1], vocab2[2]],
    intruders: ["panier", "remparts"],
    listeningQuestions: [
      q("De quel thème parle le document ?", theme, [
        "du paiement en ligne",
        "d'une recette",
        "d'un match",
      ]),
      q("Que faut-il utiliser pour bien répondre ?", "des mots précis", [
        "des mots au hasard",
        "des gestes seulement",
        "des images sans phrase",
      ]),
      q("Que doit montrer une bonne réponse ?", "une situation, un problème et une solution", [
        "un prix",
        "une adresse",
        "une liste sans idée",
      ]),
      q(
        "Quelle attitude est demandée à l'élève ?",
        "rester clair, expressif et capable de justifier",
        ["répondre sans réfléchir", "copier seulement", "se taire"]
      ),
    ],
    readingTitle,
    image: `/images/${imageName}`,
    imageAlt: `Image réaliste sur ${theme}.`,
    source: "Magazine scolaire",
    subject,
    purpose,
    titleMeaning: "le titre annonce une réflexion liée au thème",
    imageMeaning: `une situation liée à ${theme}`,
    textType: "informatif et expressif",
    readingText: `Ce thème occupe une place importante dans la vie des élèves. Il permet de réfléchir à des choix, à des valeurs et à des situations que l'on rencontre dans la société.\n\nDans une classe, on peut l'aborder à partir d'un exemple simple : une discussion, une expérience, une rencontre ou un projet. L'important est de ne pas rester dans des phrases vagues. Il faut observer, expliquer et donner un point de vue.\n\nQuand l'élève comprend le lien entre le thème et sa propre vie, il peut produire une réponse plus personnelle et plus convaincante.\n\nAinsi, ${theme} devient un sujet vivant, utile pour parler, lire et écrire avec précision.`,
    directQuestions: [
      q("Où ce thème peut-il être abordé ?", "dans une classe", [
        "dans un panier",
        "dans une facture",
        "dans un silence",
      ]),
      q("À partir de quoi peut-on l'aborder ?", "un exemple simple", [
        "un mot vide",
        "un prix",
        "un objet sans lien",
      ]),
      q("Que faut-il éviter ?", "les phrases vagues", [
        "les idées claires",
        "les exemples",
        "les paragraphes",
      ]),
      q(
        "Quand la réponse devient-elle plus convaincante ?",
        "quand elle devient personnelle et précise",
        ["quand elle est copiée", "quand elle est vide", "quand elle ignore le thème"]
      ),
    ],
    inferenceQuestion: "Pourquoi le texte insiste-t-il sur les exemples concrets ?",
    readingCorrection:
      "Le texte insiste sur les exemples concrets parce qu'ils aident l'élève à comprendre le thème et à éviter les phrases vagues.\n\nUn exemple rend la réponse plus vivante, plus personnelle et plus convaincante.",
    languageTitle: "Les connecteurs logiques",
    languageObjective: "Utiliser des connecteurs pour organiser une réponse.",
    languageReminder: "Les connecteurs relient les idées et rendent le texte plus clair.",
    languageExamples: [
      "D'abord, je présente le thème.",
      "Ensuite, je donne un exemple.",
      "Enfin, je conclus mon idée.",
    ],
    languageQuestions: [
      q("______ je présente le thème.", "D'abord", ["Parce que", "Très", "Chez"]),
      q("Je donne un exemple. ______ j'explique mon avis.", "Ensuite", [
        "Hier",
        "Donc que",
        "Sans",
      ]),
      q("Pour terminer, j'utilise...", "Enfin", ["D'abord", "Pendant", "Chez"]),
      q("Les connecteurs servent à...", "organiser les idées", [
        "cacher le sens",
        "supprimer le texte",
        "changer le thème",
      ]),
    ],
    oralObjective: `Présenter oralement une réflexion sur ${theme}.`,
    oralSituation: `La classe prépare une prise de parole sur ${theme}. Présente le thème, donne un exemple et explique ton avis.`,
    oralKeywords: ["prise de parole", theme, "exemple", "avis"],
    oralLength: key.startsWith("3ac") ? "10 à 12 phrases." : "8 à 10 phrases.",
    oralCorrection: `Bonjour à tous.\n\nAujourd'hui, je vais parler ${subject}.\n\nCe thème est important parce qu'il nous aide à mieux comprendre notre vie et notre société. Par exemple, au collège, nous pouvons l'observer dans des discussions, des projets ou des choix quotidiens.\n\nJe pense qu'il faut utiliser des mots précis et donner des exemples pour bien expliquer son avis.\n\nPour conclure, ce sujet nous apprend à réfléchir avec sérieux et à nous exprimer clairement.\n\nMerci de votre écoute.`,
    writingObjective: `Rédiger un texte organisé sur ${theme}.`,
    writingSituation: `Rédige un texte pour le journal du collège sur ${theme}. Présente le thème, développe deux idées et donne un exemple personnel ou scolaire.`,
    writingKeywords: ["journal du collège", theme, "deux idées", "exemple"],
    writingLength: key.startsWith("3ac") ? "12 à 14 phrases." : "10 à 12 phrases.",
    writingCorrection: `${title} est un thème qui mérite réflexion.\n\nD'abord, il permet de mieux comprendre certaines situations de la vie scolaire et sociale. Pour en parler clairement, il faut utiliser un vocabulaire précis et éviter les phrases trop générales.\n\nEnsuite, un exemple concret aide le lecteur à suivre l'idée. Dans une classe, ce thème peut apparaître dans un projet, une discussion ou une expérience vécue.\n\nÀ mon avis, réfléchir à ce sujet aide les élèves à mieux parler, mieux écrire et mieux justifier leurs choix.\n\nAinsi, le thème devient vivant et utile.`,
    fluencyLine1: `${title} est un thème important`,
    fluencyLine2: "qui demande une lecture claire et expressive",
  }
}

export const extraModelUnits: Record<string, ModelUnitContent> = Object.fromEntries(
  [...configs, ...configsMore, ...compactConfigs.map(makeCompactConfig)].map((config) => [
    config.key,
    makeExtraUnit(config),
  ])
)
