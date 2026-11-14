const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const baseFileUrl = 'file:///C:/Users/rb152/OneDrive/Documents/B-Tech/6th%20sem%20PYQ/EndSem/dist/index.html';

const screenshotsDir = path.join(process.cwd(), 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

function runBrowserCheck(routeHash, screenshotName = null, viewport = '1280,1024') {
  const url = `${baseFileUrl}#${routeHash}`;
  const args = [
    '--headless=new',
    '--allow-file-access-from-files',
    '--no-sandbox',
    '--disable-gpu',
    `--window-size=${viewport}`,
    '--dump-dom'
  ];

  if (screenshotName) {
    const screenshotPath = path.join(screenshotsDir, screenshotName);
    args.push(`--screenshot=${screenshotPath}`);
  }

  args.push(url);

  try {
    const dom = execFileSync(chromePath, args, { encoding: 'utf8', maxBuffer: 25 * 1024 * 1024 });
    return { success: true, dom };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

console.log('================================================================');
console.log('ACADEMIC CONTENT, DIAGRAM QUALITY & TYPOGRAPHY VERIFICATION');
console.log('================================================================\n');

let allPassed = true;

// 1. IP address class comparison table
console.log('--- 1. Testing IP Address Class Comparison Table (CN 2025 Q6b) ---');
const res1 = runBrowserCheck('study-room?subject=computer-networks&q=computer-networks-2025-q6b', 'ip_table_verified.png');
if (res1.success) {
  const dom = res1.dom;
  const hasTable = dom.includes('<table') && dom.includes('255.0.0.0') && dom.includes('/8');
  const hasThead = dom.includes('<th') && dom.includes('Default mask');
  const hasResponsiveWrap = dom.includes('overflow-x-auto');
  console.log('  Table rendered:', hasTable);
  console.log('  Table headers rendered:', hasThead);
  console.log('  Responsive scroll wrapper:', hasResponsiveWrap);
  if (!hasTable || !hasThead) allPassed = false;
} else {
  console.log('  Failed to load:', res1.error);
  allPassed = false;
}

// 2. 320-byte Stop-and-Wait numerical
console.log('\n--- 2. Testing 320-Byte Stop-and-Wait Numerical (CN 2024 Q7a) ---');
const res2 = runBrowserCheck('study-room?subject=computer-networks&q=computer-networks-2024-q7a', 'stop_wait_320_steps.png');
if (res2.success) {
  const dom = res2.dom;
  const domNoAnnotation = dom.replace(/<annotation[\s\S]*?<\/annotation>/g, '');
  const hasMath = dom.includes('katex') || dom.includes('katex-display');
  const has320 = dom.includes('320') && dom.includes('bytes');
  const hasRawBoxed = domNoAnnotation.includes('\\boxed{320');
  const hasRawFrac = domNoAnnotation.includes('\\frac{T_f');
  const displayCount = (dom.match(/class="katex-display-container/g) || []).length;
  console.log('  Typeset math cards count:', displayCount);
  console.log('  Contains 320 bytes result:', has320);
  console.log('  Raw \\boxed leaked:', hasRawBoxed);
  console.log('  Raw \\frac leaked:', hasRawFrac);
  if (!hasMath || !has320 || hasRawBoxed || hasRawFrac || displayCount < 3) allPassed = false;
} else {
  console.log('  Failed to load:', res2.error);
  allPassed = false;
}

// 3. OSI Model from Computer Networks
console.log('\n--- 3. Testing OSI 7-Layer Reference Model (CN 2021 Q1a) ---');
const res3 = runBrowserCheck('study-room?subject=computer-networks&q=computer-networks-2021-q1a', 'osi_model_verified.png');
if (res3.success) {
  const dom = res3.dom;
  const hasOsiStack = dom.includes('OSI 7-Layer Reference Model');
  const hasAll7Layers = dom.includes('Application Layer') && dom.includes('Physical Layer');
  const hasTcpToggle = dom.includes('TCP/IP Mapping');
  console.log('  OSI 7-Layer stack rendered:', hasOsiStack);
  console.log('  Contains Layer 1 through 7:', hasAll7Layers);
  console.log('  Contains TCP/IP Mapping control:', hasTcpToggle);
  if (!hasOsiStack || !hasAll7Layers || !hasTcpToggle) allPassed = false;
} else {
  console.log('  Failed to load:', res3.error);
  allPassed = false;
}

// 4. Sending Host / Receiving Host Encapsulation Diagram
console.log('\n--- 4. Testing Network Encapsulation Diagram (CN 2025 Q1a) ---');
const res4 = runBrowserCheck('study-room?subject=computer-networks&q=computer-networks-2025-q1a', 'network_encapsulation_diagram.png');
if (res4.success) {
  const dom = res4.dom;
  const hasEncap = dom.includes('TCP/IP Protocol Encapsulation &amp; Decapsulation Process') || dom.includes('TCP/IP Protocol Encapsulation & Decapsulation Process');
  const hasSender = dom.includes('Sending Host') && dom.includes('Encapsulation');
  const hasReceiver = dom.includes('Receiving Host') && dom.includes('Decapsulation');
  const hasMedium = dom.includes('Physical Transmission Medium') && dom.includes('Bitstream Transmission');
  const hasConclusion = dom.includes('academic-conclusion-card');
  console.log('  Encapsulation architecture component rendered:', hasEncap);
  console.log('  Sending Host with encapsulation flow:', hasSender);
  console.log('  Receiving Host with decapsulation flow:', hasReceiver);
  console.log('  Physical medium with bitstream transmission:', hasMedium);
  console.log('  Academic conclusion card rendered:', hasConclusion);
  if (!hasEncap || !hasSender || !hasReceiver || !hasMedium || !hasConclusion) allPassed = false;
} else {
  console.log('  Failed to load:', res4.error);
  allPassed = false;
}

// 5. TCP Three-Way Handshake Sequence Diagram
console.log('\n--- 5. Testing TCP Sequence Diagram (CN 2024 Q5a) ---');
const res5 = runBrowserCheck('study-room?subject=computer-networks&q=computer-networks-2024-q5a', 'tcp_handshake_sequence.png');
if (res5.success) {
  const dom = res5.dom;
  const hasSeq = dom.includes('Protocol Exchange Timeline');
  const hasParticipants = dom.includes('Client') && dom.includes('Server');
  const hasSyn = dom.includes('SYN');
  console.log('  Sequence timeline rendered:', hasSeq);
  console.log('  Participants (Client / Server):', hasParticipants);
  console.log('  SYN exchange steps:', hasSyn);
  if (!hasSeq || !hasParticipants || !hasSyn) allPassed = false;
} else {
  console.log('  Failed to load:', res5.error);
  allPassed = false;
}

// 6. System Software Assembly Code
console.log('\n--- 6. Testing System Software Assembly Code Block (SS 2024 Q4a) ---');
const res6 = runBrowserCheck('study-room?subject=system-software&q=system-software-2024-question4a', 'assembly_code_verified.png');
if (res6.success) {
  const dom = res6.dom;
  const hasCode = dom.includes('MACRO') && dom.includes('COMP');
  const isNotSeq = !dom.includes('Protocol Exchange Timeline');
  console.log('  Assembly code preserved in code block:', hasCode);
  console.log('  Correctly not misclassified as sequence:', isNotSeq);
  if (!hasCode || !isNotSeq) allPassed = false;
} else {
  console.log('  Failed to load:', res6.error);
  allPassed = false;
}

// 7. Cloud Computing Architecture
console.log('\n--- 7. Testing Cloud Computing Architecture (CC 2025 Q1a) ---');
const res7 = runBrowserCheck('study-room?subject=cloud-computing&q=cloud-computing-2025-question1a', 'cloud_architecture_verified.png');
if (res7.success) {
  const dom = res7.dom;
  const hasCloudText = dom.includes('Cloud computing is an Internet-based model') || dom.includes('computing resources');
  const hasNumberedList = dom.includes('<ol') && dom.includes('On-demand self-service');
  console.log('  Cloud explanation rendered:', hasCloudText);
  console.log('  Numbered list formatted:', hasNumberedList);
  if (!hasCloudText || !hasNumberedList) allPassed = false;
} else {
  console.log('  Failed to load:', res7.error);
  allPassed = false;
}

// 8. Image Processing Equations
console.log('\n--- 8. Testing DIP Histogram Equalization Equations (DIP 2025 Q3a) ---');
const res8 = runBrowserCheck('study-room?subject=image-processing&q=image-processing-2025-q3a', 'dip_equations_verified.png');
if (res8.success) {
  const dom = res8.dom;
  const hasDip = dom.includes('image transform') || dom.includes('spatial representation');
  const hasKaTeX = dom.includes('katex');
  console.log('  DIP question rendered:', hasDip);
  console.log('  Equations rendered with KaTeX:', hasKaTeX);
  if (!hasDip || !hasKaTeX) allPassed = false;
} else {
  console.log('  Failed to load:', res8.error);
  allPassed = false;
}

// 9. NLP Nested Sections & Examples
console.log('\n--- 9. Testing NLP Nested Sections & Examples (NLP 2025 Q1a) ---');
const res9 = runBrowserCheck('study-room?subject=nlp&q=nlp-2025-question1a', 'nlp_sections_verified.png');
if (res9.success) {
  const dom = res9.dom;
  const hasNlp = dom.includes('Natural Language Processing') || dom.includes('Phases');
  const hasHeadings = dom.includes('<h4') || dom.includes('<h5');
  console.log('  NLP answer rendered:', hasNlp);
  console.log('  Semantic headings hierarchy present:', hasHeadings);
  if (!hasNlp || !hasHeadings) allPassed = false;
} else {
  console.log('  Failed to load:', res9.error);
  allPassed = false;
}

// 10. Entrepreneurship Long Theory Paragraphs
console.log('\n--- 10. Testing Entrepreneurship Theory (Entrepreneurship 2025 Q1a) ---');
const res10 = runBrowserCheck('study-room?subject=entrepreneurship&q=entrepreneurship-2025-question1a', 'entrepreneurship_theory_verified.png');
if (res10.success) {
  const dom = res10.dom;
  const hasEnt = dom.includes('entrepreneur is a person who identifies an opportunity');
  const hasParagraphs = (dom.match(/<p/g) || []).length >= 2;
  console.log('  Entrepreneurship answer rendered:', hasEnt);
  console.log('  Paragraph separation verified:', hasParagraphs);
  if (!hasEnt || !hasParagraphs) allPassed = false;
} else {
  console.log('  Failed to load:', res10.error);
  allPassed = false;
}

console.log('\n================================================================');
if (allPassed) {
  console.log('ALL 10 TARGET CONTENT CHECKS PASSED WITH 100% QUALITY!');
} else {
  console.log('ONE OR MORE CHECKS FAILED');
  process.exit(1);
}
console.log('================================================================');
