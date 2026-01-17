import { beforeEach, expect, test, vi } from 'vitest';
import { getSha1Digest } from './getSha1Digest';

type ContentType = {
  blob: Blob;
  mimeType: string;
  isText: boolean;
  isImage: boolean;
  isBinary: boolean;
};

const cache = new Map<string, ContentType>();

/**
 * Returns information about the given `url`
 *
 * @param {string} url a url you want to know
 * @returns {Promise<ContentType>} Promise object represents the information about the given `url`
 */
export const getContentType = async (url: string): Promise<ContentType> => {
  const cacheKey = await getSha1Digest(`getContentType:${url}`);
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as ContentType;
  }
  const response = await fetch(url);
  const headers = Object.fromEntries(response.headers.entries());
  const res = {
    blob: await response.blob(),
    mimeType: headers['content-type'],
    isText: headers['content-type'].startsWith('text'),
    isImage: headers['content-type'].startsWith('image'),
    isBinary: !/^text|image/.test(headers['content-type']),
  };
  cache.set(cacheKey, res);
  return res;
};

if (import.meta.vitest) {
  vi.mock('./getSha1Digest.ts', () => ({
    getSha1Digest: vi
      .fn()
      .mockResolvedValue('3b2c6c10d0e78072d14e02cc4c587814d0f10f3a'),
  }));
  const responseMock = vi.fn();
  vi.stubGlobal('fetch', responseMock);

  beforeEach(() => {
    responseMock.mockRestore();
    cache.clear();
  });

  test('requesting text/plain', async () => {
    responseMock.mockImplementation(() => {
      const body = new Blob(['text'], { type: 'text/plain' });
      const headers = new Headers();
      headers.set('content-type', 'text/plain');
      const response = new Response(body, {
        status: 200,
        headers,
      });
      return response;
    });
    expect(await getContentType('https://hogehuga.com/text')).toEqual({
      blob: new Blob(['text'], { type: 'text/plain' }),
      mimeType: 'text/plain',
      isText: true,
      isImage: false,
      isBinary: false,
    });
  });
  test('requesting image/*', async () => {
    responseMock.mockImplementation(() => {
      const body = new Blob(['image'], { type: 'image/jpeg' });
      const headers = new Headers();
      headers.set('content-type', 'image/jpeg');
      const response = new Response(body, {
        status: 200,
        headers,
      });
      return response;
    });
    expect(await getContentType('https://hogehuga1.com/image')).toEqual({
      blob: new Blob(['image'], { type: 'image/jpeg' }),
      mimeType: 'image/jpeg',
      isText: false,
      isImage: true,
      isBinary: false,
    });
  });
  test('requesting other type', async () => {
    responseMock.mockImplementation(() => {
      const body = new Blob(['zip'], { type: 'application/zip' });
      const headers = new Headers();
      headers.set('content-type', 'application/zip');
      const response = new Response(body, {
        status: 200,
        headers,
      });
      return response;
    });
    expect(await getContentType('https://hogehuga1.com/zip')).toEqual({
      blob: new Blob(['zip'], { type: 'application/zip' }),
      mimeType: 'application/zip',
      isText: false,
      isImage: false,
      isBinary: true,
    });
  });
}
