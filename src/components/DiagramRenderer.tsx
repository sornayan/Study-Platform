import React, { useState, useEffect, useId, useMemo } from 'react';
import mermaid from 'mermaid';
import { 
  GitCommit, 
  Layers, 
  ArrowRight, 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Code, 
  Copy, 
  Check, 
  Laptop, 
  Server, 
  Radio, 
  ShieldCheck, 
  Info,
  Network
} from 'lucide-react';
import { CodeBlockRenderer } from './CodeBlockRenderer';
import { NetworkEncapsulationDiagram, isEncapsulationDiagram } from './NetworkEncapsulationDiagram';

interface DiagramRendererProps {
  code: string;
  lang?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// 1. Mermaid Diagram Component
// ---------------------------------------------------------------------------
export const MermaidDiagram: React.FC<{ code: string; className?: string }> = ({ code, className = '' }) => {
  const [svgHtml, setSvgHtml] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [viewSource, setViewSource] = useState(false);
  const [copied, setCopied] = useState(false);
  const uniqueId = useId().replace(/:/g, 'm');

  const cleanCode = code.trim();

  useEffect(() => {
    let isMounted = true;
    const renderChart = async () => {
      try {
        const isDark = document.documentElement.classList.contains('dark');
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? 'dark' : 'default',
          securityLevel: 'loose',
          fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
          themeVariables: {
            fontSize: '13px',
            primaryColor: '#3b82f6',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#2563eb',
            lineColor: '#60a5fa',
            secondaryColor: '#10b981',
            tertiaryColor: '#f59e0b'
          }
        });

        const id = `mermaid-${uniqueId}-${Date.now().toString(36)}`;
        const { svg } = await mermaid.render(id, cleanCode);
        if (isMounted) {
          setSvgHtml(svg);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || 'Mermaid render error');
        }
      }
    };

    renderChart();
    return () => {
      isMounted = false;
    };
  }, [cleanCode, uniqueId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (error || viewSource) {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex justify-end gap-2 text-xs">
          <button
            onClick={() => setViewSource(false)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Show Visual Diagram</span>
          </button>
        </div>
        <CodeBlockRenderer code={cleanCode} language="mermaid" title="Mermaid Diagram Source" />
      </div>
    );
  }

  return (
    <div className={`my-4 p-4 md:p-6 bg-slate-900/90 dark:bg-slate-950 rounded-2xl border border-slate-800 shadow-md ${className}`}>
      {/* Control Bar */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          <GitCommit className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-200">Interactive Architectural Flowchart</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewSource(true)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px]"
            title="View raw Mermaid syntax"
          >
            <Code className="w-3 h-3" />
            <span>Syntax</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px]"
            title="Copy diagram markup"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* SVG Container */}
      <div
        className="mermaid-svg-container overflow-x-auto flex justify-center py-2 text-slate-100"
        dangerouslySetInnerHTML={{ __html: svgHtml }}
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// 2. Interactive OSI 7-Layer Model Component
// ---------------------------------------------------------------------------
const DEFAULT_OSI_LAYERS = [
  {
    num: 7,
    name: 'Application Layer',
    pdu: 'Data',
    color: '#3b82f6',
    protocols: 'HTTP, HTTPS, DNS, SMTP, FTP, SSH, Telnet, SNMP',
    summary: 'Direct interface with user applications and network processes.',
    details: 'Provides human-computer interaction, network transparency, authentication, and directory lookup services.'
  },
  {
    num: 6,
    name: 'Presentation Layer',
    pdu: 'Data',
    color: '#6366f1',
    protocols: 'SSL/TLS, ASCII, Unicode, JPEG, MPEG, GIF, XDR',
    summary: 'Data syntax translation, cryptographic encryption, and compression.',
    details: 'Translates between machine-independent representation and host formats; handles TLS session handshakes and data serialization.'
  },
  {
    num: 5,
    name: 'Session Layer',
    pdu: 'Data',
    color: '#8b5cf6',
    protocols: 'NetBIOS, RPC, PPTP, Sockets, Named Pipes, SIP',
    summary: 'Dialog management, session establishment, token checkpointing.',
    details: 'Controls simplex, half-duplex, or full-duplex dialogs; inserts synchronization checkpoints to resume aborted transfers.'
  },
  {
    num: 4,
    name: 'Transport Layer',
    pdu: 'Segment / Datagram',
    color: '#10b981',
    protocols: 'TCP (Reliable, Byte-Stream), UDP (Connectionless, Fast), SCTP',
    summary: 'End-to-end reliability, segmentation, port-to-port multiplexing.',
    details: 'Segments messages, manages flow control (Sliding Window), congestion control, and connection lifecycle (3-way handshake).'
  },
  {
    num: 3,
    name: 'Network Layer',
    pdu: 'Packet',
    color: '#f59e0b',
    protocols: 'IPv4, IPv6, ICMP, ARP, OSPF, BGP, RIP, IPsec',
    summary: 'Logical addressing, packet routing across disparate networks.',
    details: 'Determines the optimal path across multi-hop networks, handles fragmentation/reassembly, and manages router forwarding tables.'
  },
  {
    num: 2,
    name: 'Data Link Layer',
    pdu: 'Frame',
    color: '#a855f7',
    protocols: 'Ethernet (802.3), Wi-Fi (802.11), PPP, HDLC, LLC, MAC',
    summary: 'Node-to-node framing, physical MAC addressing, error detection (CRC).',
    details: 'Divided into MAC and LLC sublayers; synchronizes frames, handles medium access contention (CSMA/CD, CSMA/CA), and verifies FCS.'
  },
  {
    num: 1,
    name: 'Physical Layer',
    pdu: 'Bits',
    color: '#ec4899',
    protocols: '100BASE-TX, 1000BASE-T, RS-232, RJ-45, DSL, Fiber Optics',
    summary: 'Unstructured bit-stream transmission across transmission medium.',
    details: 'Governs physical signaling, voltage levels, pinouts, cable specifications, modulation, bit timing, and transceiver hardware.'
  }
];

/**
 * Extracts layer descriptions from the specific examination paper ASCII text.
 */
function extractOsiLayerDescriptions(asciiText: string): Record<number, string> {
  const lines = asciiText.trim().split('\n').map(l => l.replace(/\r$/, ''));
  const descriptions: Record<number, string> = {};

  for (const line of lines) {
    // Style 1: | 7. Application | User network services
    const match1 = line.match(/\|\s*([1-7])\.\s*([A-Za-z\s]+?)\s*\|\s*(.*)/);
    if (match1) {
      const num = parseInt(match1[1]);
      const desc = match1[3].replace(/[|\+]/g, '').trim();
      if (desc) descriptions[num] = desc;
      continue;
    }

    // Style 2: 7. Application — services for user applications
    const match2 = line.match(/^([1-7])\.\s*([A-Za-z\s]+?)\s*[—\-–:]\s*(.*)/);
    if (match2) {
      const num = parseInt(match2[1]);
      const desc = match2[3].trim();
      if (desc) descriptions[num] = desc;
      continue;
    }
  }

  return descriptions;
}

export const OSIDiagram: React.FC<{ code: string; className?: string }> = ({ code, className = '' }) => {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(4); // Default to Transport
  const [viewOriginal, setViewOriginal] = useState(false);
  const [showTcpMapping, setShowTcpMapping] = useState(false);
  const [copied, setCopied] = useState(false);

  const getTcpLayer = (osiNum: number) => {
    if (osiNum >= 5) return { name: 'Application', color: '#3b82f6' };
    if (osiNum === 4) return { name: 'Transport', color: '#10b981' };
    if (osiNum === 3) return { name: 'Internet', color: '#f59e0b' };
    return { name: 'Network Access', color: '#8b5cf6' };
  };

  // Extract custom descriptions from the paper's ASCII text if present
  const extractedDescriptions = useMemo(() => extractOsiLayerDescriptions(code), [code]);

  // Combine default metadata with paper-specific descriptions
  const layers = useMemo(() => {
    return DEFAULT_OSI_LAYERS.map(l => {
      const paperDesc = extractedDescriptions[l.num];
      return {
        ...l,
        summary: paperDesc || l.summary
      };
    });
  }, [extractedDescriptions]);

  const activeLayer = layers.find(l => l.num === selectedLayer) || layers[3];

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (viewOriginal) {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex justify-end gap-2 text-xs">
          <button
            onClick={() => setViewOriginal(false)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Show Visual 7-Layer Stack</span>
          </button>
        </div>
        <CodeBlockRenderer code={code} language="text" title="Original ASCII Diagram" />
      </div>
    );
  }

  return (
    <div className={`my-4 p-4 md:p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-lg text-slate-100 overflow-x-auto ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <span className="font-bold text-sm tracking-wide text-white">
            OSI 7-Layer Reference Model (ISO/IEC 7498-1)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTcpMapping(prev => !prev)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors text-[11px] font-medium ${
              showTcpMapping
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Toggle TCP/IP 4-Layer architectural mapping"
          >
            <Network className="w-3 h-3" />
            <span>{showTcpMapping ? 'OSI Only' : 'TCP/IP Mapping'}</span>
          </button>

          <button
            onClick={() => setViewOriginal(true)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px]"
            title="View original ASCII text"
          >
            <Code className="w-3 h-3" />
            <span>ASCII</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px]"
            title="Copy ASCII content"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Stack & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* The 7-Layer Stack (7 cols) */}
        <div className="lg:col-span-7 space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex justify-between items-center">
            <span>Protocol Stack (Top &rarr; Bottom)</span>
            <div className="flex items-center gap-2">
              {showTcpMapping && <span className="text-blue-400 font-semibold hidden sm:inline">TCP/IP Mapping</span>}
              <span>PDU Unit</span>
            </div>
          </div>

          {layers.map((l) => {
            const isSelected = selectedLayer === l.num;
            const tcp = getTcpLayer(l.num);
            return (
              <div
                key={l.num}
                onClick={() => setSelectedLayer(l.num)}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'ring-2 ring-blue-400 scale-[1.01] bg-slate-800/90 shadow-md'
                    : 'bg-slate-800/50 hover:bg-slate-800/80 border-slate-700/50'
                }`}
                style={{
                  borderLeftWidth: '5px',
                  borderLeftColor: l.color
                }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ backgroundColor: l.color }}
                  >
                    {l.num}
                  </span>
                  <div className="min-w-0 truncate">
                    <span className="font-semibold text-xs text-white block truncate">{l.name}</span>
                    <span className="text-[10px] text-slate-400 block truncate">{l.summary}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {showTcpMapping && (
                    <span
                      className="px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0 hidden sm:inline"
                      style={{
                        backgroundColor: `${tcp.color}25`,
                        color: tcp.color,
                        border: `1px solid ${tcp.color}50`
                      }}
                    >
                      {tcp.name}
                    </span>
                  )}
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold"
                    style={{ backgroundColor: `${l.color}25`, color: l.color }}
                  >
                    {l.pdu}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Layer Inspector (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span
                className="px-2.5 py-0.5 rounded-lg text-xs font-bold text-white"
                style={{ backgroundColor: activeLayer.color }}
              >
                Layer {activeLayer.num}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                PDU: <strong className="text-white">{activeLayer.pdu}</strong>
              </span>
            </div>

            <div>
              <h4 className="font-bold text-sm text-white">{activeLayer.name}</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeLayer.summary}</p>
              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{activeLayer.details}</p>
            </div>

            <div className="pt-2 border-t border-slate-700">
              <div className="text-[11px] font-bold text-slate-400 mb-1">Standard Protocols:</div>
              <div className="text-xs font-mono text-emerald-300 bg-slate-900/80 p-2 rounded-xl border border-slate-700/60 break-words">
                {activeLayer.protocols}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>Click any layer on the left to inspect protocol encapsulation.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 3. Interactive Sequence Flow Component (TCP, DHCP, CSMA/CD, ARQ)
// ---------------------------------------------------------------------------
interface SequenceStep {
  type: 'right' | 'left' | 'lost-right' | 'note';
  label: string;
  sideNote?: string;
  raw: string;
}

interface ParsedSequence {
  leftEntity: string;
  rightEntity: string;
  steps: SequenceStep[];
}

export function parseSequenceFromAscii(text: string, lang = 'text'): ParsedSequence | null {
  const l = lang.toLowerCase();
  // Never interpret programming source or assembly code as a sequence diagram
  if (['asm', 'assembly', 'c', 'cpp', 'py', 'python', 'sh', 'bash', 'sql', 'json'].includes(l)) {
    return null;
  }

  const clean = text.trim();
  // Never interpret encapsulation/decapsulation diagrams as sequence diagrams
  if (isEncapsulationDiagram(clean)) {
    return null;
  }
  const lines = clean.split('\n').map(s => s.replace(/\r$/, ''));
  if (lines.length < 2) return null;

  // Must contain message exchange arrows
  const hasArrows = /(?:-{2,}>|<-{2,}|-{2,}X|\-{2,}\>|\<\-{2,})/.test(clean);
  if (!hasArrows) return null;

  // Header line entities
  const headerParts = lines[0].split(/\s{2,}/).map(s => s.trim()).filter(Boolean);
  if (headerParts.length < 2) return null;

  const validEntityPattern = /(client|server|station|sender|receiver|host|node|dhcp|source|destination|peer|master|slave|user|browser)/i;
  const isEntity1 = validEntityPattern.test(headerParts[0]);
  const isEntity2 = validEntityPattern.test(headerParts[1]);

  if (!isEntity1 && !isEntity2) return null;

  const leftEntity = headerParts[0];
  const rightEntity = headerParts[1];
  const steps: SequenceStep[] = [];

  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();
    if (!trimmed) continue;

    // Right lost arrow: | --- label ---X
    const lostArrowMatch = rawLine.match(/\|\s*-{2,}\s*([^-><|]+?)\s*-{2,}X\s*\|?(.*)/);
    // Right arrow: | --- label ---> |
    const rightArrowMatch = rawLine.match(/\|\s*-{2,}\s*([^-><|]+?)\s*-{2,}>\s*\|?(.*)/);
    // Left arrow: | <--- label --- |
    const leftArrowMatch = rawLine.match(/\|\s*<*-{2,}\s*([^-><|]+?)\s*-{2,}\s*\|?(.*)/);

    if (lostArrowMatch) {
      steps.push({
        type: 'lost-right',
        label: lostArrowMatch[1].trim(),
        sideNote: lostArrowMatch[2].replace(/[|]/g, '').trim(),
        raw: rawLine
      });
    } else if (rightArrowMatch) {
      steps.push({
        type: 'right',
        label: rightArrowMatch[1].trim(),
        sideNote: rightArrowMatch[2].replace(/[|]/g, '').trim(),
        raw: rawLine
      });
    } else if (leftArrowMatch) {
      steps.push({
        type: 'left',
        label: leftArrowMatch[1].trim(),
        sideNote: leftArrowMatch[2].replace(/[|]/g, '').trim(),
        raw: rawLine
      });
    } else {
      const cleanNote = trimmed.replace(/^[|\s]+|[|\s]+$/g, '').trim();
      if (cleanNote) {
        steps.push({
          type: 'note',
          label: cleanNote,
          raw: rawLine
        });
      }
    }
  }

  // Must have at least 1 directional arrow step
  const arrowCount = steps.filter(s => s.type !== 'note').length;
  if (arrowCount === 0) return null;

  return { leftEntity, rightEntity, steps };
}

export const SequenceDiagram: React.FC<{ sequence: ParsedSequence; rawCode: string; className?: string }> = ({
  sequence,
  rawCode,
  className = ''
}) => {
  const [viewOriginal, setViewOriginal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getEntityIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('server') || n.includes('dhcp')) return <Server className="w-4 h-4 text-emerald-400" />;
    if (n.includes('station') || n.includes('node')) return <Radio className="w-4 h-4 text-purple-400" />;
    return <Laptop className="w-4 h-4 text-blue-400" />;
  };

  if (viewOriginal) {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex justify-end gap-2 text-xs">
          <button
            onClick={() => setViewOriginal(false)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Show Visual Timeline</span>
          </button>
        </div>
        <CodeBlockRenderer code={rawCode} language="text" title="Original Sequence Text" />
      </div>
    );
  }

  return (
    <div className={`my-4 p-4 md:p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-lg text-slate-100 overflow-x-auto ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" />
          <span className="font-bold text-sm text-white">Protocol Exchange Timeline</span>
          <span className="text-[11px] text-slate-400">({sequence.steps.length} steps)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewOriginal(true)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px]"
            title="View original ASCII text"
          >
            <Code className="w-3 h-3" />
            <span>ASCII</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px]"
            title="Copy ASCII content"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Participant Top Columns */}
      <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-800 font-semibold text-xs text-center">
        <div className="p-2.5 bg-blue-500/15 border border-blue-500/30 rounded-xl flex items-center justify-center gap-2 text-blue-300">
          {getEntityIcon(sequence.leftEntity)}
          <span className="truncate">{sequence.leftEntity}</span>
        </div>
        <div className="p-2.5 bg-emerald-500/15 border border-emerald-500/30 rounded-xl flex items-center justify-center gap-2 text-emerald-300">
          {getEntityIcon(sequence.rightEntity)}
          <span className="truncate">{sequence.rightEntity}</span>
        </div>
      </div>

      {/* Sequence Timeline Steps */}
      <div className="py-4 space-y-3 font-mono text-xs">
        {sequence.steps.map((step, idx) => {
          if (step.type === 'note') {
            const isEstablished = step.label.toLowerCase().includes('established') || step.label.toLowerCase().includes('success');
            const isCollision = step.label.toLowerCase().includes('collision') || step.label.toLowerCase().includes('timeout');
            return (
              <div key={idx} className="flex justify-center my-2">
                <span className={`px-3 py-1 rounded-full text-[11px] font-sans font-medium flex items-center gap-1.5 border shadow-xs ${
                  isEstablished
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : isCollision
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                  {isEstablished && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  {isCollision && <AlertTriangle className="w-3 h-3 text-rose-400" />}
                  <span>{step.label}</span>
                </span>
              </div>
            );
          }

          if (step.type === 'lost-right') {
            return (
              <div key={idx} className="relative flex items-center justify-between p-2 rounded-xl bg-rose-950/30 border border-rose-500/30">
                <div className="flex-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0"></span>
                  <div className="flex-1 border-t-2 border-dashed border-rose-400/80 relative flex items-center justify-center">
                    <span className="bg-slate-900 px-2 py-0.5 text-rose-300 text-[11px] font-bold border border-rose-500/40 rounded-md">
                      {step.label} [LOST]
                    </span>
                  </div>
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                </div>
                {step.sideNote && (
                  <span className="ml-3 px-2 py-0.5 bg-rose-900/60 text-rose-200 text-[10px] rounded border border-rose-700 font-sans">
                    {step.sideNote}
                  </span>
                )}
              </div>
            );
          }

          if (step.type === 'right') {
            return (
              <div key={idx} className="relative flex items-center justify-between p-2 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 transition-colors border border-slate-700/50">
                <div className="flex-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0"></span>
                  <div className="flex-1 border-t-2 border-blue-500/80 relative flex items-center justify-center">
                    <span className="bg-slate-900 px-2 py-0.5 text-blue-300 text-[11px] font-semibold border border-blue-500/40 rounded-md truncate max-w-[85%]">
                      {step.label}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-400 shrink-0" />
                </div>
                {step.sideNote && (
                  <span className="ml-3 px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded border border-slate-700 font-sans">
                    {step.sideNote}
                  </span>
                )}
              </div>
            );
          }

          if (step.type === 'left') {
            return (
              <div key={idx} className="relative flex items-center justify-between p-2 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 transition-colors border border-slate-700/50">
                {step.sideNote && (
                  <span className="mr-3 px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded border border-slate-700 font-sans">
                    {step.sideNote}
                  </span>
                )}
                <div className="flex-1 flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="flex-1 border-t-2 border-emerald-500/80 relative flex items-center justify-center">
                    <span className="bg-slate-900 px-2 py-0.5 text-emerald-300 text-[11px] font-semibold border border-emerald-500/40 rounded-md truncate max-w-[85%]">
                      {step.label}
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 4. Bitfield / Packet Format Component
// ---------------------------------------------------------------------------
export function parseBitfieldFields(text: string): { name: string; bytes?: string }[] | null {
  const lines = text.trim().split('\n').filter(l => l.includes('|'));
  if (lines.length === 0) return null;

  const firstLine = lines[0];
  const fields = firstLine.split('|').map(s => s.trim()).filter(Boolean);
  if (fields.length < 2) return null;

  let secondLineFields: string[] = [];
  if (lines.length > 1) {
    secondLineFields = lines[1].split('|').map(s => s.trim()).filter(Boolean);
  }

  return fields.map((f, i) => {
    const match = f.match(/^(.*?)\s+(\d+(\.\d+)?(\s*[B|b|Bytes]*)?)$/);
    if (match) {
      return { name: match[1].trim(), bytes: match[2].trim() };
    }
    const byteInfo = secondLineFields[i] || '';
    return { name: f, bytes: byteInfo || undefined };
  });
}

export const BitfieldDiagram: React.FC<{ fields: { name: string; bytes?: string }[]; rawCode: string; className?: string }> = ({
  fields,
  rawCode,
  className = ''
}) => {
  const [viewOriginal, setViewOriginal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (viewOriginal) {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex justify-end gap-2 text-xs">
          <button
            onClick={() => setViewOriginal(false)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Show Visual Frame</span>
          </button>
        </div>
        <CodeBlockRenderer code={rawCode} language="text" title="Original Frame ASCII" />
      </div>
    );
  }

  const colors = [
    'bg-blue-500/20 border-blue-500/50 text-blue-300',
    'bg-cyan-500/20 border-cyan-500/50 text-cyan-300',
    'bg-emerald-500/20 border-emerald-500/50 text-emerald-300',
    'bg-amber-500/20 border-amber-500/50 text-amber-300',
    'bg-purple-500/20 border-purple-500/50 text-purple-300',
    'bg-pink-500/20 border-pink-500/50 text-pink-300',
    'bg-rose-500/20 border-rose-500/50 text-rose-300'
  ];

  return (
    <div className={`my-4 p-4 md:p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-md text-slate-100 ${className}`}>
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span className="font-bold text-sm text-white">Packet Frame Header Structure</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewOriginal(true)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px]"
            title="View original ASCII text"
          >
            <Code className="w-3 h-3" />
            <span>ASCII</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px]"
            title="Copy ASCII content"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-center text-xs">
        {fields.map((field, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl border flex flex-col justify-between ${colors[idx % colors.length]}`}
          >
            <span className="font-bold truncate">{field.name}</span>
            {field.bytes && (
              <span className="mt-1 text-[10px] font-mono opacity-80 bg-slate-950/40 px-1.5 py-0.5 rounded">
                {field.bytes} {field.bytes.toLowerCase().includes('b') ? '' : 'Bytes'}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 5. Master DiagramRenderer Component
// ---------------------------------------------------------------------------
export const DiagramRenderer: React.FC<DiagramRendererProps> = ({ code, lang = 'text', className = '' }) => {
  const cleanCode = code.trim();
  const lowerLang = lang.toLowerCase();

  // 1. Mermaid
  if (lowerLang === 'mermaid' || cleanCode.startsWith('flowchart') || cleanCode.startsWith('sequenceDiagram') || cleanCode.startsWith('graph TD') || cleanCode.startsWith('graph LR')) {
    return <MermaidDiagram code={cleanCode} className={className} />;
  }

  // 2. Network Encapsulation & Decapsulation Diagram
  if (isEncapsulationDiagram(cleanCode)) {
    return <NetworkEncapsulationDiagram code={cleanCode} className={className} />;
  }

  // 3. OSI Model detection (Box ASCII, bullet lists, or layer stack)
  if (
    (cleanCode.includes('Application') && cleanCode.includes('Presentation') && cleanCode.includes('Physical')) ||
    (cleanCode.includes('7. Application') && cleanCode.includes('1. Physical'))
  ) {
    return <OSIDiagram code={cleanCode} className={className} />;
  }

  // 3. Network sequence exchange detection
  const sequence = parseSequenceFromAscii(cleanCode, lang);
  if (sequence && sequence.steps.length >= 2) {
    return <SequenceDiagram sequence={sequence} rawCode={cleanCode} className={className} />;
  }

  // 4. Bitfield format detection
  if (cleanCode.startsWith('|') && (cleanCode.includes('Preamble') || cleanCode.includes('Destination MAC') || (cleanCode.includes('Flag') && cleanCode.includes('Address') && cleanCode.includes('Control')))) {
    const fields = parseBitfieldFields(cleanCode);
    if (fields && fields.length >= 2) {
      return <BitfieldDiagram fields={fields} rawCode={cleanCode} className={className} />;
    }
  }

  // 5. Default Code / Monospace view with Copy
  return <CodeBlockRenderer code={cleanCode} language={lang} className={className} />;
};
