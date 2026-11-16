import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Timer, 
  Calendar, 
  X,
  Play, 
  Pause, 
  Printer, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { searchQuestions } from '../data/pyqData';
import { Question } from '../types';

interface HeaderProps {
  onToggleMobile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobile }) => {
  const { 
    pomodoroActive, 
    pomodoroTimeLeft, 
    startPomodoro, 
    pausePomodoro, 
    setCurrentRoute, 
    setActiveQuestionId, 
    setActiveSubjectId,
    progress
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Question[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length >= 2) {
      const results = searchQuestions(val);
      setSearchResults(results.slice(0, 8));
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  const handleSelectResult = (q: Question) => {
    setActiveSubjectId(q.subjectId);
    setActiveQuestionId(q.id);
    setCurrentRoute('study-room');
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Find nearest exam
  const today = new Date();
  const nextExam = Object.entries(progress.examDates)
    .map(([sub, dateStr]) => {
      const diff = Math.ceil((new Date(dateStr).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return { sub, dateStr, diff };
    })
    .filter(e => e.diff >= 0)
    .sort((a, b) => a.diff - b.diff)[0];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 flex items-center justify-between gap-4">
      {/* Mobile Hamburger & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="hidden sm:inline-block font-bold text-xs uppercase tracking-wider text-slate-400">
          Vinoba Bhave University • 6th Sem B.Tech CSE
        </span>
      </div>

      {/* Global Search Bar */}
      <div className="relative flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => searchQuery.length >= 2 && setIsSearchOpen(true)}
            placeholder="Search 354+ PYQs, answers, formulas, topics..."
            className="w-full pl-9 pr-8 py-2 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-blue-500 rounded-xl text-xs md:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isSearchOpen && searchResults.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-50 max-h-96 overflow-y-auto">
            <div className="px-3 py-1.5 text-[11px] font-bold uppercase text-slate-400 tracking-wider">
              Found {searchResults.length} Results
            </div>
            {searchResults.map(q => (
              <button
                key={q.id}
                onClick={() => handleSelectResult(q)}
                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-start gap-3 group"
              >
                <div className="mt-0.5 px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-bold font-mono whitespace-nowrap">
                  {q.year} {q.questionNumber}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {q.questionText}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{q.subjectName}</span>
                    <span>•</span>
                    <span>{q.module}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Quick Controls */}
      <div className="flex items-center gap-2">
        {/* Nearest Exam Countdown Pill */}
        {nextExam && (
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-700 dark:text-amber-300 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-amber-500" />
            <span>
              {nextExam.sub.replace('-', ' ').toUpperCase()}: <strong>{nextExam.diff} days left</strong>
            </span>
          </div>
        )}

        {/* Pomodoro Quick Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono">
          <Timer className="w-3.5 h-3.5 text-blue-500" />
          <span className="font-bold text-slate-700 dark:text-slate-300">{formatTimer(pomodoroTimeLeft)}</span>
          <button
            onClick={pomodoroActive ? pausePomodoro : startPomodoro}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white"
            title={pomodoroActive ? 'Pause focus timer' : 'Start 25-min focus timer'}
          >
            {pomodoroActive ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
          </button>
        </div>

        {/* Print Button */}
        <button
          onClick={() => window.print()}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Print page or current question answer"
        >
          <Printer className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

