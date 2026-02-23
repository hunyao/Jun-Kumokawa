import kebabcase from 'lodash.kebabcase';
import type MarkdownIt from 'markdown-it';
import type { Token } from 'markdown-it/index.js';
import unidecode from 'unidecode';

type namedHeadingsIdType = {
  [key: string]: boolean;
};
export function plugin(md: MarkdownIt) {
  md.core.ruler.push('named_headings', (state) => {
    const ids: namedHeadingsIdType = {};
    state.tokens.forEach((token, i) => {
      if (token.type === 'heading_open') {
        const text = md.renderer.render(
          state.tokens[i + 1].children || [],
          md.options,
          [],
        );
        const id = kebabcase(unidecode(text));
        const uniqId = uncollide(ids, id);
        ids[uniqId] = true;
        setAttr(token, 'id', uniqId);
      }
    });
  });
}

function uncollide(ids: namedHeadingsIdType, id: string) {
  if (!ids[id]) return id;
  var i = 1;
  while (ids[`${id}-${i}`]) {
    i++;
  }
  return `${id}-${i}`;
}

function setAttr(token: Token, attr: string, value: string) {
  var idx = token.attrIndex(attr);

  if (idx === -1) {
    token.attrPush([attr, value]);
    // } else if (options && options.append) {
    //   token.attrs[idx][1] =
    //     token.attrs[idx][1] + ' ' + value
  } else {
    if (token.attrs) {
      token.attrs[idx][1] = value;
    }
  }
}
