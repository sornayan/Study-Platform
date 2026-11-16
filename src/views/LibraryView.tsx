import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Search, 
  BookOpen, 
  Eye, 
  EyeOff, 
  Bookmark, 
  CheckCircle2, 
  Edit3, 
  BrainCircuit, 
  Trash2, 
  Save, 
  Layers, 
  Calendar,
  Tag,
  Check,
  ChevronDown,
  Hash,
  Calculator,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getAllSubjects, getQuestionsBySubject } from '../data/pyqData';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { Question, StudyStatus } from '../types';

export const LibraryView: React.FC = () => {
  const { 
    activeSubjectId, 
    setActiveSubjectId, 
    activeYear, 
    setActiveYear, 
    setActiveQuestionId, 
    setCurrentRoute, 
    setStudyMode,
    progress, 
    markQuestionStatus, 
    toggleBookmark, 
    saveNote, 
    deleteNote, 
    saveHighlight 
  } = useApp();

  const subjects = getAllSubjects();
  const currentSubject = subjects.find(s => s.id === activeSubjectId) || subjects[0];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [filterBookmarkedOnly, setFilterBookmarkedOnly] = useState<boolean>(false);
  const [filterNumericalsOnly, setFilterNumericalsOnly] = useState<boolean>(false);

  // Expanded answers map
  const [expandedAnswers, setExpandedAnswers] = useState<Record<string, boolean>>({});
  // Editing note map
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState<string>('');

  // Switch subject
  const handleSubjectChange = (sid: string) => {
    setActiveSubjectId(sid);
    setActiveYear('all');
    setSelectedModule('all');
  };

  // Filtered questions
  const questions = useMemo(() => {
    let list = getQuestionsBySubject(currentSubject.id, activeYear || 'all');

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(item => 
        item.questionText.toLowerCase().includes(q) ||
        item.answerMarkdown.toLowerCase().includes(q) ||
        item.topic.toLowerCase().includes(q) ||
        item.questionNumber.toLowerCase().includes(q)
      );
    }

    if (selectedModule !== 'all') {
      list = list.filter(item => item.module.includes(selectedModule));
    }

    if (selectedStatus !== 'all') {
      list = list.filter(item => {
        const st = progress.studiedQuestions[item.id] || 'unstudied';
        return st === selectedStatus;
      });
    }

    if (filterBookmarkedOnly) {
      list = list.filter(item => progress.bookmarkedIds.includes(item.id));
    }

    if (filterNumericalsOnly) {
      list = list.filter(item => item.isNumerical);
    }

    return list;
  }, [currentSubject.id, activeYear, searchQuery, selectedModule, selectedStatus, filterBookmarkedOnly, filterNumericalsOnly, progress]);

  const toggleAnswer = (qid: string) => {
    setExpandedAnswers(prev => ({ ...prev, [qid]: !prev[qid] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    questions.forEach(q => { all[q.id] = true; });
    setExpandedAnswers(all);
  };

  const collapseAll = () => {
    setExpandedAnswers({});
  };

  const handleStartRecall = (question: Question) => {
    setActiveSubjectId(question.subjectId);
    setActiveQuestionId(question.id);
    setStudyMode('recall');
    setCurrentRoute('study-room');
  };

  const handleStartNoteEdit = (qid: string) => {
    setEditingNoteId(qid);
    setNoteText(progress.notes[qid] || '');
  };

  const handleSaveNote = (qid: string) => {
    saveNote(qid, noteText);
    setEditingNoteId(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Subject Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {subjects.map(sub => {
          const isSelected = sub.id === currentSubject.id;
          return (
            <button
              key={sub.id}
              onClick={() => handleSubjectChange(sub.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sub.color }} />
              <span>{sub.name}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                {sub.totalQuestions}
              </span>
            </button>
          );
        })}
      </div>

      {/* Control Bar: Years, Modules & Search */}
      <div className="p-4 md:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        {/* Top Row: Year Pills & Action buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Year:</span>
            </span>
            <button
              onClick={() => setActiveYear('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                activeYear === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              All Years ({currentSubject.totalQuestions})
            </button>
            {currentSubject.years.map(yr => (
              <button
                key={yr}
                onClick={() => setActiveYear(yr)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  activeYear === yr
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {yr} Annual
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="px-3 py-1 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600"
            >
              Expand All
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button
              onClick={collapseAll}
              className="px-3 py-1 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Filter Row: Search, Module, Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search questions or keywords..."
              className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <select
              value={selectedModule}
              onChange={e => setSelectedModule(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Modules</option>
              {currentSubject.modules.map(m => (
                <option key={m.id} value={m.title.split(':')[0]}>{m.title}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Study Status</option>
              <option value="unstudied">Unstudied</option>
              <option value="studied">Studied</option>
              <option value="mastered">Mastered</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterBookmarkedOnly(prev => !prev)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                filterBookmarkedOnly
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved</span>
            </button>
            <button
              onClick={() => setFilterNumericalsOnly(prev => !prev)}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                filterNumericalsOnly
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
              title="Numericals & Calculations Only"
            >
              <Calculator className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong>{questions.length}</strong> questions matching current filters</span>
        <span>Standard: <strong>7 Marks</strong> per question</span>
      </div>

      {/* Question Cards List */}
      <div className="space-y-4">
        {questions.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">No questions found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No PYQ matches your current search or filter criteria. Try clearing filters or switching examination years.
            </p>
          </div>
        ) : (
          questions.map(q => {
            const isExpanded = !!expandedAnswers[q.id];
            const status = progress.studiedQuestions[q.id] || 'unstudied';
            const isBookmarked = progress.bookmarkedIds.includes(q.id);
            const userNote = progress.notes[q.id];
            const isEditingNote = editingNoteId === q.id;

            return (
              <div
                key={q.id}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all hover:border-slate-300 dark:hover:border-slate-700"
              >
                {/* Question Header Card */}
                <div className="p-5 md:p-6 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40">
                        {q.year} • {q.questionNumber}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {q.marks} Marks
                      </span>
                      {q.isNumerical && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                          Numerical
                        </span>
                      )}
                    </div>

                    {/* Status Toggle Buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => markQuestionStatus(q.id, status === 'studied' ? 'unstudied' : 'studied')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                          status === 'studied' || status === 'mastered'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                        }`}
                        title="Mark as Studied"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Studied</span>
                      </button>

                      <button
                        onClick={() => markQuestionStatus(q.id, status === 'mastered' ? 'studied' : 'mastered')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                          status === 'mastered'
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                        }`}
                        title="Mark as Mastered (High Recall)"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Mastered</span>
                      </button>

                      <button
                        onClick={() => toggleBookmark(q.id)}
                        className={`p-1.5 rounded-lg transition-all ${
                          isBookmarked
                            ? 'bg-amber-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600'
                        }`}
                        title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this Question'}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {q.questionText}
                  </h3>

                  {/* Module & Topic tags */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-600 dark:text-slate-400">
                      {q.module}
                    </span>
                    <span>•</span>
                    <span className="text-slate-400 truncate max-w-md">
                      {q.topic}
                    </span>
                  </div>

                  {/* Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => toggleAnswer(q.id)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-2 transition-all"
                    >
                      {isExpanded ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isExpanded ? 'Hide Answer' : 'Reveal Complete 7-Mark Answer'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStartRecall(q)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-all"
                      >
                        <BrainCircuit className="w-3.5 h-3.5 text-blue-500" />
                        <span>Active Recall Mode</span>
                      </button>

                      <button
                        onClick={() => handleStartNoteEdit(q.id)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-all"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{userNote ? 'Edit Notes' : 'Add Note'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Inline Note Editor */}
                {isEditingNote && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border-t border-amber-200 dark:border-amber-900/50 space-y-2">
                    <div className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Personal Study Note for {q.questionNumber}</span>
                    </div>
                    <textarea
                      value={noteText}
                      onChange={e => setNoteText(e.target.value)}
                      placeholder="Write memory triggers, expected exam steps, formulas..."
                      rows={3}
                      className="w-full p-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingNoteId(null)}
                        className="px-3 py-1 text-xs font-semibold text-slate-500"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveNote(q.id)}
                        className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Note</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Saved Note Display */}
                {!isEditingNote && userNote && (
                  <div className="px-6 py-3 bg-amber-50/60 dark:bg-amber-950/20 border-t border-amber-100 dark:border-amber-900/30 flex items-start justify-between text-xs text-amber-900 dark:text-amber-200">
                    <div className="flex items-start gap-2">
                      <Edit3 className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Your Note:</strong> {userNote}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteNote(q.id)}
                      className="text-amber-600 hover:text-red-600 p-1"
                      title="Delete Note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Expandable Official Answer */}
                {isExpanded && (
                  <div className="p-6 md:p-8 bg-slate-50/80 dark:bg-slate-950/40 border-t border-slate-200 dark:border-slate-800 space-y-6">
                    {/* Complete Rendered Markdown Answer */}
                    <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                      <MarkdownRenderer
                        content={q.answerMarkdown}
                        highlights={progress.highlights[q.id] || []}
                        onTextHighlight={text => saveHighlight(q.id, text)}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

