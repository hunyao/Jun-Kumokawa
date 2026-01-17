import { expect, test } from 'vitest';

/**
 * Returns object that includes each page number on the header `Link`
 *
 * @function
 * @param {string | undefined} linkHeader Value of the header `Link`
 * @returns {object} object that includes each page number on the header `Link`
 */
export const extractPageInfo = (
  linkHeader?: string,
): { [key: string]: string | null } | undefined => {
  if (linkHeader === undefined) return;
  const linkHeaderSplited = linkHeader.split(',');
  return Object.fromEntries(
    linkHeaderSplited.map((_link) => {
      const [url, rel] = _link.split(';');
      const relProp = rel.split('=')[1].replace(/"/g, '');
      const pageProp =
        url
          .replace(/<|>/g, '')
          .split('?')[1]
          .split('&')
          .find((_prop) => _prop.split('=')[0] === 'page') || '';
      const [, page] = pageProp.split('=');
      return [relProp, page === undefined ? null : page];
    }),
  );
};

if (import.meta.vitest) {
  test('extractPageInfo', () => {
    const headers =
      '<https://api.example.com/issues?page=2>; rel="prev", <https://api.example.com/issues?page=4>; rel="next", <https://api.example.com/issues?page=10>; rel="last", <https://api.example.com/issues?page=1>; rel="first"';

    expect(extractPageInfo(headers)).toEqual({
      prev: '2',
      next: '4',
      last: '10',
      first: '1',
    });
  });
}
