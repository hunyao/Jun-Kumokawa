import { expect, test } from 'vitest';

/**
 * Returns string computed the given `data` to SHA1
 *
 * @function
 * @param {string} data String you want to compute
 * @returns {Promise<string>} string computed the given `data` to SHA1
 */
export const getSha1Digest = async (data: string): Promise<string> => {
  const encoder = new TextEncoder();
  const _data = encoder.encode(data);
  const _digest = await window.crypto.subtle.digest('SHA-1', _data);
  const hashArray = Array.from(new Uint8Array(_digest));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
};

if (import.meta.vitest) {
  test('hogehoge', async () => {
    expect(await getSha1Digest('hogehoge')).toEqual(
      '3b2c6c10d0e78072d14e02cc4c587814d0f10f3a',
    );
  });
  test('hello world', async () => {
    expect(await getSha1Digest('hello world')).toEqual(
      '2aae6c35c94fcfb415dbe95f408b9ce91ee846ed',
    );
  });
}
