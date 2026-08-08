export type AudioManifestStatus = "generated" | "missing" | "needs-review"

export type AudioManifestEntry = {
  id: string
  activityId: string
  level: string
  semester: string
  unit: string
  session?: string
  type: "lecture" | "ecoute" | "oral" | "dialogue"
  originalText: string
  cleanedText: string
  oldAudioPath: string
  newAudioPath: string
  status: AudioManifestStatus
  generatedAt: string | null
}

export const audioManifest: AudioManifestEntry[] = [
  {
    id: "1ac-s1-u1-oral",
    activityId: "1ac-s1-1-listening",
    level: "1AC",
    semester: "S1",
    unit: "1",
    session: "Tu fais du sport ?",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, je voudrais vous parler d'une habitude simple qui peut changer notre journée\u00A0: bouger un peu plus.\n\nLe sport aide le corps à rester en bonne santé. Il donne de l'énergie, renforce les muscles et permet de se sentir plus calme.\n\nIl n'est pas nécessaire de faire un grand effort. On peut marcher dans le quartier, courir doucement, faire du vélo ou pratiquer la natation.\n\nAvant de commencer, pensez toujours à vous échauffer. Après l'activité, buvez de l'eau et laissez votre corps se reposer.\n\nAlors, même si vous avez peu de temps, essayez de bouger vingt minutes par jour. Petit à petit, cette habitude peut vous faire beaucoup de bien.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, je voudrais vous parler d'une habitude simple qui peut changer notre journée: bouger un peu plus. Le sport aide le corps à rester en bonne santé. Il donne de l'énergie, renforce les muscles et permet de se sentir plus calme. Il n'est pas nécessaire de faire un grand effort. On peut marcher dans le quartier, courir doucement, faire du vélo ou pratiquer la natation. Avant de commencer, pensez toujours à vous échauffer. Après l'activité, buvez de l'eau et laissez votre corps se reposer. Alors, même si vous avez peu de temps, essayez de bouger vingt minutes par jour. Petit à petit, cette habitude peut vous faire beaucoup de bien.",
    oldAudioPath: "/audio/1ac_u1_oral.mp3",
    newAudioPath: "/audio/generated/s1-1ac-u1-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "1ac-s1-u2-oral",
    activityId: "1ac-s1-2-listening",
    level: "1AC",
    semester: "S1",
    unit: "2",
    session: "Une bonne routine",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, je vais vous raconter une routine simple qui m'aide à rester en bonne santé.\n\nLe matin, je commence par me laver le visage et les mains. Ensuite, je prends un petit-déjeuner équilibré avant d'aller au collège.\n\nPendant la journée, je bois de l'eau et j'essaie de bouger un peu, même quand j'ai beaucoup de travail.\n\nLe soir, je prépare mes affaires, puis je me couche tôt pour récupérer.\n\nCes gestes ne sont pas compliqués. Pourtant, ils me donnent plus d'énergie et m'aident à me sentir mieux.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, je vais vous raconter une routine simple qui m'aide à rester en bonne santé. Le matin, je commence par me laver le visage et les mains. Ensuite, je prends un petit-déjeuner équilibré avant d'aller au collège. Pendant la journée, je bois de l'eau et j'essaie de bouger un peu, même quand j'ai beaucoup de travail. Le soir, je prépare mes affaires, puis je me couche tôt pour récupérer. Ces gestes ne sont pas compliqués. Pourtant, ils me donnent plus d'énergie et m'aident à me sentir mieux.",
    oldAudioPath: "/audio/1ac_u2_oral.mp3",
    newAudioPath: "/audio/generated/s1-1ac-u2-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "1ac-s1-u3-oral",
    activityId: "1ac-s1-3-listening",
    level: "1AC",
    semester: "S1",
    unit: "3",
    session: "Un achat réfléchi",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, nous parlons des achats en ligne. Acheter sur Internet peut être pratique, mais il faut rester attentif.\n\nAvant de choisir un produit, regardez bien sa description, son prix et les avis des clients. Ne vous laissez pas attirer seulement par une grande réduction.\n\nAu moment du paiement, vérifiez que le site est sécurisé et demandez l'aide d'un adulte si vous avez un doute.\n\nEnfin, lisez les conditions de livraison et de retour. Un achat réussi est un achat réfléchi, pas un achat fait trop vite.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, nous parlons des achats en ligne. Acheter sur Internet peut être pratique, mais il faut rester attentif. Avant de choisir un produit, regardez bien sa description, son prix et les avis des clients. Ne vous laissez pas attirer seulement par une grande réduction. Au moment du paiement, vérifiez que le site est sécurisé et demandez l'aide d'un adulte si vous avez un doute. Enfin, lisez les conditions de livraison et de retour. Un achat réussi est un achat réfléchi, pas un achat fait trop vite.",
    oldAudioPath: "/audio/1ac_s1_u3_oral.mp3",
    newAudioPath: "/audio/generated/s1-1ac-u3-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "1ac-s1-u4-oral",
    activityId: "1ac-s1-4-listening",
    level: "1AC",
    semester: "S1",
    unit: "4",
    session: "Un budget pour la semaine",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nCette semaine, Karim a reçu un peu d'argent de poche. Il voulait acheter une boisson, des autocollants et un nouveau stylo.\n\nAvant de dépenser, il a écrit ses besoins sur une feuille. Le stylo était nécessaire pour la classe, mais les autocollants étaient seulement une envie.\n\nKarim a comparé les prix et a gardé une partie de son argent dans sa tirelire.\n\nÀ la fin de la semaine, il était content\u00A0: il avait acheté ce qui était utile et il avait encore quelques économies.",
    cleanedText:
      "Bonjour les élèves. Cette semaine, Karim a reçu un peu d'argent de poche. Il voulait acheter une boisson, des autocollants et un nouveau stylo. Avant de dépenser, il a écrit ses besoins sur une feuille. Le stylo était nécessaire pour la classe, mais les autocollants étaient seulement une envie. Karim a comparé les prix et a gardé une partie de son argent dans sa tirelire. À la fin de la semaine, il était content: il avait acheté ce qui était utile et il avait encore quelques économies.",
    oldAudioPath: "/audio/1ac_s1_u4_oral.mp3",
    newAudioPath: "/audio/generated/s1-1ac-u4-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "1ac-s2-u1-oral",
    activityId: "1ac-s2-1-listening",
    level: "1AC",
    semester: "S2",
    unit: "1",
    session: "Une promenade dans la médina",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, je vous emmène dans une ville ancienne où chaque ruelle semble raconter une histoire. En entrant dans la médina, on entend les voix des artisans et les pas des visiteurs.\n\nAu centre, une grande place rassemble les habitants. Plus loin, les remparts rappellent que la ville devait autrefois se protéger.\n\nCette ville n'est pas seulement un lieu à visiter. C'est un patrimoine vivant, fait de monuments, de légendes et de souvenirs.\n\nQuand on la découvre avec attention, on comprend mieux le lien entre le passé et la vie d'aujourd'hui.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, je vous emmène dans une ville ancienne où chaque ruelle semble raconter une histoire. En entrant dans la médina, on entend les voix des artisans et les pas des visiteurs. Au centre, une grande place rassemble les habitants. Plus loin, les remparts rappellent que la ville devait autrefois se protéger. Cette ville n'est pas seulement un lieu à visiter. C'est un patrimoine vivant, fait de monuments, de légendes et de souvenirs. Quand on la découvre avec attention, on comprend mieux le lien entre le passé et la vie d'aujourd'hui.",
    oldAudioPath: "/audio/1ac_s2_u1_oral.mp3",
    newAudioPath: "/audio/generated/s2-1ac-u1-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "1ac-s2-u2-oral",
    activityId: "1ac-s2-2-listening",
    level: "1AC",
    semester: "S2",
    unit: "2",
    session: "Une vie qui inspire",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, je vous présente une femme qui a marqué son époque par son courage et son engagement. Très jeune, elle aimait apprendre et poser des questions.\n\nPlus tard, elle a travaillé avec patience pour réaliser son rêve. Son parcours n'a pas toujours été facile, mais elle a continué malgré les obstacles.\n\nGrâce à son travail, elle a aidé d'autres personnes et a montré que la réussite demande de l'effort.\n\nSon histoire nous rappelle qu'une figure inspirante n'est pas seulement célèbre. Elle donne envie d'agir, de respecter les autres et de croire en ses capacités.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, je vous présente une femme qui a marqué son époque par son courage et son engagement. Très jeune, elle aimait apprendre et poser des questions. Plus tard, elle a travaillé avec patience pour réaliser son rêve. Son parcours n'a pas toujours été facile, mais elle a continué malgré les obstacles. Grâce à son travail, elle a aidé d'autres personnes et a montré que la réussite demande de l'effort. Son histoire nous rappelle qu'une figure inspirante n'est pas seulement célèbre. Elle donne envie d'agir, de respecter les autres et de croire en ses capacités.",
    oldAudioPath: "/audio/1ac_s2_u2_oral.mp3",
    newAudioPath: "/audio/generated/s2-1ac-u2-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "1ac-s2-u3-oral",
    activityId: "1ac-s2-3-listening",
    level: "1AC",
    semester: "S2",
    unit: "3",
    session: "Un groupe qui s'écoute",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nDans un groupe, chacun a son caractère, ses idées et sa façon de travailler. Parfois, une différence peut provoquer un conflit.\n\nPour éviter que le problème grandisse, il faut écouter l'autre avant de répondre. Une parole calme peut ouvrir le dialogue et aider chacun à expliquer ce qu'il ressent.\n\nQuand on présente des excuses, quand on partage les tâches et quand on respecte les idées des autres, la confiance revient peu à peu.\n\nVivre ensemble ne veut pas dire être toujours d'accord. Cela veut dire chercher une solution sans humilier personne.",
    cleanedText:
      "Bonjour les élèves. Dans un groupe, chacun a son caractère, ses idées et sa façon de travailler. Parfois, une différence peut provoquer un conflit. Pour éviter que le problème grandisse, il faut écouter l'autre avant de répondre. Une parole calme peut ouvrir le dialogue et aider chacun à expliquer ce qu'il ressent. Quand on présente des excuses, quand on partage les tâches et quand on respecte les idées des autres, la confiance revient peu à peu. Vivre ensemble ne veut pas dire être toujours d'accord. Cela veut dire chercher une solution sans humilier personne.",
    oldAudioPath: "/audio/1ac_s2_u3_oral.mp3",
    newAudioPath: "/audio/generated/s2-1ac-u3-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "1ac-s2-u4-oral",
    activityId: "1ac-s2-4-listening",
    level: "1AC",
    semester: "S2",
    unit: "4",
    session: "Une décision responsable",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nÊtre adolescent, ce n'est pas seulement grandir. C'est aussi apprendre à prendre de bonnes décisions.\n\nAu collège, une règle peut parfois sembler gênante, mais elle protège la sécurité de tous. Par exemple, on ne publie pas la photo d'un camarade sans son autorisation.\n\nUn adolescent responsable réfléchit avant d'agir. Il respecte les autres, protège ses informations personnelles et signale un danger à un adulte.\n\nLa responsabilité se construit chaque jour, à travers de petits gestes sérieux.",
    cleanedText:
      "Bonjour les élèves. Être adolescent, ce n'est pas seulement grandir. C'est aussi apprendre à prendre de bonnes décisions. Au collège, une règle peut parfois sembler gênante, mais elle protège la sécurité de tous. Par exemple, on ne publie pas la photo d'un camarade sans son autorisation. Un adolescent responsable réfléchit avant d'agir. Il respecte les autres, protège ses informations personnelles et signale un danger à un adulte. La responsabilité se construit chaque jour, à travers de petits gestes sérieux.",
    oldAudioPath: "/audio/1ac_s2_u4_oral.mp3",
    newAudioPath: "/audio/generated/s2-1ac-u4-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "1ac-s2-u5-oral",
    activityId: "1ac-s2-5-listening",
    level: "1AC",
    semester: "S2",
    unit: "5",
    session: "Un défi pour notre collège",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nLe climat change et ses effets se voient déjà autour de nous. La chaleur augmente, certaines régions manquent d'eau et les fortes pluies peuvent provoquer des inondations.\n\nAu collège, nous ne pouvons pas tout résoudre, mais nous pouvons agir. Fermer le robinet, trier les déchets, planter un arbre et économiser l'énergie sont des gestes simples.\n\nCes gestes semblent petits, pourtant ils deviennent importants quand tout le monde participe.\n\nProtéger la planète commence souvent par une décision prise dans notre classe, notre cour ou notre maison.",
    cleanedText:
      "Bonjour les élèves. Le climat change et ses effets se voient déjà autour de nous. La chaleur augmente, certaines régions manquent d'eau et les fortes pluies peuvent provoquer des inondations. Au collège, nous ne pouvons pas tout résoudre, mais nous pouvons agir. Fermer le robinet, trier les déchets, planter un arbre et économiser l'énergie sont des gestes simples. Ces gestes semblent petits, pourtant ils deviennent importants quand tout le monde participe. Protéger la planète commence souvent par une décision prise dans notre classe, notre cour ou notre maison.",
    oldAudioPath: "/audio/1ac_s2_u5_oral.mp3",
    newAudioPath: "/audio/generated/s2-1ac-u5-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "1ac-s2-u6-oral",
    activityId: "1ac-s2-6-listening",
    level: "1AC",
    semester: "S2",
    unit: "6",
    session: "L'atelier des idées vertes",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, notre atelier transforme des objets destinés à la poubelle en créations utiles. Chaque groupe choisit un matériau\u00A0: carton, bouteille, tissu ou vieux papier.\n\nD'abord, les élèves observent ce qu'ils peuvent réutiliser. Ensuite, ils dessinent leur idée sur une feuille. Puis, ils fabriquent l'objet avec prudence.\n\nUn groupe transforme une bouteille en pot à crayons. Un autre utilise du carton pour créer un organiseur de bureau.\n\nÀ la fin, les élèves présentent leur création et expliquent pourquoi elle protège l'environnement.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, notre atelier transforme des objets destinés à la poubelle en créations utiles. Chaque groupe choisit un matériau: carton, bouteille, tissu ou vieux papier. D'abord, les élèves observent ce qu'ils peuvent réutiliser. Ensuite, ils dessinent leur idée sur une feuille. Puis, ils fabriquent l'objet avec prudence. Un groupe transforme une bouteille en pot à crayons. Un autre utilise du carton pour créer un organiseur de bureau. À la fin, les élèves présentent leur création et expliquent pourquoi elle protège l'environnement.",
    oldAudioPath: "/audio/1ac_s2_u6_oral.mp3",
    newAudioPath: "/audio/generated/s2-1ac-u6-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "2ac-s1-u1-oral",
    activityId: "2ac-s1-1-listening",
    level: "2AC",
    semester: "S1",
    unit: "1",
    session: "Dans les ruelles de la mémoire",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, nous partons à la découverte d'une ville mythique. Ses remparts, ses ruelles et ses monuments racontent une histoire longue et vivante.\n\nDans la médina, les visiteurs avancent lentement. Ils observent les portes anciennes, écoutent les artisans et découvrent des traces du passé.\n\nCette ville n'est pas seulement belle. Elle garde la mémoire des habitants et transmet une tradition.\n\nLa visiter, c'est comprendre que le patrimoine appartient à tous et qu'il faut le protéger.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, nous partons à la découverte d'une ville mythique. Ses remparts, ses ruelles et ses monuments racontent une histoire longue et vivante. Dans la médina, les visiteurs avancent lentement. Ils observent les portes anciennes, écoutent les artisans et découvrent des traces du passé. Cette ville n'est pas seulement belle. Elle garde la mémoire des habitants et transmet une tradition. La visiter, c'est comprendre que le patrimoine appartient à tous et qu'il faut le protéger.",
    oldAudioPath: "/audio/2ac_s1_1_oral.mp3",
    newAudioPath: "/audio/generated/s1-2ac-u1-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "2ac-s1-u2-oral",
    activityId: "2ac-s1-2-listening",
    level: "2AC",
    semester: "S1",
    unit: "2",
    session: "Figures du monde",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, nous allons parler des figures inspirantes. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle.\n\nPour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème\u00A0: elle montre une situation, un problème et une solution possible.\n\nDans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle.\n\nL'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, nous allons parler des figures inspirantes. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle. Pour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème: elle montre une situation, un problème et une solution possible. Dans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle. L'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    oldAudioPath: "/audio/2ac_s1_2_oral.mp3",
    newAudioPath: "/audio/generated/s1-2ac-u2-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "2ac-s1-u3-oral",
    activityId: "2ac-s1-3-listening",
    level: "2AC",
    semester: "S1",
    unit: "3",
    session: "Les autres et moi",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, nous allons parler du vivre-ensemble et du respect. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle.\n\nPour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème\u00A0: elle montre une situation, un problème et une solution possible.\n\nDans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle.\n\nL'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, nous allons parler du vivre-ensemble et du respect. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle. Pour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème: elle montre une situation, un problème et une solution possible. Dans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle. L'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    oldAudioPath: "/audio/2ac_s1_3_oral.mp3",
    newAudioPath: "/audio/generated/s1-2ac-u3-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "2ac-s1-u4-oral",
    activityId: "2ac-s1-4-listening",
    level: "2AC",
    semester: "S1",
    unit: "4",
    session: "Ados responsables",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, nous allons parler de la responsabilité des adolescents. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle.\n\nPour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème\u00A0: elle montre une situation, un problème et une solution possible.\n\nDans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle.\n\nL'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, nous allons parler de la responsabilité des adolescents. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle. Pour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème: elle montre une situation, un problème et une solution possible. Dans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle. L'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    oldAudioPath: "/audio/2ac_s1_4_oral.mp3",
    newAudioPath: "/audio/generated/s1-2ac-u4-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "2ac-s2-u1-oral",
    activityId: "2ac-s2-1-listening",
    level: "2AC",
    semester: "S2",
    unit: "1",
    session: "Un projet qui se construit",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nUn projet d'avenir ne se construit pas en un seul jour. Il commence souvent par une envie, une matière que l'on aime ou une expérience qui nous marque.\n\nPour avancer, il faut connaître ses compétences, écouter les conseils et accepter de faire des efforts. L'orientation n'est pas une route fermée\u00A0: elle se prépare étape par étape.\n\nChaque élève peut réfléchir à ses qualités et choisir un parcours qui lui ressemble.",
    cleanedText:
      "Bonjour les élèves. Un projet d'avenir ne se construit pas en un seul jour. Il commence souvent par une envie, une matière que l'on aime ou une expérience qui nous marque. Pour avancer, il faut connaître ses compétences, écouter les conseils et accepter de faire des efforts. L'orientation n'est pas une route fermée: elle se prépare étape par étape. Chaque élève peut réfléchir à ses qualités et choisir un parcours qui lui ressemble.",
    oldAudioPath: "/audio/2ac_s2_1_oral.mp3",
    newAudioPath: "/audio/generated/s2-2ac-u1-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "2ac-s2-u2-oral",
    activityId: "2ac-s2-2-listening",
    level: "2AC",
    semester: "S2",
    unit: "2",
    session: "Métiers de demain",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, nous allons parler des métiers de demain. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle.\n\nPour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème\u00A0: elle montre une situation, un problème et une solution possible.\n\nDans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle.\n\nL'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, nous allons parler des métiers de demain. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle. Pour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème: elle montre une situation, un problème et une solution possible. Dans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle. L'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    oldAudioPath: "/audio/2ac_s2_2_oral.mp3",
    newAudioPath: "/audio/generated/s2-2ac-u2-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "2ac-s2-u3-oral",
    activityId: "2ac-s2-3-listening",
    level: "2AC",
    semester: "S2",
    unit: "3",
    session: "Curieux de science",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, nous allons parler de la curiosité scientifique. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle.\n\nPour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème\u00A0: elle montre une situation, un problème et une solution possible.\n\nDans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle.\n\nL'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, nous allons parler de la curiosité scientifique. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle. Pour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème: elle montre une situation, un problème et une solution possible. Dans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle. L'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    oldAudioPath: "/audio/2ac_s2_3_oral.mp3",
    newAudioPath: "/audio/generated/s2-2ac-u3-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "2ac-s2-u4-oral",
    activityId: "2ac-s2-4-listening",
    level: "2AC",
    semester: "S2",
    unit: "4",
    session: "Graines d'inventeurs",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, nous allons parler de l'invention et la créativité. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle.\n\nPour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème\u00A0: elle montre une situation, un problème et une solution possible.\n\nDans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle.\n\nL'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, nous allons parler de l'invention et la créativité. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle. Pour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème: elle montre une situation, un problème et une solution possible. Dans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle. L'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    oldAudioPath: "/audio/2ac_s2_4_oral.mp3",
    newAudioPath: "/audio/generated/s2-2ac-u4-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "2ac-s2-u5-oral",
    activityId: "2ac-s2-5-listening",
    level: "2AC",
    semester: "S2",
    unit: "5",
    session: "Contes et légendes",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, nous allons parler des contes et légendes. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle.\n\nPour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème\u00A0: elle montre une situation, un problème et une solution possible.\n\nDans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle.\n\nL'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, nous allons parler des contes et légendes. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle. Pour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème: elle montre une situation, un problème et une solution possible. Dans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle. L'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    oldAudioPath: "/audio/2ac_s2_5_oral.mp3",
    newAudioPath: "/audio/generated/s2-2ac-u5-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "2ac-s2-u6-oral",
    activityId: "2ac-s2-6-listening",
    level: "2AC",
    semester: "S2",
    unit: "6",
    session: "Fêtes du monde",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, nous allons parler des fêtes et traditions du monde. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle.\n\nPour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème\u00A0: elle montre une situation, un problème et une solution possible.\n\nDans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle.\n\nL'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, nous allons parler des fêtes et traditions du monde. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle. Pour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème: elle montre une situation, un problème et une solution possible. Dans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle. L'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    oldAudioPath: "/audio/2ac_s2_6_oral.mp3",
    newAudioPath: "/audio/generated/s2-2ac-u6-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "3ac-s1-u1-oral",
    activityId: "3ac-s1-1-listening",
    level: "3AC",
    semester: "S1",
    unit: "1",
    session: "Un projet qui se construit",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nUn projet d'avenir ne se construit pas en un seul jour. Il commence souvent par une envie, une matière que l'on aime ou une expérience qui nous marque.\n\nPour avancer, il faut connaître ses compétences, écouter les conseils et accepter de faire des efforts. L'orientation n'est pas une route fermée\u00A0: elle se prépare étape par étape.\n\nChaque élève peut réfléchir à ses qualités et choisir un parcours qui lui ressemble.",
    cleanedText:
      "Bonjour les élèves. Un projet d'avenir ne se construit pas en un seul jour. Il commence souvent par une envie, une matière que l'on aime ou une expérience qui nous marque. Pour avancer, il faut connaître ses compétences, écouter les conseils et accepter de faire des efforts. L'orientation n'est pas une route fermée: elle se prépare étape par étape. Chaque élève peut réfléchir à ses qualités et choisir un parcours qui lui ressemble.",
    oldAudioPath: "/audio/3ac_s1_1_oral.mp3",
    newAudioPath: "/audio/generated/s1-3ac-u1-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "3ac-s1-u2-oral",
    activityId: "3ac-s1-2-listening",
    level: "3AC",
    semester: "S1",
    unit: "2",
    session: "Métiers de demain",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, nous allons parler des métiers et des compétences du futur. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle.\n\nPour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème\u00A0: elle montre une situation, un problème et une solution possible.\n\nDans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle.\n\nL'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, nous allons parler des métiers et des compétences du futur. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle. Pour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème: elle montre une situation, un problème et une solution possible. Dans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle. L'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    oldAudioPath: "/audio/3ac_s1_2_oral.mp3",
    newAudioPath: "/audio/generated/s1-3ac-u2-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "3ac-s1-u3-oral",
    activityId: "3ac-s1-3-listening",
    level: "3AC",
    semester: "S1",
    unit: "3",
    session: "Curieux de science",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, nous allons parler de la démarche scientifique. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle.\n\nPour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème\u00A0: elle montre une situation, un problème et une solution possible.\n\nDans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle.\n\nL'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, nous allons parler de la démarche scientifique. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle. Pour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème: elle montre une situation, un problème et une solution possible. Dans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle. L'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    oldAudioPath: "/audio/3ac_s1_3_oral.mp3",
    newAudioPath: "/audio/generated/s1-3ac-u3-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "3ac-s1-u4-oral",
    activityId: "3ac-s1-4-listening",
    level: "3AC",
    semester: "S1",
    unit: "4",
    session: "Graines d'inventeurs",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, nous allons parler de l'innovation utile. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle.\n\nPour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème\u00A0: elle montre une situation, un problème et une solution possible.\n\nDans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle.\n\nL'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, nous allons parler de l'innovation utile. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle. Pour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème: elle montre une situation, un problème et une solution possible. Dans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle. L'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    oldAudioPath: "/audio/3ac_s1_4_oral.mp3",
    newAudioPath: "/audio/generated/s1-3ac-u4-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "3ac-s2-u1-oral",
    activityId: "3ac-s2-1-listening",
    level: "3AC",
    semester: "S2",
    unit: "1",
    session: "Voyages et découvertes",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, nous allons parler des voyages et des découvertes. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle.\n\nPour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème\u00A0: elle montre une situation, un problème et une solution possible.\n\nDans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle.\n\nL'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, nous allons parler des voyages et des découvertes. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle. Pour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème: elle montre une situation, un problème et une solution possible. Dans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle. L'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    oldAudioPath: "/audio/3ac_s2_1_oral.mp3",
    newAudioPath: "/audio/generated/s2-3ac-u1-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "3ac-s2-u2-oral",
    activityId: "3ac-s2-2-listening",
    level: "3AC",
    semester: "S2",
    unit: "2",
    session: "Spectacles à vivre !",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, nous allons parler du spectacle vivant. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle.\n\nPour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème\u00A0: elle montre une situation, un problème et une solution possible.\n\nDans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle.\n\nL'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, nous allons parler du spectacle vivant. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle. Pour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème: elle montre une situation, un problème et une solution possible. Dans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle. L'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    oldAudioPath: "/audio/3ac_s2_2_oral.mp3",
    newAudioPath: "/audio/generated/s2-3ac-u2-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "3ac-s2-u3-oral",
    activityId: "3ac-s2-3-listening",
    level: "3AC",
    semester: "S2",
    unit: "3",
    session: "Héros comme nous",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, nous allons parler des héros du quotidien. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle.\n\nPour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème\u00A0: elle montre une situation, un problème et une solution possible.\n\nDans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle.\n\nL'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, nous allons parler des héros du quotidien. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle. Pour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème: elle montre une situation, un problème et une solution possible. Dans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle. L'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    oldAudioPath: "/audio/3ac_s2_3_oral.mp3",
    newAudioPath: "/audio/generated/s2-3ac-u3-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "3ac-s2-u4-oral",
    activityId: "3ac-s2-4-listening",
    level: "3AC",
    semester: "S2",
    unit: "4",
    session: "Petites histoires, leçons de vie",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, nous allons parler des récits porteurs de leçons. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle.\n\nPour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème\u00A0: elle montre une situation, un problème et une solution possible.\n\nDans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle.\n\nL'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, nous allons parler des récits porteurs de leçons. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle. Pour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème: elle montre une situation, un problème et une solution possible. Dans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle. L'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    oldAudioPath: "/audio/3ac_s2_4_oral.mp3",
    newAudioPath: "/audio/generated/s2-3ac-u4-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "3ac-s2-u5-oral",
    activityId: "3ac-s2-5-listening",
    level: "3AC",
    semester: "S2",
    unit: "5",
    session: "Consommer autrement",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, nous allons parler de la consommation responsable. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle.\n\nPour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème\u00A0: elle montre une situation, un problème et une solution possible.\n\nDans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle.\n\nL'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, nous allons parler de la consommation responsable. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle. Pour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème: elle montre une situation, un problème et une solution possible. Dans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle. L'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    oldAudioPath: "/audio/3ac_s2_5_oral.mp3",
    newAudioPath: "/audio/generated/s2-3ac-u5-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
  {
    id: "3ac-s2-u6-oral",
    activityId: "3ac-s2-6-listening",
    level: "3AC",
    semester: "S2",
    unit: "6",
    session: "Les villes de demain",
    type: "oral",
    originalText:
      "Bonjour les élèves.\n\nAujourd'hui, nous allons parler des villes durables de demain. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle.\n\nPour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème\u00A0: elle montre une situation, un problème et une solution possible.\n\nDans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle.\n\nL'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    cleanedText:
      "Bonjour les élèves. Aujourd'hui, nous allons parler des villes durables de demain. Ce thème nous aide à regarder le monde avec plus d'attention et à mieux comprendre notre rôle. Pour avancer, il faut observer des exemples concrets, choisir des mots précis et expliquer ses idées avec ordre. Une bonne réponse ne répète pas seulement le thème: elle montre une situation, un problème et une solution possible. Dans cette unité, vous allez écouter, lire, parler et écrire pour construire une réflexion personnelle. L'essentiel est de rester clair, expressif et capable de justifier son point de vue.",
    oldAudioPath: "/audio/3ac_s2_6_oral.mp3",
    newAudioPath: "/audio/generated/s2-3ac-u6-oral-01.mp3",
    status: "missing",
    generatedAt: null,
  },
] as AudioManifestEntry[]

export function getPedagogicalAudioPath(oldAudioPath?: string) {
  if (!oldAudioPath) return oldAudioPath

  const entry = audioManifest.find(
    (item) => item.oldAudioPath === oldAudioPath && item.status === "generated"
  )

  return entry?.newAudioPath || oldAudioPath
}
