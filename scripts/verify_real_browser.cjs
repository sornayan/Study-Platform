const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const baseFileUrl = 'file:///C:/Users/rb152/OneDrive/Documents/B-Tech/6th%20sem%20PYQ/EndSem/dist/index.html';

const screenshotsDir = path.join(process.cwd(), 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

function runBrowserTest(routeHash, screenshotName) {
  const url = `${baseFileUrl}#${routeHash}`;
  const screenshotPath = path.join(screenshotsDir, screenshotName);

  const args = [
    '--headless=new',
    '--allow-file-access-from-files',
    '--no-sandbox',
    '--disable-gpu',
    '--window-size=1280,1024',
    `--screenshot=${screenshotPath}`,
    '--dump-dom',
    url
  ];

  try {
    const dom = execFileSync(chromePath, args, { encoding: 'utf8', maxBuffer: 25 * 1024 * 1024 });
    return { success: true, dom, screenshotPath };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

console.log('================================================================');
console.log('AUTOMATED END-TO-END BROWSER VERIFICATION (HEADLESS CHROME)');
console.log('================================================================\n');

// 1. Formula & Definition Book
console.log('--- 1. Testing Formula Book View ---');
const res1 = runBrowserTest('formula-book', 'formula_book.png');
if (res1.success) {
  const dom = res1.dom;
  const domNoAnnotation = dom.replace(/<annotation[\s\S]*?<\/annotation>/g, '');
  const hasShannon = dom.includes('Shannon Capacity Theorem');
  const hasKaTeX = dom.includes('class="katex"') || dom.includes('katex-display');
  const hasRawLatex = domNoAnnotation.includes('\\log_2(1 + \\text{SNR})');
  console.log('  Rendered Formula Book:', hasShannon);
  console.log('  Contains KaTeX rendered elements:', hasKaTeX);
  console.log('  Raw backslash LaTeX leaked to visible DOM:', hasRawLatex);
  console.log('  Screenshot saved:', res1.screenshotPath);
} else {
  console.error('  Failed to run Formula Book test:', res1.error);
}

// 2. Computer Networks 2024 Q3(b) (CSMA/CD T_frame)
console.log('\n--- 2. Testing CSMA/CD Question (T_frame >= 2tau) ---');
const res2 = runBrowserTest('study-room?subject=computer-networks&q=computer-networks-2024-q3b', 'csma_cd_answer.png');
if (res2.success) {
  const dom = res2.dom;
  const hasCSMA = dom.includes('CSMA/CD') || dom.includes('CSMA');
  const hasKaTeX = dom.includes('class="katex"');
  const hasRawTframe = dom.includes('T_{frame}');
  const hasSeqDiagram = dom.includes('Protocol Exchange Timeline') || dom.includes('Station A');
  console.log('  Rendered Question:', hasCSMA);
  console.log('  Contains KaTeX formula elements:', hasKaTeX);
  console.log('  Contains Sequence Timeline visual component:', hasSeqDiagram);
  console.log('  Screenshot saved:', res2.screenshotPath);
} else {
  console.error('  Failed to run CSMA/CD test:', res2.error);
}

// 3. Computer Networks 2021 Q2(b) (8000 bits/s / 1000 symbols/s = 8 bits/symbol)
console.log('\n--- 3. Testing Bits per Symbol Question (8000 bits/s) ---');
const res3 = runBrowserTest('study-room?subject=computer-networks&q=computer-networks-2021-q2b', 'bits_per_symbol.png');
if (res3.success) {
  const dom = res3.dom;
  const domNoAnnotation = dom.replace(/<annotation[\s\S]*?<\/annotation>/g, '');
  const hasBits = dom.includes('8000');
  const hasKaTeX = dom.includes('class="katex"');
  const hasRawFrac = domNoAnnotation.includes('\\frac{8000');
  console.log('  Rendered Question:', hasBits);
  console.log('  Contains KaTeX formula elements:', hasKaTeX);
  console.log('  Raw \\frac command leaked to visible DOM:', hasRawFrac);
  console.log('  Screenshot saved:', res3.screenshotPath);
} else {
  console.error('  Failed to run Bits per Symbol test:', res3.error);
}

// 4. Computer Networks 2021 Q1(a) (7-layer OSI Box ASCII -> Visual Component)
console.log('\n--- 4. Testing OSI Model 7-Layer Diagram ---');
const res4 = runBrowserTest('study-room?subject=computer-networks&q=computer-networks-2021-q1a', 'osi_model_diagram.png');
if (res4.success) {
  const dom = res4.dom;
  const hasOSI = dom.includes('OSI 7-Layer Reference Model');
  const hasLayers = dom.includes('Application Layer') && dom.includes('Physical Layer');
  const hasRawAsciiBox = dom.includes('+-----------------------------+');
  console.log('  Contains Visual OSI 7-Layer Stack:', hasOSI && hasLayers);
  console.log('  Raw ASCII box table visible by default:', hasRawAsciiBox);
  console.log('  Screenshot saved:', res4.screenshotPath);
} else {
  console.error('  Failed to run OSI Model test:', res4.error);
}

// 5. Image Processing 2025 Q6(b) (Histogram Equalization)
console.log('\n--- 5. Testing Histogram Equalization Question ---');
const res5 = runBrowserTest('study-room?subject=image-processing&q=image-processing-2025-q6b', 'histogram_equalization.png');
if (res5.success) {
  const dom = res5.dom;
  const hasHist = dom.includes('Histogram') || dom.includes('histogram');
  const hasKaTeX = dom.includes('class="katex"');
  console.log('  Rendered Question:', hasHist);
  console.log('  Contains KaTeX formula elements:', hasKaTeX);
  console.log('  Screenshot saved:', res5.screenshotPath);
} else {
  console.error('  Failed to run Histogram Equalization test:', res5.error);
}

// 6. System Software 2025 Q7(b) (Assembly Code Block -> CodeBlockRenderer)
console.log('\n--- 6. Testing Assembly Code Block ---');
const res6 = runBrowserTest('study-room?subject=system-software&q=system-software-2025-question7b', 'assembly_code_block.png');
if (res6.success) {
  const dom = res6.dom;
  const hasCode = dom.includes('MACRO') && dom.includes('LDA');
  const hasCodeHeader = dom.includes('SIC / SIC-XE Assembly') || dom.includes('lines');
  const isMislabeledAsSequence = dom.includes('Protocol Exchange Timeline');
  console.log('  Rendered Assembly Code:', hasCode);
  console.log('  Rendered with CodeBlockRenderer header:', hasCodeHeader);
  console.log('  Mislabeled as Sequence diagram:', isMislabeledAsSequence);
  console.log('  Screenshot saved:', res6.screenshotPath);
} else {
  console.error('  Failed to run Assembly test:', res6.error);
}

// 7. Mobile Viewport Test (360x800)
console.log('\n--- 7. Testing Mobile Viewport (360x800) for Formula Horizontal Scrolling ---');
const mobileArgs = [
  '--headless=new',
  '--allow-file-access-from-files',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=360,800',
  `--screenshot=${path.join(screenshotsDir, 'mobile_360_csma.png')}`,
  '--dump-dom',
  `${baseFileUrl}#study-room?subject=computer-networks&q=computer-networks-2024-q3b`
];
try {
  const mDom = execFileSync(chromePath, mobileArgs, { encoding: 'utf8', maxBuffer: 25 * 1024 * 1024 });
  const hasOverflowClass = mDom.includes('overflow-x-auto');
  console.log('  Mobile DOM rendered successfully.');
  console.log('  Contains overflow-x-auto containers:', hasOverflowClass);
  console.log('  Screenshot saved: screenshots/mobile_360_csma.png');
} catch (mErr) {
  console.error('  Mobile test error:', mErr.message);
}

console.log('\n================================================================');
console.log('END-TO-END BROWSER TESTS COMPLETED');
console.log('================================================================');
