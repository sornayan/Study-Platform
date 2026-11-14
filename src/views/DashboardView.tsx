import React from 'react';
import { 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Clock, 
  Repeat, 
  Flame, 
  Target, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Play, 
  BrainCircuit, 
  Calendar,
  AlertCircle,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getAllSubjects, getAllQuestions } from '../data/pyqData';

export const DashboardView: React.FC = () => {
  const { 
    progress, 
    setCurrentRoute, 
    setActiveSubjectId, 
    setActiveQuestionId, 
    setStudyMode 
  } = useApp();

  const subjects = getAllSubjects();
  const allQuestions = getAllQuestions();

  const studiedCount = Object.values(progress.studiedQuestions).filter(s => s === 'studied' || s === 'mastered').length;
  const masteredCount = Object.values(progress.studiedQuestions).filter(s => s === 'mastered').length;
  const revisionDueCount = Object.values(progress.revisionQueue).filter(item => {
    const today = new Date().toISOString().split('T')[0];
    return item.nextReviewDate <= today;
  }).length;

  const totalStudySeconds = Object.values(progress.studyTimeSeconds).reduce((a, b) => a + b, 0);
  const totalStudyMinutes = Math.round(totalStudySeconds / 60);

  const testsCompleted = progress.testHistory.length;
  const avgTestScore = testsCompleted > 0
    ? Math.round(progress.testHistory.reduce((acc, t) => acc + t.percentage, 0) / testsCompleted)
    : 0;

  // Overall readiness index
  const coveragePercent = Math.round((studiedCount / allQuestions.length) * 100);
  const masteryPercent = Math.round((masteredCount / allQuestions.length) * 100);
  const testWeight = testsCompleted > 0 ? avgTestScore * 0.3 : 0;
  const readinessIndex = Math.min(100, Math.round(coveragePercent * 0.4 + masteryPercent * 0.3 + testWeight));

  const handleResumeSubject = (subjectId: string) => {
    setActiveSubjectId(subjectId);
    setCurrentRoute('library');
  };

  const handleStartRevision = () => {
    setCurrentRoute('revision');
  };

  const todayStr = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 md:p-8 shadow-xl shadow-blue-500/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>{todayStr}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Welcome back to SemesterOS
            </h1>
            <p className="text-sm md:text-base text-blue-100 max-w-xl leading-relaxed">
              You have <strong className="text-white">{allQuestions.length} verified university PYQs</strong> across 6 subjects ready for your B.Tech 6th Semester examination preparation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => { setStudyMode('recall'); setCurrentRoute('study-room'); }}
              className="px-5 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-xs md:text-sm shadow-md hover:bg-blue-50 transition-all flex items-center gap-2"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Active Recall</span>
            </button>
            <button
              onClick={() => setCurrentRoute('practice-tests')}
              className="px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs md:text-sm border border-white/20 transition-all flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Start Practice Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Exam Questions</span>
            <BookOpen className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {studiedCount} <span className="text-xs font-medium text-slate-400">/ {allQuestions.length}</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {coveragePercent}% Syllabus Questions Studied
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Mastered PYQs</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {masteredCount} <span className="text-xs font-medium text-slate-400">mastered</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            High recall confidence
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Due Revision</span>
            <Repeat className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
            {revisionDueCount} <span className="text-xs font-medium text-slate-400">due today</span>
          </div>
          <div className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer mt-1" onClick={handleStartRevision}>
            Start Spaced Revision →
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Exam Readiness</span>
            <TrendingUp className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
            {readinessIndex}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Weighted across coverage & tests
          </div>
        </div>
      </div>

      {/* Two Column Layout: Subject Overview & Daily Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Subject Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Semester VI Subjects</h2>
              <p className="text-xs text-slate-500">Official B.Tech CSE university examinations</p>
            </div>
            <button
              onClick={() => setCurrentRoute('subjects')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map(sub => {
              const subQuestions = sub.questions;
              const subStudied = subQuestions.filter(q => progress.studiedQuestions[q.id] === 'studied' || progress.studiedQuestions[q.id] === 'mastered').length;
              const subPercent = Math.round((subStudied / subQuestions.length) * 100);

              return (
                <div
                  key={sub.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold font-mono tracking-wider" style={{ backgroundColor: `${sub.color}20`, color: sub.color }}>
                        {sub.code}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {sub.years.length} Exam Years
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {sub.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {sub.totalQuestions} Questions • {sub.modules.length} Modules
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium text-slate-500">
                        <span>Progress</span>
                        <span>{subStudied} / {sub.totalQuestions} ({subPercent}%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500" 
                          style={{ width: `${subPercent}%`, backgroundColor: sub.color }} 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => handleResumeSubject(sub.id)}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>Study PYQs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { setActiveSubjectId(sub.id); setStudyMode('flashcards'); setCurrentRoute('study-room'); }}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold"
                    >
                      Flashcards
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Today's Study Plan & Revision Priority */}
        <div className="space-y-6">
          {/* Daily Goals Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-500" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Daily Study Targets</h3>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Target</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 dark:text-slate-400">Questions Studied</span>
                  <span className="text-slate-900 dark:text-white">{progress.dailyGoals.questionsTarget} target</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, (studiedCount / progress.dailyGoals.questionsTarget) * 100)}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 dark:text-slate-400">Flashcards Reviewed</span>
                  <span className="text-slate-900 dark:text-white">{progress.dailyGoals.flashcardsTarget} target</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `40%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 dark:text-slate-400">Practice Tests</span>
                  <span className="text-slate-900 dark:text-white">{testsCompleted} / {progress.dailyGoals.testsTarget}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${Math.min(100, (testsCompleted / progress.dailyGoals.testsTarget) * 100)}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Revision Recommendation */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-900 border border-amber-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <Sparkles className="w-4 h-4" />
              <h3 className="font-bold text-sm">Smart Exam Recommendation</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Based on historical paper patterns, <strong>CRC calculation</strong>, <strong>Two-Pass Assembler SYMTAB/OPTAB</strong>, <strong>CKY parsing algorithm</strong>, and <strong>Histogram Equalization</strong> repeat across multiple years. Practice these numericals first.
            </p>
            <button
              onClick={() => setCurrentRoute('last-minute-revision')}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <Zap className="w-4 h-4" />
              <span>Open High-Yield Review</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
