import React, { useState } from 'react';
import { 
  BookMarked, 
  Calculator, 
  Search, 
  Layers, 
  Sparkles, 
  FileText,
  Bookmark
} from 'lucide-react';
import { getAllSubjects } from '../data/pyqData';
import { MathRenderer } from '../components/MathRenderer';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

export const FormulaBookView: React.FC = () => {
  const subjects = getAllSubjects();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const formulas = [
    {
      subjectId: 'computer-networks',
      subject: 'Computer Networks',
      title: 'Shannon Capacity Theorem',
      formula: 'C = B \\cdot \\log_2(1 + \\text{SNR})',
      explanation: 'Defines the theoretical maximum data rate (in bps) over a noisy channel of bandwidth B (Hz) with signal-to-noise ratio SNR.',
      unit: 'bps (Bits per second)'
    },
    {
      subjectId: 'computer-networks',
      subject: 'Computer Networks',
      title: 'Nyquist Bit Rate Theorem',
      formula: '\\text{BitRate} = 2 \\cdot B \\cdot \\log_2(L)',
      explanation: 'Defines maximum data rate over a noiseless channel with bandwidth B and L discrete signal levels.',
      unit: 'bps'
    },
    {
      subjectId: 'computer-networks',
      subject: 'Computer Networks',
      title: 'Cyclic Redundancy Check (CRC) Polynomial',
      formula: 'T(x) = D(x) \\cdot 2^r \\oplus R(x)',
      explanation: 'Transmitted frame T(x) equals data bits shifted by divisor degree r plus the modulo-2 remainder R(x) obtained by dividing by generator G(x).',
      unit: 'Bit sequence'
    },
    {
      subjectId: 'computer-networks',
      subject: 'Computer Networks',
      title: 'Stop-and-Wait ARQ Efficiency',
      formula: '\\eta = \\frac{T_{\\text{frame}}}{T_{\\text{frame}} + 2 \\cdot T_{\\text{prop}}} = \\frac{1}{1 + 2a}',
      explanation: 'Channel efficiency ratio where a = T_prop / T_frame.',
      unit: 'Percentage'
    },
    {
      subjectId: 'image-processing',
      subject: 'Digital Image Processing',
      title: 'Histogram Equalization Transformation',
      formula: 's_k = T(r_k) = (L - 1) \\sum_{j=0}^{k} p_r(r_j) = \\frac{L - 1}{MN} \\sum_{j=0}^{k} n_j',
      explanation: 'Transforms input gray level r_k to an equalized output level s_k using the cumulative distribution function (CDF), flattening the histogram.',
      unit: 'Discrete intensity [0, L-1]'
    },
    {
      subjectId: 'image-processing',
      subject: 'Digital Image Processing',
      title: '2D Discrete Fourier Transform (DFT)',
      formula: 'F(u, v) = \\sum_{x=0}^{M-1} \\sum_{y=0}^{N-1} f(x, y) \\cdot e^{-j 2\\pi \\left(\\frac{ux}{M} + \\frac{vy}{N}\\right)}',
      explanation: 'Transforms an M x N spatial image f(x, y) into its frequency spectrum F(u, v).',
      unit: 'Complex numbers'
    },
    {
      subjectId: 'image-processing',
      subject: 'Digital Image Processing',
      title: '2D Convolution in Spatial Filtering',
      formula: 'g(x, y) = \\sum_{s=-a}^{a} \\sum_{t=-b}^{b} w(s, t) \\cdot f(x+s, y+t)',
      explanation: 'Spatial correlation/convolution of image f(x, y) with filter kernel w(s, t).',
      unit: 'Pixel intensity'
    },
    {
      subjectId: 'nlp',
      subject: 'Natural Language Processing',
      title: 'Latent Semantic Analysis (SVD Decomposition)',
      formula: 'X \\approx U_k \\cdot \\Sigma_k \\cdot V_k^T',
      explanation: 'Low-rank approximation of Term-Document Matrix X via Singular Value Decomposition, resolving synonymy and polysemy.',
      unit: 'Matrix decomposition'
    },
    {
      subjectId: 'nlp',
      subject: 'Natural Language Processing',
      title: 'N-Gram Maximum Likelihood Estimation',
      formula: 'P(w_n \\mid w_{n-1}) = \\frac{C(w_{n-1}, w_n)}{C(w_{n-1})}',
      explanation: 'Approximates conditional word probability based on corpus frequency counts.',
      unit: 'Probability [0, 1]'
    },
    {
      subjectId: 'nlp',
      subject: 'Natural Language Processing',
      title: 'TF-IDF Weighting in IR',
      formula: '\\text{TF-IDF}(t, d, D) = \\text{TF}(t, d) \\times \\log\\left(\\frac{|D|}{|\\{d \\in D : t \\in d\\}|}\\right)',
      explanation: 'Weights term importance by local term frequency penalized by corpus-wide document frequency.',
      unit: 'Relevance score'
    }
  ];

  const acronyms = [
    { acronym: 'ARP / RARP', full: 'Address Resolution Protocol / Reverse Address Resolution Protocol', sub: 'Computer Networks' },
    { acronym: 'CRC', full: 'Cyclic Redundancy Check', sub: 'Computer Networks' },
    { acronym: 'CSMA/CD', full: 'Carrier Sense Multiple Access with Collision Detection', sub: 'Computer Networks' },
    { acronym: 'FDM / TDM', full: 'Frequency Division Multiplexing / Time Division Multiplexing', sub: 'Computer Networks' },
    { acronym: 'SPI Model', full: 'SaaS, PaaS, IaaS Cloud Service Architecture', sub: 'Cloud Computing' },
    { acronym: 'HDFS', full: 'Hadoop Distributed File System', sub: 'Cloud Computing' },
    { acronym: 'MSP', full: 'Managed Service Provider', sub: 'Cloud Computing' },
    { acronym: 'IAM', full: 'Identity and Access Management', sub: 'Cloud Computing' },
    { acronym: 'DFT / DCT', full: 'Discrete Fourier Transform / Discrete Cosine Transform', sub: 'Image Processing' },
    { acronym: 'CDF', full: 'Cumulative Distribution Function', sub: 'Image Processing' },
    { acronym: 'OPTAB / SYMTAB', full: 'Operation Code Table / Symbol Table in Assemblers', sub: 'System Software' },
    { acronym: 'SIC / SIC-XE', full: 'Simplified Instructional Computer (Extra Equipment)', sub: 'System Software' },
    { acronym: 'DEFTAB / NAMTAB', full: 'Definition Table / Name Table in Macro Processors', sub: 'System Software' },
    { acronym: 'CKY', full: 'Cocke-Younger-Kasami Dynamic Programming Parser', sub: 'NLP' },
    { acronym: 'NER', full: 'Named Entity Recognition', sub: 'NLP' },
    { acronym: 'LSA', full: 'Latent Semantic Analysis', sub: 'NLP' },
    { acronym: 'EDP', full: 'Entrepreneurship Development Programme', sub: 'Entrepreneurship' },
    { acronym: 'SIDBI', full: 'Small Industries Development Bank of India', sub: 'Entrepreneurship' },
    { acronym: 'MSME', full: 'Micro, Small and Medium Enterprises', sub: 'Entrepreneurship' }
  ];

  const filteredFormulas = formulas.filter(f => {
    const matchesSub = selectedSubject === 'all' || f.subjectId === selectedSubject;
    const matchesQ = f.title.toLowerCase().includes(searchQuery.toLowerCase()) || f.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSub && matchesQ;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Formula, Acronym & Definition Handbook</h1>
        <p className="text-xs md:text-sm text-slate-500">
          Curated collection of mathematical formulas, technical equations, acronyms, and theoretical foundations.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setSelectedSubject('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedSubject === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
            }`}
          >
            All Subjects
          </button>
          {subjects.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedSubject(s.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedSubject === s.id ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
              }`}
            >
              {s.code}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search formulas or rules..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
          />
        </div>
      </div>

      {/* Formulas Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calculator className="w-5 h-5 text-purple-500" />
          <span>Core Examination Formulas ({filteredFormulas.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFormulas.map((f, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-blue-600">{f.subject}</span>
                <span className="text-slate-400 font-mono text-[11px]">{f.unit}</span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{f.title}</h3>

              <div className="overflow-x-auto">
                <MathRenderer formula={f.formula} displayMode={true} showCopy={true} />
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <MarkdownRenderer content={f.explanation} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Acronyms & Abbreviations Table */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-blue-500" />
          <span>Essential University Acronyms & Expansions</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {acronyms.map((a, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
              <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 font-bold font-mono text-blue-600 text-[11px]">
                {a.acronym}
              </span>
              <div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">{a.full}</div>
                <div className="text-[10px] text-slate-400">{a.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

