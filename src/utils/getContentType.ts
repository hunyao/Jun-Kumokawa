import type { GetRepositoryContentResponseType } from '#types/octokitApi';
import { b64ToBuf } from './b64ToBuf';

export type ContentType = {
  mimeType: string;
  isText: boolean;
  isImage: boolean;
  isBinary: boolean;
};

const mimeByExtension: Record<string, string> = {
  c: 'text/x-c',
  cpp: 'text/x-c++src',
  css: 'text/css',
  gif: 'image/gif',
  html: 'text/html',
  java: 'text/x-java',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  js: 'text/javascript',
  json: 'application/json',
  jsx: 'text/jsx',
  md: 'text/markdown',
  png: 'image/png',
  py: 'text/x-python',
  sh: 'text/x-shellscript',
  sql: 'text/x-sql',
  svg: 'image/svg+xml',
  ts: 'text/typescript',
  tsx: 'text/typescript',
  txt: 'text/plain',
  webp: 'image/webp',
  xml: 'application/xml',
  yaml: 'application/yaml',
  yml: 'application/yaml',
};

const textMimeTypes = new Set([
  'application/json',
  'application/xml',
  'application/yaml',
  'image/svg+xml',
]);

const getExtension = (filename: string) => {
  const ext = filename.split('.').pop();
  return ext === undefined ? '' : ext.toLowerCase();
};

const looksLikeText = (buf: Uint8Array) => {
  const sample = buf.slice(0, 4096);
  if (sample.includes(0)) return false;

  try {
    const decoded = new TextDecoder('utf-8', { fatal: true }).decode(sample);
    return [...decoded].every((char) => {
      const code = char.charCodeAt(0);
      return !(
        (code >= 0x01 && code <= 0x08) ||
        code === 0x0b ||
        code === 0x0c ||
        (code >= 0x0e && code <= 0x1f) ||
        code === 0x7f
      );
    });
  } catch {
    return false;
  }
};

/**
 * Returns information about GitHub repository file content.
 *
 * Infers whether the file should be treated as text, image, or binary using
 * GitHub's Contents API response and filename extension only.
 */
export const getContentType = (
  content: GetRepositoryContentResponseType,
): ContentType => {
  if (Array.isArray(content) || content.type !== 'file') {
    return {
      mimeType: 'application/octet-stream',
      isText: false,
      isImage: false,
      isBinary: true,
    };
  }

  const mimeType =
    mimeByExtension[getExtension(content.name)] || 'application/octet-stream';
  const isImage = mimeType.startsWith('image/');
  if (isImage) {
    return {
      mimeType,
      isText: false,
      isImage: true,
      isBinary: false,
    };
  }

  const isKnownTextMime =
    mimeType.startsWith('text/') || textMimeTypes.has(mimeType);
  if (content.encoding !== 'base64' || content.content === '') {
    return {
      mimeType,
      isText: isKnownTextMime,
      isImage: false,
      isBinary: !isKnownTextMime,
    };
  }

  const decoded = new Uint8Array(b64ToBuf(content.content.replace(/\n/g, '')));
  const isText = isKnownTextMime || looksLikeText(decoded);
  return {
    mimeType:
      isText && mimeType === 'application/octet-stream'
        ? 'text/plain'
        : mimeType,
    isText,
    isImage: false,
    isBinary: !isText,
  };
};

if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;

  test('detects utf-8 text content', () => {
    expect(
      getContentType({
        content: 'aGVsbG8gd29ybGQ=',
        download_url: 'https://example.com/download',
        encoding: 'base64',
        git_url: 'https://example.com/git',
        html_url: 'https://example.com/html',
        name: 'README',
        path: 'README',
        sha: 'sha',
        size: 11,
        type: 'file',
        url: 'https://example.com',
        _links: {
          git: 'https://example.com/git',
          html: 'https://example.com/html',
          self: 'https://example.com/self',
        },
      }),
    ).toEqual({
      mimeType: 'text/plain',
      isText: true,
      isImage: false,
      isBinary: false,
    });
  });

  test('detects image content by extension', () => {
    expect(
      getContentType({
        content: '',
        download_url: 'https://example.com/download',
        encoding: 'none',
        git_url: 'https://example.com/git',
        html_url: 'https://example.com/html',
        name: 'image.png',
        path: 'image.png',
        sha: 'sha',
        size: 10,
        type: 'file',
        url: 'https://example.com',
        _links: {
          git: 'https://example.com/git',
          html: 'https://example.com/html',
          self: 'https://example.com/self',
        },
      }),
    ).toEqual({
      mimeType: 'image/png',
      isText: false,
      isImage: true,
      isBinary: false,
    });
  });

  test('detects binary content from non-text bytes', () => {
    expect(
      getContentType({
        content: 'AAECAwQF',
        download_url: 'https://example.com/download',
        encoding: 'base64',
        git_url: 'https://example.com/git',
        html_url: 'https://example.com/html',
        name: 'archive.bin',
        path: 'archive.bin',
        sha: 'sha',
        size: 6,
        type: 'file',
        url: 'https://example.com',
        _links: {
          git: 'https://example.com/git',
          html: 'https://example.com/html',
          self: 'https://example.com/self',
        },
      }),
    ).toEqual({
      mimeType: 'application/octet-stream',
      isText: false,
      isImage: false,
      isBinary: true,
    });
  });
}
