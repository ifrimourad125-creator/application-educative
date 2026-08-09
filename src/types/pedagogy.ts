export type ChoiceQuestion = {
  question: string;
  answer: string;
  options: string[];
  verb?: string;
  explanation?: string;
  [key: string]: unknown;
};

export type VocabularyItem = {
  text: string;
  answer: string;
  key?: string;
  options?: string[];
  [key: string]: unknown;
};

export type VocabularySession = {
  title: string;
  icon?: string;
  words?: string[];
  sentences?: VocabularyItem[];
  [key: string]: unknown;
};

export type DialogueLine = {
  speaker: string;
  text: string;
  answer?: string;
  [key: string]: unknown;
};

export type ProductionData = {
  title: string;
  icon?: string;
  objective: string;
  instruction: string;
  finalMessage: string;
  situation?: string;
  subject?: string;
  keywords?: string[];
  expressions?: string[];
  words?: string[];
  plan?: string[];
  length?: string;
  correction?: string;
  [key: string]: unknown;
};

export type ModelUnitContent = {
  title: string;
  icon?: string;
  theme: string;
  finalTask: string;
  vocabulary: ProductionData & {
    sessions?: VocabularySession[];
  };
  speechActs: ProductionData & {
    expressions?: string[];
    options?: string[];
    dialogue?: DialogueLine[];
    correction?: string;
  };
  listening: {
    title: string;
  icon?: string;
    objective: string;
    instruction: string;
    finalMessage: string;
    audio?: string;
    originalAudio?: string;
    script?: string;
    supportImagePrompt?: string;
    situation?: {
      speaker?: string;
      receiver?: string;
      subject?: string;
      purpose?: string;
    };
    heardWords?: string[];
    intruders?: string[];
    questions?: ChoiceQuestion[];
    [key: string]: unknown;
  };
  reading: ProductionData & {
    image?: string;
    imageAlt?: string;
    source?: string;
    text?: string;
    communication?: ChoiceQuestion[];
    paratext?: ChoiceQuestion[];
    direct?: ChoiceQuestion[];
    inferenceQuestion?: string;
    freeQuestion?: string;
  };
  language: ProductionData & {
    reminder?: string;
    examples?: string[];
    questions?: ChoiceQuestion[];
  };
  oralProduction: ProductionData;
  writing: ProductionData;
  fluency: ProductionData & {
    explanation?: string;
    text?: string[];
    liaisons?: string[];
    checklist?: string[];
  };
  [key: string]: unknown;
};
