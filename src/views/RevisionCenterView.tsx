import React from 'react';
import { 
  Repeat, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  BrainCircuit, 
  Flame,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getAllQuestions, getQuestionById } from '../data/pyqData';

export const RevisionCenterView: React.FC = () => {
  const { 
    progress, 
    setActiveSubjectId, 
    setActiveQuestionId, 
    setCurrentRoute, 
    setStudyMode 
  } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];
  const allQuestions = getAllQuestions();

  // Categorize questions from revisionQueue
  const dueTodayQuestions = Object.values(progress.revisionQueue).filter(item => item.nextReviewDate <= todayStr);
  const overdueQuestions = Object.values(progress.revisionQueue).filter(item => item.nextReviewDate < todayStr);
  const upcomingQuestions = Object.values(progress.revisionQueue).filter(item => item.nextReviewDate > todayStr);
  const difficultQuestions = Object.values(progress.revisionQueue).filter(item => item.easeFactor < 2.0 || item.history.some(h => h.rating === 'again'));
  const masteredQuestions = Object.values(progress.revisionQueue).filter(item => item.repetitions >= 3 && item.easeFactor >= 2.5);

  const handleStartReview = (questionId: string, subjectId: string) => {
    setActiveSubjectId(subjectId);
    setActiveQuestionId(questionId);
    setStudyMode('recall');
    setCurrentRoute('study-room');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Smart Revision Center</h1>
        <p className="text-xs md:text-sm text-slate-500">
          SuperMemo SM-2 spaced repetition scheduler automatically predicts when you are about to forget a concept.
        </p>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-bold text-amber-500 uppercase">Due Today</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {dueTodayQuestions.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Scheduled for review</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-bold text-red-500 uppercase">Difficult / Forgotten</div>
          <div className="text-2xl font-black text-red-600 dark:text-red-400 mt-1">
            {difficultQuestions.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Required repeat recalls</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-bold text-blue-500 uppercase">Upcoming</div>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
            {upcomingQuestions.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Scheduled in next 7-30d</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-bold text-emerald-500 uppercase">Mastered (Long-term)</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {masteredQuestions.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Persistent retention</div>
        </div>
      </div>

      {/* Due Today Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Repeat className="w-4 h-4 text-amber-500" />
            <span>Questions Due for Review Today ({dueTodayQuestions.length})</span>
          </h2>
          {dueTodayQuestions.length > 0 && (
            <button
              onClick={() => handleStartReview(dueTodayQuestions[0].questionId, dueTodayQuestions[0].subjectId)}
              className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Start All Due Today</span>
            </button>
          )}
        </div>

        {dueTodayQuestions.length === 0 ? (
          <div className="p-8 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">All caught up for today!</h3>
            <p className="text-xs text-slate-400">
              No questions are due for revision right now. Start studying new questions or practice tests to expand your memory queue.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {dueTodayQuestions.map(item => {
              const q = getQuestionById(item.questionId);
              if (!q) return null;
              return (
                <div
                  key={item.questionId}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-blue-600">{q.courseCode}</span>
                      <span>•</span>
                      <span className="font-bold text-slate-400">{q.year} {q.questionNumber}</span>
                      <span>•</span>
                      <span className="text-[11px] text-amber-600 font-semibold">Interval: {item.intervalDays}d</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {q.questionText}
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartReview(q.id, q.subjectId)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 flex-shrink-0"
                  >
                    <span>Recall</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Weak Topics Analysis */}
      <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold text-sm">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          <span>Algorithmic Weak-Topic Detection</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Questions with repeated 'Again' or 'Hard' ratings are flagged here. Spend 15 minutes reviewing:
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {['CRC Modulo-2 Arithmetic', 'Two-Pass Assembler SYMTAB', 'CKY Chomsky Normal Form', 'Shannon/Nyquist Capacity', 'Histogram Equalization CDF', 'Stop-and-Wait ARQ Efficiency'].map(t => (
            <span key={t} className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
              ⚠️ {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

