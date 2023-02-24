import { renderHook } from '@testing-library/react-hooks';
import useFilterBranches from '../useFilterBranches';
import MockData from '../../mockData'
import { wrapper, wrapperWithoutData } from '../../mockData/customRender'

describe('Testing useFilterBranches', () => {
  test('if there is no data in the context', () => {
    let initialValue = 'main'
    const { result, rerender } = renderHook(() => useFilterBranches(initialValue), { wrapper: wrapperWithoutData })
    expect(result.current[0]).toEqual([]);

    initialValue = 'gh-pages'
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
    let initialValue = 'main'
    const { result, rerender } = renderHook(() => useFilterBranches(initialValue), { wrapper })
    expect(result.current[0]).toEqual(MockData.branches.filter(branch => branch.name.includes('main')));

    initialValue = 'gh-pages'
    rerender()
    expect(result.current[0]).toEqual(MockData.branches.filter(branch => branch.name === 'gh-pages'));

    initialValue = ''
    rerender()
    expect(result.current[0]).toEqual(MockData.branches);

    initialValue = 'dummy'
    rerender()
    expect(result.current[0]).toEqual([]);
  })
})
