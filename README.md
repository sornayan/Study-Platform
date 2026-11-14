# SemesterOS — Personal University Exam Preparation Platform
### B.Tech Computer Science & Engineering / Information Technology (Semester VI) • Vinoba Bhave University

SemesterOS is a complete, production-quality, highly interactive study and examination preparation platform engineered specifically for B.Tech CSE / IT university semester examinations.

---

## 🚀 Quick Start

To launch SemesterOS in development mode:

```bash
npm run dev
```

To build and preview the production application:

```bash
npm run build
npm run preview
```

The application runs locally on `http://localhost:3000` (or `http://localhost:4173` in production preview mode) and features full **Offline PWA support**.

---

## 📚 Subject Coverage & Canonical Source Manifest

All questions, reference answers, mathematical formulas, and diagrams are imported directly from the audited canonical markdown documents:

| Subject Name | Code | Canonical Source File | File Size | Examination Years | Verified Answer Entries | Syllabus Structure |
| :--- | :---: | :--- | :---: | :---: | :---: | :---: |
| **Computer Networks** | `CS601` | `Answers/COMPUTER_NETWORKS_PYQ_ANSWERS.md` | 90,104 B | 2021 – 2025 (5 Yrs) | **84** | Modules I–VI (6 Prescribed Modules) |
| **Cloud Computing** | `CS642` | `Answers/CLOUD_COMPUTING_PYQ_ANSWERS.md` | 111,598 B | 2021 – 2025 (5 Yrs) | **75** | Modules 1–5 (5 Prescribed Modules) |
| **Digital Image Processing** | `CS633` | `Answers/IMAGE_PROCESSING_PYQ_ANSWERS.md` | 112,754 B | 2021 – 2025 (5 Yrs) | **75** | Modules 1–5 (5 Prescribed Modules) |
| **Entrepreneurship** | `IC601` | `Answers/ENTREPRENEURSHIP_PYQ_ANSWERS.md` | 124,157 B | 2021 – 2025 (5 Yrs) | **75** | 5 Examination Themes *(Official syllabus not prescribed)* |
| **Natural Language Processing** | `CS622` | `Answers/NATURAL_LANGUAGE_PROCESSING_PYQ_ANSWERS_AUDITED.md` | 95,531 B | 2025 Annual (1 Yr) | **14** | Modules I–V (5 Prescribed Modules) |
| **System Software** | `IT611` | `Answers/SYSTEM_SOFTWARE_PYQ_ANSWERS.md` | 65,152 B | 2024 – 2025 (2 Yrs) | **30** | Modules 1–4 *(4 Modules per official syllabus)* |
| **GRAND TOTAL** | — | **6 Canonical Audited Files** | **599,296 B** | **23 Papers** | **353** | **25 Prescribed Modules + 5 Themes = 30 Total** |

---

## 🔍 Question Count & Taxonomy Breakdown

SemesterOS rigorously classifies examination entries to avoid misleading totals:

- **Total University Examination Papers:** 23 Complete Papers
- **Total Main Question Blocks:** 178 Major Question Blocks (Q1 through Q7 or Q8 across all papers)
- **Total Lettered Sub-Questions:** 324 Lettered Sub-Questions (e.g. `Q1(a)`, `Q1(b)`)
- **Total Internal / OR Alternatives:** 2 Explicit Alternatives (CN 2024 `Q2(b)` OR and Entrepreneurship 2025 `Q4(a)` OR)
- **Total Short-Note Option Groups:** 27 Modular Short-Note Options
- **TOTAL STORED QUESTION-ANSWER RECORDS:** **353 Verified Records** *(or 354 if NLP Q7(a)(i) and Q7(a)(ii) are indexed as discrete items)*

---

## 🎯 10 Authentic Practice Test Formats

All test items are derived directly from genuine answers and syllabus definitions (zero generic boilerplate):

1. **Multiple Choice Questions (MCQ):** 4 syllabus-grounded options with intelligent domain-specific distractors.
2. **True / False Statements:** Factual propositions verifying theorems and common examination pitfalls.
3. **Fill in the Blanks:** Core domain technical terms with contextual character length and initial letter hints.
4. **Matching Pairs:** Interactive matching connecting protocols, transforms, or tools to their operational specifications.
5. **One-Line Direct Recall:** Precision prompts testing immediate definitions and formulas.
6. **Short Answer Questions (2–3 Marks):** Focused queries with an expected 3-point grading criteria checklist.
7. **Long Answer Essay (7 Marks):** Complete 7-mark university questions evaluated via **rubric-based self-assessment** across a 4-part university marking criteria.
8. **Numerical & Calculation Practice:** Formula substitution, calculation steps, and numerical solutions (CRC, Subnetting, Shannon, Histograms).
9. **Diagram Recognition:** Architectural schematics and workflow verification.
10. **Rapid Revision Blitz:** High-speed randomized mixed drill under aggressive time pressure.

---

## 🧠 Active Recall & Canonical SuperMemo SM-2 Engine

- **Canonical Algorithm:** Implements the textbook SuperMemo SM-2 interval progression:
  - Repetition 1: $I(1) = 1$ day
  - Repetition 2: $I(2) = 6$ days
  - Repetition 3+: $I(n) = \text{round}(I(n-1) \times \text{EF}')$
  - Ease Factor update: $\text{EF}' = \max(1.3, \text{EF} + (0.1 - (5 - q) \cdot (0.08 + (5 - q) \cdot 0.02)))$
  - Threshold: Any quality $q < 3$ (`again`) resets repetitions to 0 and interval to 1 day.
- **Dedicated Study Queues:** Due Today, Overdue, Upcoming Reviews, and Long-Term Mastered.

---

## ⏱️ Paper-Specific University Mock Examination Engine

- **Duration:** 180 Minutes (3 Hours) authentic countdown timer.
- **Paper-Specific Question Trees:**
  - 6 Papers with 7 Main Questions: Cloud Computing (2025, 2024, 2023), Computer Networks (2025), NLP (2025), System Software (2025).
  - 17 Papers with 8 Main Questions: Computer Networks (2024, 2023, 2022, 2021), Cloud Computing (2022, 2021), Image Processing (2021–2025), Entrepreneurship (2021–2025), System Software (2024).
- **Two Distinct Examination Modes:**
  1. **Original-Paper Simulation Mode:** Follows that paper's authentic university instructions (*"Answer any FIVE questions out of {availableMainQuestions}"*), enforces a strict 5-question limit, and scores out of 70 marks.
  2. **Comprehensive Practice Mode:** Allows attempting every question, subquestion, and OR alternative in the paper without limits.

---

## 📱 PWA & Offline Access

- **Progressive Web App:** Installable on Windows, macOS, Android, and iOS.
- **Service Worker (`public/sw.js`):** Cache-first strategy for static assets and network-first strategy for shell navigation with index.html fallback.
- **Web App Manifest (`public/manifest.json`):** Full standalone display support.
- **Local Persistence:** Zero cloud latency — all user notes, bookmarks, highlights, test attempts, and study analytics persist via `localStorage`.
- **Offline Operational Boundary:** The very first launch requires an active Internet connection to download the application shell and install the Service Worker. Subsequent study sessions, PYQs, flashcards, and practice engines function 100% offline.

---

## 📐 Mathematical Formulas & Visual Diagram Architecture

SemesterOS features an academic-grade mathematical and diagrammatic content-rendering engine:

- **KaTeX Mathematical Typesetting:**
  - High-precision rendering for 591+ verified mathematical formulas across all subjects.
  - Native support for both display math (`$$...$$`, `\[...\]`) and inline math (`\(...\)`, `$ ... $`).
  - Correct rendering of fractions ($\frac{8000}{1000}=8$), summations ($s_k = (L-1)\sum p_r(r_j)$), 2D DFT double summations, bounds ($T_{\text{frame}} \ge 2\tau$), logarithms ($C = B \log_2(1 + \text{SNR})$), Greek symbols, and matrices.
  - Horizontal equation scrolling containers (`overflow-x-auto`) to guarantee zero layout overflow on small smartphone screens (360px).
  - High-contrast visual clarity in both light (`text-slate-900`) and dark (`text-slate-100`) themes.
  - Safe guards preventing non-math bracket annotations like `[7 Marks]` or `[3+4=7 Marks]` from being misparsed as math.
- **ASCII Diagram Conversion to Visual Interactive Components:**
  - **OSI 7-Layer Protocol Stack:** Automatically detects 7-layer ASCII box diagrams and renders an interactive, color-coded protocol stack (Layers 7 down to 1) with PDU chips (`Data`, `Segment`, `Packet`, `Frame`, `Bits`), protocol lists, layer inspector, and original ASCII toggle with one-click copy.
  - **Protocol Sequence Timelines:** Recognizes network exchanges (Station A/B CSMA/CD collision, TCP 3-way handshake SYN/ACK, DHCP DORA exchange, Stop-and-Wait / Go-Back-N ARQ lost frames) and renders them as animated sequence timelines with participant lifelines, message vectors, and status chips (`[LOST]`, `[BROADCAST]`, `[ESTABLISHED]`).
  - **Packet Frame Header Bitfields:** Formats raw Ethernet/HDLC header field tables into responsive, multi-segment packet header visualizers.
  - **Dynamic Mermaid Flowcharts:** Fenced code blocks with `mermaid` syntax are dynamically rendered as interactive SVG diagrams with copy and syntax controls.
  - **CodeBlockRenderer:** All general programming code (SIC/XE Assembly, C, Python) renders in monospace JetBrains Mono blocks with language headers, line counts, line-wrap toggles, and one-click copy buttons.
- **Formula Handbook (`FormulaBookView`):**
  - Instant searchable reference handbook rendering core examination equations with typeset KaTeX typography and one-click LaTeX copy.

---

## 📊 Educational Diagrams

Custom responsive SVG schematics embedded across subjects:
- **Computer Networks:** OSI 7-Layer vs TCP/IP 4-Layer Architecture; CRC Modulo-2 Arithmetic Engine
- **System Software:** Two-Pass Assembler Workflow (OPTAB, SYMTAB, Pass 1 & 2); JVM & CLI Architecture
- **Cloud Computing:** Cloud SPI Tier Architecture (SaaS, PaaS, IaaS) & Shared Responsibility
- **Digital Image Processing:** Histogram Equalization CDF Transformation; Canny 5-Stage Edge Detection Pipeline
- **Natural Language Processing:** CKY Triangular Parsing Chart; 5-Phase NLP Processing Pipeline
- **Entrepreneurship:** 5-Stage Venture Creation Lifecycle

---

## 🖥️ Responsive Verification (6 Viewports Tested)

Automated headless browser tests verified layout integrity across all 6 target breakpoints:
1. `1920 × 1080` (Desktop / Wide Screen)
2. `1366 × 768` (Standard Laptop)
3. `1024 × 768` (Small Laptop / Tablet Landscape)
4. `768 × 1024` (iPad / Tablet Portrait)
5. `390 × 844` (Smartphone: iPhone 12/13/14)
6. `360 × 800` (Smartphone: Android Standard)

---

## 🧪 Automated Verification Suite

Run all deterministic automated verification suites:

```bash
# Production build & bundle check
npm run build

# End-to-end headless browser verification & visual screenshots
node scripts/verify_real_browser.cjs

# Academic content, diagram quality & typography verification (10 target questions)
node scripts/test_academic_content.cjs

# Visible DOM zero-leak LaTeX command verification
node scripts/verify_visible_dom.cjs

# SM-2 Spaced Repetition engine compliance
node scripts/test_scheduler.cjs

# Mock Examination paper distributions (23 papers)
node scripts/test_mock_exams.cjs

# 10 Practice Test formats (3,530 items)
node scripts/test_practice_engine.cjs

# Responsive viewports (6 breakpoints)
node scripts/test_responsive.cjs

# PWA & Offline persistence
node scripts/test_offline.cjs
```

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + Lucide Icons
- **Build Tool:** Vite v8 + Rolldown Bundler (Code splitting with dedicated database chunk)
- **Content Rendering:** Modular Pipeline: `MarkdownRenderer` + `MathRenderer` (KaTeX v0.16) + `DiagramRenderer` (Mermaid v11 + Custom ASCII parsers) + `CodeBlockRenderer`
- **State & Storage:** React Context API + LocalStorage PWA Cache
