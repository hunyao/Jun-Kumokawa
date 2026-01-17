import { expect, test } from 'vitest';

/**
 * Returns an ArrayBuffer of decoded the given `b64`
 *
 * @param {string} b64 encoded base64 strings
 * @returns {ArrayBuffer} an ArrayBuffer of decoded the given `b64`
 */
export const b64ToBuf = (b64: string): ArrayBuffer => {
  const inputStr = atob(b64);
  const arrbuf = new ArrayBuffer(inputStr.length);
  const buf = new Uint8Array(arrbuf);
  for (let i = 0; i < inputStr.length; i++) {
    buf[i] = inputStr.charCodeAt(i);
  }

  return buf.buffer;
};

if (import.meta.vitest) {
  test('english', async () => {
    const target = 'hello world';
    const arrayBuf = await new Blob([target]).arrayBuffer();
    const b64 = 'aGVsbG8gd29ybGQ=';

    expect(b64ToBuf(b64)).toEqual(arrayBuf);
  });
  test('japanese', async () => {
    const target = 'ハローワールド';
    const arrayBuf = await new Blob([target]).arrayBuffer();
    const b64 = '44OP44Ot44O844Ov44O844Or44OJ';

    expect(b64ToBuf(b64)).toEqual(arrayBuf);
  });
}
