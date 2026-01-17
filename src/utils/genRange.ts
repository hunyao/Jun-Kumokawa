import { expect, test } from 'vitest';

/**
 * Returns numbers between the given `start` and `end` value
 *
 * @function
 * @param {number} start beginning of number to make
 * @param {number} end ending of number to make
 * @returns {Array<number>} between the given `start` and `end` value
 */
export const genRange = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }).map((_, k) => k + start);
};

if (import.meta.vitest) {
  test('for from 1 to 1', () => {
    expect(genRange(1, 1)).toEqual([1]);
  });
  test('for from 1 to 2', () => {
    expect(genRange(1, 2)).toEqual([1, 2]);
  });
  test('for from -2 to 2', () => {
    expect(genRange(-2, 2)).toEqual([-2, -1, 0, 1, 2]);
  });
}
