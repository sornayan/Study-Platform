import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Award, 
  BookOpen, 
  Calendar, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getAllSubjects, getAllQuestions } from '../data/pyqData';

export const AnalyticsView: React.FC = () => {
  const { progress } = useApp();
  const subjects = getAllSubjects();
  const allQuestions = getAllQuestions();

  const studiedCount = Object.values(progress.studiedQuestions).filter(s => s === 'studied' || s === 'mastered').length;
  const masteredCount = Object.values(progress.studiedQuestions).filter(s => s === 'mastered').length;

  const totalStudySeconds = Object.values(progress.studyTimeSeconds).reduce((a, b) => a + b, 0);
  const totalStudyMinutes = Math.round(totalStudySeconds / 60);

  const testsCompleted = progress.testHistory.length;
  const avgTestScore = testsCompleted > 0
    ? Math.round(progress.testHistory.reduce((acc, t) => acc + t.percentage, 0) / testsCompleted)
    : 0;

  // Formula-driven exam readiness calculation
  const coveragePercent = Math.round((studiedCount / allQuestions.length) * 100);
  const masteryPercent = Math.round((masteredCount / allQuestions.length) * 100);
  const testWeight = testsCompleted > 0 ? avgTestScore * 0.3 : 0;
  const readinessIndex = Math.min(100, Math.round(coveragePercent * 0.4 + masteryPercent * 0.3 + testWeight));

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Progress & Exam Readiness Analytics</h1>
        <p className="text-xs md:text-sm text-slate-500">
          Real-time metrics computed directly from your saved study records, active recall ratings, and practice test attempts.
        </p>
      </div>

      {/* Readiness Hero Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white border border-indigo-800/40 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-indigo-400">
              Composite Readiness Formula
            </span>
            <h2 className="text-3xl md:text-4xl font-black">
              {readinessIndex}% Prepared
            </h2>
            <p className="text-xs md:text-sm text-indigo-200 max-w-md">
              Calculated using 40% syllabus question coverage, 30% long-term recall mastery, and 30% practice test accuracy.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-xl font-black text-emerald-400">{coveragePercent}%</div>
              <div className="text-[10px] uppercase font-bold text-slate-300">Coverage</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-xl font-black text-purple-400">{masteryPercent}%</div>
              <div className="text-[10px] uppercase font-bold text-slate-300">Mastery</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-xl font-black text-amber-400">{avgTestScore}%</div>
              <div className="text-[10px] uppercase font-bold text-slate-300">Test Avg</div>
            </div>
          </div>
        </div>

        <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 transition-all duration-700" 
            style={{ width: `${readinessIndex}%` }} 
          />
        </div>
      </div>

      {/* Subject-Wise Breakdown Table */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">Subject-Wise Preparation Breakdown</h3>

        <div className="space-y-4">
          {subjects.map(sub => {
            const subQuestions = sub.questions;
            const subStudied = subQuestions.filter(q => progress.studiedQuestions[q.id] === 'studied' || progress.studiedQuestions[q.id] === 'mastered').length;
            const subMastered = subQuestions.filter(q => progress.studiedQuestions[q.id] === 'mastered').length;
            const subPercent = Math.round((subStudied / subQuestions.length) * 100);

            return (
              <div key={sub.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs md:text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sub.color }} />
                    <span className="text-slate-900 dark:text-white">{sub.name} ({sub.code})</span>
                  </div>
                  <span className="font-mono text-slate-500">{subStudied} / {sub.totalQuestions} ({subPercent}%)</span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${subPercent}%`, backgroundColor: sub.color }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{subMastered} mastered with high recall</span>
                  <span>{sub.years.length} exam years covered</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Test Attempt History */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">Practice Test Attempt History</h3>

        {progress.testHistory.length === 0 ? (
          <p className="text-xs text-slate-400">No practice tests completed yet. Head to Practice Tests to record your first score.</p>
        ) : (
          <div className="space-y-2">
            {progress.testHistory.slice(0, 10).map((t, idx) => (
              <div key={t.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{t.title}</div>
                  <div className="text-[11px] text-slate-400">{new Date(t.timestamp).toLocaleDateString()} • {t.totalQuestions} Questions</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm text-blue-600">{t.score} / {t.maxScore} ({t.percentage}%)</div>
                  <div className="text-[10px] text-slate-400">{Math.round(t.timeSpentSeconds)}s</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

