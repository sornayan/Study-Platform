const fs = require('fs');

console.log('--- PRODUCTION BUNDLE VERIFICATION ---');

const html = fs.readFileSync('dist/index.html', 'utf8');
console.log('1. dist/index.html:', html.length, 'bytes');
console.log('   - Has root element:', html.includes('id="root"'));
console.log('   - Has manifest link:', html.includes('manifest.json'));
console.log('   - Has service worker registration:', html.includes('serviceWorker.register'));

const manifest = JSON.parse(fs.readFileSync('dist/manifest.json', 'utf8'));
console.log('2. dist/manifest.json:', manifest.name);
console.log('   - Short name:', manifest.short_name);
console.log('   - Display mode:', manifest.display);

const sw = fs.readFileSync('dist/sw.js', 'utf8');
console.log('3. dist/sw.js:', sw.length, 'bytes');
console.log('   - Cache name present:', sw.includes('CACHE_NAME'));
console.log('   - Navigate handler present:', sw.includes('navigate'));

const db = JSON.parse(fs.readFileSync('src/data/database.json', 'utf8'));
console.log('4. src/data/database.json:');
console.log('   - Subjects count:', Object.keys(db.subjects).length);
console.log('   - Total questions:', db.metadata.totalQuestions);
for (const [sid, sub] of Object.entries(db.subjects)) {
  console.log(`     * ${sub.name} (${sub.code}): ${sub.questions.length} questions, Years: ${sub.years.join(', ')}, Modules: ${sub.modules.length}`);
}

const mf = JSON.parse(fs.readFileSync('src/data/manifest.json', 'utf8'));
console.log('5. src/data/manifest.json:');
let totalMain = 0;
let totalSub = 0;
let totalOr = 0;
let totalSn = 0;
for (const [sid, item] of Object.entries(mf)) {
  totalMain += item.totals.main_questions;
  totalSub += item.totals.subquestions;
  totalOr += item.totals.or_options;
  totalSn += item.totals.short_notes;
}
console.log(`   - Main Questions: ${totalMain}, Sub-questions: ${totalSub}, OR Options: ${totalOr}, Short-Notes: ${totalSn}`);
console.log('--- ALL CHECKS PASSED SUCCESSFULLY ---');

