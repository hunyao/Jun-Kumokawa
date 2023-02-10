import type MarkdownIt from 'markdown-it';
import type StateCore from 'markdown-it/lib/rules_core/state_core';
import type Token from 'markdown-it/lib/token';
import kebabcase from 'lodash.kebabcase';
import unidecode from 'unidecode';

function plugin(md: MarkdownIt, options: MarkdownIt.Options) {
  md.core.ruler.push('named_headings', namedHeadings.bind(null, md))
}

type namedHeadingsIdType = {
  [key: string]: boolean
}
function namedHeadings (md: MarkdownIt, state: StateCore) {
  var ids: namedHeadingsIdType = {}

  state.tokens.forEach(function (token: Token, i: number) {
    if (token.type === 'heading_open') {
      var text = md.renderer.render(state.tokens[i + 1].children as Token[], md.options, [])
      var id = kebabcase(unidecode(text))
      var uniqId = uncollide(ids, id)
      ids[uniqId] = true
      setAttr(token, 'id', uniqId)
    }
  })
}

function uncollide (ids: namedHeadingsIdType, id: string) {
  if (!ids[id]) return id
    var i = 1
  while (ids[id + '-' + i]) { i++ }
  return id + '-' + i
}

function setAttr (token: Token, attr: string, value: string) {
  var idx = token.attrIndex(attr)

  if (idx === -1) {
    token.attrPush([ attr, value ])
  // } else if (options && options.append) {
  //   token.attrs[idx][1] =
  //     token.attrs[idx][1] + ' ' + value
  } else {
    if (token.attrs) {
      token.attrs[idx][1] = value
    }
  }
}

export default plugin;
