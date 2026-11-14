import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Check, 
  X, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getAllSubjects, getQuestionsBySubject } from '../data/pyqData';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

export const FlashcardsView: React.FC = () => {
  const { activeSubjectId, setActiveSubjectId } = useApp();
  const subjects = getAllSubjects();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(activeSubjectId || 'computer-networks');

  const questions = useMemo(() => getQuestionsBySubject(selectedSubjectId), [selectedSubjectId]);
  
  // Flatten flashcards
  const allCards = useMemo(() => {
    const list: any[] = [];
    questions.forEach(q => {
      q.flashcards.forEach((fc, idx) => {
        list.push({ ...fc, id: `${q.id}-fc-${idx}`, questionNumber: q.questionNumber, year: q.year, subject: q.subjectName });
      });
    });
    return list;
  }, [questions]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [knownCardIds, setKnownCardIds] = useState<string[]>([]);

  const handleNext = () => {
    if (currentIndex < allCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleShuffle = () => {
    setCurrentIndex(Math.floor(Math.random() * allCards.length));
    setIsFlipped(false);
  };

  const markKnown = (id: string) => {
    if (!knownCardIds.includes(id)) {
      setKnownCardIds(prev => [...prev, id]);
    }
    handleNext();
  };

  const currentCard = allCards[currentIndex];

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Active Flashcards</h1>
          <p className="text-xs md:text-sm text-slate-500">
            High-speed definition, formula, and conceptual flashcards extracted from PYQs.
          </p>
        </div>

        <select
          value={selectedSubjectId}
          onChange={e => {
            setSelectedSubjectId(e.target.value);
            setCurrentIndex(0);
            setIsFlipped(false);
          }}
          className="font-bold text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
        >
          {subjects.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      {allCards.length > 0 && currentCard ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Card <strong>{currentIndex + 1}</strong> of <strong>{allCards.length}</strong></span>
            <span>{knownCardIds.length} cards marked known</span>
          </div>

          {/* Flashcard container */}
          <div
            onClick={() => setIsFlipped(prev => !prev)}
            className="min-h-[320px] p-8 md:p-12 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-blue-500 shadow-md flex flex-col justify-between cursor-pointer transition-all select-none group"
          >
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 font-mono">
                {currentCard.year} • {currentCard.questionNumber}
              </span>
              <span className="flex items-center gap-1.5 text-slate-400 group-hover:text-blue-500 transition-colors">
                <RotateCw className="w-3.5 h-3.5" />
                {isFlipped ? 'Show Prompt (Front)' : 'Click to Flip (Back)'}
              </span>
            </div>

            <div className="py-8 text-center max-w-xl mx-auto">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                {isFlipped ? 'Answer & Explanation' : 'Concept / Question Prompt'}
              </span>
              <div className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                <MarkdownRenderer content={isFlipped ? currentCard.back : currentCard.front} />
              </div>
            </div>

            <div className="text-center text-xs text-slate-400">
              {currentCard.subject}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShuffle}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 flex items-center gap-1.5"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Shuffle</span>
              </button>
              <button
                onClick={() => markKnown(currentCard.id)}
                className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Mark Known</span>
              </button>
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === allCards.length - 1}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <Layers className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-500">No flashcards available for this subject.</p>
        </div>
      )}
    </div>
  );
};

