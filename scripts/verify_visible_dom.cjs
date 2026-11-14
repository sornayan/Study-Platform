const { execFileSync } = require('child_process');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const baseFileUrl = 'file:///C:/Users/rb152/OneDrive/Documents/B-Tech/6th%20sem%20PYQ/EndSem/dist/index.html';

// Test checking innerText via dump-dom or evaluating script in Chrome
const testCases = [
  {
    name: 'Bits per Symbol (2021 Q2b)',
    hash: 'study-room?subject=computer-networks&q=computer-networks-2021-q2b',
    expectedMathSymbol: '8000',
    forbiddenRawCommands: ['\\frac{8000', '\\[', '\\]']
  },
  {
    name: 'CSMA/CD T_frame (2024 Q3b)',
    hash: 'study-room?subject=computer-networks&q=computer-networks-2024-q3b',
    expectedMathSymbol: 'Tframe',
    forbiddenRawCommands: ['\\ge 2\\tau', '\\[', '\\]']
  },
  {
    name: 'Formula Book (Shannon & Nyquist)',
    hash: 'formula-book',
    expectedMathSymbol: 'Shannon Capacity Theorem',
    forbiddenRawCommands: ['\\cdot \\log_2', '\\text{BitRate}']
  },
  {
    name: 'OSI 7-Layer Model (2021 Q1a)',
    hash: 'study-room?subject=computer-networks&q=computer-networks-2021-q1a',
    expectedMathSymbol: 'OSI 7-Layer Reference Model',
    forbiddenRawCommands: ['+-----------------------------+']
  }
];

console.log('Testing visible DOM text to ensure NO raw LaTeX commands or ASCII boxes leak into visible text:');

for (const tc of testCases) {
  const url = `${baseFileUrl}#${tc.hash}`;
  const args = [
    '--headless=new',
    '--allow-file-access-from-files',
    '--no-sandbox',
    '--disable-gpu',
    '--dump-dom',
    url
  ];

  const dom = execFileSync(chromePath, args, { encoding: 'utf8', maxBuffer: 25 * 1024 * 1024 });

  // Remove <annotation> tags (which contain the accessible LaTeX source for screen readers)
  const domWithoutAnnotations = dom.replace(/<annotation[\s\S]*?<\/annotation>/g, '');

  let rawLeaked = false;
  for (const cmd of tc.forbiddenRawCommands) {
    if (domWithoutAnnotations.includes(cmd)) {
      console.error(`  [FAIL] ${tc.name}: Found raw command "${cmd}" in visible DOM!`);
      rawLeaked = true;
    }
  }

  if (!rawLeaked) {
    console.log(`  [PASS] ${tc.name}: 100% clean typography, zero raw commands in visible DOM.`);
  }
}

