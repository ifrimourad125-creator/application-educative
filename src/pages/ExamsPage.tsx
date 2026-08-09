import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardList, ArrowLeft, CheckCircle2, XCircle, Award, Sparkles, BookOpen, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { playSound } from '../utils/sound';

type Level = '1AC' | '2AC' | '3AC';
type ExamType = 'Contrôle 1' | 'Contrôle 2' | 'Contrôle 3';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const EXAMS_DATA: Record<Level, Record<ExamType, Question[]>> = {
  '1AC': {
    'Contrôle 1': [
      { id: 1, text: "Quel est le type de cette phrase : 'Ferme la porte !' ?", options: ['Déclarative', 'Interrogative', 'Injonctive', 'Exclamative'], correctAnswer: 2, explanation: "La phrase exprime un ordre et se termine par un point d'exclamation, c'est une phrase injonctive." },
      { id: 2, text: "Dans la phrase 'Le chat mange la souris', quelle est la fonction de 'la souris' ?", options: ['Sujet', 'COD', 'COI', 'Complément circonstanciel'], correctAnswer: 1, explanation: "Le chat mange 'quoi' ? 'la souris'. C'est un Complément d'Objet Direct." },
      { id: 3, text: "Trouve l'adjectif qualificatif : 'Une belle maison bleue.'", options: ['Une', 'belle', 'maison', 'Une belle'], correctAnswer: 1, explanation: "'belle' et 'bleue' sont des adjectifs, 'belle' est dans les options." },
      { id: 4, text: "Quel pronom remplace 'mes parents' : 'Je parle à mes parents' ?", options: ['les', 'leur', 'lui', 'en'], correctAnswer: 1, explanation: "Je parle 'à qui' ? 'à mes parents' -> Je 'leur' parle." }
    ],
    'Contrôle 2': [
      { id: 1, text: "Conjugue 'chanter' au présent, 1ère personne du pluriel.", options: ['chantons', 'chantez', 'chantent', 'chantions'], correctAnswer: 0, explanation: "Nous chantons." },
      { id: 2, text: "Lequel est au passé composé ?", options: ['je marchais', 'je marcherai', 'j\'ai marché', 'je marche'], correctAnswer: 2, explanation: "'j'ai marché' est formé de l'auxiliaire avoir et du participe passé." },
      { id: 3, text: "L'imparfait de 'finir' avec 'il' :", options: ['finissait', 'finit', 'finira', 'finisse'], correctAnswer: 0, explanation: "Il finissait." },
      { id: 4, text: "Quel est ce temps : 'vous serez' ?", options: ['Présent', 'Futur simple', 'Imparfait', 'Passé simple'], correctAnswer: 1, explanation: "C'est le verbe être au futur simple." }
    ],
    'Contrôle 3': [
      { id: 1, text: "Que signifie 'il était une fois' ?", options: ['La fin d\'une histoire', 'Le début d\'un conte', 'Une indication de lieu', 'Un fait historique'], correctAnswer: 1, explanation: "C'est la formule classique pour commencer un conte." },
      { id: 2, text: "Un récit autobiographique raconte :", options: ['La vie d\'un animal', 'La vie de l\'auteur', 'Une histoire inventée', 'La création du monde'], correctAnswer: 1, explanation: "L'auteur raconte sa propre vie." },
      { id: 3, text: "Comment appelle-t-on le personnage principal d'une histoire ?", options: ['L\'antagoniste', 'Le protagoniste', 'Le figurant', 'Le narrateur'], correctAnswer: 1, explanation: "Le protagoniste est le héros, le personnage central." },
      { id: 4, text: "Lequel n'est pas un genre littéraire ?", options: ['Le roman', 'La poésie', 'Le théâtre', 'La ponctuation'], correctAnswer: 3, explanation: "La ponctuation fait partie de la grammaire/orthographe, pas des genres littéraires." }
    ]
  },
  '2AC': {
    'Contrôle 1': [
      { id: 1, text: "Qu'est-ce qu'une proposition subordonnée relative ?", options: ['Une phrase sans verbe', 'Une phrase introduite par un pronom relatif', 'Une phrase interrogative', 'Une conjonction'], correctAnswer: 1, explanation: "Elle est introduite par un pronom relatif (qui, que, quoi, dont, où)." },
      { id: 2, text: "Laquelle est à la voix passive ?", options: ['Le vent souffle fort.', 'Le chat mange la souris.', 'La souris est mangée par le chat.', 'Il a neigé hier.'], correctAnswer: 2, explanation: "Le sujet 'La souris' subit l'action." },
      { id: 3, text: "Trouve le complément circonstanciel de temps :", options: ['Il marche vite.', 'Il dort dans sa chambre.', 'Il part demain.', 'Il est fatigué.'], correctAnswer: 2, explanation: "'demain' indique le temps." },
      { id: 4, text: "Quel est le synonyme de 'joyeux' ?", options: ['Triste', 'Colérique', 'Heureux', 'Mélancolique'], correctAnswer: 2, explanation: "Heureux a le même sens que joyeux." }
    ],
    'Contrôle 2': [
      { id: 1, text: "Le conditionnel présent de 'pouvoir' avec 'tu' :", options: ['pourras', 'pourrais', 'pouvais', 'pourra'], correctAnswer: 1, explanation: "Tu pourrais." },
      { id: 2, text: "Lequel est au plus-que-parfait ?", options: ['j\'avais fini', 'j\'eus fini', 'j\'aurais fini', 'j\'ai fini'], correctAnswer: 0, explanation: "'j'avais fini' : imparfait de l'auxiliaire + participe passé." },
      { id: 3, text: "Impératif de 'être', 2ème personne du singulier :", options: ['es', 'soit', 'sois', 'soyez'], correctAnswer: 2, explanation: "Sois courageux !" },
      { id: 4, text: "Passé simple de 'aller' avec 'ils' :", options: ['allèrent', 'allaient', 'sont allés', 'iront'], correctAnswer: 0, explanation: "Ils allèrent." }
    ],
    'Contrôle 3': [
      { id: 1, text: "Dans une pièce de théâtre, les paroles des personnages sont des :", options: ['Didascalies', 'Répliques', 'Strophes', 'Chapitres'], correctAnswer: 1, explanation: "Les répliques sont les phrases dites par les personnages." },
      { id: 2, text: "Qu'est-ce qu'une rime ?", options: ['Une ligne de poésie', 'La répétition de sons à la fin des vers', 'Un paragraphe en prose', 'Un synonyme'], correctAnswer: 1, explanation: "C'est la sonorité identique à la fin de deux vers." },
      { id: 3, text: "Une fable contient généralement :", options: ['Une morale', 'Des formules magiques', 'Des données scientifiques', 'Une recette'], correctAnswer: 0, explanation: "Comme chez La Fontaine, la fable vise à donner une leçon (morale)." },
      { id: 4, text: "L'auteur des 'Misérables' est :", options: ['Molière', 'Victor Hugo', 'Charles Baudelaire', 'Emile Zola'], correctAnswer: 1, explanation: "Victor Hugo est l'auteur des Misérables." }
    ]
  },
  '3AC': {
    'Contrôle 1': [
      { id: 1, text: "Lequel exprime la condition ?", options: ['Parce que', 'Si', 'Bien que', 'Pour que'], correctAnswer: 1, explanation: "'Si' introduit une condition (ex: Si tu viens, je serai content)." },
      { id: 2, text: "Identifie la figure de style : 'Gros comme une maison'", options: ['Métaphore', 'Comparaison', 'Hyperbole', 'Personnification'], correctAnswer: 2, explanation: "C'est une exagération (une hyperbole) qui utilise aussi une comparaison." },
      { id: 3, text: "Dans 'La voiture que j'ai achetée', 'que' est :", options: ['Conjonction', 'Préposition', 'Pronom relatif', 'Adverbe'], correctAnswer: 2, explanation: "Il remplace 'la voiture' pour éviter la répétition." },
      { id: 4, text: "Subordonnée circonstancielle de but :", options: ['Il crie parce qu\'il a peur.', 'Il court pour arriver à l\'heure.', 'Quand il pleut, je lis.', 'Si tu veux, on sort.'], correctAnswer: 1, explanation: "'pour arriver à l'heure' indique l'objectif, le but." }
    ],
    'Contrôle 2': [
      { id: 1, text: "Subjonctif présent de 'faire' avec 'il' :", options: ['fait', 'fasse', 'fera', 'ferait'], correctAnswer: 1, explanation: "Il faut qu'il fasse." },
      { id: 2, text: "Dans une conditionnelle avec 'Si + imparfait', la principale est au :", options: ['Conditionnel présent', 'Futur', 'Présent', 'Passé composé'], correctAnswer: 0, explanation: "Si j'avais de l'argent, j'achèterais (conditionnel présent) une voiture." },
      { id: 3, text: "Participe passé de 'résoudre' :", options: ['résolu', 'résoudé', 'résout', 'résous'], correctAnswer: 0, explanation: "J'ai résolu le problème." },
      { id: 4, text: "Futur antérieur de 'partir' (je) :", options: ['je serai parti', 'j\'aurai parti', 'je serais parti', 'je partirai'], correctAnswer: 0, explanation: "Partir se conjugue avec 'être' -> je serai parti." }
    ],
    'Contrôle 3': [
      { id: 1, text: "Dans une nouvelle littéraire, la fin inattendue s'appelle :", options: ['L\'incipit', 'La chute', 'L\'épilogue', 'Le prologue'], correctAnswer: 1, explanation: "La chute est la conclusion surprenante." },
      { id: 2, text: "Un texte argumentatif sert à :", options: ['Raconter une histoire', 'Décrire un paysage', 'Convaincre ou persuader', 'Donner des instructions'], correctAnswer: 2, explanation: "Il défend une thèse avec des arguments." },
      { id: 3, text: "La scène d'exposition au théâtre se trouve :", options: ['Au milieu de la pièce', 'A la fin', 'Au début', 'Dans les coulisses'], correctAnswer: 2, explanation: "Elle présente les personnages et l'intrigue au tout début." },
      { id: 4, text: "Qui est le narrateur omniscient ?", options: ['Il ne sait rien', 'Il participe à l\'histoire', 'Il sait tout des personnages', 'Il parle au futur'], correctAnswer: 2, explanation: "Il connaît les pensées de tous les personnages (focalisation zéro)." }
    ]
  }
};

export default function ExamsPage() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedExam, setSelectedExam] = useState<ExamType | null>(null);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const levels: Level[] = ['1AC', '2AC', '3AC'];
  const examTypes: ExamType[] = ['Contrôle 1', 'Contrôle 2', 'Contrôle 3'];

  const handleStartExam = () => {
    playSound('startup');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
    setIsFinished(false);
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (showResult) return;
    setSelectedOption(optionIndex);
    setShowResult(true);

    const questions = EXAMS_DATA[selectedLevel!][selectedExam!];
    const currentQ = questions[currentQuestionIndex];
    
    if (optionIndex === currentQ.correctAnswer) {
      playSound('success');
      setScore(prev => prev + 1);
    } else {
      playSound('error');
    }
  };

  const handleNext = () => {
    playSound('click');
    const questions = EXAMS_DATA[selectedLevel!][selectedExam!];
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
      playSound('success');
    }
  };

  const themeConfig = (() => {
    switch (selectedLevel) {
      case '1AC':
        return {
          buttonBg: 'bg-gradient-to-r from-cyan-500 to-blue-600',
          buttonBorder: 'border-cyan-400/50',
          shadow: 'shadow-[0_0_25px_rgba(34,211,238,0.4)]',
          examActiveBg: 'bg-cyan-500/20',
          examActiveBorder: 'border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.3)]',
          examActiveText: 'text-cyan-300',
          examActiveIcon: 'text-cyan-400',
          progressBg: 'from-cyan-400 to-blue-500',
          glow: 'bg-cyan-500/10',
          badgeBg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
          optionActiveStyle: 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)] scale-[1.02]',
        };
      case '2AC':
        return {
          buttonBg: 'bg-gradient-to-r from-fuchsia-500 to-pink-600',
          buttonBorder: 'border-fuchsia-400/50',
          shadow: 'shadow-[0_0_25px_rgba(217,70,239,0.4)]',
          examActiveBg: 'bg-fuchsia-500/20',
          examActiveBorder: 'border-fuchsia-400/60 shadow-[0_0_20px_rgba(217,70,239,0.3)]',
          examActiveText: 'text-fuchsia-300',
          examActiveIcon: 'text-fuchsia-400',
          progressBg: 'from-fuchsia-400 to-pink-500',
          glow: 'bg-fuchsia-500/10',
          badgeBg: 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400',
          optionActiveStyle: 'bg-fuchsia-500/20 border-fuchsia-400/50 text-fuchsia-300 shadow-[0_0_15px_rgba(217,70,239,0.2)] scale-[1.02]',
        };
      case '3AC':
        return {
          buttonBg: 'bg-gradient-to-r from-amber-500 to-orange-600',
          buttonBorder: 'border-amber-400/50',
          shadow: 'shadow-[0_0_25px_rgba(245,158,11,0.4)]',
          examActiveBg: 'bg-amber-500/20',
          examActiveBorder: 'border-amber-400/60 shadow-[0_0_20px_rgba(251,191,36,0.3)]',
          examActiveText: 'text-amber-300',
          examActiveIcon: 'text-amber-400',
          progressBg: 'from-amber-400 to-orange-500',
          glow: 'bg-amber-500/10',
          badgeBg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
          optionActiveStyle: 'bg-amber-500/20 border-amber-400/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)] scale-[1.02]',
        };
      default:
        return {
          buttonBg: 'bg-gradient-to-r from-indigo-500 to-blue-600',
          buttonBorder: 'border-indigo-400/50',
          shadow: 'shadow-[0_0_25px_rgba(99,102,241,0.4)]',
          examActiveBg: 'bg-blue-500/20',
          examActiveBorder: 'border-blue-400/60 shadow-[0_0_20px_rgba(59,130,246,0.3)]',
          examActiveText: 'text-blue-300',
          examActiveIcon: 'text-blue-400',
          progressBg: 'from-indigo-400 to-blue-500',
          glow: 'bg-indigo-500/10',
          badgeBg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
          optionActiveStyle: 'bg-indigo-500/20 border-indigo-400/50 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)] scale-[1.02]',
        };
    }
  })();

  const renderSelection = () => {
    const headerStyleMap: Record<string, { bg: string; borderColor: string; shadow: string; subtitleColor: string }> = {
      '1AC': {
        bg: 'from-[#00d2ff] to-[#0033ff]',
        borderColor: 'bg-[#00d2ff]',
        shadow: 'shadow-[0_12px_40px_rgba(0,51,255,0.5)]',
        subtitleColor: 'text-blue-100',
      },
      '2AC': {
        bg: 'from-[#f107a3] to-[#7b2ff7]',
        borderColor: 'bg-[#f107a3]',
        shadow: 'shadow-[0_12px_40px_rgba(123,47,247,0.5)]',
        subtitleColor: 'text-fuchsia-100',
      },
      '3AC': {
        bg: 'from-amber-400 via-orange-500 to-amber-600',
        borderColor: 'bg-amber-400',
        shadow: 'shadow-[0_12px_40px_rgba(245,158,11,0.5)]',
        subtitleColor: 'text-orange-50',
      },
    };

    const headerStyle = selectedLevel ? headerStyleMap[selectedLevel] : headerStyleMap['1AC'];

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className={`relative overflow-hidden rounded-[24px] p-[1.5px] ${headerStyle.shadow} transition-colors duration-500`}>
          {/* Base border color */}
          <div className={`absolute inset-0 ${headerStyle.borderColor} transition-colors duration-500`} />
          
          {/* Spinning highlight */}
          <div className="absolute inset-[-150%] origin-center animate-spin-continuous bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]" />
          
          {/* Inner Card */}
          <div className={`relative rounded-[23px] bg-gradient-to-b ${headerStyle.bg} p-6 sm:p-8 flex flex-col items-center text-center h-full w-full`}>
            <div className="flex flex-col items-center justify-center gap-3 relative z-10 w-full">
              <div className="flex items-center justify-center text-6xl sm:text-7xl shrink-0 drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] pb-1">
                📝
              </div>
              <div className="space-y-1 text-center">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">Contrôles Continus</h1>
                <p className={`text-sm sm:text-base ${headerStyle.subtitleColor} font-bold tracking-wide uppercase transition-colors duration-500`}>
                  Exemples de contrôles interactifs
                </p>
              </div>
            </div>
          </div>
        </div>

      <div className="space-y-4">
        {selectedLevel ? (
          <div className="flex justify-center w-full pb-4">
            <button
              onClick={() => {
                playSound('click');
                setSelectedLevel(null);
                setSelectedExam(null);
              }}
              className="relative group cursor-pointer w-full max-w-[240px] sm:max-w-[260px]"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl blur opacity-60 group-hover:opacity-90 transition duration-500 animate-pulse"></div>
              <div className="relative py-4 sm:py-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl border-2 border-cyan-400/80 flex justify-center items-center shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <span className="text-[13px] sm:text-[16px] leading-snug sm:leading-none font-black text-cyan-200 uppercase tracking-widest sm:tracking-[0.15em] text-center drop-shadow-md whitespace-nowrap flex items-center gap-2 sm:gap-3">
                  <ArrowLeft size={20} className="text-cyan-200" />
                  Modifier le niveau
                </span>
              </div>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mb-10 sm:mb-12 mt-12 sm:mt-16 space-y-6">
            <div className="flex items-center justify-center gap-2 sm:gap-6 w-full">
              <span className="h-[4px] w-8 sm:w-20 rounded-full bg-gradient-to-r from-transparent to-cyan-500/80"></span>
              <div className="relative group shrink-0">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl blur opacity-60 group-hover:opacity-90 transition duration-500 animate-pulse"></div>
                <div className="relative px-6 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl border-2 border-cyan-400/80 flex items-center shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                  <span className="text-[13px] sm:text-lg leading-snug sm:leading-none font-black text-cyan-200 uppercase tracking-widest sm:tracking-[0.2em] text-center drop-shadow-md whitespace-nowrap">
                    Choisis ton niveau
                  </span>
                </div>
              </div>
              <span className="h-[4px] w-8 sm:w-20 rounded-full bg-gradient-to-l from-transparent to-cyan-500/80"></span>
            </div>
            
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-cyan-200"
            >
              <ChevronDown size={28} strokeWidth={2.5} className="drop-shadow-md" />
            </motion.div>
          </div>
        )}
        <div className={`grid gap-3 sm:gap-6 transition-all duration-500 ${selectedLevel ? 'grid-cols-1 max-w-[240px] sm:max-w-[260px] mx-auto' : 'grid-cols-3 max-w-[400px] sm:max-w-none mx-auto'}`}>
          {levels.filter(lvl => !selectedLevel || selectedLevel === lvl).map(lvl => {
              const config = {
                '1AC': { 
                  emoji: '📖', 
                  gradientBg: 'bg-gradient-to-r sm:bg-gradient-to-b from-cyan-500 via-sky-600 to-blue-700',
                  borderStyle: 'border-2 border-cyan-300/80',
                  shadowGlow: 'hover:shadow-[0_12px_30px_rgba(6,182,212,0.6)] hover:shadow-cyan-500/50',
                  gradientRing: 'from-cyan-300 via-teal-200 via-emerald-300 to-blue-400',
                  ringGlow: 'group-hover:shadow-[0_0_20px_rgba(34,211,238,0.9)]',
                  activeRing: 'shadow-[0_0_20px_rgba(34,211,238,0.9)]',
                  subTitle: 'Première Année',
                  subTitleColor: 'text-cyan-400',
                },
                '2AC': { 
                  emoji: '🚀', 
                  gradientBg: 'bg-gradient-to-r sm:bg-gradient-to-b from-fuchsia-500 via-purple-600 to-pink-600',
                  borderStyle: 'border-2 border-fuchsia-300/80',
                  shadowGlow: 'hover:shadow-[0_12px_30px_rgba(217,70,239,0.6)] hover:shadow-fuchsia-500/50',
                  gradientRing: 'from-fuchsia-300 via-rose-300 via-purple-200 to-amber-300',
                  ringGlow: 'group-hover:shadow-[0_0_20px_rgba(232,121,249,0.9)]',
                  activeRing: 'shadow-[0_0_20px_rgba(232,121,249,0.9)]',
                  subTitle: 'Deuxième Année',
                  subTitleColor: 'text-fuchsia-400',
                },
                '3AC': { 
                  emoji: '🏆', 
                  gradientBg: 'bg-gradient-to-r sm:bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600',
                  borderStyle: 'border-2 border-amber-300/80',
                  shadowGlow: 'hover:shadow-[0_12px_30px_rgba(245,158,11,0.6)] hover:shadow-amber-500/50',
                  gradientRing: 'from-amber-200 via-yellow-300 via-orange-300 to-rose-400',
                  ringGlow: 'group-hover:shadow-[0_0_20px_rgba(251,191,36,0.9)]',
                  activeRing: 'shadow-[0_0_20px_rgba(251,191,36,0.9)]',
                  subTitle: 'Troisième Année',
                  subTitleColor: 'text-amber-400',
                }
              }[lvl]!;
              
              const isSelected = selectedLevel === lvl;

              return (
                <motion.div
                  key={lvl}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playSound('click');
                  setSelectedLevel(selectedLevel === lvl ? null : lvl);
                  setSelectedExam(null);
                }}
                className={`group relative cursor-pointer w-full transition-all duration-300 ${isSelected ? 'scale-[1.02]' : 'opacity-90 hover:opacity-100'}`}
              >
                <div className={`relative overflow-hidden rounded-2xl ${config.gradientBg} ${config.borderStyle} ${config.shadowGlow} px-2 pb-3 pt-4 ${isSelected ? 'sm:py-4 sm:px-4' : 'sm:p-6'} flex flex-col items-center justify-center gap-2 sm:gap-3 transition-all duration-300 w-full ${isSelected ? 'shadow-xl aspect-[3/2] sm:aspect-[3/2]' : 'aspect-auto min-h-[125px] sm:aspect-square'}`}>
                  
                  {/* Glossy Top Highlight Line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
                  
                  {/* Crystal-Clear Translucent Glass Circle Icon Container */}
                  <div className={`relative shrink-0 flex items-center justify-center ${isSelected ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-16 h-16 sm:w-20 sm:h-20'}`}>
                    {/* Static Perfect-Circle Mask for the Spinning Contour Ring */}
                    <div
                      className="absolute inset-0 rounded-full border-[2px] sm:border-[3px] border-transparent pointer-events-none z-0"
                      style={{
                        WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                      }}
                    >
                      <div className={`absolute -inset-[100%] bg-gradient-to-tr ${config.gradientRing} transition-all duration-300 opacity-90 ${isSelected ? 'animate-[spin_4s_linear_infinite] ' + config.activeRing : 'group-hover:animate-[spin_4s_linear_infinite] ' + config.ringGlow}`} />
                    </div>
                    {/* Crystal-Clear Transparent Glass Lens */}
                    <div className="absolute inset-[2px] sm:inset-[3px] rounded-full bg-transparent border border-white/20 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_8px_16px_rgba(0,0,0,0.2)] flex items-center justify-center overflow-hidden transition-all duration-300 z-10">
                      <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none" />
                      <div className="absolute top-[4px] left-[8px] sm:top-[6px] sm:left-[10px] w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/70 rounded-full pointer-events-none" />
                      
                      <span className="relative z-10 text-[2.25rem] sm:text-[3.5rem] flex items-center justify-center w-full h-full select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform duration-300 pb-0.5">
                        {config.emoji}
                      </span>
                    </div>
                  </div>

                  {/* Text Info */}
                  <div className="text-center flex-1 min-w-0 flex flex-col justify-center pt-1 sm:pt-2">
                    <h2 className={`font-black text-white tracking-tight leading-tight drop-shadow-md whitespace-pre-wrap px-1 ${isSelected ? 'text-[22px] sm:text-[32px]' : 'text-[18px] sm:text-[24px]'}`}>
                      {isSelected ? (lvl === '1AC' ? '1ère année' : lvl === '2AC' ? '2ème année' : '3ème année') : lvl}
                    </h2>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedLevel && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest text-center pt-2">Exemples de contrôles continus avec corrigés</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {examTypes.map((type, index) => {
                let bgGradient, hoverGradient, borderColor, iconColor, textColor;
                if (selectedLevel === '1AC') {
                  bgGradient = index === 0 ? 'bg-gradient-to-br from-teal-500/20 to-cyan-500/20' : index === 1 ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20' : 'bg-gradient-to-br from-blue-500/20 to-indigo-500/20';
                  hoverGradient = index === 0 ? 'hover:from-teal-400/30 hover:to-cyan-400/30' : index === 1 ? 'hover:from-cyan-400/30 hover:to-blue-400/30' : 'hover:from-blue-400/30 hover:to-indigo-400/30';
                  borderColor = index === 0 ? 'border-teal-500/40 hover:border-teal-400/60' : index === 1 ? 'border-cyan-500/40 hover:border-cyan-400/60' : 'border-blue-500/40 hover:border-blue-400/60';
                  iconColor = index === 0 ? 'text-teal-400' : index === 1 ? 'text-cyan-400' : 'text-blue-400';
                  textColor = index === 0 ? 'text-teal-200' : index === 1 ? 'text-cyan-200' : 'text-blue-200';
                } else if (selectedLevel === '2AC') {
                  bgGradient = index === 0 ? 'bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20' : index === 1 ? 'bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20' : 'bg-gradient-to-br from-purple-500/20 to-violet-500/20';
                  hoverGradient = index === 0 ? 'hover:from-pink-400/30 hover:to-fuchsia-400/30' : index === 1 ? 'hover:from-fuchsia-400/30 hover:to-purple-400/30' : 'hover:from-purple-400/30 hover:to-violet-400/30';
                  borderColor = index === 0 ? 'border-pink-500/40 hover:border-pink-400/60' : index === 1 ? 'border-fuchsia-500/40 hover:border-fuchsia-400/60' : 'border-purple-500/40 hover:border-purple-400/60';
                  iconColor = index === 0 ? 'text-pink-400' : index === 1 ? 'text-fuchsia-400' : 'text-purple-400';
                  textColor = index === 0 ? 'text-pink-200' : index === 1 ? 'text-fuchsia-200' : 'text-purple-200';
                } else {
                  bgGradient = index === 0 ? 'bg-gradient-to-br from-yellow-500/20 to-amber-500/20' : index === 1 ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20' : 'bg-gradient-to-br from-orange-500/20 to-red-500/20';
                  hoverGradient = index === 0 ? 'hover:from-yellow-400/30 hover:to-amber-400/30' : index === 1 ? 'hover:from-amber-400/30 hover:to-orange-400/30' : 'hover:from-orange-400/30 hover:to-red-400/30';
                  borderColor = index === 0 ? 'border-yellow-500/40 hover:border-yellow-400/60' : index === 1 ? 'border-amber-500/40 hover:border-amber-400/60' : 'border-orange-500/40 hover:border-orange-400/60';
                  iconColor = index === 0 ? 'text-yellow-400' : index === 1 ? 'text-amber-400' : 'text-orange-400';
                  textColor = index === 0 ? 'text-yellow-200' : index === 1 ? 'text-amber-200' : 'text-orange-200';
                }

                return (
                  <button
                    key={type}
                    onClick={() => {
                      playSound('click');
                      setSelectedExam(type);
                    }}
                    className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-3 relative overflow-hidden group ${
                      selectedExam === type 
                        ? `${themeConfig.examActiveBg} ${themeConfig.examActiveBorder} backdrop-blur-md scale-105`
                        : `${bgGradient} ${hoverGradient} ${borderColor} backdrop-blur-sm`
                    }`}
                  >
                    <BookOpen className={`w-6 h-6 transition-all duration-300 ${selectedExam === type ? themeConfig.examActiveIcon : `${iconColor} group-hover:text-white group-hover:scale-110 drop-shadow-md`}`} />
                    <span className={`font-bold transition-all duration-300 ${selectedExam === type ? themeConfig.examActiveText : `${textColor} group-hover:text-white`}`}>{type}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    );
  };

  const renderQuiz = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 flex-1 flex flex-col h-full"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedExam(null);
              playSound('click');
            }}
            className="p-2.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${themeConfig.badgeBg}`}>
              {selectedLevel} • {selectedExam}
            </span>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-slate-800/80 border border-slate-700/50 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-white text-center">
            À construire...
          </h2>
          <p className="text-slate-400 text-center max-w-sm">
            Ce contrôle continu est en cours de création. Reviens plus tard pour t'entraîner !
          </p>
        </div>
      </motion.div>
    );
  };



  const renderResult = () => {
    const questions = EXAMS_DATA[selectedLevel!][selectedExam!];
    // Calculate score out of 20
    const finalScore = Math.round((score / questions.length) * 20);
    const isSuccess = finalScore >= 10;

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 flex flex-col items-center justify-center text-center space-y-8 py-8"
      >
        <div className={`relative w-40 h-40 rounded-full flex items-center justify-center border-4 shadow-2xl backdrop-blur-xl ${
          isSuccess 
            ? 'bg-emerald-500/10 border-emerald-400/50 shadow-emerald-500/20' 
            : 'bg-rose-500/10 border-rose-400/50 shadow-rose-500/20'
        }`}>
          <div className={`absolute inset-0 rounded-full blur-2xl opacity-50 ${isSuccess ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          <div className="relative z-10 flex flex-col items-center">
            <span className={`text-5xl font-black ${isSuccess ? 'text-emerald-400' : 'text-rose-400'}`}>
              {finalScore}
            </span>
            <span className="text-xl font-bold text-slate-400 border-t border-slate-700/50 mt-1 pt-1 w-16 text-center">
              20
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white">
            {isSuccess ? 'Félicitations !' : 'Continue tes efforts !'}
          </h2>
          <p className="text-slate-400 font-medium">
            Tu as obtenu {score} bonne(s) réponse(s) sur {questions.length}.
          </p>
        </div>

        <div className="w-full max-w-sm space-y-3 pt-6">
          <button
            onClick={handleStartExam}
            className="w-full p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 text-white font-bold hover:bg-slate-800 transition-all backdrop-blur-md"
          >
            Refaire ce contrôle
          </button>
          <button
            onClick={() => {
              setSelectedExam(null);
              playSound('click');
            }}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-black border border-indigo-400/50 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
          >
            Choisir une autre épreuve
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 w-full max-w-4xl mx-auto h-full overflow-y-auto">
      {!selectedExam && renderSelection()}
      {selectedExam && !isFinished && renderQuiz()}
      {selectedExam && isFinished && renderResult()}
    </div>
  );
}
