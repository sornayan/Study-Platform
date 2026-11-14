import React, { useState, useMemo, useEffect } from 'react';
import { 
  FileCheck2, 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCw, 
  ArrowRight, 
  Sparkles, 
  ChevronRight, 
  HelpCircle,
  Calculator,
  Compass,
  Play,
  Check,
  Flame,
  ListChecks,
  Eye,
  BarChart3,
  Layers,
  Zap,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { getAllSubjects, getQuestionsBySubject } from '../data/pyqData';
import { Question, PracticeQuestion, QuestionType } from '../types';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { EducationalDiagram } from '../components/EducationalDiagrams';

export const PracticeTestsView: React.FC = () => {
  const { 
    activeSubjectId, 
    setActiveSubjectId, 
    saveTestAttempt, 
    setCurrentRoute 
  } = useApp();

  const subjects = getAllSubjects();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(activeSubjectId || 'computer-networks');
  const [testType, setTestType] = useState<QuestionType>('mcq');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [timerMinutes, setTimerMinutes] = useState<number>(10);

  // Test Running State
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(600);
  const [userAnswers, setUserAnswers] = useState<Record<number, any>>({});
  const [selfScores, setSelfScores] = useState<Record<number, boolean>>({});

  // Active Questions in Test
  const [testQuestions, setTestQuestions] = useState<any[]>([]);

  // 10 Official Test Formats Configuration
  const TEST_FORMATS: { id: QuestionType; label: string; desc: string; icon: any }[] = [
    { id: 'mcq', label: '1. Multiple Choice (MCQ)', desc: 'Instant feedback with 4 syllabus-grounded options', icon: FileCheck2 },
    { id: 'tf', label: '2. True / False Statements', desc: 'Verify core theorems and common examination pitfalls', icon: CheckCircle2 },
    { id: 'fill', label: '3. Fill in the Blanks', desc: 'Recall key technical terminology with character hints', icon: HelpCircle },
    { id: 'match', label: '4. Matching Pairs', desc: 'Connect protocols, algorithms & layers to their definitions', icon: ListChecks },
    { id: 'oneline', label: '5. One-Line Direct Recall', desc: 'Immediate memory verification of definitions and formulas', icon: Zap },
    { id: 'short', label: '6. Short Answer (2–3 Marks)', desc: 'Concise 3-point technical summary with scoring checklist', icon: BookOpen },
    { id: 'long', label: '7. Long Answer (7 Marks)', desc: 'University paper drafting with 4-part marking rubric', icon: Award },
    { id: 'numerical', label: '8. Numerical Problems', desc: 'CRC polynomials, Hamming, Histograms & Subnetting', icon: Calculator },
    { id: 'diagram', label: '9. Diagram Recognition', desc: 'Identify architecture flows and visual schematics', icon: Compass },
    { id: 'rapid', label: '10. Rapid Revision Blitz', desc: 'High-speed randomized mixed drill for rapid recall', icon: Flame }
  ];

  // Start Test Generator
  const handleStartTest = () => {
    const rawQuestions = getQuestionsBySubject(selectedSubjectId);
    let generatedItems: any[] = [];

    if (testType === 'mcq') {
      rawQuestions.forEach(q => {
        const item = q.practiceQuestions.find(pq => pq.type === 'mcq');
        if (item) generatedItems.push({ ...item, originalQuestion: q });
      });
    } else if (testType === 'tf') {
      rawQuestions.forEach(q => {
        const item = q.practiceQuestions.find(pq => pq.type === 'tf');
        if (item) generatedItems.push({ ...item, originalQuestion: q });
      });
    } else if (testType === 'fill') {
      rawQuestions.forEach(q => {
        const item = q.practiceQuestions.find(pq => pq.type === 'fill');
        if (item) generatedItems.push({ ...item, originalQuestion: q });
      });
    } else if (testType === 'match') {
      rawQuestions.forEach(q => {
        const item = q.practiceQuestions.find(pq => pq.type === 'match');
        if (item) generatedItems.push({ ...item, originalQuestion: q });
      });
    } else if (testType === 'oneline') {
      rawQuestions.forEach(q => {
        const item = q.practiceQuestions.find(pq => pq.type === 'oneline');
        if (item) generatedItems.push({ ...item, originalQuestion: q });
      });
    } else if (testType === 'short') {
      rawQuestions.forEach(q => {
        const item = q.practiceQuestions.find(pq => pq.type === 'short');
        if (item) generatedItems.push({ ...item, originalQuestion: q });
      });
    } else if (testType === 'long') {
      rawQuestions.forEach(q => {
        const item = q.practiceQuestions.find(pq => pq.type === 'long');
        if (item) generatedItems.push({ ...item, originalQuestion: q });
      });
    } else if (testType === 'numerical') {
      const numQuestions = rawQuestions.filter(q => q.isNumerical);
      numQuestions.forEach(q => {
        const item = q.practiceQuestions.find(pq => pq.type === 'numerical');
        if (item) generatedItems.push({ ...item, originalQuestion: q, marks: q.marks });
      });
    } else if (testType === 'diagram') {
      const diagQuestions = rawQuestions.filter(q => q.hasDiagram);
      diagQuestions.forEach(q => {
        const item = q.practiceQuestions.find(pq => pq.type === 'diagram');
        if (item) generatedItems.push({ ...item, originalQuestion: q });
      });
    } else {
      // Rapid Revision Mixed Blitz
      rawQuestions.forEach(q => {
        const randomItem = q.practiceQuestions[Math.floor(Math.random() * q.practiceQuestions.length)];
        if (randomItem) generatedItems.push({ ...randomItem, originalQuestion: q });
      });
    }

    // Shuffle and pick desired count
    generatedItems = generatedItems.sort(() => 0.5 - Math.random()).slice(0, questionCount);

    if (generatedItems.length === 0) {
      alert("No questions found matching this specific filter in this subject. Select another subject or test format.");
      return;
    }

    setTestQuestions(generatedItems);
    setUserAnswers({});
    setSelfScores({});
    setCurrentQIndex(0);
    setTimeLeft(timerMinutes * 60);
    setIsTestActive(true);
    setIsTestCompleted(false);
  };

  // Timer Tick
  useEffect(() => {
    let timer: any = null;
    if (isTestActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (isTestActive && timeLeft === 0) {
      handleSubmitTest();
    }
    return () => clearInterval(timer);
  }, [isTestActive, timeLeft]);

  // Answer handler
  const handleSelectOption = (qIdx: number, val: any) => {
    setUserAnswers(prev => ({ ...prev, [qIdx]: val }));
  };

  const handleSelfScore = (qIdx: number, passed: boolean) => {
    setSelfScores(prev => ({ ...prev, [qIdx]: passed }));
  };

  // Submit and Calculate Score
  const handleSubmitTest = () => {
    setIsTestActive(false);
    setIsTestCompleted(true);

    let score = 0;
    const maxScore = testQuestions.length;

    testQuestions.forEach((q, idx) => {
      const userAns = userAnswers[idx];
      if (q.type === 'mcq') {
        if (userAns === q.correctIndex) score += 1;
      } else if (q.type === 'tf') {
        if (userAns === q.isTrue) score += 1;
      } else if (q.type === 'fill') {
        if (typeof userAns === 'string' && userAns.trim().toLowerCase() === (q.answer || '').trim().toLowerCase()) {
          score += 1;
        }
      } else if (q.type === 'match') {
        if (selfScores[idx] || (userAns && Object.keys(userAns).length >= 2)) {
          score += 1;
        }
      } else if (['oneline', 'short', 'long', 'numerical', 'diagram', 'rapid'].includes(q.type)) {
        if (selfScores[idx] || (userAns && String(userAns).trim().length > 15)) {
          score += 1;
        }
      }
    });

    const percentage = Math.round((score / maxScore) * 100);

    if (percentage >= 70) {
      try {
        confetti({ particleCount: 120, spread: 75, origin: { y: 0.6 } });
      } catch (e) {}
    }

    const sub = subjects.find(s => s.id === selectedSubjectId);
    saveTestAttempt({
      subjectId: selectedSubjectId,
      subjectName: sub?.name || 'Computer Science',
      testType: testType.toUpperCase(),
      title: `${sub?.name || 'Subject'} - ${testType.toUpperCase()} Test`,
      score,
      maxScore,
      percentage,
      timeSpentSeconds: timerMinutes * 60 - timeLeft,
      totalQuestions: testQuestions.length,
      correctAnswers: score,
      incorrectAnswers: maxScore - score
    });
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQ = testQuestions[currentQIndex];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {!isTestActive && !isTestCompleted && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Examination Practice Engine</h1>
            <p className="text-xs md:text-sm text-slate-500">
              10 authentic testing formats derived directly from official university PYQs and syllabus criteria.
            </p>
          </div>

          {/* Test Setup Card */}
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            {/* Subject Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                1. Select Examination Subject
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {subjects.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSubjectId(s.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedSubjectId === s.id
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold text-slate-400">{s.code}</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{s.name}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{s.totalQuestions} Questions • {s.years.length} Papers</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 10 Test Formats Selector */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                2. Select Testing Method (10 Available Formats)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-semibold">
                {TEST_FORMATS.map(t => {
                  const Icon = t.icon;
                  const isSelected = testType === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTestType(t.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className={`p-2 rounded-xl mt-0.5 ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-xs">{t.label}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">{t.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Question Count</label>
                <div className="flex gap-2">
                  {[5, 10, 15, 20].map(cnt => (
                    <button
                      key={cnt}
                      onClick={() => setQuestionCount(cnt)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold ${
                        questionCount === cnt ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                      }`}
                    >
                      {cnt} Qs
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Time Limit</label>
                <div className="flex gap-2">
                  {[5, 10, 15, 30].map(min => (
                    <button
                      key={min}
                      onClick={() => setTimerMinutes(min)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold ${
                        timerMinutes === min ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                      }`}
                    >
                      {min} Mins
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleStartTest}
                className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all"
              >
                <Play className="w-4 h-4" />
                <span>Launch Practice Test ({testType.toUpperCase()})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Test Running View */}
      {isTestActive && currentQ && (
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="flex items-center justify-between p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs uppercase px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600">
                {currentQ.type.toUpperCase()} TEST
              </span>
              <span className="text-xs text-slate-500">
                Question <strong>{currentQIndex + 1}</strong> of <strong>{testQuestions.length}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
              <button
                onClick={handleSubmitTest}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm"
              >
                Submit Test
              </button>
            </div>
          </div>

          {/* Question Card */}
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.question}
              </h2>
              {currentQ.originalQuestion && (
                <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg whitespace-nowrap">
                  {currentQ.originalQuestion.year} • {currentQ.originalQuestion.questionNumber}
                </span>
              )}
            </div>

            {/* FORMAT 1: MCQ */}
            {currentQ.type === 'mcq' && currentQ.options && (
              <div className="space-y-3">
                {currentQ.options.map((opt: string, idx: number) => {
                  const isSelected = userAnswers[currentQIndex] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(currentQIndex, idx)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs md:text-sm font-medium transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-200 ring-2 ring-blue-500/20 font-bold'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="mt-0.5">{opt}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* FORMAT 2: True/False */}
            {currentQ.type === 'tf' && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleSelectOption(currentQIndex, true)}
                  className={`p-6 rounded-2xl border text-center font-bold text-base transition-all ${
                    userAnswers[currentQIndex] === true
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  TRUE
                </button>
                <button
                  onClick={() => handleSelectOption(currentQIndex, false)}
                  className={`p-6 rounded-2xl border text-center font-bold text-base transition-all ${
                    userAnswers[currentQIndex] === false
                      ? 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-700'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  FALSE
                </button>
              </div>
            )}

            {/* FORMAT 3: Fill in the Blank */}
            {currentQ.type === 'fill' && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={userAnswers[currentQIndex] || ''}
                  onChange={e => handleSelectOption(currentQIndex, e.target.value)}
                  placeholder="Type missing technical term..."
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                />
                {currentQ.hint && (
                  <p className="text-xs text-slate-400 italic">
                    Hint: {currentQ.hint}
                  </p>
                )}
              </div>
            )}

            {/* FORMAT 4: Matching Pairs */}
            {currentQ.type === 'match' && currentQ.pairs && (
              <div className="space-y-4">
                <div className="text-xs text-slate-400">Match each key concept with its operational specification:</div>
                <div className="space-y-2">
                  {currentQ.pairs.map((p: any, pIdx: number) => (
                    <div key={pIdx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-blue-600 dark:text-blue-400">{p.left}</span>
                      <span className="text-slate-600 dark:text-slate-300">&rarr; {p.right}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => handleSelfScore(currentQIndex, true)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selfScores[currentQIndex] ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Mark Pair Matches as Memorized
                  </button>
                </div>
              </div>
            )}

            {/* FORMAT 5: One-Line Recall */}
            {currentQ.type === 'oneline' && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={userAnswers[currentQIndex] || ''}
                  onChange={e => handleSelectOption(currentQIndex, e.target.value)}
                  placeholder="State your direct one-line definition..."
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            )}

            {/* FORMAT 6: Short Answer (2-3 Marks) */}
            {currentQ.type === 'short' && (
              <div className="space-y-4">
                <textarea
                  value={userAnswers[currentQIndex] || ''}
                  onChange={e => handleSelectOption(currentQIndex, e.target.value)}
                  rows={4}
                  placeholder="Draft your 3-point answer..."
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                />
                {currentQ.keyPoints && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                    <span className="font-bold text-slate-500 uppercase tracking-wider">Expected University Criteria:</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                      {currentQ.keyPoints.map((pt: string, idx: number) => (
                        <li key={idx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* FORMAT 7: Long Answer (7 Marks) */}
            {currentQ.type === 'long' && (
              <div className="space-y-4">
                <textarea
                  value={userAnswers[currentQIndex] || ''}
                  onChange={e => handleSelectOption(currentQIndex, e.target.value)}
                  rows={6}
                  placeholder="Draft your complete university solution adhering to the 4-part rubric..."
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                />
                {currentQ.rubric && (
                  <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs space-y-2">
                    <span className="font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">7-Mark Evaluation Rubric:</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                      {currentQ.rubric.map((r: string, idx: number) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* FORMAT 8: Numerical Practice */}
            {currentQ.type === 'numerical' && (
              <div className="space-y-4">
                <textarea
                  value={userAnswers[currentQIndex] || ''}
                  onChange={e => handleSelectOption(currentQIndex, e.target.value)}
                  rows={5}
                  placeholder="Write formulas, value substitutions, and arithmetic steps..."
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            )}

            {/* FORMAT 9: Diagram Recognition */}
            {currentQ.type === 'diagram' && (
              <div className="space-y-4">
                <EducationalDiagram type="osi-tcp" className="mb-4" />
                <textarea
                  value={userAnswers[currentQIndex] || ''}
                  onChange={e => handleSelectOption(currentQIndex, e.target.value)}
                  rows={4}
                  placeholder="Describe the architectural components, flows, and data transitions..."
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            )}

            {/* FORMAT 10: Rapid Revision Blitz */}
            {currentQ.type === 'rapid' && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={userAnswers[currentQIndex] || ''}
                  onChange={e => handleSelectOption(currentQIndex, e.target.value)}
                  placeholder="Rapid blitz response..."
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQIndex === 0}
              className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold disabled:opacity-40"
            >
              Previous
            </button>

            {currentQIndex < testQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentQIndex(prev => prev + 1)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleSubmitTest}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md"
              >
                Complete & Finish Test
              </button>
            )}
          </div>
        </div>
      )}

      {/* Test Completed / Review Screen */}
      {isTestCompleted && (
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Examination Practice Completed!</h2>
              <p className="text-xs text-slate-500 mt-1">
                Your test score and time have been logged into your persistent SemesterOS study history.
              </p>
            </div>

            <div className="flex justify-center gap-6 pt-2">
              <div className="text-center">
                <div className="text-3xl font-black text-blue-600">
                  {testQuestions.filter((q, i) => {
                    if (q.type === 'mcq') return userAnswers[i] === q.correctIndex;
                    if (q.type === 'tf') return userAnswers[i] === q.isTrue;
                    if (q.type === 'fill') return typeof userAnswers[i] === 'string' && userAnswers[i].trim().toLowerCase() === (q.answer || '').trim().toLowerCase();
                    return selfScores[i] || (userAnswers[i] && String(userAnswers[i]).length > 15);
                  }).length} / {testQuestions.length}
                </div>
                <div className="text-[11px] font-bold uppercase text-slate-400 mt-0.5">Total Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-purple-600">
                  {formatTimer(timerMinutes * 60 - timeLeft)}
                </div>
                <div className="text-[11px] font-bold uppercase text-slate-400 mt-0.5">Time Spent</div>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => { setIsTestCompleted(false); setIsTestActive(false); }}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md"
              >
                Launch Another Practice Test
              </button>
              <button
                onClick={() => setCurrentRoute('dashboard')}
                className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Question Review List */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Detailed Answer Review & Model Solutions</h3>
            {testQuestions.map((q, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-blue-600">Question {idx + 1} ({q.type.toUpperCase()})</span>
                  {q.originalQuestion && (
                    <span className="text-xs text-slate-400">{q.originalQuestion.year} Annual • {q.originalQuestion.questionNumber}</span>
                  )}
                </div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{q.question}</p>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                  <strong className="text-emerald-600 dark:text-emerald-400 block mb-1.5">Model Solution / Explanation: </strong>
                  <MarkdownRenderer content={q.explanation} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
