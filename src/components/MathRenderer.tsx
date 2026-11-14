import React, { useMemo, useState } from 'react';
import katex from 'katex';
import { Copy, Check } from 'lucide-react';

interface MathRendererProps {
  formula: string;
  displayMode?: boolean;
  className?: string;
  showCopy?: boolean;
}

/**
 * Checks if a string has strong mathematical or LaTeX characteristics.
 */
export function isMathExpression(str: string): boolean {
  if (!str || !str.trim()) return false;
  const s = str.trim();

  // Negative checks: exam marks annotations e.g. [7 Marks], [3+4=7 marks]
  if (/^\s*(\d+(\s*[\+\-]\s*\d+)?\s*=\s*)?\d+\s*marks?\s*$/i.test(s)) return false;
  // Negative checks: markdown link syntax e.g. [title](url) or reference tags
  if (/^(note|source|reference|example|figure|table|q\d+|\d+)\b/i.test(s)) return false;
  if (s.length < 2) return false;

  // Positive signals: LaTeX commands
  const hasLatexMacro = /\\(frac|sum|prod|int|sqrt|tau|alpha|beta|gamma|lambda|mu|sigma|omega|Delta|pi|ge|le|times|approx|cdot|log|operatorname|begin|end|boxed|text|quad|qquad|left|right|partial|infty|over|matrix|pm|ne|to|rightarrow|dots|hat|bar|vec|mathbf)\b/.test(s);
  
  // Mathematical operators & variable formulations
  const hasMathEquations = /(?:T_\{?\w+\}?|L_\{?\w+\}?|s_k|r_k|n_j|p_r|h\(r_k\)|F\(u,\s*v\)|f\(x,\s*y\)|C\s*=|R_\{\max\}|SNR|\\tau|\bU\s*=|\bT_p\s*=|\bT_f\s*=)/.test(s);
  const hasSubscriptsOrSuperscripts = /[\w\)\}]\^[\w\d\{\(]|[\w\)\}]_[\w\d\{\(]/.test(s);

  return hasLatexMacro || hasMathEquations || hasSubscriptsOrSuperscripts;
}

/**
 * Cleans and formats raw LaTeX expressions for robust KaTeX typesetting.
 */
export function cleanLatexString(latex: string): string {
  if (!latex) return '';
  let cleaned = latex.trim();

  // Decode safe HTML entities inside formulas
  cleaned = cleaned
    .replace(/&#x20;/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

  // Fix units with bare semicolons like "8000;bits/s" -> "8000\,\text{bits/s}"
  cleaned = cleaned.replace(/(?<!\\);([a-zA-Z]+(\/[a-zA-Z]+)?)/g, '\\,\\text{$1}');

  // If a formula has unspaced unit words inside \frac like \frac{8000\;bits/s}{1000\;symbols/s} or \;bits
  cleaned = cleaned.replace(/\\;\s*([a-zA-Z]+(\/[a-zA-Z]+)?)/g, '\\,\\text{$1}');

  // Convert numbers followed by units: 0.02s -> 0.02\,\text{s}, 0.04s -> 0.04\,\text{s}
  cleaned = cleaned.replace(/(?<![a-zA-Z\\])(\d+(?:,\d{3})*(?:\.\d+)?)\s*(s|sec|ms|bits|bytes|kbps|Mbps|Gbps|Hz|kHz|MHz)\b(?![a-zA-Z\}])/g, '$1\\,\\text{$2}');

  // Format comma-separated large numbers: 64,000 -> 64{,}000
  cleaned = cleaned.replace(/(\d+),(\d{3})\b/g, '$1{,}$2');

  // Format implication arrow with comfortable spacing: \Rightarrow -> \quad\Rightarrow\quad
  cleaned = cleaned.replace(/(?<!\\quad)\s*\\Rightarrow\s*(?!\\quad)/g, '\\quad\\Rightarrow\\quad ');

  // Format comma spacing in equation parameter lists: U=0.5, T_p=0.02 -> U=0.5,\qquad T_p=0.02
  cleaned = cleaned.replace(/,(?:\s*\\quad|\s*\\qquad|\s+)/g, ',\\qquad ');

  return cleaned;
}

/**
 * Safely renders a LaTeX formula into HTML using KaTeX.
 */
export function renderLatexToHtml(latex: string, displayMode: boolean = false): string {
  if (!latex || !latex.trim()) return '';
  const cleaned = cleanLatexString(latex);
  try {
    return katex.renderToString(cleaned, {
      displayMode,
      throwOnError: false,
      strict: false,
      errorColor: '#ef4444'
    });
  } catch (err) {
    const escaped = cleaned.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<span class="text-rose-500 font-mono text-xs">${escaped}</span>`;
  }
}

/**
 * Normalizes all formula variations across raw Markdown answers into standard
 * display (\[...\]) and inline (\(...\)) delimiters before markdown parsing.
 */
export function normalizeFormulas(content: string): string {
  if (!content) return '';
  let text = content;

  // 1. Decode safe entities
  text = text
    .replace(/&#x20;/g, ' ')
    .replace(/&nbsp;/g, ' ');

  // 2. Protect fenced code blocks ``` ... ```
  const codeBlocks: string[] = [];
  text = text.replace(/```([a-zA-Z0-9_-]*)\r?\n([\s\S]*?)```/g, (match) => {
    const id = `___PROTECTED_CODEBLOCK_${codeBlocks.length}___`;
    codeBlocks.push(match);
    return id;
  });

  // 3. Protect inline code ` ... `
  const inlineCodes: string[] = [];
  text = text.replace(/`([^`\n]+)`/g, (match) => {
    const id = `___PROTECTED_INLINE_${inlineCodes.length}___`;
    inlineCodes.push(match);
    return id;
  });

  // 4. Normalize standalone multiline plain square brackets containing math:
  // Matches:
  // [
  // \frac{8000\;bits/s}{1000\;symbols/s}=8\;bits/symbol
  // ]
  // or [ ... \] or \[ ... ]
  text = text.replace(/(?:^|\n)\s*(\\?\[)\s*\n([\s\S]*?)\n\s*(\\?\])(?=\n|$)/g, (match, _open, body) => {
    if (isMathExpression(body)) {
      return `\n\n\\[\n${cleanLatexString(body)}\n\\]\n\n`;
    }
    return match;
  });

  // 5. Normalize single-line bracketed expressions with strong math commands:
  // e.g. [ \frac{dr}{ds}=\frac{L-1}{2r}. \]
  text = text.replace(/(^|[^\\])\[\s*(\\frac|\\sum|\\tau|\\ge|\\le|\\log|s_k=|T_\{|L_\{|C=)[\s\S]*?\\?\]/g, (match, prefix) => {
    const inner = match.slice(prefix.length + 1, match.endsWith('\\]') ? -2 : -1);
    if (isMathExpression(inner)) {
      return `${prefix}\\[\n${cleanLatexString(inner)}\n\\]`;
    }
    return match;
  });

  // 6. Restore code blocks & inline code
  inlineCodes.forEach((code, idx) => {
    text = text.replace(`___PROTECTED_INLINE_${idx}___`, code);
  });
  codeBlocks.forEach((cb, idx) => {
    text = text.replace(`___PROTECTED_CODEBLOCK_${idx}___`, cb);
  });

  return text;
}

/**
 * Standalone KaTeX React component for rendering formulas anywhere in SemesterOS.
 */
export const MathRenderer: React.FC<MathRendererProps> = ({
  formula,
  displayMode = false,
  className = '',
  showCopy = false
}) => {
  const [copied, setCopied] = useState(false);

  const renderedHtml = useMemo(() => {
    return renderLatexToHtml(formula, displayMode);
  }, [formula, displayMode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanLatexString(formula));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (displayMode) {
    return (
      <div className={`relative group katex-display-container my-3.5 p-4 bg-slate-50 dark:bg-slate-900/90 rounded-2xl border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-100 overflow-x-auto text-center shadow-xs ${className}`}>
        {showCopy && (
          <button
            onClick={handleCopy}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-white/90 dark:bg-slate-800/90 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 transition-all opacity-0 group-hover:opacity-100 text-xs flex items-center gap-1 shadow-xs"
            title="Copy LaTeX source"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="text-[10px] font-medium">{copied ? 'Copied' : 'LaTeX'}</span>
          </button>
        )}
        <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
      </div>
    );
  }

  return (
    <span 
      className={`katex-inline-container inline-block px-0.5 text-slate-900 dark:text-slate-100 ${className}`} 
      dangerouslySetInnerHTML={{ __html: renderedHtml }} 
    />
  );
};
