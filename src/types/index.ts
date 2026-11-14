export type StudyStatus = 'unstudied' | 'studied' | 'mastered';
export type RecallRating = 'again' | 'hard' | 'good' | 'easy';

export interface Flashcard {
  front: string;
  back: string;
}

export type QuestionType = 
  | 'mcq' 
  | 'tf' 
  | 'fill' 
  | 'match' 
  | 'oneline' 
  | 'short' 
  | 'long' 
  | 'numerical' 
  | 'diagram' 
  | 'rapid';

export interface PracticeQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctIndex?: number;
  isTrue?: boolean;
  answer?: string;
  hint?: string;
  explanation: string;
  pairs?: { left: string; right: string }[];
  keyPoints?: string[];
  rubric?: string[];
  quickAnswer?: string;
  marks?: number;
  isApplicable?: boolean;
  hasDiagram?: boolean;
}

export interface Question {
  id: string;
  subjectId: string;
  subjectName: string;
  courseCode: string;
  year: string;
  paperTitle: string;
  questionNumber: string;
  questionText: string;
  marks: number;
  topic: string;
  module: string;
  syllabusStatus: string;
  questionCategory?: 'subquestion' | 'or_option' | 'short_note';
  answerMarkdown: string;
  keyPoints: string[];
  simplifiedExplanation: string;
  isNumerical: boolean;
  hasDiagram: boolean;
  flashcards: Flashcard[];
  practiceQuestions: PracticeQuestion[];
}

export interface ModuleInfo {
  id: string;
  title: string;
  topics: string[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  color: string;
  syllabusType?: 'prescribed' | 'pyq-derived';
  years: string[];
  modules: ModuleInfo[];
  totalQuestions: number;
  questions: Question[];
}

export interface RevisionItem {
  questionId: string;
  subjectId: string;
  nextReviewDate: string; // YYYY-MM-DD
  lastReviewedDate?: string;
  intervalDays: number;
  repetitions: number;
  easeFactor: number;
  history: { date: string; rating: RecallRating }[];
}

export interface TestAttempt {
  id: string;
  timestamp: string;
  subjectId?: string;
  subjectName?: string;
  testType: string;
  title: string;
  score: number;
  maxScore: number;
  percentage: number;
  timeSpentSeconds: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  details?: any[];
}

export interface UserProgress {
  studiedQuestions: Record<string, StudyStatus>;
  bookmarkedIds: string[];
  notes: Record<string, string>;
  highlights: Record<string, string[]>;
  testHistory: TestAttempt[];
  revisionQueue: Record<string, RevisionItem>;
  studyTimeSeconds: Record<string, number>;
  dailyGoals: {
    questionsTarget: number;
    flashcardsTarget: number;
    testsTarget: number;
    minutesTarget: number;
  };
  dailyActivity: Record<string, {
    questionsStudied: number;
    flashcardsReviewed: number;
    testsCompleted: number;
    studySeconds: number;
  }>;
  examDates: Record<string, string>;
  pomodoroSessionsCompleted: number;
}
