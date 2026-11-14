import React, { useState } from 'react';
import { 
  Zap, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  AlertTriangle,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getAllSubjects, getQuestionById } from '../data/pyqData';

export const LastMinuteRevisionView: React.FC = () => {
  const { setActiveSubjectId, setActiveQuestionId, setCurrentRoute, setStudyMode } = useApp();
  const subjects = getAllSubjects();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);

  const highYieldTopics = [
    {
      id: 1,
      subjectId: 'computer-networks',
      subjectName: 'Computer Networks (CS601)',
      title: 'OSI vs TCP/IP Reference Models',
      frequency: 'Repeated in 2025, 2024, 2022, 2021',
      summary: 'OSI is a 7-layer theoretical conceptual model (Physical, Data Link, Network, Transport, Session, Presentation, Application). TCP/IP is a 4-layer practical protocol suite (Network Access, Internet, Transport, Application). Key difference: OSI was designed before protocols were invented; TCP/IP was implemented around existing protocols.',
      examTips: 'Always draw both side-by-side vertical block diagrams showing layer mapping.'
    },
    {
      id: 2,
      subjectId: 'computer-networks',
      subjectName: 'Computer Networks (CS601)',
      title: 'Cyclic Redundancy Check (CRC) Calculation',
      frequency: 'Repeated in 2025, 2023, 2022',
      summary: 'Append r zero bits to data D(x) where r = degree of generator G(x). Perform binary modulo-2 division (XOR subtraction). The remainder R is transmitted as the frame check sequence. Receiver divides received bit stream by G(x); zero remainder indicates error-free transmission.',
      examTips: 'Show the long-division XOR steps explicitly. Remember: XOR has no carries or borrows (1+1=0, 1+0=1).'
    },
    {
      id: 3,
      subjectId: 'cloud-computing',
      subjectName: 'Cloud Computing (CS642)',
      title: 'SPI Cloud Service Models (SaaS, PaaS, IaaS)',
      frequency: 'Repeated in 2025, 2024, 2023, 2022, 2021',
      summary: 'IaaS provides raw infrastructure (VMs, storage, virtual networks - AWS EC2). PaaS provides runtime platform & SDKs for developers (Google App Engine). SaaS delivers ready-to-use software applications over web (Google Workspace, Salesforce). Vendor responsibility increases from IaaS to SaaS.',
      examTips: 'Draw the stacked pyramidal hierarchy and shared responsibility chart.'
    },
    {
      id: 4,
      subjectId: 'cloud-computing',
      subjectName: 'Cloud Computing (CS642)',
      title: 'Type 1 (Bare-Metal) vs Type 2 (Hosted) Hypervisors',
      frequency: 'Repeated in 2024, 2023, 2021',
      summary: 'Type 1 (Bare-Metal) runs directly on host server hardware without underlying OS (VMware ESXi, KVM, Xen), delivering near-native performance. Type 2 (Hosted) runs as an application atop a host OS (VirtualBox, VMware Workstation), introducing OS latency overhead.',
      examTips: 'Draw layered block architecture comparing Hardware -> Hypervisor -> VMs vs Hardware -> Host OS -> Hypervisor -> VMs.'
    },
    {
      id: 5,
      subjectId: 'image-processing',
      subjectName: 'Digital Image Processing (CS633)',
      title: 'Histogram Equalization Transformation Algorithm',
      frequency: 'Repeated in 2025, 2024, 2023, 2022',
      summary: 'Enhancement method that flattens pixel intensity histogram across [0, L-1] to maximize image contrast. Compute probability p_r(r_k) = n_k / MN, calculate Cumulative Distribution Function (CDF), multiply by (L-1), and round to nearest discrete gray level.',
      examTips: 'Write the transformation formula s_k = (L-1) * sum(n_j / MN) and state that it yields a uniform PDF.'
    },
    {
      id: 6,
      subjectId: 'system-software',
      subjectName: 'System Software (IT611)',
      title: 'Two-Pass Assembler Design (OPTAB & SYMTAB)',
      frequency: 'Repeated in 2025, 2024',
      summary: 'Pass 1 assigns addresses to statements using Location Counter (LC), identifies labels and stores their addresses in SYMTAB, and processes literals. Pass 2 translates opcodes into machine code using OPTAB, looks up symbol addresses in SYMTAB, and writes Header, Text, and End object records.',
      examTips: 'State why two passes are required: to resolve forward reference problems where labels are referenced before their definitions.'
    },
    {
      id: 7,
      subjectId: 'nlp',
      subjectName: 'Natural Language Processing (CS622)',
      title: 'Dynamic Programming Parsing (CKY Algorithm)',
      frequency: '2025 Annual Core Paper',
      summary: 'Tabular chart parser that parses natural language in O(n^3) time instead of exponential backtracking. Grammar must be in Chomsky Normal Form (CNF: A -> BC or A -> a). Fills triangular table table[i, j] by combining sub-spans table[i, k] and table[k, j].',
      examTips: 'Draw the 4x4 triangular chart matrix for the sentence "she eats the fish".'
    },
    {
      id: 8,
      subjectId: 'entrepreneurship',
      subjectName: 'Entrepreneurship (IC601)',
      title: 'Entrepreneurs Born vs Made & EDP Programmes',
      frequency: 'Repeated in 2025, 2024, 2023, 2022, 2021',
      summary: 'Balanced view: Inborn personal traits (initiative, risk tolerance, vision) provide a natural foundation, but managerial skills, market analysis, and financial planning are systematically acquired through Entrepreneurship Development Programmes (EDPs).',
      examTips: 'Structure with 3 sections: Arguments for Born, Arguments for Made, and Synthesis conclusion.'
    }
  ];

  const filteredTopics = highYieldTopics.filter(t => selectedSubjectId === 'all' || t.subjectId === selectedSubjectId);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* High-yield Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-xl shadow-amber-500/10 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5" />
          <span>High-Yield Examination Core</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black">
          Last-Minute University Revision Guide
        </h1>
        <p className="text-xs md:text-sm text-amber-100 max-w-xl leading-relaxed">
          The most frequently recurring concepts, comparative tables, and numerical derivations extracted from 5 years of university question papers.
        </p>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedSubjectId('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedSubjectId === 'all' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          All High-Yield Topics
        </button>
        {subjects.map(s => (
          <button
            key={s.id}
            onClick={() => setSelectedSubjectId(s.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedSubjectId === s.id ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {s.code}
          </button>
        ))}
      </div>

      {/* Topic Cards List */}
      <div className="space-y-4">
        {filteredTopics.map((t, idx) => {
          const isExpanded = expandedTopic === t.id;
          return (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600">
                      {t.subjectName}
                    </span>
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      {t.frequency}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white pt-0.5">
                    {t.title}
                  </h3>
                </div>

                <button
                  onClick={() => setExpandedTopic(isExpanded ? null : t.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.summary}
              </p>

              {isExpanded && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 space-y-1 animate-fadeIn">
                  <strong className="block text-[11px] uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    Exam Presentation Tip:
                  </strong>
                  <p>{t.examTips}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

