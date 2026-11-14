import React, { useState } from 'react';
import { Layers, Network, Cpu, Database, Eye, Sparkles, GitBranch, Terminal, Shield, Compass, Maximize2, Lightbulb, Rocket, Activity, Box } from 'lucide-react';

interface DiagramProps {
  type: string;
  className?: string;
  interactive?: boolean;
}

export const EducationalDiagram: React.FC<DiagramProps> = ({ type, className = '', interactive = true }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  // 1. OSI vs TCP/IP Models (Computer Networks)
  if (type === 'osi-tcp') {
    const layers = [
      { osi: '7. Application Layer', tcp: 'Application Layer (HTTP, DNS, SMTP)', color: '#3b82f6', pdu: 'Data' },
      { osi: '6. Presentation Layer', tcp: 'Application Layer (Data encoding, SSL)', color: '#3b82f6', pdu: 'Data' },
      { osi: '5. Session Layer', tcp: 'Application Layer (Session management)', color: '#3b82f6', pdu: 'Data' },
      { osi: '4. Transport Layer', tcp: 'Transport Layer (TCP, UDP - Port to Port)', color: '#10b981', pdu: 'Segment / Datagram' },
      { osi: '3. Network Layer', tcp: 'Internet Layer (IPv4, IPv6, ICMP, Routing)', color: '#f59e0b', pdu: 'Packet' },
      { osi: '2. Data Link Layer', tcp: 'Network Access Layer (Ethernet, MAC, Switches)', color: '#8b5cf6', pdu: 'Frame' },
      { osi: '1. Physical Layer', tcp: 'Network Access Layer (Cables, Bits, Transceivers)', color: '#ec4899', pdu: 'Bits' }
    ];

    return (
      <div className={`p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-sm tracking-wide">OSI 7-Layer vs TCP/IP 4-Layer Architecture</span>
          </div>
          <span className="text-xs text-slate-400">Interactive Protocol Mapping</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-1.5">
            <div className="text-center font-bold text-blue-400 mb-1">OSI Reference Model (ISO)</div>
            {layers.map((l, i) => (
              <div
                key={i}
                onClick={() => setSelectedElement(`${l.osi} | PDU: ${l.pdu}`)}
                className={`p-2 rounded-xl cursor-pointer transition-all ${
                  selectedElement?.includes(l.osi) ? 'ring-2 ring-blue-400 scale-[1.02]' : 'hover:bg-slate-800'
                }`}
                style={{ backgroundColor: `${l.color}25`, borderLeft: `4px solid ${l.color}` }}
              >
                <div className="font-semibold text-slate-200">{l.osi}</div>
                <div className="text-[10px] text-slate-400">PDU: {l.pdu}</div>
              </div>
            ))}
          </div>
          <div className="space-y-1.5">
            <div className="text-center font-bold text-emerald-400 mb-1">TCP/IP Protocol Suite</div>
            <div className="p-4 rounded-xl bg-blue-500/20 border-l-4 border-blue-500 text-slate-200 font-semibold mb-2 flex flex-col justify-center">
              <div>Application Layer</div>
              <div className="text-[10px] text-slate-400">HTTP, FTP, DNS, SMTP, Telnet</div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/20 border-l-4 border-emerald-500 text-slate-200 font-semibold mb-2 flex flex-col justify-center">
              <div>Transport Layer</div>
              <div className="text-[10px] text-slate-400">TCP (Reliable Byte Stream) / UDP</div>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/20 border-l-4 border-amber-500 text-slate-200 font-semibold mb-2 flex flex-col justify-center">
              <div>Internet Layer</div>
              <div className="text-[10px] text-slate-400">IPv4, IPv6, ICMP, ARP, OSPF, BGP</div>
            </div>
            <div className="p-4 rounded-xl bg-purple-500/20 border-l-4 border-purple-500 text-slate-200 font-semibold flex flex-col justify-center">
              <div>Network Access Layer</div>
              <div className="text-[10px] text-slate-400">Ethernet (802.3), Wi-Fi (802.11), PPP</div>
            </div>
          </div>
        </div>
        {selectedElement && (
          <div className="mt-3 p-2.5 bg-slate-800/80 rounded-xl text-xs text-slate-300 border border-slate-700">
            <span className="font-bold text-blue-400">Selected Element: {selectedElement}</span> — Encapsulates payload down the protocol stack with appropriate protocol control headers.
          </div>
        )}
      </div>
    );
  }

  // 2. CRC Error Detection Engine (Computer Networks)
  if (type === 'crc') {
    return (
      <div className={`p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Terminal className="w-5 h-5 text-emerald-400" />
          <span className="font-bold text-sm">CRC (Cyclic Redundancy Check) Division Engine</span>
        </div>
        <svg viewBox="0 0 600 220" className="w-full h-auto text-xs font-mono">
          <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
          <text x="100" y="45" fill="#93c5fd" textAnchor="middle" fontWeight="bold">Data Bits (D)</text>
          <text x="100" y="65" fill="#cbd5e1" textAnchor="middle">k data bits + r zeros</text>

          <path d="M 180 55 L 240 55" stroke="#60a5fa" strokeWidth="2" />
          <rect x="240" y="20" width="150" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <text x="315" y="45" fill="#fcd34d" textAnchor="middle" fontWeight="bold">Modulo-2 Division</text>
          <text x="315" y="65" fill="#cbd5e1" textAnchor="middle">Divisor G(x) (Degree r)</text>

          <path d="M 390 55 L 450 55" stroke="#60a5fa" strokeWidth="2" />
          <rect x="450" y="20" width="130" height="70" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
          <text x="515" y="45" fill="#6ee7b7" textAnchor="middle" fontWeight="bold">Transmitted Frame</text>
          <text x="515" y="65" fill="#cbd5e1" textAnchor="middle">[Data D] + [Remainder R]</text>

          <path d="M 515 90 L 515 130" stroke="#10b981" strokeWidth="2" />
          <rect x="240" y="130" width="340" height="60" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
          <text x="410" y="155" fill="#6ee7b7" textAnchor="middle" fontWeight="bold">Receiver: Modulo-2 Division by G(x)</text>
          <text x="410" y="175" fill="#94a3b8" textAnchor="middle">Remainder == 0 ? ACCEPT (No Error) : REJECT (Bit Error Detected)</text>
        </svg>
        <div className="mt-2 text-xs text-slate-400">
          <strong>Key Rule:</strong> Modulo-2 arithmetic uses XOR operations without carry/borrow. Divisor of degree $r$ appends $r$ check bits.
        </div>
      </div>
    );
  }

  // 3. Two-Pass Assembler Architecture (System Software)
  if (type === 'assembler') {
    return (
      <div className={`p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Cpu className="w-5 h-5 text-pink-400" />
          <span className="font-bold text-sm">Two-Pass Assembler Architecture & Symbol Tables</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 bg-slate-800/80 rounded-xl border border-pink-500/30">
            <div className="text-pink-400 font-bold mb-2 flex items-center gap-1.5">
              <span>PASS 1: Location Counter & Symbol Table</span>
            </div>
            <ul className="space-y-1 text-slate-300">
              <li>1. Assign addresses to all statements (LC).</li>
              <li>2. Store label addresses in <strong className="text-white">SYMTAB</strong>.</li>
              <li>3. Perform literal pool processing (<strong className="text-white">LITTAB</strong>).</li>
              <li>4. Output Intermediate File for Pass 2.</li>
            </ul>
          </div>
          <div className="p-3 bg-slate-800/80 rounded-xl border border-cyan-500/30">
            <div className="text-cyan-400 font-bold mb-2 flex items-center gap-1.5">
              <span>PASS 2: Machine Code Generation</span>
            </div>
            <ul className="space-y-1 text-slate-300">
              <li>1. Translate opcodes using <strong className="text-white">OPTAB</strong>.</li>
              <li>2. Lookup symbol operand addresses in SYMTAB.</li>
              <li>3. Generate Object Code: Text records (T).</li>
              <li>4. Write Header (H), Text (T), and End (E) records.</li>
            </ul>
          </div>
        </div>
        <div className="mt-3 p-2 bg-slate-800/50 rounded-xl text-center text-xs text-slate-400">
          Forward references are resolved because Pass 1 identifies all labels before Pass 2 emits machine words.
        </div>
      </div>
    );
  }

  // 4. Cloud SPI Model (Cloud Computing)
  if (type === 'cloud-spi') {
    const stack = [
      { name: 'SaaS (Software as a Service)', who: 'End Users', examples: 'Google Workspace, Salesforce, Microsoft 365', color: '#10b981', manage: 'Vendor manages application, data, OS, hardware' },
      { name: 'PaaS (Platform as a Service)', who: 'Developers', examples: 'Google App Engine, AWS Elastic Beanstalk, Heroku', color: '#3b82f6', manage: 'You manage App & Data; Vendor manages OS, Runtime & Hardware' },
      { name: 'IaaS (Infrastructure as a Service)', who: 'System Admins', examples: 'Amazon EC2, Google Compute Engine, Azure VMs', color: '#8b5cf6', manage: 'You manage OS, Middleware & Apps; Vendor manages Hardware & Virtualization' }
    ];

    return (
      <div className={`p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Database className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-sm">Cloud SPI Tier Architecture & Shared Responsibility</span>
        </div>
        <div className="space-y-2 text-xs">
          {stack.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl border transition-all cursor-pointer hover:scale-[1.01]"
              style={{ backgroundColor: `${item.color}15`, borderColor: `${item.color}50` }}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm" style={{ color: item.color }}>{item.name}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">{item.who}</span>
              </div>
              <div className="text-slate-300 text-[11px] mb-1"><strong>Control:</strong> {item.manage}</div>
              <div className="text-slate-400 text-[10px]"><strong>Examples:</strong> {item.examples}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5. CKY Dynamic Programming Parsing Table (NLP)
  if (type === 'cky') {
    return (
      <div className={`p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <GitBranch className="w-5 h-5 text-emerald-400" />
          <span className="font-bold text-sm">CKY Triangular Parsing Chart for: "she eats the fish"</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="p-2 text-left">i \ j</th>
                <th className="p-2 text-emerald-400 font-bold">1: "she"</th>
                <th className="p-2 text-emerald-400 font-bold">2: "eats"</th>
                <th className="p-2 text-emerald-400 font-bold">3: "the"</th>
                <th className="p-2 text-emerald-400 font-bold">4: "fish"</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-800">
                <td className="p-2 font-bold text-slate-500 text-left">0</td>
                <td className="p-2 bg-emerald-500/20 text-emerald-300 font-bold">{'{NP}'}</td>
                <td className="p-2 text-slate-600">∅</td>
                <td className="p-2 text-slate-600">∅</td>
                <td className="p-2 bg-blue-500/30 text-blue-300 font-bold border-2 border-blue-400 animate-pulse">{'{S}'} (Root)</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="p-2 font-bold text-slate-500 text-left">1</td>
                <td className="p-2 text-slate-800">—</td>
                <td className="p-2 bg-emerald-500/20 text-emerald-300 font-bold">{'{V}'}</td>
                <td className="p-2 text-slate-600">∅</td>
                <td className="p-2 bg-emerald-500/20 text-emerald-300 font-bold">{'{VP}'}</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="p-2 font-bold text-slate-500 text-left">2</td>
                <td className="p-2 text-slate-800">—</td>
                <td className="p-2 text-slate-800">—</td>
                <td className="p-2 bg-emerald-500/20 text-emerald-300 font-bold">{'{Det}'}</td>
                <td className="p-2 bg-emerald-500/20 text-emerald-300 font-bold">{'{NP}'}</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-slate-500 text-left">3</td>
                <td className="p-2 text-slate-800">—</td>
                <td className="p-2 text-slate-800">—</td>
                <td className="p-2 text-slate-800">—</td>
                <td className="p-2 bg-emerald-500/20 text-emerald-300 font-bold">{'{N}'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-xs text-slate-400">
          Chomsky Normal Form: S &rarr; NP VP. Since start symbol S lands in top-right cell (0, 4), the sentence is grammatically derived in O(n&sup3;) polynomial time.
        </div>
      </div>
    );
  }

  // 6. Image Histogram Equalization (Digital Image Processing)
  if (type === 'histogram') {
    return (
      <div className={`p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-5 h-5 text-purple-400" />
          <span className="font-bold text-sm">Histogram Equalization (Cumulative Distribution Transformation)</span>
        </div>
        <svg viewBox="0 0 500 150" className="w-full h-auto text-xs font-mono">
          <path d="M 20 120 L 40 120 L 50 40 L 70 20 L 90 60 L 110 120 L 180 120" stroke="#f43f5e" strokeWidth="2" fill="none" />
          <text x="100" y="140" fill="#fda4af" textAnchor="middle">Low Contrast (Narrow Cluster)</text>

          <path d="M 200 70 L 280 70" stroke="#a855f7" strokeWidth="3" />
          <text x="240" y="60" fill="#d8b4fe" textAnchor="middle" fontWeight="bold">s = T(r)</text>

          <path d="M 300 80 L 330 80 L 360 80 L 390 80 L 420 80 L 450 80 L 480 80" stroke="#10b981" strokeWidth="3" fill="none" />
          <line x1="300" y1="120" x2="480" y2="120" stroke="#475569" strokeWidth="1" />
          <text x="390" y="140" fill="#6ee7b7" textAnchor="middle">Uniform Dynamic Range Spread</text>
        </svg>
        <div className="mt-2 text-xs text-slate-400">
          Formula: s_k = (L - 1) &Sigma; (n_j / MN). Spreads pixel intensities evenly across the dynamic range [0, L-1] to maximize global contrast.
        </div>
      </div>
    );
  }

  // 7. Entrepreneurial Venture Creation Lifecycle (Entrepreneurship)
  if (type === 'entrepreneurship-cycle') {
    const stages = [
      { stage: '1. Discovery & Ideation', desc: 'Opportunity identification, environmental scanning & creativity', color: '#f59e0b' },
      { stage: '2. Feasibility Analysis', desc: 'Market, technical, financial & managerial feasibility testing', color: '#3b82f6' },
      { stage: '3. Business Plan (DPR)', desc: 'Detailed Project Report, financial forecasting & operational plan', color: '#10b981' },
      { stage: '4. Resource Acquisition', desc: 'Seed capital, angel investors, SIDBI/bank loans, incubators', color: '#8b5cf6' },
      { stage: '5. Launch & MSME Growth', desc: 'Market entry, scaling, avoiding industrial sickness & governance', color: '#ec4899' }
    ];

    return (
      <div className={`p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Rocket className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-sm">Entrepreneurial Venture Creation Lifecycle</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
          {stages.map((st, i) => (
            <div
              key={i}
              onClick={() => setSelectedElement(`${st.stage}: ${st.desc}`)}
              className="p-3 rounded-xl border transition-all cursor-pointer hover:scale-[1.02]"
              style={{ backgroundColor: `${st.color}15`, borderColor: `${st.color}50` }}
            >
              <div className="font-bold text-xs" style={{ color: st.color }}>{st.stage}</div>
              <div className="text-[11px] text-slate-300 mt-1">{st.desc}</div>
            </div>
          ))}
        </div>
        {selectedElement && (
          <div className="mt-3 p-2 bg-slate-800/80 rounded-xl text-xs text-amber-300 border border-slate-700">
            <strong>Stage Focus:</strong> {selectedElement}
          </div>
        )}
      </div>
    );
  }

  // 8. Canny Edge Detection Pipeline (Digital Image Processing)
  if (type === 'canny-edge') {
    const steps = [
      { num: 'Step 1', title: 'Gaussian Smoothing', desc: 'Convolves image with Gaussian filter to suppress noise' },
      { num: 'Step 2', title: 'Gradient Magnitude & Angle', desc: 'Applies Sobel operators to compute |∇f| and direction θ' },
      { num: 'Step 3', title: 'Non-Maximum Suppression', desc: 'Thins thick edges by retaining only local gradient peaks' },
      { num: 'Step 4', title: 'Double Thresholding', desc: 'Classifies pixels into Strong, Weak, and Non-edges' },
      { num: 'Step 5', title: 'Hysteresis Tracking', desc: 'Connects weak edges only if linked to strong edges' }
    ];

    return (
      <div className={`p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-5 h-5 text-purple-400" />
          <span className="font-bold text-sm">Canny Edge Detection 5-Stage Algorithmic Pipeline</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
          {steps.map((st, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-purple-400 uppercase">{st.num}</span>
                <div className="font-bold text-slate-100 mt-0.5">{st.title}</div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">{st.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 text-xs text-slate-400">
          Optimal edge detector satisfying Canny's three criteria: Low error rate, Good localization, and Single response to a single edge.
        </div>
      </div>
    );
  }

  // 9. NLP 5-Phase Processing Architecture (NLP)
  if (type === 'nlp-pipeline') {
    const phases = [
      { phase: '1. Morphological / Lexical', task: 'Tokenization, stemming, lemmatization, stop words, FST noun mapping' },
      { phase: '2. Syntactic Analysis', task: 'Grammar derivation, CFGs, PCFGs, CKY & Earley parsing algorithms' },
      { phase: '3. Semantic Analysis', task: 'WordNet synsets, Word2Vec, Case roles, Word Sense Disambiguation' },
      { phase: '4. Discourse & Pragmatics', task: 'Reference resolution, co-reference, context understanding, intent' },
      { phase: '5. Web 2.0 Applications', task: 'Sentiment analysis, NER, Text entailment, Machine translation, CLIR' }
    ];

    return (
      <div className={`p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="font-bold text-sm">5-Phase Natural Language Processing Architecture</span>
        </div>
        <div className="space-y-2 text-xs">
          {phases.map((p, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-slate-800/60 border border-emerald-500/30 flex items-center justify-between">
              <span className="font-bold text-emerald-400">{p.phase}</span>
              <span className="text-slate-300 text-[11px] max-w-md text-right">{p.task}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 10. JVM & CLI Virtual Machine Engine (System Software)
  if (type === 'jvm-cli') {
    return (
      <div className={`p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Box className="w-5 h-5 text-pink-400" />
          <span className="font-bold text-sm">Virtual Machine Execution Architecture (JVM & CLI)</span>
        </div>
        <div className="grid grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3 bg-slate-800/80 rounded-xl border border-pink-500/30">
            <div className="font-bold text-pink-400 mb-1">Class Loader Subsystem</div>
            <p className="text-[11px] text-slate-300">Loading (Bootstrap, Extension, App), Linking (Verify, Prepare, Resolve), and Initialization.</p>
          </div>
          <div className="p-3 bg-slate-800/80 rounded-xl border border-amber-500/30">
            <div className="font-bold text-amber-400 mb-1">Runtime Data Areas</div>
            <p className="text-[11px] text-slate-300">Method Area, Heap (Garbage Collected), JVM Stacks, PC Registers, Native Method Stacks.</p>
          </div>
          <div className="p-3 bg-slate-800/80 rounded-xl border border-cyan-500/30">
            <div className="font-bold text-cyan-400 mb-1">Execution Engine</div>
            <p className="text-[11px] text-slate-300">Bytecode Interpreter, Just-In-Time (JIT) Compiler (Hotspot), and Automatic Garbage Collector.</p>
          </div>
        </div>
        <div className="mt-2 text-xs text-slate-400">
          Provides platform independence: source compiles to intermediate bytecode (P-code / CIL), executed identically across physical architectures.
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className={`p-4 bg-slate-900 text-slate-300 rounded-2xl border border-slate-800 flex items-center gap-3 ${className}`}>
      <Sparkles className="w-6 h-6 text-blue-400 flex-shrink-0" />
      <div className="text-xs">
        <span className="font-semibold text-white">Visual Concept Architecture:</span> Detailed university diagrams and schematics are integrated directly into the reference answer.
      </div>
    </div>
  );
};
