import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  BrainCircuit, 
  Layers, 
  Sparkles, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Shuffle, 
  RotateCw, 
  Bookmark, 
  Edit3, 
  Flame, 
  Award,
  ArrowRight,
  ListChecks,
  Smile,
  Frown,
  Meh
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getAllSubjects, getQuestionsBySubject, getQuestionById } from '../data/pyqData';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { RecallRating, Question } from '../types';

export const StudyRoomView: React.FC = () => {
  const { 
    activeSubjectId, 
    setActiveSubjectId, 
    activeQuestionId, 
    setActiveQuestionId,
    studyMode, 
    setStudyMode,
    progress, 
    recordRecallRating, 
    toggleBookmark, 
    markQuestionStatus 
  } = useApp();

  const subjects = getAllSubjects();
  const currentSubject = subjects.find(s => s.id === activeSubjectId) || subjects[0];
  const subjectQuestions = useMemo(() => getQuestionsBySubject(currentSubject.id), [currentSubject.id]);

  // Current question index
  const currentIndex = useMemo(() => {
    if (!activeQuestionId) return 0;
    const idx = subjectQuestions.findIndex(q => q.id === activeQuestionId);
    return idx >= 0 ? idx : 0;
  }, [activeQuestionId, subjectQuestions]);

  const currentQuestion: Question | undefined = subjectQuestions[currentIndex] || subjectQuestions[0];

  // Active Recall state
  const [userWrittenAnswer, setUserWrittenAnswer] = useState<string>('');
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [selfScore, setSelfScore] = useState<RecallRating | null>(null);

  // Flashcard flip state
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);

  const nextQuestion = () => {
    if (currentIndex < subjectQuestions.length - 1) {
      setActiveQuestionId(subjectQuestions[currentIndex + 1].id);
      setIsAnswerRevealed(false);
      setUserWrittenAnswer('');
      setIsFlipped(false);
      setFlashcardIndex(0);
      setSelfScore(null);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setActiveQuestionId(subjectQuestions[currentIndex - 1].id);
      setIsAnswerRevealed(false);
      setUserWrittenAnswer('');
      setIsFlipped(false);
      setFlashcardIndex(0);
      setSelfScore(null);
    }
  };

  const handleSelfAssessment = (rating: RecallRating) => {
    if (!currentQuestion) return;
    setSelfScore(rating);
    recordRecallRating(currentQuestion.id, rating, currentQuestion.subjectId);
  };

  if (!currentQuestion) {
    return (
      <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        <p className="text-sm text-slate-500">No questions available for this subject.</p>
      </div>
    );
  }

  const isBookmarked = progress.bookmarkedIds.includes(currentQuestion.id);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Header: Subject Switcher & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <select
            value={currentSubject.id}
            onChange={e => {
              setActiveSubjectId(e.target.value);
              setActiveQuestionId(null);
            }}
            className="font-bold text-sm bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none"
          >
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
            ))}
          </select>
          <span className="text-xs text-slate-400">
            Question <strong>{currentIndex + 1}</strong> of <strong>{subjectQuestions.length}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-200"
            title="Previous Question"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextQuestion}
            disabled={currentIndex === subjectQuestions.length - 1}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-200"
            title="Next Question"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleBookmark(currentQuestion.id)}
            className={`p-2 rounded-xl ${isBookmarked ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600'}`}
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5 Study Modes Nav Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs font-bold">
        <button
          onClick={() => setStudyMode('read')}
          className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            studyMode === 'read' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>1. Read & Learn</span>
        </button>

        <button
          onClick={() => setStudyMode('recall')}
          className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            studyMode === 'recall' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>2. Active Recall</span>
        </button>

        <button
          onClick={() => setStudyMode('flashcards')}
          className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            studyMode === 'flashcards' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>3. Flashcard</span>
        </button>

        <button
          onClick={() => setStudyMode('memorize')}
          className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            studyMode === 'memorize' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>4. Key Points</span>
        </button>

        <button
          onClick={() => setStudyMode('simple')}
          className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            studyMode === 'simple' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>5. Explain Simply</span>
        </button>
      </div>

      {/* Main Learning Card */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Question Banner */}
        <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40">
              {currentQuestion.year} Annual • {currentQuestion.questionNumber}
            </span>
            <span className="text-xs font-bold text-slate-500">
              {currentQuestion.marks} Marks
            </span>
            <span className="text-xs text-slate-400">• {currentQuestion.module}</span>
          </div>

          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-snug">
            {currentQuestion.questionText}
          </h2>
        </div>

        {/* MODE 1: Read & Understand Mode */}
        {studyMode === 'read' && (
          <div className="p-3 sm:p-6 md:p-8 space-y-4 md:space-y-6 overflow-x-auto">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Full Official 7-Mark Examination Solution</span>
              <button
                onClick={() => markQuestionStatus(currentQuestion.id, 'mastered')}
                className="font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark as Mastered</span>
              </button>
            </div>
            <MarkdownRenderer content={currentQuestion.answerMarkdown} />
          </div>
        )}

        {/* MODE 2: Active Recall Mode (Flagship Learning Feature!) */}
        {studyMode === 'recall' && (
          <div className="p-3 sm:p-6 md:p-8 space-y-4 md:space-y-6">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase">
                <BrainCircuit className="w-4 h-4" />
                <span>Active Recall Protocol</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Do not peek at the answer yet. Type or write down the key steps, definitions, formulas, and headings you remember from memory. Then click <strong>"Reveal & Compare"</strong> to score yourself.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                Your Recalled Answer / Expected Exam Points:
              </label>
              <textarea
                value={userWrittenAnswer}
                onChange={e => setUserWrittenAnswer(e.target.value)}
                placeholder="Type your answer here from memory (definitions, steps, diagrams, comparisons)..."
                rows={5}
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setIsAnswerRevealed(prev => !prev)}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all"
              >
                {isAnswerRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{isAnswerRevealed ? 'Hide Reference Answer' : 'Reveal & Compare Reference Answer'}</span>
              </button>
            </div>

            {isAnswerRevealed && (
              <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800 animate-fadeIn">
                {/* Concept Checklist */}
                {currentQuestion.keyPoints.length > 0 && (
                  <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-3">
                    <div className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase flex items-center gap-1.5">
                      <ListChecks className="w-4 h-4 text-blue-600" />
                      <span>Comparison Checklist: Did your answer include these?</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      {currentQuestion.keyPoints.map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-white/60 dark:bg-slate-900/60">
                          <input type="checkbox" className="mt-0.5 rounded text-blue-600" />
                          <span className="text-slate-700 dark:text-slate-300">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Self-Assessment Scoring (SM-2 Spaced Repetition) */}
                <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/80 space-y-3 text-center">
                  <div className="text-xs font-bold uppercase text-slate-600 dark:text-slate-300">
                    How well did you recall this answer? (Spaced Repetition Scheduler)
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-lg mx-auto">
                    <button
                      onClick={() => handleSelfAssessment('again')}
                      className={`p-3 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                        selfScore === 'again' ? 'bg-red-600 text-white' : 'bg-white dark:bg-slate-900 text-red-600 hover:bg-red-50'
                      }`}
                    >
                      <Frown className="w-5 h-5" />
                      <span>Forgot (Again)</span>
                      <span className="text-[10px] opacity-70">Review today</span>
                    </button>

                    <button
                      onClick={() => handleSelfAssessment('hard')}
                      className={`p-3 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                        selfScore === 'hard' ? 'bg-amber-600 text-white' : 'bg-white dark:bg-slate-900 text-amber-600 hover:bg-amber-50'
                      }`}
                    >
                      <Meh className="w-5 h-5" />
                      <span>Hard</span>
                      <span className="text-[10px] opacity-70">Review in 1-2d</span>
                    </button>

                    <button
                      onClick={() => handleSelfAssessment('good')}
                      className={`p-3 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                        selfScore === 'good' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-900 text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Smile className="w-5 h-5" />
                      <span>Good</span>
                      <span className="text-[10px] opacity-70">Review in 3d</span>
                    </button>

                    <button
                      onClick={() => handleSelfAssessment('easy')}
                      className={`p-3 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                        selfScore === 'easy' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-slate-900 text-emerald-600 hover:bg-emerald-50'
                      }`}
                    >
                      <Award className="w-5 h-5" />
                      <span>Mastered (Easy)</span>
                      <span className="text-[10px] opacity-70">Review in 6d</span>
                    </button>
                  </div>
                </div>

                {/* Complete Reference Answer */}
                <div className="pt-4 space-y-2">
                  <div className="font-bold text-xs uppercase text-slate-400">Complete Reference Solution:</div>
                  <MarkdownRenderer content={currentQuestion.answerMarkdown} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODE 3: Flashcard Mode */}
        {studyMode === 'flashcards' && (
          <div className="p-6 md:p-12 space-y-8 flex flex-col items-center">
            {currentQuestion.flashcards.length > 0 ? (
              <div className="w-full max-w-lg space-y-4">
                <div
                  onClick={() => setIsFlipped(prev => !prev)}
                  className="min-h-[260px] p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 border-2 border-dashed border-blue-400/40 flex flex-col justify-between cursor-pointer hover:border-blue-500 transition-all select-none shadow-sm"
                >
                  <div className="flex justify-between items-center text-xs font-bold text-blue-600 dark:text-blue-400">
                    <span>{isFlipped ? 'BACK (ANSWER)' : 'FRONT (PROMPT)'}</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <RotateCw className="w-3.5 h-3.5" />
                      Click to Flip
                    </span>
                  </div>

                  <div className="py-6 text-center">
                    <p className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                      {isFlipped 
                        ? currentQuestion.flashcards[flashcardIndex % currentQuestion.flashcards.length].back
                        : currentQuestion.flashcards[flashcardIndex % currentQuestion.flashcards.length].front}
                    </p>
                  </div>

                  <div className="text-center text-[11px] text-slate-400">
                    Card {flashcardIndex + 1} of {currentQuestion.flashcards.length}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setIsFlipped(prev => !prev)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    Flip Card
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSelfAssessment('again')}
                      className="px-4 py-2 rounded-xl bg-red-100 dark:bg-red-950 text-red-600 text-xs font-bold"
                    >
                      Need Review
                    </button>
                    <button
                      onClick={() => handleSelfAssessment('easy')}
                      className="px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 text-xs font-bold"
                    >
                      Known
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400">No flashcards available for this question.</p>
            )}
          </div>
        )}

        {/* MODE 4: Key Point Memorization Mode */}
        {studyMode === 'memorize' && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/50 space-y-1">
              <div className="text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>High-Yield Examination Core Points</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Master these essential concepts first to guarantee full 7-mark coverage.
              </p>
            </div>

            <div className="space-y-3">
              {currentQuestion.keyPoints.map((pt, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {pt}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODE 5: Explain It Simply Mode */}
        {studyMode === 'simple' && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-800 border border-emerald-200 dark:border-slate-700 space-y-2">
              <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>Intuitive Explanation & Real-World Analogy</span>
              </div>
              <p className="text-sm md:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {currentQuestion.simplifiedExplanation}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Exam Advice:</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Use the intuitive mental model above to remember the concept during the exam, then structure your written university paper using the formal technical terms from the <strong>Read & Learn</strong> reference answer.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Bar */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-xs text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Question</span>
        </button>

        <button
          onClick={nextQuestion}
          disabled={currentIndex === subjectQuestions.length - 1}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-xs text-white shadow-md shadow-blue-500/20 disabled:opacity-40 flex items-center gap-1.5"
        >
          <span>Next Question</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

