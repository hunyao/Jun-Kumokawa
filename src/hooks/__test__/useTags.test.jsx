import { renderHook } from '@testing-library/react-hooks';
import useTags from '../useTags';
import MockData from './__mockData__'
import { wrapper, wrapperWithoutData } from './customRender'

describe('Testing useTags', () => {
  test('if there is no data in the context', () => {
    const { result } = renderHook(() => useTags(), { wrapper: wrapperWithoutData })
    const [ tags, LengthOfTags ] = result.current;
    expect(tags).toEqual([]);
    expect(LengthOfTags).toBe(0);
  })
  test('if there is data in the context', () => {
    const { result } = renderHook(() => useTags(), { wrapper })
    const [ tags, LengthOfTags ] = result.current;
    expect(tags).toEqual(MockData.tags);
    expect(LengthOfTags).toBe(MockData.tags.length);
  })
})
