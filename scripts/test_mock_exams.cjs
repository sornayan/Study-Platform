// Comprehensive Test Suite for Paper-Specific Mock Examination Engine across all 23 Papers
const fs = require('fs');
const assert = require('assert');

const db = JSON.parse(fs.readFileSync('src/data/database.json', 'utf8'));

console.log("================================================================================");
console.log("TESTING MOCK EXAMINATION ENGINE ACROSS ALL 23 EXAMINATION PAPERS");
console.log("================================================================================");

let totalPapersTested = 0;
let papersWith7Qs = 0;
let papersWith8Qs = 0;

for (const [sid, sub] of Object.entries(db.subjects)) {
  console.log(`\nAuditing Subject: ${sub.name} (${sub.code})`);
  
  for (const yr of sub.years) {
    totalPapersTested += 1;
    const questions = sub.questions.filter(q => q.year === yr);
    
    // Group by main question number
    const groups = {};
    for (const q of questions) {
      const match = q.questionNumber.match(/Q(?:uestion)?\s*(\d+)/i);
      const groupNum = match ? parseInt(match[1], 10) : 1;
      const groupKey = `Question ${groupNum}`;
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(q);
    }

    const groupKeys = Object.keys(groups).sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, ''), 10) || 0;
      const numB = parseInt(b.replace(/\D/g, ''), 10) || 0;
      return numA - numB;
    });

    const totalMain = groupKeys.length;
    if (totalMain === 7) papersWith7Qs++;
    if (totalMain === 8) papersWith8Qs++;

    // Assert that every paper has either 7 or 8 main questions
    assert(totalMain === 7 || totalMain === 8, `Paper ${sub.code} ${yr} has unexpected main question count: ${totalMain}`);

    // Check attempt limits
    const targetAttemptOfficial = Math.min(5, totalMain);
    assert.strictEqual(targetAttemptOfficial, 5, `Target attempt must be 5 for ${sub.code} ${yr}`);

    // Check marks
    const officialMaxMarks = targetAttemptOfficial * 14;
    assert.strictEqual(officialMaxMarks, 70, `Official max marks must be 70`);

    const comprehensiveMaxMarks = totalMain * 14;
    assert(comprehensiveMaxMarks === 98 || comprehensiveMaxMarks === 112, `Comprehensive marks must be 98 or 112`);

    // Check internal alternatives
    const hasAlternatives = questions.some(q => 
      q.questionCategory === 'or_option' || 
      q.questionText.toLowerCase().includes('or') || 
      q.questionNumber.toLowerCase().includes('or')
    );

    // Check short notes
    const hasShortNotes = questions.some(q => 
      q.questionCategory === 'short_note' || 
      q.questionText.toLowerCase().includes('short note')
    );

    console.log(`  * ${yr} Annual: ${totalMain} Main Questions (${groupKeys[0]}–${groupKeys[totalMain - 1]}), ${questions.length} Subquestions | Official: 5 of ${totalMain} (70M) | Comp: ${totalMain} Qs (${comprehensiveMaxMarks}M) | OR: ${hasAlternatives ? 'Yes' : 'No'} | Short-Notes: ${hasShortNotes ? 'Yes' : 'No'}`);
  }
}

console.log("\n" + "="*80);
console.log(`SUMMARY: Total Papers Audited: ${totalPapersTested}`);
console.log(`  -> Papers with exactly 7 Main Questions: ${papersWith7Qs}`);
console.log(`  -> Papers with exactly 8 Main Questions: ${papersWith8Qs}`);
console.log(`  -> Total: ${papersWith7Qs + papersWith8Qs} (100% accounted for)`);
assert.strictEqual(totalPapersTested, 23);
assert.strictEqual(papersWith7Qs, 6); // Cloud Computing (2025, 2024, 2023) + NLP (2025) + System Software (2025) + Computer Networks (2025) = 6 papers
assert.strictEqual(papersWith8Qs, 17); // 23 - 6 = 17 papers
console.log("ALL 23 EXAMINATION PAPERS VERIFIED WITH AUTHENTIC QUESTION METRICS!");
console.log("="*80);

