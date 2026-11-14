import React, { useState } from 'react';
import { 
  Settings, 
  Download, 
  Upload, 
  RotateCcw, 
  Target, 
  Calendar, 
  Moon, 
  Sun, 
  Check, 
  AlertCircle,
  Database,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getAllSubjects } from '../data/pyqData';

export const SettingsView: React.FC = () => {
  const { 
    theme, 
    toggleTheme, 
    progress, 
    updateDailyGoals, 
    setExamDate, 
    exportData, 
    importData, 
    resetProgress 
  } = useApp();

  const subjects = getAllSubjects();
  const [importJsonText, setImportJsonText] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleDownloadBackup = () => {
    const dataStr = exportData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SemesterOS_Study_Backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setStatusMessage({ text: 'Backup downloaded successfully!', type: 'success' });
  };

  const handleRestoreBackup = () => {
    if (!importJsonText.trim()) return;
    const success = importData(importJsonText);
    if (success) {
      setStatusMessage({ text: 'Progress restored successfully from JSON backup!', type: 'success' });
      setImportJsonText('');
    } else {
      setStatusMessage({ text: 'Invalid JSON format. Please verify backup content.', type: 'error' });
    }
  };

  const handleResetConfirm = () => {
    if (window.confirm("Are you sure you want to reset all study progress, test attempts, and saved bookmarks? This cannot be undone.")) {
      resetProgress();
      setStatusMessage({ text: 'All progress reset to clean defaults.', type: 'success' });
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Settings & Data Management</h1>
        <p className="text-xs md:text-sm text-slate-500">
          Configure daily study targets, examination dates, theme preferences, and export/restore your persistent learning data.
        </p>
      </div>

      {statusMessage && (
        <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 ${
          statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {statusMessage.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Appearance Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Interface Appearance</span>
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Theme Mode</div>
            <div className="text-xs text-slate-500">Switch between light and dark visual themes</div>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold flex items-center gap-2"
          >
            {theme === 'light' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-blue-400" />}
            <span>{theme === 'light' ? 'Light Theme' : 'Dark Theme'}</span>
          </button>
        </div>
      </div>

      {/* Daily Study Targets Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-500" />
          <span>Daily Examination Goals</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
          <div>
            <label className="text-slate-500 block mb-1">Target Questions per Day:</label>
            <input
              type="number"
              value={progress.dailyGoals.questionsTarget}
              onChange={e => updateDailyGoals({ questionsTarget: parseInt(e.target.value) || 10 })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
            />
          </div>
          <div>
            <label className="text-slate-500 block mb-1">Target Flashcards per Day:</label>
            <input
              type="number"
              value={progress.dailyGoals.flashcardsTarget}
              onChange={e => updateDailyGoals({ flashcardsTarget: parseInt(e.target.value) || 20 })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
            />
          </div>
          <div>
            <label className="text-slate-500 block mb-1">Target Practice Tests per Day:</label>
            <input
              type="number"
              value={progress.dailyGoals.testsTarget}
              onChange={e => updateDailyGoals({ testsTarget: parseInt(e.target.value) || 2 })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
            />
          </div>
          <div>
            <label className="text-slate-500 block mb-1">Daily Study Minutes Target:</label>
            <input
              type="number"
              value={progress.dailyGoals.minutesTarget}
              onChange={e => updateDailyGoals({ minutesTarget: parseInt(e.target.value) || 45 })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Examination Dates Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          <span>Scheduled University Examination Dates</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {subjects.map(sub => (
            <div key={sub.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{sub.code}</div>
                <div className="text-[11px] text-slate-400">{sub.name}</div>
              </div>
              <input
                type="date"
                value={progress.examDates[sub.id] || ''}
                onChange={e => setExamDate(sub.id, e.target.value)}
                className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Backup & Restore Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-indigo-500" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Data Backup & Portability (Local-First Persistence)
          </h2>
        </div>

        <div className="space-y-3">
          <p className="text-xs text-slate-500 leading-relaxed">
            All your questions studied, recall scheduling intervals, custom notes, highlights, and test histories are securely stored in your browser's persistent storage. Export your data to transfer between your laptop, tablet, or phone.
          </p>
          <button
            onClick={handleDownloadBackup}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Full Backup (JSON)</span>
          </button>
        </div>

        <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Restore from JSON string:</label>
          <textarea
            value={importJsonText}
            onChange={e => setImportJsonText(e.target.value)}
            rows={3}
            placeholder="Paste your exported backup JSON text here..."
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
          />
          <button
            onClick={handleRestoreBackup}
            disabled={!importJsonText.trim()}
            className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-xs text-slate-800 dark:text-slate-200 hover:bg-slate-200 disabled:opacity-40 flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Restore Backup</span>
          </button>
        </div>

        <div className="pt-4 border-t border-red-100 dark:border-red-900/30 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-red-600">Reset Study Progress</div>
            <div className="text-[11px] text-slate-400">Clear all records and restore default clean state</div>
          </div>
          <button
            onClick={handleResetConfirm}
            className="px-4 py-2 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 hover:bg-red-200 font-bold text-xs flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Progress</span>
          </button>
        </div>
      </div>
    </div>
  );
};

