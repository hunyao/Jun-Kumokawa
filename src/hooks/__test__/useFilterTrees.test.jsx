import { renderHook } from '@testing-library/react-hooks';
import useFilterTrees from '../useFilterTrees';
import MockData from './__mockData__'
import { wrapper, wrapperWithoutData } from './customRender'

const filtering = (str) => {
  return MockData.trees.tree
    .filter(tree => {
      return tree.type === 'blob'
    })
    .filter(tree => {
      return tree.path.toUpperCase().includes(str.toUpperCase());
    })
    .map(t => t.path)
    .slice(0, 50)
}
describe('Testing useFilterTrees', () => {
  test('if there is no data in the context', () => {
    let initialValue = 'src'
    const { result, rerender } = renderHook(() => useFilterTrees(initialValue), { wrapper: wrapperWithoutData })
    expect(result.current[0]).toEqual([]);

    initialValue = 'hooks'
    rerender()
    expect(result.current[0]).toEqual([]);

    initialValue = ''
    rerender()
    expect(result.current[0]).toEqual([]);

    initialValue = 'dummy'
    rerender()
    expect(result.current[0]).toEqual([]);
  })
  test('if there is data in the context', async () => {
    let initialValue = 'src'
    const { result, rerender } = renderHook(() => useFilterTrees(initialValue), { wrapper })
    expect(result.current[0]).toHaveLength(50);
    expect(result.current[0]).toEqual(filtering('src'));

    initialValue = 'hooks'
    rerender()
    expect(result.current[0]).toEqual(filtering('hooks'));

    initialValue = ''
    rerender()
    expect(result.current[0]).toHaveLength(50);
    expect(result.current[0]).toEqual(filtering(''));

    initialValue = 'dummy'
    rerender()
    expect(result.current[0]).toEqual([]);
  })
})
