import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress, StudyStatus, RecallRating, TestAttempt, RevisionItem } from '../types';
import { getAllQuestions } from '../data/pyqData';
import { calculateCanonicalSM2 } from '../utils/sm2';

const STORAGE_KEY = 'semesteros_user_progress_v1';

const getInitialProgress = (): UserProgress => {
  const defaultProgress: UserProgress = {
    studiedQuestions: {},
    bookmarkedIds: [],
    notes: {},
    highlights: {},
    testHistory: [],
    revisionQueue: {},
    studyTimeSeconds: {
      'computer-networks': 0,
      'cloud-computing': 0,
      'image-processing': 0,
      'entrepreneurship': 0,
      'nlp': 0,
      'system-software': 0
    },
    dailyGoals: {
      questionsTarget: 10,
      flashcardsTarget: 20,
      testsTarget: 2,
      minutesTarget: 45
    },
    dailyActivity: {},
    examDates: {
      'computer-networks': '2026-11-20',
      'cloud-computing': '2026-11-24',
      'image-processing': '2026-11-28',
      'entrepreneurship': '2026-12-02',
      'nlp': '2026-12-06',
      'system-software': '2026-12-10'
    },
    pomodoroSessionsCompleted: 0
  };

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultProgress, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load user progress:', e);
  }
  return defaultProgress;
};

interface AppContextType {
  theme: 'light' | 'dark';
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
  activeSubjectId: string | null;
  setActiveSubjectId: (id: string | null) => void;
  activeQuestionId: string | null;
  setActiveQuestionId: (id: string | null) => void;
  activeYear: string | null;
  setActiveYear: (year: string | null) => void;
  studyMode: 'read' | 'recall' | 'flashcards' | 'memorize' | 'simple';
  setStudyMode: (mode: 'read' | 'recall' | 'flashcards' | 'memorize' | 'simple') => void;
  progress: UserProgress;
  markQuestionStatus: (questionId: string, status: StudyStatus) => void;
  toggleBookmark: (questionId: string) => void;
  saveNote: (questionId: string, note: string) => void;
  deleteNote: (questionId: string) => void;
  saveHighlight: (questionId: string, text: string) => void;
  removeHighlight: (questionId: string, text: string) => void;
  recordRecallRating: (questionId: string, rating: RecallRating, subjectId: string) => void;
  saveTestAttempt: (attempt: Omit<TestAttempt, 'id' | 'timestamp'>) => void;
  recordStudyTime: (subjectId: string, seconds: number) => void;
  updateDailyGoals: (goals: Partial<UserProgress['dailyGoals']>) => void;
  setExamDate: (subjectId: string, dateStr: string) => void;
  exportData: () => string;
  importData: (jsonStr: string) => boolean;
  resetProgress: () => void;
  // Pomodoro
  pomodoroActive: boolean;
  pomodoroTimeLeft: number;
  pomodoroMode: 'work' | 'break';
  pomodoroFocusMode: boolean;
  startPomodoro: () => void;
  pausePomodoro: () => void;
  resetPomodoro: () => void;
  toggleFocusMode: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const getInitialRoute = (): string => {
    try {
      if (typeof window !== 'undefined' && window.location.hash) {
        const hash = window.location.hash.slice(1).split('?')[0];
        if (hash) return hash;
      }
      const saved = localStorage.getItem('semesteros_current_route');
      if (saved) return saved;
    } catch (e) {}
    return 'dashboard';
  };

  const getInitialSubject = (): string | null => {
    try {
      if (typeof window !== 'undefined' && window.location.hash && window.location.hash.includes('subject=')) {
        const params = new URLSearchParams(window.location.hash.split('?')[1]);
        const sub = params.get('subject');
        if (sub) return sub;
      }
    } catch (e) {}
    return null;
  };

  const getInitialQuestion = (): string | null => {
    try {
      if (typeof window !== 'undefined' && window.location.hash && window.location.hash.includes('q=')) {
        const params = new URLSearchParams(window.location.hash.split('?')[1]);
        const q = params.get('q');
        if (q) return q;
      }
    } catch (e) {}
    return null;
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(getInitialSubject);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(getInitialQuestion);
  const [activeYear, setActiveYear] = useState<string | null>('all');
  const [studyMode, setStudyMode] = useState<'read' | 'recall' | 'flashcards' | 'memorize' | 'simple'>('read');
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress);

  // Sync route to hash and localStorage
  useEffect(() => {
    try {
      localStorage.setItem('semesteros_current_route', currentRoute);
      if (typeof window !== 'undefined') {
        const currentHash = window.location.hash.slice(1).split('?')[0];
        if (currentHash !== currentRoute) {
          window.location.hash = currentRoute;
        }
      }
    } catch (e) {}
  }, [currentRoute]);

  // Handle browser back/forward and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash.slice(1).split('?')[0];
      if (hash && hash !== currentRoute) {
        setCurrentRoute(hash);
      }
      if (window.location.hash.includes('?')) {
        const params = new URLSearchParams(window.location.hash.split('?')[1]);
        const sub = params.get('subject');
        const q = params.get('q');
        if (sub) setActiveSubjectId(sub);
        if (q) setActiveQuestionId(q);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentRoute]);

  // Pomodoro State
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroTimeLeft, setPomodoroTimeLeft] = useState(25 * 60);
  const [pomodoroMode, setPomodoroMode] = useState<'work' | 'break'>('work');
  const [pomodoroFocusMode, setPomodoroFocusMode] = useState(false);

  // Automatically adapt theme to system mode setting in real-time
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    // Purge any legacy manual theme overrides
    try {
      localStorage.removeItem('semesteros_theme_v1');
    } catch (e) {}

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = (matches: boolean) => {
      const mode = matches ? 'dark' : 'light';
      setTheme(mode);
      if (matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    updateTheme(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => updateTheme(e.matches);
    try {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } catch (err) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Persist progress
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save user progress:', e);
    }
  }, [progress]);

  // Pomodoro Timer loop
  useEffect(() => {
    let interval: any = null;
    if (pomodoroActive && pomodoroTimeLeft > 0) {
      interval = setInterval(() => {
        setPomodoroTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (pomodoroActive && pomodoroTimeLeft === 0) {
      // Switch mode
      if (pomodoroMode === 'work') {
        setPomodoroMode('break');
        setPomodoroTimeLeft(5 * 60);
        setProgress(prev => ({
          ...prev,
          pomodoroSessionsCompleted: prev.pomodoroSessionsCompleted + 1
        }));
      } else {
        setPomodoroMode('work');
        setPomodoroTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [pomodoroActive, pomodoroTimeLeft, pomodoroMode]);

  const getTodayStr = () => new Date().toISOString().split('T')[0];

  const markQuestionStatus = (questionId: string, status: StudyStatus) => {
    const today = getTodayStr();
    setProgress(prev => {
      const updatedActivity = { ...(prev.dailyActivity[today] || { questionsStudied: 0, flashcardsReviewed: 0, testsCompleted: 0, studySeconds: 0 }) };
      if (status !== 'unstudied' && prev.studiedQuestions[questionId] !== status) {
        updatedActivity.questionsStudied += 1;
      }
      return {
        ...prev,
        studiedQuestions: { ...prev.studiedQuestions, [questionId]: status },
        dailyActivity: { ...prev.dailyActivity, [today]: updatedActivity }
      };
    });
  };

  const toggleBookmark = (questionId: string) => {
    setProgress(prev => {
      const isBookmarked = prev.bookmarkedIds.includes(questionId);
      const updated = isBookmarked
        ? prev.bookmarkedIds.filter(id => id !== questionId)
        : [...prev.bookmarkedIds, questionId];
      return { ...prev, bookmarkedIds: updated };
    });
  };

  const saveNote = (questionId: string, note: string) => {
    setProgress(prev => ({
      ...prev,
      notes: { ...prev.notes, [questionId]: note }
    }));
  };

  const deleteNote = (questionId: string) => {
    setProgress(prev => {
      const copy = { ...prev.notes };
      delete copy[questionId];
      return { ...prev, notes: copy };
    });
  };

  const saveHighlight = (questionId: string, text: string) => {
    setProgress(prev => {
      const current = prev.highlights[questionId] || [];
      if (!current.includes(text)) {
        return {
          ...prev,
          highlights: { ...prev.highlights, [questionId]: [...current, text] }
        };
      }
      return prev;
    });
  };

  const removeHighlight = (questionId: string, text: string) => {
    setProgress(prev => {
      const current = prev.highlights[questionId] || [];
      return {
        ...prev,
        highlights: { ...prev.highlights, [questionId]: current.filter(t => t !== text) }
      };
    });
  };

  // Canonical SuperMemo SM-2 Spaced Repetition Implementation
  const recordRecallRating = (questionId: string, rating: RecallRating, subjectId: string) => {
    const today = getTodayStr();
    setProgress(prev => {
      const existing = prev.revisionQueue[questionId] || {
        questionId,
        subjectId,
        nextReviewDate: today,
        intervalDays: 1,
        repetitions: 0,
        easeFactor: 2.5,
        history: []
      };

      const { updatedItem, newStatus } = calculateCanonicalSM2(existing, rating);

      const updatedActivity = { ...(prev.dailyActivity[today] || { questionsStudied: 0, flashcardsReviewed: 0, testsCompleted: 0, studySeconds: 0 }) };
      updatedActivity.flashcardsReviewed += 1;

      return {
        ...prev,
        revisionQueue: { ...prev.revisionQueue, [questionId]: updatedItem },
        studiedQuestions: { ...prev.studiedQuestions, [questionId]: newStatus },
        dailyActivity: { ...prev.dailyActivity, [today]: updatedActivity }
      };
    });
  };

  const saveTestAttempt = (attempt: Omit<TestAttempt, 'id' | 'timestamp'>) => {
    const today = getTodayStr();
    const newAttempt: TestAttempt = {
      ...attempt,
      id: 'test-' + Date.now(),
      timestamp: new Date().toISOString()
    };
    setProgress(prev => {
      const updatedActivity = { ...(prev.dailyActivity[today] || { questionsStudied: 0, flashcardsReviewed: 0, testsCompleted: 0, studySeconds: 0 }) };
      updatedActivity.testsCompleted += 1;
      return {
        ...prev,
        testHistory: [newAttempt, ...prev.testHistory],
        dailyActivity: { ...prev.dailyActivity, [today]: updatedActivity }
      };
    });
  };

  const recordStudyTime = (subjectId: string, seconds: number) => {
    const today = getTodayStr();
    setProgress(prev => {
      const currentSeconds = prev.studyTimeSeconds[subjectId] || 0;
      const updatedActivity = { ...(prev.dailyActivity[today] || { questionsStudied: 0, flashcardsReviewed: 0, testsCompleted: 0, studySeconds: 0 }) };
      updatedActivity.studySeconds += seconds;
      return {
        ...prev,
        studyTimeSeconds: { ...prev.studyTimeSeconds, [subjectId]: currentSeconds + seconds },
        dailyActivity: { ...prev.dailyActivity, [today]: updatedActivity }
      };
    });
  };

  const updateDailyGoals = (goals: Partial<UserProgress['dailyGoals']>) => {
    setProgress(prev => ({
      ...prev,
      dailyGoals: { ...prev.dailyGoals, ...goals }
    }));
  };

  const setExamDate = (subjectId: string, dateStr: string) => {
    setProgress(prev => ({
      ...prev,
      examDates: { ...prev.examDates, [subjectId]: dateStr }
    }));
  };

  const exportData = () => {
    return JSON.stringify(progress, null, 2);
  };

  const importData = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === 'object') {
        setProgress(parsed);
        return true;
      }
    } catch (e) {
      console.error('Import failed:', e);
    }
    return false;
  };

  const resetProgress = () => {
    const initial = getInitialProgress();
    setProgress(initial);
    localStorage.removeItem(STORAGE_KEY);
  };

  const startPomodoro = () => setPomodoroActive(true);
  const pausePomodoro = () => setPomodoroActive(false);
  const resetPomodoro = () => {
    setPomodoroActive(false);
    setPomodoroTimeLeft(pomodoroMode === 'work' ? 25 * 60 : 5 * 60);
  };
  const toggleFocusMode = () => setPomodoroFocusMode(prev => !prev);

  return (
    <AppContext.Provider
      value={{
        theme,
        currentRoute,
        setCurrentRoute,
        activeSubjectId,
        setActiveSubjectId,
        activeQuestionId,
        setActiveQuestionId,
        activeYear,
        setActiveYear,
        studyMode,
        setStudyMode,
        progress,
        markQuestionStatus,
        toggleBookmark,
        saveNote,
        deleteNote,
        saveHighlight,
        removeHighlight,
        recordRecallRating,
        saveTestAttempt,
        recordStudyTime,
        updateDailyGoals,
        setExamDate,
        exportData,
        importData,
        resetProgress,
        pomodoroActive,
        pomodoroTimeLeft,
        pomodoroMode,
        pomodoroFocusMode,
        startPomodoro,
        pausePomodoro,
        resetPomodoro,
        toggleFocusMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

