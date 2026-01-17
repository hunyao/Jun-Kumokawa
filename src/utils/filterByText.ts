import type { StrictString } from 'src/types';
import { expect, test } from 'vitest';

/**
 * Returns array filtered `_arr[_key]` by the given `_text`
 *
 * @function
 * @param {Array<T>} _arr The array you want to filter
 * @param {string} _key A property of object in `_arr_` to be filtered
 * @param {string} _text A text to be filterted `_key` by
 * @returns {Array<T>} array filtered `_arr[_key]` by the given `_text`
 */
export function filterByText<T, K extends keyof T>(
  _arr: StrictString<T, K>[],
  _key: K,
  _text: string,
): StrictString<T, K>[] {
  return _arr.filter((_item) => {
    return (
      _text === '' ||
      typeof _item[_key] !== 'string' ||
      _item[_key].includes(_text)
    );
  });
}

if (import.meta.vitest) {
  const targetArray = [
    { id: 1, name: 'Taylor Floyd' },
    { id: 2, name: 'Susannah Livingston' },
    { id: 3, name: 'Jeremiah Edwards' },
    { id: 4, name: 'Amira Flores' },
    { id: 5, name: 'Keeley Gould' },
    { id: 6, name: 'Elysia Perez' },
    { id: 7, name: 'Gina Oneill' },
    { id: 8, name: 'Bryony Briggs' },
    { id: 9, name: 'Nevaeh Oneal' },
    { id: 10, name: 'Emilia Mcclain' },
  ];

  test('filtering by empty text', () => {
    // It should be returned same all array
    expect(filterByText(targetArray, 'name', '')).toEqual(targetArray);
  });
  test('filtering by text exists', () => {
    // It should be returned array only with id=4
    expect(filterByText(targetArray, 'name', 'Amira')).toEqual([
      { id: 4, name: 'Amira Flores' },
    ]);
  });
  test('filtering by text does not exist', () => {
    // It should be returned empty array
    expect(filterByText(targetArray, 'name', 'hogehoge')).toEqual([]);
  });
}
