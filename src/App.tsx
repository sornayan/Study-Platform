import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { useApp } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { DashboardView } from './views/DashboardView';
import { SubjectsView } from './views/SubjectsView';
import { LibraryView } from './views/LibraryView';
import { StudyRoomView } from './views/StudyRoomView';
import { FlashcardsView } from './views/FlashcardsView';
import { PracticeTestsView } from './views/PracticeTestsView';
import { MockExamsView } from './views/MockExamsView';
import { RevisionCenterView } from './views/RevisionCenterView';
import { AnalyticsView } from './views/AnalyticsView';
import { BookmarksNotesView } from './views/BookmarksNotesView';
import { FormulaBookView } from './views/FormulaBookView';
import { LastMinuteRevisionView } from './views/LastMinuteRevisionView';
import { SettingsView } from './views/SettingsView';

export const App: React.FC = () => {
  const { currentRoute, pomodoroFocusMode } = useApp();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(typeof navigator !== 'undefined' ? !navigator.onLine : false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'dashboard':
        return <DashboardView />;
      case 'subjects':
        return <SubjectsView />;
      case 'library':
        return <LibraryView />;
      case 'study-room':
        return <StudyRoomView />;
      case 'flashcards':
        return <FlashcardsView />;
      case 'practice-tests':
        return <PracticeTestsView />;
      case 'mock-exams':
        return <MockExamsView />;
      case 'revision':
        return <RevisionCenterView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'bookmarks-notes':
        return <BookmarksNotesView />;
      case 'formula-book':
        return <FormulaBookView />;
      case 'last-minute-revision':
        return <LastMinuteRevisionView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col antialiased">
      {/* Offline Status Indicator */}
      {isOffline && (
        <div className="bg-amber-600 text-white text-xs font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-2 shadow-sm z-50">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Offline Mode Active — Running locally from cache. Your notes, study progress, and flashcards remain fully operational.</span>
        </div>
      )}

      {/* Navigation Sidebar */}
      {!pomodoroFocusMode && (
        <Navigation 
          isMobileOpen={isMobileNavOpen} 
          onCloseMobile={() => setIsMobileNavOpen(false)} 
        />
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${!pomodoroFocusMode ? 'md:pl-72' : ''}`}>
        {/* Top Header */}
        {!pomodoroFocusMode && (
          <Header onToggleMobile={() => setIsMobileNavOpen(prev => !prev)} />
        )}

        {/* View Container */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
};
export default App;
