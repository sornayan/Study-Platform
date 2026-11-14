import React, { useState } from 'react';
import { Terminal, Copy, Check, WrapText } from 'lucide-react';

interface CodeBlockRendererProps {
  code: string;
  language?: string;
  className?: string;
  title?: string;
}

export const CodeBlockRenderer: React.FC<CodeBlockRendererProps> = ({
  code,
  language = 'text',
  className = '',
  title
}) => {
  const [copied, setCopied] = useState(false);
  const [wrapLines, setWrapLines] = useState(false);

  const cleanCode = code.trimEnd();
  const lineCount = cleanCode.split('\n').length;

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLanguageLabel = (lang: string): string => {
    const l = lang.toLowerCase();
    if (l === 'c' || l === 'cpp') return 'C / C++';
    if (l === 'assembly' || l === 'asm') return 'SIC / SIC-XE Assembly';
    if (l === 'python' || l === 'py') return 'Python';
    if (l === 'bash' || l === 'sh') return 'Shell / Terminal';
    if (l === 'sql') return 'SQL';
    if (l === 'json') return 'JSON';
    if (l === 'mermaid') return 'Mermaid Diagram';
    if (l === 'text' || l === '') return 'Terminal / Text Output';
    return l.toUpperCase();
  };

  return (
    <div className={`my-4 rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 text-slate-100 shadow-md ${className}`}>
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-slate-200 tracking-wide">
            {title || getLanguageLabel(language)}
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            ({lineCount} {lineCount === 1 ? 'line' : 'lines'})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setWrapLines(!wrapLines)}
            className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition-colors ${
              wrapLines ? 'bg-slate-800 text-blue-400' : 'hover:bg-slate-800'
            }`}
            title={wrapLines ? 'Disable line wrap' : 'Enable line wrap'}
          >
            <WrapText className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white transition-all text-[11px] font-medium border border-slate-700/60"
            title="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
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

      {/* Code Content */}
      <pre
        className={`p-4 font-mono text-xs md:text-sm leading-relaxed text-slate-200 bg-slate-950/90 ${
          wrapLines ? 'whitespace-pre-wrap break-words' : 'overflow-x-auto whitespace-pre'
        }`}
      >
        <code>{cleanCode}</code>
      </pre>
    </div>
  );
};

