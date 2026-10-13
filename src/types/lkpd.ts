export interface StudentProfile {
  fullName: string;
  className: string;
  studentNumber: string;
  groupName: string;
  schoolName: string;
  date: string;
}

export type TabKey = 'panduan' | 'stimulus' | 'variabel' | 'perulangan' | 'proyek' | 'asesmen';

export interface VariableItem {
  id: string;
  name: string;
  value: string;
  type: 'str' | 'int' | 'float' | 'bool' | 'list';
  description: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: { key: string; text: string }[];
  correctKey: string;
  explanation: string;
}

export interface LKPDAnswers {
  studentProfile: StudentProfile;
  stimulusAnswers: {
    q1: string; // Peran variabel dalam AI
    q2: string; // Contoh penerapan perulangan dalam AI
  };
  variableExercises: {
    detectiveMatches: Record<string, string>; // questionId -> selectedType
    validNameAnswers: Record<string, boolean | null>; // varName -> isValid
    customVariables: Array<{ name: string; val: string }>;
  };
  loopExercises: {
    stepperCompleted: boolean;
    debugChallenge1Fixed: boolean;
    debugChallenge2Fixed: boolean;
    loopAnalysisResponse: string;
  };
  projectCode: string;
  projectSubmitted: boolean;
  projectTestPassed: boolean;
  quizAnswers: Record<number, string>;
  quizSubmitted: boolean;
  reflection: {
    learned: string;
    difficulties: string;
    aiIdea: string;
  };
}
