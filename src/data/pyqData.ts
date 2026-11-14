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

export const getAllQuestions = (): Question[] => {
  const all: Question[] = [];
  Object.values(DATABASE.subjects).forEach(sub => {
    all.push(...sub.questions);
  });
  return all;
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
  if (year && year !== 'all') {
    return sub.questions.filter(q => q.year === year);
  }
  return sub.questions;
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

