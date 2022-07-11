import MarkdownIt from 'markdown-it';
import MarkdownItHighlightjs from 'markdown-it-highlightjs';
// import HighlightTypescript from 'highlight.js/lib/languages/typescript';
// import HighlightShell from 'highlight.js/lib/languages/shell';
import Highlightjs from 'highlight.js/lib/core';
import MarkdownItNamedHeadings from './MarkdownItNamedHeadings';
import MarkdownItEmoji from 'markdown-it-emoji';

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
.use(MarkdownItNamedHeadings)
.use(MarkdownItEmoji, {
  defs: {
    japan: '🇯🇵',
    estonia: '🇪🇪',
    earth: '🌏',
    thinking: '🤔',
  }
})
;

export default md;
