import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Library, 
  BrainCircuit, 
  Layers, 
  FileCheck2, 
  Award, 
  Repeat, 
  BarChart3, 
  BookmarkCheck, 
  Settings, 
  BookMarked, 
  Zap, 
  Sparkles,
  Timer
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavigationProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { currentRoute, setCurrentRoute, progress, pomodoroActive, pomodoroTimeLeft } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'subjects', label: 'My Subjects', icon: BookOpen },
    { id: 'library', label: 'PYQ Library', icon: Library },
    { id: 'study-room', label: 'Study Room', icon: BrainCircuit, badge: '5 Modes' },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'practice-tests', label: 'Practice Tests', icon: FileCheck2, badge: '10 Types' },
    { id: 'mock-exams', label: 'Mock Examinations', icon: Award },
    { id: 'revision', label: 'Revision Center', icon: Repeat, badge: Object.keys(progress.revisionQueue).length ? `${Object.keys(progress.revisionQueue).length}` : undefined },
    { id: 'analytics', label: 'Progress Analytics', icon: BarChart3 },
    { id: 'bookmarks-notes', label: 'Bookmarks & Notes', icon: BookmarkCheck, badge: progress.bookmarkedIds.length ? `${progress.bookmarkedIds.length}` : undefined },
    { id: 'formula-book', label: 'Formula & Definition Book', icon: BookMarked },
    { id: 'last-minute-revision', label: 'Last-Minute Revision', icon: Zap, badge: 'High-Yield' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleNavClick = (id: string) => {
    setCurrentRoute(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile} 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity" 
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                SemesterOS
              </div>
              <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Exam Preparation
              </div>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Study Platform
          </div>
          {navItems.slice(0, 7).map(item => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="px-3 pt-4 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Smart Tools & Analytics
          </div>
          {navItems.slice(7).map(item => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Pomodoro Quick Footer Widget */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${pomodoroActive ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                <Timer className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Focus Timer</div>
                <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">{formatTimer(pomodoroTimeLeft)}</div>
              </div>
            </div>
            <button
              onClick={() => setCurrentRoute('settings')}
              className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Controls
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

