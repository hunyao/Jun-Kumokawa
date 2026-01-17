import { expect, test } from 'vitest';

/**
 * Returns decoded UTF-8 strings encoded by base64
 *
 * @param {string} b64 encoded base64 strings
 * @returns {string} decoded UTF-8 strings encoded by base64
 */
export const b64ToUtf8 = (b64: string): string => {
  const inputStr = atob(b64);
  const arrbuf = new ArrayBuffer(inputStr.length);
  const buf = new Uint8Array(arrbuf);
  for (let i = 0; i < inputStr.length; i++) {
    buf[i] = inputStr.charCodeAt(i);
  }

  const textDecoder = new TextDecoder('utf-8');
  return textDecoder.decode(buf.buffer);
};

if (import.meta.vitest) {
  test('english', () => {
    expect(b64ToUtf8('aGVsbG8gd29ybGQ=')).toEqual('hello world');
  });
  test('japanese', () => {
    expect(b64ToUtf8('44OP44Ot44O844Ov44O844Or44OJ')).toEqual('ハローワールド');
  });
}
