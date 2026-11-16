import rawDatabase from './database.json';
import manifest from './manifest.json';
import { Subject, Question, PracticeQuestion } from '../types';

export const DATABASE = rawDatabase as {
  subjects: Record<string, Subject>;
  metadata: {
    totalSubjects: number;
    totalQuestions: number;
    subjectsList: {
      id: string;
      name: string;
      code: string;
      color: string;
      years: string[];
      totalQuestions: number;
    }[];
  };
};

export const MANIFEST = manifest;

export const getAllSubjects = (): Subject[] => {
  return Object.values(DATABASE.subjects);
};

export const getSubjectById = (id: string): Subject | undefined => {
  return DATABASE.subjects[id];
};

export function parseQRank(qNum: string) {
  const clean = qNum.replace(/^(Question|Q)\s*/i, '').trim();
  const mainMatch = clean.match(/^(\d+)/);
  const main = mainMatch ? parseInt(mainMatch[1], 10) : 999;
  
  const subMatch = clean.match(/\(([a-z])\)/i) || clean.match(/^\d+([a-z])\b/i);
  const sub = subMatch ? subMatch[1].toLowerCase() : '';
  
  const romanMatch = clean.match(/\((i|ii|iii|iv|v|vi)\)/i);
  const romanMap: Record<string, number> = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6 };
  const roman = romanMatch ? (romanMap[romanMatch[1].toLowerCase()] || 0) : 0;
  
  const isOr = /\bOR\b/i.test(clean) ? 1 : 0;
  
  return { main, sub, roman, isOr };
}

export function compareQuestions(a: Question, b: Question): number {
  if (a.year !== b.year) {
    return b.year.localeCompare(a.year);
  }
  const rA = parseQRank(a.questionNumber);
  const rB = parseQRank(b.questionNumber);
  if (rA.main !== rB.main) return rA.main - rB.main;
  if (rA.sub !== rB.sub) return rA.sub.localeCompare(rB.sub);
  if (rA.roman !== rB.roman) return rA.roman - rB.roman;
  if (rA.isOr !== rB.isOr) return rA.isOr - rB.isOr;
  return a.id.localeCompare(b.id);
}

export const getAllQuestions = (): Question[] => {
  const all: Question[] = [];
  Object.values(DATABASE.subjects).forEach(sub => {
    all.push(...sub.questions);
  });
  return all.sort(compareQuestions);
};

export const getQuestionById = (id: string): Question | undefined => {
  for (const sub of Object.values(DATABASE.subjects)) {
    const found = sub.questions.find(q => q.id === id);
    if (found) return found;
  }
  return undefined;
};

export const getQuestionsBySubject = (subjectId: string, year?: string): Question[] => {
  const sub = DATABASE.subjects[subjectId];
  if (!sub) return [];
  const list = year && year !== 'all'
    ? sub.questions.filter(q => q.year === year)
    : [...sub.questions];
  return list.sort(compareQuestions);
};

export const searchQuestions = (query: string, subjectId?: string): Question[] => {
  const cleanQ = query.trim().toLowerCase();
  if (!cleanQ) return [];
  
  const pool = subjectId && subjectId !== 'all' 
    ? getQuestionsBySubject(subjectId)
    : getAllQuestions();
    
  return pool.filter(q => 
    q.questionText.toLowerCase().includes(cleanQ) ||
    q.topic.toLowerCase().includes(cleanQ) ||
    q.answerMarkdown.toLowerCase().includes(cleanQ) ||
    q.questionNumber.toLowerCase().includes(cleanQ) ||
    q.module.toLowerCase().includes(cleanQ) ||
    q.year.includes(cleanQ)
  );
};

