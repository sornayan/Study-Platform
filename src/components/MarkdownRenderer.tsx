import React, { useMemo } from 'react';
import { marked } from 'marked';
import { EducationalDiagram } from './EducationalDiagrams';
import { DiagramRenderer } from './DiagramRenderer';
import { normalizeFormulas, renderLatexToHtml } from './MathRenderer';

interface MarkdownRendererProps {
  content: string;
  highlights?: string[];
  className?: string;
  onTextHighlight?: (selectedText: string) => void;
}

interface ContentSegment {
  type: 'markdown' | 'codeblock';
  content?: string;
  lang?: string;
  code?: string;
}

/**
 * Splits normalized markdown into alternating Markdown text and Codeblock segments.
 */
function splitMarkdownSegments(raw: string): ContentSegment[] {
  if (!raw) return [];
  const segments: ContentSegment[] = [];
  const regex = /```([a-zA-Z0-9_-]*)\r?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(raw)) !== null) {
    const textBefore = raw.substring(lastIndex, match.index);
    if (textBefore.trim().length > 0) {
      segments.push({ type: 'markdown', content: textBefore });
    }
    segments.push({
      type: 'codeblock',
      lang: match[1] || 'text',
      code: match[2].trimEnd()
    });
    lastIndex = regex.lastIndex;
  }

  const remaining = raw.substring(lastIndex);
  if (remaining.trim().length > 0) {
    segments.push({ type: 'markdown', content: remaining });
  }

  return segments;
}

/**
 * Processes a markdown text chunk to render LaTeX formulas with KaTeX,
 * decode safe entities, wrap tables, and parse into valid, responsive HTML.
 */
function processMarkdownChunk(rawChunk: string, highlights: string[] = []): string {
  if (!rawChunk || !rawChunk.trim()) return '';

  // 1. Protect inline code `...`
  const inlineCodes: string[] = [];
  let text = rawChunk.replace(/`([^`\n]+)`/g, (_m, code) => {
    const id = `@@@INLINE_CODE_${inlineCodes.length}@@@`;
    inlineCodes.push(code);
    return id;
  });

  const displayMathMap: string[] = [];
  const inlineMathMap: string[] = [];

  // 2a. Block math: $$ ... $$
  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_m, expr) => {
    const idx = displayMathMap.length;
    displayMathMap.push(renderLatexToHtml(expr, true));
    return `\n\n<div data-math-display="${idx}"></div>\n\n`;
  });

  // 2b. Block math: \[ ... \]
  text = text.replace(/\\\[([\s\S]+?)\\\]/g, (match, expr) => {
    if (/^\s*(\d+(\s*[\+\-]\s*\d+)?\s*=\s*)?\d+\s*marks?\s*$/i.test(expr)) return match;
    const idx = displayMathMap.length;
    displayMathMap.push(renderLatexToHtml(expr, true));
    return `\n\n<div data-math-display="${idx}"></div>\n\n`;
  });

  // 2c. Inline math: \( ... \)
  text = text.replace(/\\\(([\s\S]+?)\\\)/g, (_m, expr) => {
    const idx = inlineMathMap.length;
    inlineMathMap.push(renderLatexToHtml(expr, false));
    return `<span data-math-inline="${idx}"></span>`;
  });

  // 2d. Inline math: $ ... $ (Pandoc standard: non-space boundaries)
  text = text.replace(/(?<!\\|\$)\$(?!\s)([^$\n]+?)(?<!\s)\$(?!\d|\$)/g, (match, expr) => {
    if (/^\s*\d+(\.\d+)?\s*$/.test(expr)) return match; // skip pure numbers/currency
    const idx = inlineMathMap.length;
    inlineMathMap.push(renderLatexToHtml(expr, false));
    return `<span data-math-inline="${idx}"></span>`;
  });

  // 3. Marked parsing (with CommonMark standard paragraph separation)
  let html = '';
  try {
    html = marked.parse(text, { breaks: false, gfm: true }) as string;
  } catch (e) {
    html = text;
  }

  // 4. Transform top answer headers: "### Answer" or "**Answer:**" into a clean examination solution badge
  html = html.replace(/<h[23]>Answer:?<\/h[23]>/gi, () => {
    return `<div class="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-bold bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 uppercase tracking-wider mb-4"><span class="w-2 h-2 rounded-full bg-blue-500"></span><span>Official Examination Solution</span></div>`;
  });
  html = html.replace(/<p><strong>Answer:?<\/strong>:?<\/p>/gi, () => {
    return `<div class="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-bold bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 uppercase tracking-wider mb-4"><span class="w-2 h-2 rounded-full bg-blue-500"></span><span>Official Examination Solution</span></div>`;
  });

  // 5. Transform Conclusion sections into Academic Conclusion Cards
  html = html.replace(/<p><strong>(Conclusion|Summary):?<\/strong>:?\s*([\s\S]*?)<\/p>/gi, (_m, _label, body) => {
    return `<div class="academic-callout academic-conclusion-card my-5 p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/25 border border-emerald-500/30 text-slate-800 dark:text-slate-200 shadow-xs"><div class="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5"><span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span><span>Examination Conclusion</span></div><div class="text-[15px] leading-relaxed">${body}</div></div>`;
  });

  // 6. Transform Note sections into Academic Note Cards
  html = html.replace(/<p><strong>(Important Note|Paper-printing note|Note):?<\/strong>:?\s*([\s\S]*?)<\/p>/gi, (_m, label, body) => {
    return `<div class="academic-callout academic-note-card my-5 p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/25 border border-amber-500/30 text-slate-800 dark:text-slate-200 shadow-xs"><div class="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1.5"><span class="w-2 h-2 rounded-full bg-amber-500 inline-block"></span><span>${label}</span></div><div class="text-[14.5px] leading-relaxed">${body}</div></div>`;
  });

  // 7. Transform standalone bold subsection labels before lists (e.g. "**Working of ARP:**") into distinct subheadings
  html = html.replace(/<p><strong>([A-Z][A-Za-z0-9\s,\/()–-]{2,60}:)<\/strong><\/p>/g, (_m, title) => {
    return `<h4 class="font-bold text-base text-slate-900 dark:text-white mt-6 mb-2 tracking-tight">${title}</h4>`;
  });

  // 8. Restore display math blocks (zero <p><div> wrapping, responsive cards)
  displayMathMap.forEach((renderedHtml, idx) => {
    const card = `<div class="katex-display-container my-5 p-4 md:p-5 bg-slate-50/90 dark:bg-slate-900/90 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-x-auto text-center shadow-xs text-slate-900 dark:text-slate-100">${renderedHtml}</div>`;
    html = html.replace(`<div data-math-display="${idx}"></div>`, card);
  });

  // 9. Restore inline math spans
  inlineMathMap.forEach((renderedHtml, idx) => {
    const inline = `<span class="katex-inline-container inline-block px-0.5">${renderedHtml}</span>`;
    html = html.replace(`<span data-math-inline="${idx}"></span>`, inline);
  });

  // 10. Restore inline code
  inlineCodes.forEach((code, idx) => {
    const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    html = html.replace(`@@@INLINE_CODE_${idx}@@@`, `<code class="bg-slate-100 dark:bg-slate-800 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded text-[13px] font-mono border border-slate-200/60 dark:border-slate-700/60">${escaped}</code>`);
  });

  // 11. Wrap tables in responsive horizontal scroll containers
  html = html.replace(/<table>([\s\S]*?)<\/table>/g, (_m, inner) => {
    return `<div class="overflow-x-auto my-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs"><table class="w-full text-left text-xs md:text-sm border-collapse">${inner}</table></div>`;
  });

  // 12. Highlights injection
  if (highlights.length > 0) {
    highlights.forEach(h => {
      if (h.trim().length > 3) {
        const regex = new RegExp(`(${h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        html = html.replace(regex, '<mark class="bg-amber-300 dark:bg-amber-500/40 text-slate-900 dark:text-amber-100 px-1 rounded font-medium">$1</mark>');
      }
    });
  }

  return html;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  highlights = [],
  className = '',
  onTextHighlight
}) => {
  // Check if content matches top-level architectural diagram types
  const detectedDiagramType = useMemo(() => {
    const lower = content.toLowerCase();
    if (lower.includes('osi') && (lower.includes('tcp') || lower.includes('layer'))) return 'osi-tcp';
    if (lower.includes('crc') || lower.includes('cyclic redundancy') || lower.includes('modulo-2')) return 'crc';
    if (lower.includes('two-pass assembler') || (lower.includes('pass 1') && lower.includes('pass 2'))) return 'assembler';
    if (lower.includes('saas') && lower.includes('paas') && lower.includes('iaas')) return 'cloud-spi';
    if (lower.includes('cky') || (lower.includes('chomsky normal form') && lower.includes('parsing table'))) return 'cky';
    if (lower.includes('histogram equalization') || lower.includes('transformation function')) return 'histogram';
    return null;
  }, [content]);

  // Normalize formulas across the raw markdown before segmenting
  const normalizedContent = useMemo(() => {
    return normalizeFormulas(content);
  }, [content]);

  // Split content into Markdown and Codeblock segments
  const segments = useMemo(() => {
    return splitMarkdownSegments(normalizedContent);
  }, [normalizedContent]);

  const handleMouseUp = () => {
    if (!onTextHighlight) return;
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 4) {
      onTextHighlight(selection.toString().trim());
    }
  };

  return (
    <div className={`prose-exam relative ${className}`} onMouseUp={handleMouseUp}>
      {/* Top Architectural Diagram Banner if matched */}
      {detectedDiagramType && (
        <div className="mb-6 not-prose">
          <EducationalDiagram type={detectedDiagramType} />
        </div>
      )}

      {/* Render segments sequentially */}
      <div className="answer-content text-slate-700 dark:text-slate-300 text-[15px] md:text-[16px] leading-relaxed break-words">
        {segments.map((segment, index) => {
          if (segment.type === 'codeblock' && segment.code) {
            return (
              <div key={index} className="not-prose my-3">
                <DiagramRenderer
                  code={segment.code}
                  lang={segment.lang || 'text'}
                />
              </div>
            );
          }

          // Markdown chunk
          const htmlChunk = processMarkdownChunk(segment.content || '', highlights);
          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: htmlChunk }}
            />
          );
        })}
      </div>
    </div>
  );
};
