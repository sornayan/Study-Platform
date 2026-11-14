import React, { useState } from 'react';
import { 
  Laptop, 
  Server, 
  ArrowDown, 
  ArrowUp, 
  ArrowRight, 
  Code, 
  Copy, 
  Check, 
  Eye, 
  Radio, 
  Layers, 
  ShieldCheck, 
  Network
} from 'lucide-react';
import { CodeBlockRenderer } from './CodeBlockRenderer';

interface NetworkEncapsulationDiagramProps {
  code: string;
  className?: string;
}

export function isEncapsulationDiagram(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase();
  
  // Must mention sending and receiving hosts
  const hasHosts = lower.includes('sending host') && lower.includes('receiving host');
  
  // Must mention layered network concepts
  const hasLayers = (
    (lower.includes('application') && (lower.includes('tcp') || lower.includes('transport') || lower.includes('segment'))) ||
    (lower.includes('ip packet') || lower.includes('internet')) ||
    (lower.includes('link frame') || lower.includes('link / access') || lower.includes('physical medium'))
  );

  return hasHosts && hasLayers;
}

export const NetworkEncapsulationDiagram: React.FC<NetworkEncapsulationDiagramProps> = ({
  code,
  className = ''
}) => {
  const [viewOriginal, setViewOriginal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Show Visual Architecture</span>
          </button>
        </div>
        <CodeBlockRenderer code={code} language="text" title="Original ASCII Diagram" />
      </div>
    );
  }

  const layers = [
    {
      id: 4,
      name: 'Application Layer',
      senderPdu: 'Application Data (Payload)',
      receiverPdu: 'Delivered to Application',
      headerAdded: 'Data Message (M)',
      headerStripped: 'Payload Extracted',
      color: '#3b82f6',
      bgLight: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
      pduBadge: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      protocols: 'HTTP / HTTPS, DNS, SMTP, FTP, DHCP',
      senderRole: 'Generates user application data stream',
      receiverRole: 'Processes and displays data to user'
    },
    {
      id: 3,
      name: 'Transport Layer',
      senderPdu: 'TCP Segment / UDP Datagram',
      receiverPdu: 'Transport Layer Reassembly',
      headerAdded: '+ TCP / UDP Header (Ports, Seq #)',
      headerStripped: 'TCP/UDP Header Stripped',
      color: '#10b981',
      bgLight: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
      pduBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      protocols: 'TCP (Reliable, Port-to-Port), UDP',
      senderRole: 'Segments data, adds port addresses & seq numbers',
      receiverRole: 'Reassembles segments, verifies checksum'
    },
    {
      id: 2,
      name: 'Internet / Network Layer',
      senderPdu: 'IP Datagram / Packet',
      receiverPdu: 'Internet Layer Routing',
      headerAdded: '+ IP Header (Source & Dest IP)',
      headerStripped: 'IP Header Stripped',
      color: '#f59e0b',
      bgLight: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
      pduBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      protocols: 'IPv4, IPv6, ICMP, ARP, Routing',
      senderRole: 'Encapsulates into packet, adds logical IP addressing',
      receiverRole: 'Verifies destination IP, routes packet'
    },
    {
      id: 1,
      name: 'Network Access / Link Layer',
      senderPdu: 'Link-Layer Frame',
      receiverPdu: 'Frame Verification & Unpacking',
      headerAdded: '+ Frame Header & CRC Trailer (FCS)',
      headerStripped: 'MAC Header & FCS Checked & Stripped',
      color: '#a855f7',
      bgLight: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
      pduBadge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      protocols: 'Ethernet (802.3), Wi-Fi (802.11), MAC, LLC',
      senderRole: 'Frames packet, adds MAC addresses and CRC checksum',
      receiverRole: 'Checks frame CRC/FCS; discards damaged frames'
    }
  ];

  return (
    <div className={`my-6 p-4 md:p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl text-slate-100 overflow-x-auto ${className}`}>
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between pb-4 mb-5 border-b border-slate-800 gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white tracking-wide">
              TCP/IP Protocol Encapsulation &amp; Decapsulation Process
            </h3>
            <p className="text-[11px] text-slate-400">
              Down-stack header encapsulation at sender &bull; Up-stack header stripping at receiver
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewOriginal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px] font-medium border border-slate-700/60"
            title="View original ASCII text"
          >
            <Code className="w-3.5 h-3.5" />
            <span>ASCII</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px] font-medium border border-slate-700/60"
            title="Copy ASCII content"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Architecture Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Left Column: Sending Host (Encapsulation) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-4 rounded-2xl bg-slate-950/60 border border-blue-500/30 shadow-inner">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4 text-blue-400" />
              <span className="font-bold text-xs tracking-wider text-white uppercase">
                Sending Host
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
              <ArrowDown className="w-3 h-3 text-blue-400" />
              <span>Encapsulation</span>
            </span>
          </div>

          <div className="space-y-2.5">
            {layers.map((l) => (
              <div
                key={l.id}
                onMouseEnter={() => setActiveLayer(l.id)}
                onMouseLeave={() => setActiveLayer(null)}
                className={`p-3 rounded-xl border transition-all ${
                  activeLayer === l.id
                    ? 'ring-2 ring-blue-400 scale-[1.01] bg-slate-800 shadow-md'
                    : 'bg-slate-900/80 hover:bg-slate-800/80 border-slate-800'
                }`}
                style={{ borderLeftWidth: '4px', borderLeftColor: l.color }}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-xs text-white">
                    {l.id}. {l.name}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${l.pduBadge}`}>
                    {l.senderPdu}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 font-mono flex items-center gap-1 mt-1">
                  <span className="text-emerald-400 font-semibold">{l.headerAdded}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{l.senderRole}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-blue-400 font-medium">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            <span>Headers prepended down the protocol stack</span>
          </div>
        </div>

        {/* Center Column: Peer-to-Peer Virtual Layer Channels (2 cols on lg) */}
        <div className="hidden lg:flex lg:col-span-2 flex-col justify-between py-6 items-center select-none">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider text-center mb-1">
            Peer Communication
          </div>

          {layers.map((l) => (
            <div key={l.id} className="w-full flex flex-col items-center justify-center py-3">
              <div className="w-full border-t border-dashed border-slate-700 relative flex items-center justify-center">
                <span className="absolute bg-slate-900 px-1.5 py-0.5 text-[9px] font-mono text-slate-400 rounded border border-slate-800">
                  Virtual Channel
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 mt-2" />
            </div>
          ))}

          <div className="text-[9px] font-mono text-slate-500 text-center mt-1">
            Horizontal Logical Path
          </div>
        </div>

        {/* Right Column: Receiving Host (Decapsulation) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-4 rounded-2xl bg-slate-950/60 border border-emerald-500/30 shadow-inner">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-xs tracking-wider text-white uppercase">
                Receiving Host
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <ArrowUp className="w-3 h-3 text-emerald-400" />
              <span>Decapsulation</span>
            </span>
          </div>

          <div className="space-y-2.5">
            {layers.map((l) => (
              <div
                key={l.id}
                onMouseEnter={() => setActiveLayer(l.id)}
                onMouseLeave={() => setActiveLayer(null)}
                className={`p-3 rounded-xl border transition-all ${
                  activeLayer === l.id
                    ? 'ring-2 ring-emerald-400 scale-[1.01] bg-slate-800 shadow-md'
                    : 'bg-slate-900/80 hover:bg-slate-800/80 border-slate-800'
                }`}
                style={{ borderRightWidth: '4px', borderRightColor: l.color }}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-xs text-white">
                    {l.id}. {l.name}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${l.pduBadge}`}>
                    {l.receiverPdu}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 font-mono flex items-center gap-1 mt-1">
                  <span className="text-amber-400 font-semibold">{l.headerStripped}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{l.receiverRole}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-emerald-400 font-medium">
            <ArrowUp className="w-3.5 h-3.5 animate-bounce" />
            <span>Headers verified and stripped up to user application</span>
          </div>
        </div>
      </div>

      {/* Bottom Transmission Medium Bar */}
      <div className="mt-5 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
          <span className="font-bold text-white text-xs">
            Physical Transmission Medium:
          </span>
          <span className="text-slate-400 text-[11px]">
            Copper Cable (UTP / Coaxial), Fiber Optics, or Wireless Signals
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          <span>01101001 01110100 01101111</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-300 font-bold">Bitstream Transmission</span>
        </div>
      </div>

      {/* Interactive Layer Detail Drawer */}
      {activeLayer !== null && (
        <div className="mt-4 p-3 bg-slate-800/90 rounded-2xl border border-slate-700/80 text-xs animate-fadeIn">
          {(() => {
            const l = layers.find(x => x.id === activeLayer);
            if (!l) return null;
            return (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-white" style={{ color: l.color }}>
                    Layer {l.id} ({l.name}):
                  </span>{' '}
                  <span className="text-slate-300">
                    Protocols: <strong className="text-white font-mono">{l.protocols}</strong>
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Sender: <strong className="text-emerald-300">{l.headerAdded}</strong> &bull; Receiver: <strong className="text-amber-300">{l.headerStripped}</strong>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
