import React from 'react';
import { 
  Bookmark, 
  Edit3, 
  Trash2, 
  ArrowRight, 
  BookOpen, 
  Highlighter,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getQuestionById } from '../data/pyqData';

export const BookmarksNotesView: React.FC = () => {
  const { 
    progress, 
    toggleBookmark, 
    deleteNote, 
    removeHighlight, 
    setActiveSubjectId, 
    setActiveQuestionId, 
    setCurrentRoute, 
    setStudyMode 
  } = useApp();

  const bookmarkedQuestions = progress.bookmarkedIds
    .map(id => getQuestionById(id))
    .filter((q): q is NonNullable<typeof q> => !!q);

  const notesList = Object.entries(progress.notes).map(([qid, note]) => {
    const q = getQuestionById(qid);
    return { qid, note, q };
  });

  const highlightsList = Object.entries(progress.highlights).flatMap(([qid, texts]) => {
    const q = getQuestionById(qid);
    return texts.map(t => ({ qid, text: t, q }));
  });

  const handleOpenQuestion = (questionId: string, subjectId: string) => {
    setActiveSubjectId(subjectId);
    setActiveQuestionId(questionId);
    setStudyMode('read');
    setCurrentRoute('study-room');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Bookmarks & Knowledge Base</h1>
        <p className="text-xs md:text-sm text-slate-500">
          Your saved questions, custom study notes, and highlighted key passages.
        </p>
      </div>

      {/* Bookmarks Section */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-amber-500" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Bookmarked PYQs ({bookmarkedQuestions.length})
          </h2>
        </div>

        {bookmarkedQuestions.length === 0 ? (
          <p className="text-xs text-slate-400">No bookmarked questions yet. Click the bookmark icon on any question to save it here.</p>
        ) : (
          <div className="space-y-3">
            {bookmarkedQuestions.map(q => (
              <div
                key={q.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-blue-600">{q.courseCode}</span>
                    <span>•</span>
                    <span className="font-bold text-slate-400">{q.year} {q.questionNumber}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {q.questionText}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleOpenQuestion(q.id, q.subjectId)}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => toggleBookmark(q.id)}
                    className="p-2 text-slate-400 hover:text-red-600"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Personal Notes Section */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-emerald-500" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Personal Notes ({notesList.length})
          </h2>
        </div>

        {notesList.length === 0 ? (
          <p className="text-xs text-slate-400">No notes written yet. Use the "Add Note" button on any question in the Library or Study Room.</p>
        ) : (
          <div className="space-y-3">
            {notesList.map(({ qid, note, q }) => (
              <div
                key={qid}
                className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-800 dark:text-amber-300">
                    {q ? `${q.courseCode} ${q.year} ${q.questionNumber}` : 'Question'}
                  </span>
                  <button
                    onClick={() => deleteNote(qid)}
                    className="text-slate-400 hover:text-red-600"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                  {note}
                </p>
                {q && (
                  <button
                    onClick={() => handleOpenQuestion(q.id, q.subjectId)}
                    className="text-[11px] font-bold text-blue-600 hover:underline pt-1 inline-block"
                  >
                    Go to question →
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Highlights Section */}
      {highlightsList.length > 0 && (
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Highlighter className="w-5 h-5 text-purple-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Highlighted Passages ({highlightsList.length})
            </h2>
          </div>
          <div className="space-y-2">
            {highlightsList.map(({ qid, text, q }, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex justify-between items-center text-xs">
                <div>
                  <span className="text-purple-600 font-bold">"{text}"</span>
                  {q && <span className="text-slate-400 ml-2">({q.courseCode} {q.questionNumber})</span>}
                </div>
                <button
                  onClick={() => removeHighlight(qid, text)}
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

