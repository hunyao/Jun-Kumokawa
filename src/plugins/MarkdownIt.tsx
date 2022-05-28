import MarkdownIt from 'markdown-it';
import MarkdownItHighlightjs from 'markdown-it-highlightjs';
// import HighlightTypescript from 'highlight.js/lib/languages/typescript';
// import HighlightShell from 'highlight.js/lib/languages/shell';
import Highlightjs from 'highlight.js/lib/core';
import MarkdownItNamedHeadings from './MarkdownItNamedHeadings';

// Highlightjs.registerLanguage(
//   'typescript',
//   HighlightTypescript
// )
// Highlightjs.registerLanguage(
//   'shell',
//   HighlightShell
// )

const md = new MarkdownIt()
.use(MarkdownItHighlightjs, {
  breaks: true,
  inline: true,
  hljs: Highlightjs
})
.use(MarkdownItNamedHeadings);

export default md;
