import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  Calendar, 
  FileText, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  BrainCircuit, 
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getAllSubjects } from '../data/pyqData';

export const SubjectsView: React.FC = () => {
  const { 
    progress, 
    setCurrentRoute, 
    setActiveSubjectId, 
    setActiveYear, 
    setStudyMode 
  } = useApp();

  const subjects = getAllSubjects();
  const [expandedSyllabus, setExpandedSyllabus] = useState<Record<string, boolean>>({});

  const toggleSyllabus = (id: string) => {
    setExpandedSyllabus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenSubject = (subjectId: string, year?: string) => {
    setActiveSubjectId(subjectId);
    setActiveYear(year || 'all');
    setCurrentRoute('library');
  };

  const handleStudyMode = (subjectId: string, mode: any) => {
    setActiveSubjectId(subjectId);
    setStudyMode(mode);
    setCurrentRoute('study-room');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Semester VI Subjects</h1>
        <p className="text-xs md:text-sm text-slate-500">
          Official B.Tech Computer Science & Engineering / Information Technology curriculum with complete PYQ answers.
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            25 Official Prescribed Syllabus Modules
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-xs font-semibold">
            5 PYQ-Derived Examination Themes (Entrepreneurship)
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold">
            30 Total Units / Modules / Themes
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map(sub => {
          const subQuestions = sub.questions;
          const subStudied = subQuestions.filter(q => progress.studiedQuestions[q.id] === 'studied' || progress.studiedQuestions[q.id] === 'mastered').length;
          const subMastered = subQuestions.filter(q => progress.studiedQuestions[q.id] === 'mastered').length;
          const subPercent = Math.round((subStudied / subQuestions.length) * 100);
          const isExpanded = !!expandedSyllabus[sub.id];

          return (
            <div
              key={sub.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shadow-md"
                      style={{ backgroundColor: sub.color }}
                    >
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        {sub.code} • 3 Credits
                      </span>
                      <h2 className="text-base font-bold text-slate-900 dark:text-white">
                        {sub.name}
                      </h2>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: `${sub.color}15`, color: sub.color }}>
                    {sub.totalQuestions} PYQs
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                  <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <span>Preparation Mastery</span>
                    <span>{subStudied} / {sub.totalQuestions} ({subPercent}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${subPercent}%`, backgroundColor: sub.color }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
                    <span>{subMastered} fully mastered</span>
                    <span>{subQuestions.length - subStudied} remaining</span>
                  </div>
                </div>

                {/* Available Years Pills */}
                <div>
                  <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-2">
                    Available Examination Papers
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sub.years.map(yr => (
                      <button
                        key={yr}
                        onClick={() => handleOpenSubject(sub.id, yr)}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-1"
                      >
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{yr} Annual</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Collapsible Syllabus Overview */}
                <div className="pt-2">
                  <button
                    onClick={() => toggleSyllabus(sub.id)}
                    className="w-full flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 py-1"
                  >
                    <span>
                      {sub.syllabusType === 'pyq-derived' 
                        ? 'Examination Study Themes (Official detailed syllabus not prescribed)' 
                        : `Official Syllabus Breakdown (${sub.modules.length} Modules)`}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-2 space-y-2 text-xs text-slate-600 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                      {sub.modules.map((m, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <div className="font-semibold text-slate-800 dark:text-slate-200">
                            {m.title}
                          </div>
                          <div className="text-[11px] text-slate-400 pl-2">
                            • {m.topics.join(' • ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleOpenSubject(sub.id)}
                  className="py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Browse PYQs</span>
                </button>
                <button
                  onClick={() => handleStudyMode(sub.id, 'recall')}
                  className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span>Active Recall</span>
                </button>
                <button
                  onClick={() => { setActiveSubjectId(sub.id); setCurrentRoute('practice-tests'); }}
                  className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Practice Test</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

