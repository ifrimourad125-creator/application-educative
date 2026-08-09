import React, { useLayoutEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Sparkles, CheckCircle2, BookOpen } from 'lucide-react';
import { activities } from '../data/activities';
import { getModelUnit } from '../data/modelUnits';
import {
  ActivityErrorBoundary,
  AudioPlayer,
  ChoiceButton,
  Empty,
  FinalPage,
  GuidedProduction,
  Header,
  Panel,
  ProgressCard,
  QuestionPanel,
  SectionTitle,
  Shell,
  TextBlock,
} from '../features/activities/activityShared';
import {
  asArray,
  asText,
  cardAccent,
  getListeningThemeImage,
  normalizeQuestion,
  stableShuffle,
  stableShuffleChoices,
  uniqueTexts,
} from '../features/activities/activityUtils';
import { Activity, SelectedUnit } from '../types/app';
import {
  ChoiceQuestion,
  DialogueLine,
  ModelUnitContent,
  VocabularyItem,
  VocabularySession,
} from '../types/pedagogy';
import { playAnswerFeedback, playSound } from '../utils/sound';
import { markActivityComplete } from '../utils/storage';
import { getListeningContent } from '../utils/pedagogyContent';

interface ActivityDetailPageProps {
  activity?: Activity;
  onBack?: () => void;
  onBackToLevel?: () => void;
  selectedUnit?: SelectedUnit;
}

interface ActivityScreenProps {
  tone?: string;
  unit: ModelUnitContent;
  onBack: () => void;
  onBackToLevel: () => void;
  unitMeta?: { levelId: string; semesterId: string; unitId: number; activityId: number };
}

type VocabExerciseItem = VocabularyItem & {
  key: string;
  options: string[];
};

export default function ActivityDetailPage({
  activity: propsActivity,
  onBack: propsOnBack,
  onBackToLevel: propsOnBackToLevel,
  selectedUnit: propsUnit,
}: ActivityDetailPageProps) {
  const navigate = useNavigate();
  const { levelId, semesterId, unitId, activityId } = useParams();

  // Find activity and unit from params if not passed directly in props
  const currentActivityId = propsActivity?.id || Number(activityId) || 1;
  const activity = propsActivity || activities.find((a) => a.id === currentActivityId);

  let selectedUnit = propsUnit;
  if (!selectedUnit && levelId && semesterId && unitId) {
    selectedUnit = {
      id: Number(unitId),
      title: `Unité ${unitId}`,
      levelId: levelId as any,
      semesterId: semesterId as any,
    };
  }

  const unit = getModelUnit(selectedUnit?.levelId, selectedUnit?.semesterId, selectedUnit?.id);

  const handleBack = () => {
    playSound('back-click');
    if (propsOnBack) {
      propsOnBack();
    } else if (selectedUnit) {
      navigate(
        `/niveau/${selectedUnit.levelId}/semestre/${selectedUnit.semesterId}/unite/${selectedUnit.id}`
      );
    } else {
      navigate('/');
    }
  };

  const handleBackToLevel = () => {
    playSound('back-click');
    if (propsOnBackToLevel) {
      propsOnBackToLevel();
    } else if (selectedUnit) {
      navigate(`/niveau/${selectedUnit.levelId}`);
    } else {
      navigate('/');
    }
  };

  if (!activity) {
    return (
      <Shell onBack={handleBack}>
        <Empty message="Activité introuvable" />
      </Shell>
    );
  }

  if (!unit) {
    return (
      <Shell onBack={handleBack} onBackToLevel={handleBackToLevel} activityId={activity.id} tone={activity.id === 1 ? "violet" : activity.id === 2 ? "emerald" : activity.id === 3 ? "orange" : activity.id === 5 ? "amber" : activity.id === 7 ? "emerald" : activity.id === 8 ? "rose" : "cyan"}>
        <Empty message="Cette unité ne dispose pas encore de contenu modèle." />
      </Shell>
    );
  }

  const unitMeta = {
    levelId: selectedUnit?.levelId || '1ac',
    semesterId: selectedUnit?.semesterId || 's1',
    unitId: selectedUnit?.id || 1,
    activityId: activity.id,
  };
  const getTone = (id: number) => {

    const tones = ["emerald", "sky", "amber", "rose", "fuchsia", "orange", "violet", "indigo"];
    return tones[(id - 1) % 8] as any;
  };

  const currentTone = getTone(activity.id);

  const renderers: Record<number, React.ReactElement> = {
    1: <Vocabulary unit={unit} onBack={handleBack} onBackToLevel={handleBackToLevel} unitMeta={unitMeta} tone={currentTone} />,
    2: <SpeechActs unit={unit} onBack={handleBack} onBackToLevel={handleBackToLevel} unitMeta={unitMeta} tone={currentTone} />,
    3: <Listening unit={unit} onBack={handleBack} onBackToLevel={handleBackToLevel} unitMeta={unitMeta} tone={currentTone} />,
    4: <Reading unit={unit} onBack={handleBack} onBackToLevel={handleBackToLevel} unitMeta={unitMeta} tone={currentTone} />,
    5: <Fluency unit={unit} onBack={handleBack} onBackToLevel={handleBackToLevel} unitMeta={unitMeta} tone={currentTone} />,
    6: <Language unit={unit} onBack={handleBack} onBackToLevel={handleBackToLevel} unitMeta={unitMeta} tone={currentTone} />,
    7: <OralProduction unit={unit} onBack={handleBack} onBackToLevel={handleBackToLevel} unitMeta={unitMeta} tone={currentTone} />,
    8: <Writing unit={unit} onBack={handleBack} onBackToLevel={handleBackToLevel} unitMeta={unitMeta} tone={currentTone} />,
  };
  return (

    <Shell onBack={handleBack} onBackToLevel={handleBackToLevel} activityId={activity.id} tone={currentTone}>
      <ActivityErrorBoundary>
        {renderers[activity.id] || <Empty message="Activité en cours de création" />}
      </ActivityErrorBoundary>
    </Shell>
  );
}


function triggerSuccessCelebration(
  levelId?: string,
  semesterId?: string,
  unitId?: number,
  activityId?: number,
  scorePct: number = 100
) {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  } catch {
    // ignore
  }
  if (levelId && semesterId && unitId && activityId) {
    markActivityComplete(levelId, semesterId, unitId, activityId, scorePct);
  }
}

function Vocabulary({ unit, onBack, onBackToLevel, unitMeta, tone }: ActivityScreenProps) {
  const data: any = unit.vocabulary || {};
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const sessions = asArray<VocabularySession>(data?.sessions);
  const allItems: VocabExerciseItem[] = sessions.flatMap(
    (session: VocabularySession, sessionIndex: number) =>
      asArray<VocabularyItem>(session.sentences).map((item: VocabularyItem, itemIndex: number) => ({
        ...item,
        key: `${sessionIndex}-${itemIndex}`,
        options: asArray<string>(session.words),
      }))
  );
  const score = allItems.filter(
    (item: VocabExerciseItem) => answers[item.key] === item.answer
  ).length;

  if (done) {
    const pct = Math.round((score / Math.max(1, allItems.length)) * 100);
    return (
      <FinalPage
        icon="✅"
        score={score}
        total={allItems.length}
        message={data.finalMessage}
        onRestart={() => {
          setAnswers({});
          setDone(false);
        }}
        onBack={onBack}
        onBackToLevel={onBackToLevel}
      />
    );
  }

  return (
    <>
      <Header
        icon={data.icon || "🧠"}
        category="Vocabulaire"
        tone={tone || "violet"}
        title={data.title}
        objective={data.objective}
        instruction={data.instruction}
      />
      {sessions.map((session: VocabularySession, sessionIndex: number) => (
        <Panel key={session.title}>
          <SectionTitle>{session.title}</SectionTitle>
          <div className="grid gap-3">
            {asArray<VocabularyItem>(session.sentences).map(
              (item: VocabularyItem, itemIndex: number) => {
                const key = `${sessionIndex}-${itemIndex}`;
                return (
                  <div
                    key={key}
                    className={`rounded-xl border p-3 sm:p-3.5 shadow-sm ${cardAccent(itemIndex)}`}
                  >
                    <p className="text-sm sm:text-base text-justify font-bold mb-2.5 leading-snug text-white">
                      {itemIndex + 1}. {item.text}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {stableShuffleChoices<string>(
                        uniqueTexts([item.answer, ...asArray<string>(session.words)]),
                        item.answer,
                        `vocab-${key}-${item.text}`
                      ).map((option: string) => (
                        <ChoiceButton
                          key={option}
                          option={option}
                          selected={answers[key]}
                          correct={item.answer}
                          onClick={() => {
                            const nextAnswers = {
                              ...answers,
                              [key]: option,
                            };
                            setAnswers(nextAnswers);
                            playAnswerFeedback(option === item.answer);
                            if (Object.keys(nextAnswers).length >= allItems.length) {
                              setDone(true);
                              const finalScore = allItems.filter(
                                (it) => nextAnswers[it.key] === it.answer
                              ).length;
                              const pct = Math.round((finalScore / Math.max(1, allItems.length)) * 100);
                              triggerSuccessCelebration(unitMeta?.levelId, unitMeta?.semesterId, unitMeta?.unitId, unitMeta?.activityId, pct);
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </Panel>
      ))}
    </>
  );
}

function SpeechActs({ unit, onBack, onBackToLevel, unitMeta, tone }: ActivityScreenProps) {
  const data: any = unit.speechActs || {};
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const dialogue = asArray<DialogueLine>(data?.dialogue);
  const blanks = dialogue.filter((line): line is DialogueLine & { answer: string } =>
    Boolean(line.answer)
  );
  const speechOptions = Array.from(
    new Set(
      [
        ...(Array.isArray(data?.options)
          ? data.options
          : Array.isArray(data?.expressions)
            ? data.expressions
            : []),
        ...blanks.map((line) => line.answer),
      ].filter(Boolean)
    )
  );
  const score = blanks.filter(
    (line, index: number) => answers[String(index)] === line.answer
  ).length;

  if (done) {
    return (
      <FinalPage
        icon={data.icon || "💬"}
        score={score}
        total={blanks.length}
        message={data.finalMessage}
        onRestart={() => {
          setAnswers({});
          setDone(false);
        }}
        onBack={onBack}
        onBackToLevel={onBackToLevel}
      />
    );
  }

  return (
    <>
      <Header
        icon={data.icon || "💬"}
        category="Actes de parole"
        tone={tone || "emerald"}
        title={data.title}
        objective={data.objective}
        instruction={data.instruction}
      />
      <Panel className="bg-indigo-500/10 border-indigo-300/20">
        <SectionTitle>Situation</SectionTitle>
        <TextBlock text={data.situation} />
      </Panel>
      <Panel>
        <SectionTitle>Dialogue à compléter</SectionTitle>
        <div className="space-y-3">
          {dialogue.map((line: DialogueLine, index: number) => {
            const currentBlank = line.answer
              ? dialogue.slice(0, index + 1).filter((item) => item.answer).length - 1
              : -1;
            const options =
              speechOptions.length > 0 ? speechOptions : line.answer ? [line.answer] : [];
            return (
              <div
                key={`${line.speaker}-${index}`}
                className={`rounded-xl border p-3 sm:p-3.5 shadow-sm ${cardAccent(index)}`}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1">{line.speaker}</p>
                <p className="text-sm sm:text-base text-justify font-medium leading-relaxed text-slate-100 mb-2.5">{line.text}</p>
                {line.answer && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {stableShuffleChoices<string>(
                      options,
                      line.answer,
                      `speech-${currentBlank}-${line.text}`
                    ).map((option: string) => (
                      <ChoiceButton
                        key={option}
                        option={option}
                        selected={answers[String(currentBlank)]}
                        correct={line.answer ?? ''}
                        onClick={() => {
                          const nextAnswers = {
                            ...answers,
                            [String(currentBlank)]: option,
                          };
                          setAnswers(nextAnswers);
                          playAnswerFeedback(option === line.answer);
                          if (Object.keys(nextAnswers).length >= blanks.length) {
                            setDone(true);
                            const finalScore = blanks.filter(
                              (l, i) => nextAnswers[String(i)] === l.answer
                            ).length;
                            const pct = Math.round((finalScore / Math.max(1, blanks.length)) * 100);
                            triggerSuccessCelebration(unitMeta?.levelId, unitMeta?.semesterId, unitMeta?.unitId, unitMeta?.activityId, pct);
                          }
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Panel>
      <Panel className="bg-emerald-500/10 border-emerald-300/20">
        <SectionTitle>Corrigé du dialogue</SectionTitle>
        <div className="space-y-2.5">
          {dialogue.map((line: DialogueLine, index: number) => (
            <div
              key={`${line.speaker}-correction-${index}`}
              className={`rounded-xl border p-3 sm:p-3.5 shadow-sm ${cardAccent(index + 2)}`}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">{line.speaker}</p>
              <p className="text-sm sm:text-base text-justify leading-relaxed text-slate-100">
                {line.answer ? line.text.replace('______', line.answer) : line.text}
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

function Listening({ unit, onBack, onBackToLevel, unitMeta, tone }: ActivityScreenProps) {
  const data: any = unit.listening || {};
  const [selectedWords, setSelectedWords] = useState<Record<string, boolean>>({});
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const situation = {
    speaker: asText(data?.situation?.speaker, 'un intervenant'),
    receiver: asText(data?.situation?.receiver, 'aux élèves'),
    subject: asText(data?.situation?.subject, "du thème de l'unité"),
    purpose: asText(data?.situation?.purpose, 'informer et guider les élèves'),
  };
  const heardWords = asArray<string>(data?.heardWords);
  const intruders = asArray<string>(data?.intruders);
  const listeningQuestions = asArray<ChoiceQuestion>(data?.questions).map(normalizeQuestion);
  const situationQuestions = [
    {
      question: 'Qui parle ?',
      answer: situation.speaker,
      options: [situation.speaker, 'un vendeur', 'un touriste', 'un cuisinier'],
    },
    {
      question: 'À qui parle-t-il ?',
      answer: situation.receiver,
      options: [situation.receiver, 'aux touristes', 'aux parents seulement', 'aux clients'],
    },
    {
      question: 'De quoi parle le message ?',
      answer: situation.subject,
      options: [situation.subject, 'des achats en ligne', 'des monuments', 'de la cuisine'],
    },
    {
      question: 'Dans quel but ?',
      answer: situation.purpose,
      options: [
        situation.purpose,
        'vendre un produit',
        'raconter une blague',
        'annoncer un voyage',
      ],
    },
  ].map(normalizeQuestion);
  const wordOptions = stableShuffle(
    uniqueTexts([...heardWords, ...intruders]),
    'listening-heard-words'
  );
  const wordScore =
    heardWords.filter((word: string) => selectedWords[word]).length -
    intruders.filter((word: string) => selectedWords[word]).length;
  const situationScore = situationQuestions.filter(
    (question, index: number) => answers[String(index)] === question.answer
  ).length;
  const questionScore = listeningQuestions.filter(
    (question, index: number) =>
      answers[String(index + situationQuestions.length)] === question.answer
  ).length;
  const score = Math.max(0, wordScore) + situationScore + questionScore;
  const total = heardWords.length + situationQuestions.length + listeningQuestions.length;
  const selectedWordCount = Object.values(selectedWords).filter(Boolean).length;
  const heardWordsComplete = selectedWordCount >= heardWords.length;

  const finishListeningIfComplete = (
    nextAnswers: Record<string, string>,
    nextSelectedWords: Record<string, boolean>
  ) => {
    const nextAnsweredCount = Object.keys(nextAnswers).length;
    const nextSelectedWordCount = Object.values(nextSelectedWords).filter(Boolean).length;

    if (
      nextAnsweredCount >= situationQuestions.length + listeningQuestions.length &&
      nextSelectedWordCount >= heardWords.length
    ) {
      setDone(true);
      const pct = Math.round((score / Math.max(1, total)) * 100);
      triggerSuccessCelebration(unitMeta?.levelId, unitMeta?.semesterId, unitMeta?.unitId, unitMeta?.activityId, pct);
    }
  };

  const listeningContent = getListeningContent(unitMeta?.levelId || '1AC', unit?.title || 'Unité');

  if (done) {
    return (
      <FinalPage
        icon={data.icon || "🎧"}
        score={score}
        total={total}
        message={data.finalMessage}
        onRestart={() => {
          setSelectedWords({});
          setAnswers({});
          setDone(false);
        }}
        onBack={onBack}
        onBackToLevel={onBackToLevel}
      />
    );
  }

  return (
    <>
      <Header
        icon={data.icon || "🎧"}
        category="Compréhension orale"
        tone={tone || "orange"}
        title={data.title}
        objective={data.objective}
        instruction={data.instruction}
      />
      <AudioPlayer
        title={data.title || "Document audio d'écoute"}
        src={data.audio}
        script={listeningContent.script}
        source={data.source || "Document sonore officiel - Ministère de l’Éducation Nationale"}
      />
      <QuestionPanel
        title="Situation de communication"
        questions={situationQuestions}
        answers={answers}
        setAnswers={setAnswers}
        onAnswered={(nextAnswers) => finishListeningIfComplete(nextAnswers, selectedWords)}
      />
      <Panel>
        <SectionTitle>Exercice 1 : mots entendus</SectionTitle>
        <p className="text-xs text-slate-300 mb-3 font-medium">
          Clique sur les mots que tu entends dans le message audio.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {wordOptions.map((word: string) => {
            const isSelected = Boolean(selectedWords[word]);
            const isHeardWord = heardWords.includes(word);
            const isIntruder = intruders.includes(word);
            const shouldReveal = heardWordsComplete;
            const disabled = isSelected || shouldReveal;
            const wordStyle =
              shouldReveal && isHeardWord
                ? 'bg-gradient-to-r from-emerald-400 to-green-400 border-emerald-300 text-slate-900 font-bold scale-[1.02] shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : shouldReveal && isIntruder
                  ? 'bg-gradient-to-r from-rose-600 to-red-500 border-rose-400 text-white font-bold scale-[1.02] shadow-[0_0_15px_rgba(225,29,72,0.4)]'
                  : isSelected && isHeardWord
                    ? 'bg-gradient-to-r from-emerald-400 to-green-400 border-emerald-300 text-slate-900 font-bold scale-[1.02] shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                    : isSelected && isIntruder
                      ? 'bg-gradient-to-r from-rose-600 to-red-500 border-rose-400 text-white font-bold scale-[1.02] shadow-[0_0_15px_rgba(225,29,72,0.4)]'
                      : 'bg-slate-800/90 border-2 border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.25)] text-slate-100 hover:border-sky-400';

            return (
              <button
                key={word}
                disabled={disabled}
                onClick={() => {
                  if (disabled) return;
                  playAnswerFeedback(isHeardWord);
                  const nextSelectedWords = {
                    ...selectedWords,
                    [word]: true,
                  };
                  setSelectedWords(nextSelectedWords);
                  finishListeningIfComplete(answers, nextSelectedWords);
                }}
                className={`rounded-xl border px-3 py-2.5 text-sm sm:text-base text-justify font-semibold transition disabled:cursor-default ${wordStyle}`}
              >
                {(shouldReveal || isSelected) && isHeardWord
                  ? '✓ '
                  : (shouldReveal || isSelected) && isIntruder
                    ? '✕ '
                    : ''}
                {word}
              </button>
            );
          })}
        </div>
      </Panel>
      <QuestionPanel
        title="Exercice 2 : compréhension orale"
        questions={listeningQuestions}
        answers={answers}
        setAnswers={setAnswers}
        offset={situationQuestions.length}
        onAnswered={(nextAnswers) => finishListeningIfComplete(nextAnswers, selectedWords)}
      />
    </>
  );
}

function SafeReadingImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt || 'Illustration littéraire et pédagogique'}
        className="relative flex min-h-48 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-sky-400/30 bg-gradient-to-br from-sky-950/80 via-slate-900 to-indigo-950/80 p-6 shadow-xl text-center"
      >
        <BookOpen className="w-12 h-12 text-cyan-400 mb-3 opacity-90 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]" />
        <p className="text-sm sm:text-base text-cyan-100 font-bold max-w-sm leading-relaxed drop-shadow-sm">
          {alt || 'Texte et support de lecture officielle pour le collège'}
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-cyan-400/40 bg-slate-950/90 p-2 sm:p-3 shadow-xl hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] transition-all duration-300 flex justify-center items-center group">
      {/* Subtle ambient lighting behind image */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10 blur-xl pointer-events-none" />
      
      <img
        src={src}
        alt={alt || 'Illustration de lecture'}
        referrerPolicy="no-referrer"
        className="relative z-10 w-full h-auto max-h-80 sm:max-h-[440px] object-cover rounded-xl border border-slate-700/60 shadow-lg group-hover:scale-[1.01] transition-transform duration-300"
      />
    </div>
  );
}

function Reading({ unit, onBack, onBackToLevel, unitMeta, tone }: ActivityScreenProps) {
  const data: any = unit.reading || {};
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [freeText, setFreeText] = useState('');
  const [showCorrection, setShowCorrection] = useState(false);
  const [done, setDone] = useState(false);
  const communicationQuestions = asArray<ChoiceQuestion>(data?.communication).map(normalizeQuestion);
  const paratextQuestions = asArray<ChoiceQuestion>(data?.paratext).map(normalizeQuestion);
  const directQuestions = asArray<ChoiceQuestion>(data?.direct).map(normalizeQuestion);
  const allQuestions = [...communicationQuestions, ...paratextQuestions, ...directQuestions];
  const score = allQuestions.filter(
    (question, index: number) => answers[String(index)] === question.answer
  ).length;

  const readingContent = {
    text: asText(data.text, ''),
    source: asText(data.source, 'Support pédagogique'),
    image: asText(data.image, '') || getListeningThemeImage(asText(data.title, unit.title)),
    imageAlt: asText(data.imageAlt, `Illustration de ${unit.title}.`),
  };

  if (done) {
    return (
      <FinalPage
        icon={data.icon || "📖"}
        score={score}
        total={allQuestions.length}
        message={data.finalMessage}
        onRestart={() => {
          setAnswers({});
          setFreeText('');
          setShowCorrection(false);
          setDone(false);
        }}
        onBack={onBack}
        onBackToLevel={onBackToLevel}
      />
    );
  }

  return (
    <>
      <Header
        icon={data.icon || "📖"}
        category="Lecture"
        tone={tone || "cyan"}
        title={data.title}
        objective={data.objective}
        instruction={data.instruction}
      />
      <Panel className="overflow-hidden border-sky-400/40 bg-slate-900/95 shadow-2xl">
        <div className="space-y-4">
          <div className="w-full relative shadow-lg rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950">
            {readingContent.image ? (
              <img
                src={readingContent.image}
                alt={readingContent.imageAlt}
                className="w-full h-48 sm:h-72 object-cover"
                loading="eager"
                decoding="async"
                onError={(event) => {
                  const target = event.currentTarget;
                  target.style.display = "none";
                  target.parentElement?.classList.add("min-h-48", "sm:min-h-72");
                  const fallback = document.createElement("div");
                  fallback.className = "absolute inset-0 flex items-center justify-center bg-slate-900 px-6 text-center text-sm text-slate-400";
                  fallback.textContent = "Illustration indisponible pour le moment";
                  target.parentElement?.appendChild(fallback);
                }}
              />
            ) : (
              <div className="flex min-h-48 sm:min-h-72 items-center justify-center bg-slate-900 px-6 text-center text-sm text-slate-400">
                Illustration de lecture
              </div>
            )}
          </div>
          
          {/* Main Reading Encadré with clean text structure and bottom-right source badge */}
          <div className="relative p-4 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-700/80 text-left shadow-inner flex flex-col justify-between min-h-[160px]">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  <BookOpen className="w-3 h-3" /> Texte Intégral Officiel
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-black text-white tracking-tight leading-snug mb-3">
                {data.title}
              </h2>
              <div className="text-slate-200 text-sm sm:text-base text-justify leading-relaxed sm:leading-loose">
                <TextBlock text={readingContent.text} />
              </div>
            </div>

            {/* Source Displayed Cleanly at Bottom Right */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-end">
              <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold italic text-amber-300/90 bg-amber-950/40 border border-amber-500/30 px-3 py-1.5 rounded-lg shadow-sm">
                <span>Source :</span>
                <span className="font-bold text-amber-200 not-italic">
                  {readingContent.source}
                </span>
              </span>
            </div>
          </div>
        </div>
      </Panel>
      <QuestionPanel
        title="Exercice 1 : situation de communication"
        questions={communicationQuestions}
        answers={answers}
        setAnswers={setAnswers}
        offset={0}
      />
      <QuestionPanel
        title="Exercice 2 : paratexte"
        questions={paratextQuestions}
        answers={answers}
        setAnswers={setAnswers}
        offset={communicationQuestions.length}
      />
      <QuestionPanel
        title="Exercice 3 : compréhension directe"
        questions={directQuestions}
        answers={answers}
        setAnswers={setAnswers}
        offset={communicationQuestions.length + paratextQuestions.length}
      />
      <Panel>
        <SectionTitle>Exercice 4 : inférence ou réaction personnelle</SectionTitle>
        <p className="text-sm sm:text-base text-justify mb-2.5 text-slate-200 font-medium">
          {data.freeQuestion ||
            data.inferenceQuestion ||
            "Exprime brièvement ton avis en t'appuyant sur le texte."}
        </p>
        <textarea
          value={freeText}
          onChange={(event) => setFreeText(event.target.value)}
          className="min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm sm:text-base text-justify text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
          placeholder="Rédige ta réponse ici..."
        />
        <button
          onClick={() => {
            playSound('click');
            setShowCorrection(true);
            setDone(true);
            triggerSuccessCelebration(unitMeta?.levelId, unitMeta?.semesterId, unitMeta?.unitId, unitMeta?.activityId, 100);
          }}
          className="mt-3 w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2.5 text-sm sm:text-base text-justify font-bold text-white shadow-md transition active:scale-95"
        >
          Voir la correction proposée & Terminer
        </button>
        {showCorrection && (
          <div className="mt-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs leading-relaxed text-emerald-200">
            {data.correction}
          </div>
        )}
      </Panel>
    </>
  );
}

function Language({ unit, onBack, onBackToLevel, unitMeta, tone }: ActivityScreenProps) {
  const data: any = unit.language || {};
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const examples = asArray<string>(data?.examples);
  const languageQuestions = asArray<ChoiceQuestion>(data?.questions).map(
    (question, index: number) =>
      normalizeQuestion(
        {
          ...question,
          question: question?.verb
            ? `${asText(question.question, `Question ${index + 1}`)} (${question.verb})`
            : question?.question,
        },
        index
      )
  );
  const score = languageQuestions.filter(
    (question, index: number) => answers[String(index)] === question.answer
  ).length;

  if (done) {
    return (
      <FinalPage
        icon={data.icon || "🛠️"}
        score={score}
        total={languageQuestions.length}
        message={data.finalMessage}
        onRestart={() => {
          setAnswers({});
          setDone(false);
        }}
        onBack={onBack}
        onBackToLevel={onBackToLevel}
      />
    );
  }

  return (
    <>
      <Header
        icon={data.icon || "🛠️"}
        category="Outils de langue"
        tone={tone || "amber"}
        title={data.title}
        objective={data.objective}
        instruction={data.instruction}
      />
      <Panel className="bg-amber-500/10 border-amber-500/20">
        <SectionTitle>Rappel de règle de langue</SectionTitle>
        <TextBlock text={data.reminder} />
        <div className="grid md:grid-cols-2 gap-2.5 mt-4">
          {examples.map((example: string) => (
            <div
              key={example}
              className="rounded-2xl border border-amber-500/20 bg-slate-950/60 p-3 text-xs font-bold text-amber-200"
            >
              {example}
            </div>
          ))}
        </div>
      </Panel>
      <QuestionPanel
        title="Exercice : choisir la bonne forme"
        questions={languageQuestions}
        answers={answers}
        setAnswers={setAnswers}
        onAnswered={(nextAnswers) => {
          if (Object.keys(nextAnswers).length >= languageQuestions.length) {
            setDone(true);
            const finalScore = languageQuestions.filter(
              (q, i) => nextAnswers[String(i)] === q.answer
            ).length;
            const pct = Math.round((finalScore / Math.max(1, languageQuestions.length)) * 100);
            triggerSuccessCelebration(unitMeta?.levelId, unitMeta?.semesterId, unitMeta?.unitId, unitMeta?.activityId, pct);
          }
        }}
      />
    </>
  );
}

function OralProduction({ unit, onBack, onBackToLevel, unitMeta, tone }: ActivityScreenProps) {
  const data: any = unit.oralProduction || {};
  const [text, setText] = useState('');
  const [showKeywords, setShowKeywords] = useState(false);
  const [showCorrection, setShowCorrection] = useState(false);
  const [done, setDone] = useState(false);
  const keywords = asArray<string>(data?.keywords);

  if (done) {
    return (
      <FinalPage
        icon={data.icon || "🎙️"}
        message={data.finalMessage}
        onRestart={() => {
          setText('');
          setShowKeywords(false);
          setShowCorrection(false);
          setDone(false);
        }}
        onBack={onBack}
        onBackToLevel={onBackToLevel}
      />
    );
  }

  return (
    <>
      <Header
        icon={data.icon || "🎙️"}
        category="Production orale"
        tone={tone || "emerald"}
        title={data.title}
        objective={data.objective}
        instruction={data.instruction}
      />
      <Panel className="bg-emerald-500/10 border-emerald-500/20">
        <SectionTitle>Situation de prise de parole</SectionTitle>
        <TextBlock text={data.situation} />
        <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-slate-950 p-4 text-xs leading-relaxed text-slate-200">
          <strong>Consigne :</strong> {data.instruction}
        </div>
        <button
          onClick={() => {
            playSound('click');
            setShowKeywords(!showKeywords);
          }}
          className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
        >
          Mots-clés suggérés
        </button>
        {showKeywords && (
          <div className="mt-3 flex flex-wrap gap-2">
            {keywords.map((keyword: string) => (
              <span
                key={keyword}
                className="rounded-xl bg-slate-900 border border-emerald-500/40 px-3 py-1 text-xs font-bold text-emerald-300"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </Panel>
      <GuidedProduction
        data={data}
        text={text}
        setText={setText}
        showCorrection={showCorrection}
        setShowCorrection={(val) => {
          setShowCorrection(val);
          if (val) {
            triggerSuccessCelebration(unitMeta?.levelId, unitMeta?.semesterId, unitMeta?.unitId, unitMeta?.activityId, 100);
          }
        }}
        mode="Préparation orale"
      />
    </>
  );
}

function Writing({ unit, onBack, onBackToLevel, unitMeta, tone }: ActivityScreenProps) {
  const data: any = unit.writing || {};
  const [text, setText] = useState('');
  const [showKeywords, setShowKeywords] = useState(false);
  const [showCorrection, setShowCorrection] = useState(false);
  const [done, setDone] = useState(false);
  const keywords = asArray<string>(data?.keywords);

  if (done) {
    return (
      <FinalPage
        icon={data.icon || "✍️"}
        message={data.finalMessage}
        onRestart={() => {
          setText('');
          setShowKeywords(false);
          setShowCorrection(false);
          setDone(false);
        }}
        onBack={onBack}
        onBackToLevel={onBackToLevel}
      />
    );
  }

  return (
    <>
      <Header
        icon={data.icon || "✍️"}
        category="Production écrite"
        tone={tone || "rose"}
        title={data.title}
        objective={data.objective}
        instruction={data.instruction}
      />
      <Panel className="border-indigo-500/30 bg-indigo-950/20">
        <SectionTitle>Sujet de Rédaction</SectionTitle>
        <TextBlock text={data.subject || data.situation || ''} />
        <button
          onClick={() => {
            playSound('click');
            setShowKeywords(!showKeywords);
          }}
          className="mt-4 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
        >
          Voir les Mots-clés
        </button>
        {showKeywords && (
          <div className="flex flex-wrap gap-2 mt-3">
            {keywords.map((keyword: string) => (
              <span
                key={keyword}
                className="rounded-xl bg-slate-900 border border-amber-500/40 px-3 py-1 text-xs font-bold text-amber-300"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </Panel>
      <GuidedProduction
        data={data}
        text={text}
        setText={setText}
        showCorrection={showCorrection}
        setShowCorrection={(val) => {
          setShowCorrection(val);
          if (val) {
            triggerSuccessCelebration(unitMeta?.levelId, unitMeta?.semesterId, unitMeta?.unitId, unitMeta?.activityId, 100);
          }
        }}
        mode="Zone de rédaction"
      />
    </>
  );
}


function LiaisonPair({ pair, keyPrefix }: { pair: string; keyPrefix: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const [arc, setArc] = useState<{ x1: number; x2: number; y: number } | null>(null);

  const parts = pair.split('‿');
  const validPair = parts.length === 2 && !!parts[0].trim() && !!parts[1].trim();
  const leftTokens = (validPair ? parts[0].trim() : '').split(/\s+/);
  const leftAnchor = leftTokens.pop() || '';
  const leftPrefix = leftTokens.length ? `${leftTokens.join(' ')} ` : '';
  const rightMatch = (validPair ? parts[1].trim() : '').match(/^(\S+)([\s\S]*)$/);
  const rightAnchor = rightMatch?.[1] || (validPair ? parts[1].trim() : '');
  const rightSuffix = rightMatch?.[2] || '';

  // The liaison mark must connect the final letter of the first word
  // to the first letter of the second word — never the whole words.
  const leftChars = Array.from(leftAnchor);
  const rightChars = Array.from(rightAnchor);
  const leftBefore = leftChars.slice(0, -1).join('');
  const leftJoinChar = leftChars.at(-1) || '';
  const rightJoinChar = rightChars[0] || '';
  const rightAfter = rightChars.slice(1).join('');

  useLayoutEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const left = leftRef.current;
      const right = rightRef.current;
      if (!container || !left || !right) return;

      const containerRect = container.getBoundingClientRect();
      const leftRect = left.getBoundingClientRect();
      const rightRect = right.getBoundingClientRect();
      const y = Math.max(leftRect.bottom, rightRect.bottom) - containerRect.top + 2;

      setArc({
        x1: leftRect.right - containerRect.left,
        x2: rightRect.left - containerRect.left,
        y,
      });
    };

    update();
    const resizeObserver = new ResizeObserver(update);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [pair]);

  if (!validPair || !leftJoinChar || !rightJoinChar) {
    return <>{pair}</>;
  }

  return (
    <span
      ref={containerRef}
      key={`${keyPrefix}-liaison`}
      className="fluency-liaison-pair"
      aria-label={`${parts[0].trim()} ${parts[1].trim()} — liaison`}
    >
      {leftPrefix}
      <span className="fluency-liaison-word">
        {leftBefore}
        <span ref={leftRef} className="fluency-liaison-anchor">{leftJoinChar}</span>
      </span>
      <span className="fluency-liaison-gap" aria-hidden="true"> </span>
      <span className="fluency-liaison-word">
        <span ref={rightRef} className="fluency-liaison-anchor">{rightJoinChar}</span>{rightAfter}
      </span>
      {rightSuffix}
      {arc && (
        <svg
          className="fluency-liaison-arc"
          style={{
            left: 0,
            top: 0,
            width: '100%',
            height: Math.max(arc.y + 7, 20),
          }}
          viewBox={`0 0 ${Math.max(containerRef.current?.getBoundingClientRect().width || 1, 1)} ${Math.max(arc.y + 7, 20)}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d={`M ${arc.x1} ${arc.y} Q ${(arc.x1 + arc.x2) / 2} ${arc.y + 1.25} ${arc.x2} ${arc.y}`}
          />
        </svg>
      )}
    </span>
  );
}

function renderLiaisonPair(pair: string, keyPrefix: string) {
  return <LiaisonPair pair={pair} keyPrefix={keyPrefix} />;
}

function renderFluencySegment(segment: string, keyPrefix: string) {
  const tokens = segment.split(/(\s+)/);

  return tokens.map((token, tokenIndex) => {
    if (!token || /^\s+$/.test(token)) {
      return <React.Fragment key={`${keyPrefix}-space-${tokenIndex}`}>{token}</React.Fragment>;
    }

    if (token.includes('‿')) {
      return renderLiaisonPair(token, `${keyPrefix}-${tokenIndex}`);
    }

    return <React.Fragment key={`${keyPrefix}-token-${tokenIndex}`}>{token}</React.Fragment>;
  });
}

function renderLiaisonExample(pair: string, keyPrefix: string, sound: string) {
  return (
    <li className="fluency-liaison-example">
      <span className="fluency-liaison-example-pair">
        {renderLiaisonPair(pair, keyPrefix)}
      </span>
      <span className="fluency-liaison-sound">{sound}</span>
    </li>
  );
}

function Fluency({ unit, onBack, onBackToLevel, unitMeta, tone }: ActivityScreenProps) {
  const data: any = unit.fluency || {};
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);
  const fluencyText = asArray<string>(data?.text);
  const liaisons = asArray<string>(data?.liaisons);
  const checklist = asArray<string>(data?.checklist);

  if (done) {
    return (
      <FinalPage
        icon={data.icon || "🔊"}
        message={data.finalMessage}
        onRestart={() => {
          setChecked({});
          setDone(false);
        }}
        onBack={onBack}
        onBackToLevel={onBackToLevel}
      />
    );
  }

  return (
    <>
      <Header
        icon={data.icon || "🔊"}
        category="Lecture fluence"
        tone={tone || "cyan"}
        title={data.title}
        objective={data.objective}
        instruction={data.instruction}
      />
      <Panel className="fluency-reminder-panel">
        <SectionTitle>💡 Petit rappel — Les liaisons</SectionTitle>
        <div className="fluency-reminder-content">
          <p className="fluency-reminder-definition">
            À l’oral, une liaison relie deux mots lorsque le premier se termine par une consonne
            et que le suivant commence par une voyelle ou un <strong>h muet</strong>.
          </p>
          <div className="fluency-liaison-examples-box">
            <p className="fluency-reminder-label">Exemples :</p>
            <ul className="fluency-liaison-examples-grid">
              {renderLiaisonExample('les‿amis', 'liaison-example-z', '[z]')}
              {renderLiaisonExample('un‿ami', 'liaison-example-n', '[n]')}
              {renderLiaisonExample('petit‿enfant', 'liaison-example-t', '[t]')}
              {renderLiaisonExample('grand‿homme', 'liaison-example-d', '[t]')}
              {renderLiaisonExample('neuf‿ans', 'liaison-example-f', '[v]')}
              {renderLiaisonExample('sang‿impur', 'liaison-example-g', '[k]')}
            </ul>
          </div>
          <div className="fluency-liaison-warning">
            <p><strong>⚠️ Attention :</strong> la consonne finale ne se prononce pas toujours de la même façon.</p>
            <p className="mt-1"><strong>d + voyelle ou h muet → [t]</strong> : grand‿homme.</p>
          </div>
          <p className="fluency-reminder-tip">
            👉 Regarde la fin du premier mot et le début du suivant avant de lire. Quand une liaison est indiquée,
            enchaîne les deux mots naturellement.
          </p>
          <div className="fluency-reminder-legend">
            <div><strong className="fluency-legend-slash">/</strong><span>= groupe de sens (pause)</span></div>
            <div><strong className="fluency-legend-arc" aria-hidden="true"><svg viewBox="0 0 44 16"><path d="M 3 3 Q 22 16 41 3" /></svg></strong><span>= liaison entre deux mots</span></div>
          </div>
        </div>
      </Panel>
      <Panel>
        <SectionTitle>Texte à lire à haute voix</SectionTitle>
        <div className="fluency-reading-block space-y-4 text-base sm:text-lg text-slate-100 font-serif bg-slate-950 rounded-2xl border border-slate-800">
          {fluencyText.map((line: string, lineIndex: number) => {
            const parts = line.split('/');
            return (
              <p key={`${line}-${lineIndex}`} className="fluency-reading-line">
                {parts.map((part: string, index: number) => (
                  <React.Fragment key={`${lineIndex}-${index}`}>
                    {renderFluencySegment(part, `${lineIndex}-${index}`)}
                    {index < parts.length - 1 && (
                      <span className="fluency-reading-slash" aria-hidden="true">/</span>
                    )}
                  </React.Fragment>
                ))}
              </p>
            );
          })}
        </div>
      </Panel>
      <Panel>
        <SectionTitle>Liaisons recommandées</SectionTitle>
        <div className="grid md:grid-cols-3 gap-2.5">
          {liaisons.length > 0 ? (
            liaisons.map((item: string, itemIndex: number) => (
              <div
                key={item}
                className="rounded-2xl bg-slate-800 border border-slate-700 p-3 text-xs font-bold text-sky-200 text-center"
              >
                {renderFluencySegment(item, `liaison-card-${itemIndex}`)}
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 md:col-span-3">
              Aucune liaison particulière à travailler dans ce passage.
            </p>
          )}
        </div>
      </Panel>
      <Panel>
        <SectionTitle>Auto-évaluation</SectionTitle>
        <div className="grid md:grid-cols-2 gap-2.5">
          {checklist.map((item: string) => (
            <button
              key={item}
              onClick={() => {
                playSound('click');
                const nextChecked = {
                  ...checked,
                  [item]: !checked[item],
                };
                setChecked(nextChecked);
                if (Object.values(nextChecked).filter(Boolean).length >= checklist.length) {
                  setDone(true);
                  triggerSuccessCelebration(unitMeta?.levelId, unitMeta?.semesterId, unitMeta?.unitId, unitMeta?.activityId, 100);
                }
              }}
              className={`rounded-2xl border p-3.5 text-left text-xs font-bold transition ${
                checked[item]
                  ? 'bg-gradient-to-r from-emerald-400 to-green-400 border-emerald-300 text-slate-900 font-bold scale-[1.02] shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'bg-slate-800 border-2 border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.25)] text-slate-200 hover:border-sky-400'
              }`}
            >
              {checked[item] ? '✓ ' : ''}
              {item}
            </button>
          ))}
        </div>
      </Panel>
    </>
  );
}
