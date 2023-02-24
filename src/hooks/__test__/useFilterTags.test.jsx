import { renderHook } from '@testing-library/react-hooks';
import useFilterTags from '../useFilterTags';
import MockData from './__mockData__'
import { wrapper, wrapperWithoutData } from './customRender'

describe('Testing useFilterTags', () => {
  test('if there is no data in the context', () => {
    let initialValue = 'v17.0.0'
    const { result, rerender } = renderHook(() => useFilterTags(initialValue), { wrapper: wrapperWithoutData })
    expect(result.current[0]).toEqual([]);

    initialValue = 'v16.10.0'
    rerender()
    expect(result.current[0]).toEqual([]);

    initialValue = ''
    rerender()
    expect(result.current[0]).toEqual([]);

    initialValue = 'dummy'
    rerender()
    expect(result.current[0]).toEqual([]);
  })
  test('if there is data in the context', () => {
    let initialValue = 'v17.0.0'
    const { result, rerender } = renderHook(() => useFilterTags(initialValue), { wrapper })
    expect(result.current[0]).toEqual(MockData.tags.filter(branch => branch.name === 'v17.0.0'));

    initialValue = 'v16.10.0'
    rerender()
    expect(result.current[0]).toEqual(MockData.tags.filter(branch => branch.name === 'v16.10.0'));

    initialValue = ''
    rerender()
    expect(result.current[0]).toEqual(MockData.tags);

    initialValue = 'dummy'
    rerender()
    expect(result.current[0]).toEqual([]);
  })
})
