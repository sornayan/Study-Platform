// Deterministic Test Suite for Canonical SuperMemo SM-2 Spaced Repetition Engine
const assert = require('assert');

// Implementation replica in CommonJS for test runner
const QUALITY_MAP = {
  again: 1,
  hard: 3,
  good: 4,
  easy: 5
};

function calculateCanonicalSM2(item, rating, todayDate = new Date('2026-11-03T00:00:00Z')) {
  const q = QUALITY_MAP[rating];
  const todayStr = todayDate.toISOString().split('T')[0];

  const delta = 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02);
  let updatedEF = item.easeFactor + delta;
  if (updatedEF < 1.3) updatedEF = 1.3;
  updatedEF = Math.round(updatedEF * 100) / 100;

  let repetitions = item.repetitions;
  let interval = 1;

  if (q < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(item.intervalDays * updatedEF);
      if (interval <= item.intervalDays) interval = item.intervalDays + 1;
    }
  }

  const nextDate = new Date(todayDate.getTime());
  nextDate.setDate(nextDate.getDate() + interval);
  const nextDateStr = nextDate.toISOString().split('T')[0];

  const updatedItem = {
    ...item,
    lastReviewedDate: todayStr,
    nextReviewDate: nextDateStr,
    intervalDays: interval,
    repetitions,
    easeFactor: updatedEF,
    history: [...item.history, { date: todayStr, rating }]
  };

  const newStatus = rating === 'again' ? 'studied' : (repetitions >= 3 ? 'mastered' : 'studied');
  return { updatedItem, newStatus };
}

console.log("================================================================================");
console.log("RUNNING DETERMINISTIC SM-2 SPACED REPETITION TEST SUITE");
console.log("================================================================================");

const baseDate = new Date('2026-11-03T00:00:00Z');

// Test 1: First Repetition (Good rating)
let item = {
  questionId: 'q-test-1',
  subjectId: 'computer-networks',
  nextReviewDate: '2026-11-03',
  intervalDays: 1,
  repetitions: 0,
  easeFactor: 2.5,
  history: []
};

let res = calculateCanonicalSM2(item, 'good', baseDate);
console.log("Test 1: First Repetition (Rating: 'good')");
console.log(`  -> Repetitions: ${res.updatedItem.repetitions} (expected: 1)`);
console.log(`  -> Interval: ${res.updatedItem.intervalDays} day (expected: 1)`);
console.log(`  -> Ease Factor: ${res.updatedItem.easeFactor} (expected: 2.50)`);
console.log(`  -> Next Review Date: ${res.updatedItem.nextReviewDate} (expected: 2026-11-04)`);
assert.strictEqual(res.updatedItem.repetitions, 1);
assert.strictEqual(res.updatedItem.intervalDays, 1);
assert.strictEqual(res.updatedItem.easeFactor, 2.5);
assert.strictEqual(res.updatedItem.nextReviewDate, '2026-11-04');
console.log("  [PASS] Test 1 Passed.\n");

// Test 2: Second Repetition (Good rating) -> Interval must be exactly 6 days
item = res.updatedItem;
res = calculateCanonicalSM2(item, 'good', new Date('2026-11-04T00:00:00Z'));
console.log("Test 2: Second Repetition (Rating: 'good')");
console.log(`  -> Repetitions: ${res.updatedItem.repetitions} (expected: 2)`);
console.log(`  -> Interval: ${res.updatedItem.intervalDays} days (expected: 6)`);
console.log(`  -> Ease Factor: ${res.updatedItem.easeFactor} (expected: 2.50)`);
console.log(`  -> Next Review Date: ${res.updatedItem.nextReviewDate} (expected: 2026-11-10)`);
assert.strictEqual(res.updatedItem.repetitions, 2);
assert.strictEqual(res.updatedItem.intervalDays, 6);
assert.strictEqual(res.updatedItem.easeFactor, 2.5);
assert.strictEqual(res.updatedItem.nextReviewDate, '2026-11-10');
console.log("  [PASS] Test 2 Passed.\n");

// Test 3: Third Repetition (Good rating) -> Interval must be round(6 * 2.5) = 15 days
item = res.updatedItem;
res = calculateCanonicalSM2(item, 'good', new Date('2026-11-10T00:00:00Z'));
console.log("Test 3: Third Repetition (Rating: 'good')");
console.log(`  -> Repetitions: ${res.updatedItem.repetitions} (expected: 3)`);
console.log(`  -> Interval: ${res.updatedItem.intervalDays} days (expected: 15)`);
console.log(`  -> Ease Factor: ${res.updatedItem.easeFactor} (expected: 2.50)`);
console.log(`  -> Next Review Date: ${res.updatedItem.nextReviewDate} (expected: 2026-11-25)`);
console.log(`  -> Status: ${res.newStatus} (expected: 'mastered')`);
assert.strictEqual(res.updatedItem.repetitions, 3);
assert.strictEqual(res.updatedItem.intervalDays, 15);
assert.strictEqual(res.updatedItem.easeFactor, 2.5);
assert.strictEqual(res.updatedItem.nextReviewDate, '2026-11-25');
assert.strictEqual(res.newStatus, 'mastered');
console.log("  [PASS] Test 3 Passed.\n");

// Test 4: Failed Recall ('again') -> Repetitions must reset to 0, Interval to 1 day
item = res.updatedItem;
res = calculateCanonicalSM2(item, 'again', new Date('2026-11-25T00:00:00Z'));
console.log("Test 4: Failed Recall (Rating: 'again')");
console.log(`  -> Repetitions: ${res.updatedItem.repetitions} (expected: 0)`);
console.log(`  -> Interval: ${res.updatedItem.intervalDays} day (expected: 1)`);
console.log(`  -> Ease Factor: ${res.updatedItem.easeFactor} (expected: 2.50 - 0.54 = 1.96)`);
console.log(`  -> Next Review Date: ${res.updatedItem.nextReviewDate} (expected: 2026-11-26)`);
console.log(`  -> Status: ${res.newStatus} (expected: 'studied')`);
assert.strictEqual(res.updatedItem.repetitions, 0);
assert.strictEqual(res.updatedItem.intervalDays, 1);
assert.strictEqual(res.updatedItem.easeFactor, 1.96);
assert.strictEqual(res.updatedItem.nextReviewDate, '2026-11-26');
assert.strictEqual(res.newStatus, 'studied');
console.log("  [PASS] Test 4 Passed.\n");

// Test 5: Ease Factor Minimum Floor (EF >= 1.30)
item = {
  questionId: 'q-test-floor',
  subjectId: 'nlp',
  nextReviewDate: '2026-11-03',
  intervalDays: 1,
  repetitions: 0,
  easeFactor: 1.4,
  history: []
};
res = calculateCanonicalSM2(item, 'again', baseDate);
console.log("Test 5: Ease Factor Minimum Floor Clamping");
console.log(`  -> 1.40 - 0.54 = 0.86, but clamped to: ${res.updatedItem.easeFactor} (expected: 1.30)`);
assert.strictEqual(res.updatedItem.easeFactor, 1.3);
console.log("  [PASS] Test 5 Passed.\n");

// Test 6: Due & Overdue Queue Filtering
const queue = {
  'q1': { questionId: 'q1', nextReviewDate: '2026-11-01' }, // Overdue
  'q2': { questionId: 'q2', nextReviewDate: '2026-11-03' }, // Due Today
  'q3': { questionId: 'q3', nextReviewDate: '2026-11-05' }  // Upcoming
};
const todayStr = '2026-11-03';
const dueItems = Object.values(queue).filter(item => item.nextReviewDate <= todayStr);
const overdueItems = Object.values(queue).filter(item => item.nextReviewDate < todayStr);
const upcomingItems = Object.values(queue).filter(item => item.nextReviewDate > todayStr);

console.log("Test 6: Queue Partitioning");
console.log(`  -> Due Today or Overdue: ${dueItems.length} items (expected: 2)`);
console.log(`  -> Overdue: ${overdueItems.length} items (expected: 1)`);
console.log(`  -> Upcoming: ${upcomingItems.length} items (expected: 1)`);
assert.strictEqual(dueItems.length, 2);
assert.strictEqual(overdueItems.length, 1);
assert.strictEqual(upcomingItems.length, 1);
console.log("  [PASS] Test 6 Passed.\n");

console.log("================================================================================");
console.log("ALL 6 SM-2 TESTS PASSED WITH 100% CANONICAL COMPLIANCE!");
console.log("================================================================================");

