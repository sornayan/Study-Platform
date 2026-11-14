import { RecallRating, RevisionItem, StudyStatus } from '../types';

/**
 * Canonical SuperMemo SM-2 Algorithm Implementation
 *
 * Quality (q) mapping:
 * - 'again': q = 1 (Failed recall, below success threshold q < 3)
 * - 'hard':  q = 3 (Pass with serious difficulty)
 * - 'good':  q = 4 (Pass with reasonable hesitation)
 * - 'easy':  q = 5 (Perfect recall, immediate response)
 *
 * Canonical Interval Progression:
 * - First successful repetition (n = 1):  I(1) = 1 day
 * - Second successful repetition (n = 2): I(2) = 6 days
 * - Subsequent repetitions (n > 2):       I(n) = round(I(n-1) * EF)
 * - Failed repetition (q < 3):            n = 0, I = 1 day
 *
 * Canonical Ease Factor Update:
 *   EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
 *   Minimum EF = 1.3
 */

export const QUALITY_MAP: Record<RecallRating, number> = {
  again: 1,
  hard: 3,
  good: 4,
  easy: 5
};

export interface SM2Result {
  updatedItem: RevisionItem;
  newStatus: StudyStatus;
}

export function calculateCanonicalSM2(
  item: RevisionItem,
  rating: RecallRating,
  todayDate: Date = new Date()
): SM2Result {
  const q = QUALITY_MAP[rating];
  const todayStr = todayDate.toISOString().split('T')[0];

  // 1. Calculate updated Ease Factor
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  const delta = 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02);
  let updatedEF = item.easeFactor + delta;
  if (updatedEF < 1.3) {
    updatedEF = 1.3;
  }
  // Round to 2 decimal places for clean storage
  updatedEF = Math.round(updatedEF * 100) / 100;

  let repetitions = item.repetitions;
  let interval = 1;

  // 2. Calculate interval and repetitions based on quality threshold (q >= 3)
  if (q < 3) {
    // Failed recall: reset repetitions to 0 and interval to 1 day
    repetitions = 0;
    interval = 1;
  } else {
    // Successful recall: increment repetitions
    repetitions += 1;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(item.intervalDays * updatedEF);
      // Guarantee progression of at least interval + 1
      if (interval <= item.intervalDays) {
        interval = item.intervalDays + 1;
      }
    }
  }

  // 3. Compute next review date
  const nextDate = new Date(todayDate.getTime());
  nextDate.setDate(nextDate.getDate() + interval);
  const nextDateStr = nextDate.toISOString().split('T')[0];

  const updatedItem: RevisionItem = {
    ...item,
    lastReviewedDate: todayStr,
    nextReviewDate: nextDateStr,
    intervalDays: interval,
    repetitions,
    easeFactor: updatedEF,
    history: [...item.history, { date: todayStr, rating }]
  };

  // Determine study status:
  // If failed ('again'), status is 'studied'
  // If repetitions >= 3 or rating is 'easy' with repetitions >= 2, status is 'mastered'
  const newStatus: StudyStatus = 
    rating === 'again' 
      ? 'studied' 
      : (repetitions >= 3 ? 'mastered' : 'studied');

  return { updatedItem, newStatus };
}

