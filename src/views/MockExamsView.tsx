import React, { useState, useEffect, useMemo } from 'react';
import { 
  Award, 
  Calendar, 
  Clock, 
  FileCheck, 
  AlertCircle, 
  Play, 
  Eye, 
  CheckCircle2, 
  ChevronRight,
  BookOpen,
  CheckSquare,
  Square,
  Sparkles,
  RotateCcw,
  Layers,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { getAllSubjects, getQuestionsBySubject } from '../data/pyqData';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

export const MockExamsView: React.FC = () => {
  const { setActiveSubjectId, setActiveQuestionId, setCurrentRoute, setStudyMode, saveTestAttempt } = useApp() as any;
  const allSubjects = getAllSubjects();

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('computer-networks');
  const [selectedYear, setSelectedYear] = useState<string>('2025');
  const [isExamRunning, setIsExamRunning] = useState<boolean>(false);
  const [examCompleted, setExamCompleted] = useState<boolean>(false);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(3 * 3600); // 3 hours
  const [attemptMode, setAttemptMode] = useState<'official5' | 'all'>('official5');

  // Selected questions map for "Answer Any 5" rule
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Record<string, boolean>>({});
  const [writtenAnswers, setWrittenAnswers] = useState<Record<string, string>>({});
  const [selfScores, setSelfScores] = useState<Record<string, number>>({});

  const currentSubject = allSubjects.find(s => s.id === selectedSubjectId) || allSubjects[0];
  const examQuestions = getQuestionsBySubject(currentSubject.id, selectedYear);

  // Group exam questions by main question number, sorted numerically
  const questionGroups = useMemo(() => {
    const groups: Record<string, typeof examQuestions> = {};
    examQuestions.forEach(q => {
      const match = q.questionNumber.match(/Q(?:uestion)?\s*(\d+)/i);
      const groupNum = match ? parseInt(match[1], 10) : 1;
      const groupKey = `Question ${groupNum}`;
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(q);
    });

    // Sort subquestions inside each group alphabetically (a, b, c, or, short notes)
    Object.keys(groups).forEach(k => {
      groups[k].sort((a, b) => a.questionNumber.localeCompare(b.questionNumber));
    });

    return groups;
  }, [examQuestions]);

  // Numerically sort group keys (Question 1, Question 2, ..., Question 7 / 8)
  const groupKeys = useMemo(() => {
    return Object.keys(questionGroups).sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, ''), 10) || 0;
      const numB = parseInt(b.replace(/\D/g, ''), 10) || 0;
      return numA - numB;
    });
  }, [questionGroups]);

  const totalMainQuestions = groupKeys.length;
  // Authentic target: answer 5 questions (or totalMainQuestions if paper has fewer than 5)
  const targetAttemptCount = Math.min(5, totalMainQuestions);

  // When subject or year changes, reset selection
  useEffect(() => {
    setSelectedQuestionIds({});
    setWrittenAnswers({});
    setSelfScores({});
  }, [selectedSubjectId, selectedYear]);

  // Start Exam Handler
  const handleStartExam = () => {
    const initialSelected: Record<string, boolean> = {};
    if (attemptMode === 'official5') {
      // Auto-select first targetAttemptCount questions by default
      groupKeys.slice(0, targetAttemptCount).forEach(k => { initialSelected[k] = true; });
    } else {
      // Comprehensive practice: select all
      groupKeys.forEach(k => { initialSelected[k] = true; });
    }
    setSelectedQuestionIds(initialSelected);
    setTimeRemainingSeconds(3 * 3600);
    setIsExamRunning(true);
    setExamCompleted(false);
  };

  // Timer Tick
  useEffect(() => {
    let timer: any = null;
    if (isExamRunning && timeRemainingSeconds > 0) {
      timer = setInterval(() => {
        setTimeRemainingSeconds(prev => prev - 1);
      }, 1000);
    } else if (isExamRunning && timeRemainingSeconds === 0) {
      handleCompleteExam();
    }
    return () => clearInterval(timer);
  }, [isExamRunning, timeRemainingSeconds]);

  const toggleGroupSelection = (groupKey: string) => {
    if (attemptMode !== 'official5') return;
    const currentCount = Object.values(selectedQuestionIds).filter(Boolean).length;
    if (!selectedQuestionIds[groupKey] && currentCount >= targetAttemptCount) {
      alert(`Official university attempt rule limits submission to ${targetAttemptCount} questions out of ${totalMainQuestions}. Deselect another question first.`);
      return;
    }
    setSelectedQuestionIds(prev => ({ ...prev, [groupKey]: !prev[groupKey] }));
  };

  const handleCompleteExam = () => {
    setIsExamRunning(false);
    setExamCompleted(true);
    try {
      confetti({ particleCount: 120, spread: 75, origin: { y: 0.6 } });
    } catch (e) {}

    const selectedCount = Object.values(selectedQuestionIds).filter(Boolean).length;
    const maxScore = attemptMode === 'official5' ? targetAttemptCount * 14 : totalMainQuestions * 14;
    const computedScore = selectedCount * 14;
    const percentage = Math.min(100, Math.round((computedScore / maxScore) * 100));

    saveTestAttempt({
      subjectId: currentSubject.id,
      subjectName: currentSubject.name,
      testType: 'MOCK_EXAM',
      title: `${currentSubject.name} - ${selectedYear} Mock Examination (${attemptMode === 'official5' ? 'Official 5-Q Rule' : 'Comprehensive'})`,
      score: computedScore,
      maxScore,
      percentage,
      timeSpentSeconds: 3 * 3600 - timeRemainingSeconds,
      totalQuestions: selectedCount,
      correctAnswers: selectedCount,
      incorrectAnswers: 0
    });
  };

  const formatHoursMinutes = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h}h ${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const selectedCount = Object.values(selectedQuestionIds).filter(Boolean).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">University Mock Examination Engine</h1>
        <p className="text-xs md:text-sm text-slate-500">
          Paper-specific 3-hour university simulation following authentic question counts, marks, and attempt rules.
        </p>
      </div>

      {!isExamRunning && !examCompleted && (
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          {/* Subject Picker */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">1. Select Examination Subject</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {allSubjects.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedSubjectId(s.id); setSelectedYear(s.years[0]); }}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedSubjectId === s.id
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold text-slate-400">{s.code}</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{s.name}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{s.years.length} Papers ({s.years.join(', ')})</div>
                </button>
              ))}
            </div>
          </div>

          {/* Paper / Year Picker */}
          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">2. Select Examination Paper</label>
            <div className="flex flex-wrap gap-2">
              {currentSubject.years.map(yr => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedYear === yr
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {yr} Annual Examination
                </button>
              ))}
            </div>
          </div>

          {/* Paper Structure Metadata Banner */}
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span><strong>Paper Structure:</strong> {currentSubject.name} ({selectedYear}) contains <strong>{totalMainQuestions} Main Questions</strong> ({groupKeys[0]} through {groupKeys[groupKeys.length - 1]}).</span>
            </div>
            <span className="font-mono font-bold bg-blue-200 dark:bg-blue-900 px-2.5 py-1 rounded-lg">
              {examQuestions.length} Total Subquestions
            </span>
          </div>

          {/* Mode Selector */}
          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">3. Select Examination Mode</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => setAttemptMode('official5')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  attemptMode === 'official5'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="font-bold text-slate-900 dark:text-white">
                  Original-Paper Simulation Mode (Attempt Any {targetAttemptCount} of {totalMainQuestions})
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Enforces strict university attempt limit (70 Marks = {targetAttemptCount} questions &times; 14 marks).
                </div>
              </button>
              <button
                onClick={() => setAttemptMode('all')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  attemptMode === 'all'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="font-bold text-slate-900 dark:text-white">
                  Comprehensive Practice Mode (All {totalMainQuestions} Questions)
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Practice drafting solutions for every question, subquestion, and OR alternative ({totalMainQuestions * 14} Marks).
                </div>
              </button>
            </div>
          </div>

          {/* University Instructions Card */}
          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2 text-xs">
            <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 uppercase">
              <AlertCircle className="w-4 h-4" />
              <span>Official University Examination Instructions</span>
            </div>
            <ul className="space-y-1 text-slate-700 dark:text-slate-300 list-disc pl-4">
              <li><strong>Time:</strong> 3 Hours (180 Minutes). <strong>Full Marks:</strong> 70.</li>
              <li><strong>Instructions:</strong> Candidates are required to give their answers in their own words as far as practicable.</li>
              <li><strong>Paper Attempt Rule:</strong> Answer any <strong>FIVE</strong> questions out of {totalMainQuestions} (14 marks each).</li>
              <li>Subquestions typically carry 7 marks each. For questions with internal OR alternatives, answer either option.</li>
            </ul>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleStartExam}
              className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              <span>Begin 3-Hour Timed Mock Exam ({selectedYear} Annual)</span>
            </button>
          </div>
        </div>
      )}

      {/* Running Mock Examination */}
      {isExamRunning && (
        <div className="space-y-6">
          {/* Sticky Status Bar */}
          <div className="sticky top-16 z-20 p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold font-mono uppercase text-blue-600 dark:text-blue-400">
                {currentSubject.code} • {selectedYear} ANNUAL EXAMINATION
              </span>
              <h2 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                {currentSubject.name} — Full Question Paper
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {attemptMode === 'official5' ? (
                <div className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                  selectedCount === targetAttemptCount 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' 
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                }`}>
                  Selected: {selectedCount} / {targetAttemptCount} Questions
                </div>
              ) : (
                <div className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  Attempting All {totalMainQuestions} Questions
                </div>
              )}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                <Clock className="w-4 h-4" />
                <span>{formatHoursMinutes(timeRemainingSeconds)}</span>
              </div>
              <button
                onClick={handleCompleteExam}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
              >
                Submit Paper
              </button>
            </div>
          </div>

          {/* Question Groups Accordion / List */}
          <div className="space-y-6">
            {groupKeys.map(groupKey => {
              const subQuestions = questionGroups[groupKey];
              const isSelected = !!selectedQuestionIds[groupKey];
              const hasOrAlternative = subQuestions.some(q => q.questionCategory === 'or_option' || q.questionText.toLowerCase().includes('or') || q.questionNumber.toLowerCase().includes('or'));
              const hasShortNotes = subQuestions.some(q => q.questionCategory === 'short_note' || q.questionText.toLowerCase().includes('short note'));

              return (
                <div
                  key={groupKey}
                  className={`p-6 rounded-3xl border transition-all space-y-4 ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-blue-500/40 shadow-md ring-1 ring-blue-500/10'
                      : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      {attemptMode === 'official5' && (
                        <button
                          onClick={() => toggleGroupSelection(groupKey)}
                          className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline"
                        >
                          {isSelected ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                          <span>{isSelected ? `Selected for Attempt (${groupKey})` : `Not Selected (Click to Attempt)`}</span>
                        </button>
                      )}
                      {attemptMode === 'all' && (
                        <span className="font-black text-sm text-slate-900 dark:text-white">{groupKey}</span>
                      )}
                      {hasOrAlternative && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] font-bold">
                          Includes Internal OR Alternative
                        </span>
                      )}
                      {hasShortNotes && (
                        <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-bold">
                          Short-Notes Choice
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">14 Marks Total</span>
                  </div>

                  {/* Sub-questions under this main question */}
                  <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {subQuestions.map(q => {
                      const isOr = q.questionCategory === 'or_option' || q.questionText.toLowerCase().includes('or') || q.questionNumber.toLowerCase().includes('or');
                      return (
                        <div 
                          key={q.id} 
                          className={`p-4 rounded-2xl border space-y-3 ${
                            isOr 
                              ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40' 
                              : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700/60'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 font-mono font-bold text-[11px]">
                                  {q.questionNumber}
                                </span>
                                {isOr && (
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                                    [Internal Alternative]
                                  </span>
                                )}
                              </div>
                              <h3 className="text-sm font-bold text-slate-900 dark:text-white pt-1">
                                {q.questionText}
                              </h3>
                            </div>
                            <span className="text-xs font-bold text-slate-400 flex-shrink-0">
                              [{q.marks} Marks]
                            </span>
                          </div>

                          {isSelected && (
                            <div className="space-y-2 pt-2">
                              <label className="text-[11px] font-bold text-slate-400">Your Solution / Exam Draft:</label>
                              <textarea
                                value={writtenAnswers[q.id] || ''}
                                onChange={e => setWrittenAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                                rows={4}
                                placeholder="Draft your university examination answer (headings, definitions, steps)..."
                                className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                              />
                              <div className="flex justify-between items-center pt-1">
                                <span className="text-[11px] text-slate-400">{q.module}</span>
                                <button
                                  onClick={() => {
                                    setActiveSubjectId(q.subjectId);
                                    setActiveQuestionId(q.id);
                                    setStudyMode('read');
                                    setCurrentRoute('study-room');
                                  }}
                                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                                >
                                  <span>Inspect Reference Answer</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Exam Completed Review */}
      {examCompleted && (
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Mock Examination Completed!</h2>
              <p className="text-xs text-slate-500 mt-1">
                {currentSubject.name} — {selectedYear} Annual Paper ({attemptMode === 'official5' ? `Answer Any ${targetAttemptCount} Mode` : 'Comprehensive Practice Mode'}).
              </p>
            </div>

            <div className="flex justify-center gap-6 pt-2">
              <div className="text-center">
                <div className="text-3xl font-black text-blue-600">
                  {selectedCount * 14} / {attemptMode === 'official5' ? targetAttemptCount * 14 : totalMainQuestions * 14}
                </div>
                <div className="text-[11px] font-bold uppercase text-slate-400 mt-0.5">Attempted Marks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-purple-600">{formatHoursMinutes(3 * 3600 - timeRemainingSeconds)}</div>
                <div className="text-[11px] font-bold uppercase text-slate-400 mt-0.5">Time Consumed</div>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => { setExamCompleted(false); setIsExamRunning(false); }}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md"
              >
                Attempt Another Mock Paper
              </button>
              <button
                onClick={() => setCurrentRoute('dashboard')}
                className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
