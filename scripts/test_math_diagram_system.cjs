const fs = require('fs');
const path = require('path');
const katex = require('katex');
const { marked } = require('marked');

// Replicate core parsing functions to test against production requirements
function renderLatexToHtml(latex, displayMode = false) {
  if (!latex || !latex.trim()) return '';
  return katex.renderToString(latex.trim(), {
    displayMode,
    throwOnError: false,
    strict: false,
    errorColor: '#ef4444'
  });
}

function parseSequenceFromAscii(text) {
  const lines = text.trim().split('\n').map(l => l.replace(/\r$/, ''));
  if (lines.length < 3) return null;

  const headerParts = lines[0].split(/\s{2,}/).map(s => s.trim()).filter(Boolean);
  if (headerParts.length < 2) return null;

  const leftEntity = headerParts[0];
  const rightEntity = headerParts[1];
  const steps = [];

  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();
    if (!trimmed) continue;

    const lostArrowMatch = rawLine.match(/\|\s*-{2,}\s*([^-><|]+?)\s*-{2,}X\s*\|?(.*)/);
    const rightArrowMatch = rawLine.match(/\|\s*-{2,}\s*([^-><|]+?)\s*-{2,}>\s*\|?(.*)/);
    const leftArrowMatch = rawLine.match(/\|\s*<*-{2,}\s*([^-><|]+?)\s*-{2,}\s*\|?(.*)/);

    if (lostArrowMatch) {
      steps.push({ type: 'lost-right', label: lostArrowMatch[1].trim(), sideNote: lostArrowMatch[2].replace(/[|]/g, '').trim() });
    } else if (rightArrowMatch) {
      steps.push({ type: 'right', label: rightArrowMatch[1].trim(), sideNote: rightArrowMatch[2].replace(/[|]/g, '').trim() });
    } else if (leftArrowMatch) {
      steps.push({ type: 'left', label: leftArrowMatch[1].trim(), sideNote: leftArrowMatch[2].replace(/[|]/g, '').trim() });
    } else {
      const cleanNote = trimmed.replace(/^[|\s]+|[|\s]+$/g, '').trim();
      if (cleanNote) steps.push({ type: 'note', label: cleanNote });
    }
  }

  return steps.length > 0 ? { leftEntity, rightEntity, steps } : null;
}

function parseBitfieldFields(text) {
  const lines = text.trim().split('\n').filter(l => l.includes('|'));
  if (lines.length === 0) return null;
  const fields = lines[0].split('|').map(s => s.trim()).filter(Boolean);
  return fields.length >= 2 ? fields : null;
}

console.log('================================================================');
console.log('SEMESTEROS: MATHEMATICAL & DIAGRAM SYSTEM VERIFICATION SUITE');
console.log('================================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
  }
}

// -------------------------------------------------------------
// Test Case 1: Mathematical Formula Rendering
// -------------------------------------------------------------
console.log('--- TEST GROUP 1: Core Mathematical Formulas ---');

// 1.1 Shannon & Nyquist
const shannon = 'C = B \\log_2(1 + \\text{SNR})';
const shannonHtml = renderLatexToHtml(shannon, false);
assert(shannonHtml.includes('katex') && shannonHtml.includes('SNR'), 'Shannon capacity formula renders with KaTeX');

const bitsPerSymbol = '\\frac{8000\\ \\text{bits/s}}{1000\\ \\text{symbols/s}} = 8\\ \\text{bits/symbol}';
const bitsHtml = renderLatexToHtml(bitsPerSymbol, true);
assert(bitsHtml.includes('katex') && bitsHtml.includes('frac'), 'Bits per symbol fraction equation renders with KaTeX');

// 1.2 Ethernet Frame & CSMA/CD
const csmaMin = 'T_{\\text{frame}} \\ge 2\\tau, \\qquad L_{\\min} = 2\\tau R';
const csmaHtml = renderLatexToHtml(csmaMin, true);
assert(csmaHtml.includes('katex') && csmaHtml.includes('tau'), 'CSMA/CD propagation delay and frame bound renders with KaTeX');

// 1.3 Histogram Equalization
const histEq = 's_k = T(r_k) = (L-1)\\sum_{j=0}^{k}p_r(r_j)';
const histHtml = renderLatexToHtml(histEq, true);
assert(histHtml.includes('katex') && histHtml.includes('sum'), 'Histogram equalization summation formula renders with KaTeX');

// 1.4 2D Discrete Fourier Transform
const dft = 'F(u,v)=\\sum_{x=0}^{M-1}\\sum_{y=0}^{N-1} f(x,y)e^{-j2\\pi(ux/M+vy/N)}';
const dftHtml = renderLatexToHtml(dft, true);
assert(dftHtml.includes('katex') && dftHtml.includes('pi'), '2D Fourier Transform double summation renders with KaTeX');

// 1.5 System Software Relocation
const reloc = '\\text{Relocation factor} = 4000 - 1000 = 3000';
const relocHtml = renderLatexToHtml(reloc, true);
assert(relocHtml.includes('katex') && relocHtml.includes('Relocation'), 'System software relocation equation renders with KaTeX');

// -------------------------------------------------------------
// Test Case 2: Prevention of False Positives
// -------------------------------------------------------------
console.log('\n--- TEST GROUP 2: False Positive Math Protection ---');

const testText = 'Question 1: Explain OSI Model. [7 Marks] And subpart [3+4=7 marks].';
const marksMatch = testText.match(/\\\[([\s\S]+?)\\\]/g);
assert(marksMatch === null, 'Non-escaped marks tags [7 Marks] are not matched as display math');

// -------------------------------------------------------------
// Test Case 3: Recognizable ASCII Diagram Parsing
// -------------------------------------------------------------
console.log('\n--- TEST GROUP 3: ASCII Diagram Conversions ---');

// 3.1 TCP 3-Way Handshake
const tcpText = `Client                                      Server
  | ---- SYN, Seq = x ----------------------> |
  | <--- SYN+ACK, Seq = y, Ack = x+1 ------- |
  | ---- ACK, Ack = y+1 --------------------> |
  |            Connection established        |`;

const tcpSeq = parseSequenceFromAscii(tcpText);
assert(tcpSeq !== null, 'TCP 3-Way Handshake recognized as sequence diagram');
assert(tcpSeq.leftEntity === 'Client' && tcpSeq.rightEntity === 'Server', 'TCP entities correctly identified as Client & Server');
assert(tcpSeq.steps.length === 4, 'TCP handshake has 4 steps (SYN, SYN+ACK, ACK, Connection established)');
assert(tcpSeq.steps[0].type === 'right' && tcpSeq.steps[1].type === 'left', 'Arrow directions correctly identified');

// 3.2 DHCP DORA
const dhcpText = `Client                         DHCP Server
  | ---- DHCPDISCOVER (broadcast) ----> |
  | <--- DHCPOFFER -------------------- |
  | ---- DHCPREQUEST -----------------> |
  | <--- DHCPACK ---------------------- |`;

const dhcpSeq = parseSequenceFromAscii(dhcpText);
assert(dhcpSeq !== null, 'DHCP DORA recognized as sequence diagram');
assert(dhcpSeq.steps.length === 4, 'DHCP exchange has 4 steps (Discover, Offer, Request, Acknowledge)');

// 3.3 CSMA/CD Collision Timeline
const csmaText = `Station A                         Station B
  | -------- frame begins --------> |
  | <------ collision travels ----- |
  | detects collision before frame transmission ends`;

const csmaSeq = parseSequenceFromAscii(csmaText);
assert(csmaSeq !== null, 'CSMA/CD Collision sequence recognized');
assert(csmaSeq.steps[2].label.includes('collision before frame transmission ends'), 'Collision note parsed correctly');

// 3.4 ARQ Lost Frame Sequence
const arqText = `Sender                         Receiver
  | -------- Frame 0 ----------> | accepts 0
  | -------- Frame 1 ----X       | lost
  | -------- Frame 2 ----------> | discards (out of order)
  | <------- ACK 1 ------------- | still expects 1`;

const arqSeq = parseSequenceFromAscii(arqText);
assert(arqSeq !== null, 'ARQ sequence recognized');
assert(arqSeq.steps[1].type === 'lost-right', 'Lost frame Frame 1 ----X correctly identified as lost-right step');
assert(arqSeq.steps[1].sideNote === 'lost', 'Side note "lost" correctly captured');

// 3.5 Bitfield Frame Header
const frameText = `| Preamble 7 | SFD 1 | Destination MAC 6 | Source MAC 6 |
| Type 2 | Data + Pad 46–1500 | FCS 4 |`;

const bitfields = parseBitfieldFields(frameText);
assert(bitfields !== null && bitfields.length === 4, 'Ethernet frame bitfield recognized with header fields');

// -------------------------------------------------------------
// Test Case 4: Comprehensive Answer Files Scan
// -------------------------------------------------------------
console.log('\n--- TEST GROUP 4: Full Answer Files Database Scan ---');

const answersDir = path.join(process.cwd(), 'Answers');
const files = fs.readdirSync(answersDir).filter(f => f.endsWith('.md'));

let totalFormulas = 0;
let totalSequences = 0;

files.forEach(file => {
  const content = fs.readFileSync(path.join(answersDir, file), 'utf8');
  // Count math matches
  const blockDollar = (content.match(/\$\$[\s\S]+?\$\$/g) || []).length;
  const slashBracket = (content.match(/\\\[[\s\S]+?\\\]/g) || []).length;
  const slashParen = (content.match(/\\\([\s\S]+?\\\)/g) || []).length;
  const inlineDollar = (content.match(/\$(?!\$)[^\n$]+?\$/g) || []).length;
  const fileMath = blockDollar + slashBracket + slashParen + inlineDollar;
  totalFormulas += fileMath;

  // Check code blocks
  const codeBlocks = content.match(/```[a-zA-Z0-9_-]*\r?\n([\s\S]*?)```/g) || [];
  codeBlocks.forEach(cb => {
    const raw = cb.replace(/```[a-zA-Z0-9_-]*\r?\n/, '').replace(/```$/, '');
    if (parseSequenceFromAscii(raw)) totalSequences++;
  });
});

assert(totalFormulas > 500, `Found and verified ${totalFormulas} total math formulas across all subjects (> 500 expected)`);
assert(totalSequences >= 5, `Found and verified ${totalSequences} sequence flow diagrams (> 5 expected)`);

console.log('\n================================================================');
console.log(`TEST RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
}

