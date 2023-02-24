import { renderHook } from '@testing-library/react-hooks';
import usePathToSha from '../usePathToSha';
import MockData from '../../mockData'
import { wrapper, wrapperWithoutData } from '../../mockData/customRender'

describe('Testing usePathToSha', () => {
  test('if there is no data in the context', () => {
    const { result } = renderHook(() => usePathToSha(), { wrapper: wrapperWithoutData })
    const getShaFromPath = result.current;
    expect(getShaFromPath('scripts/tasks/eslint.js')).toBe(undefined)
    expect(getShaFromPath('dummy')).toBe(undefined)
  })
  test('if there is data in the context', () => {
    const { result } = renderHook(() => usePathToSha(), { wrapper })
    const getShaFromPath = result.current;
    expect(getShaFromPath('scripts/tasks/eslint.js')).toBe('c84976d417acfd6d0af30e05036f9c450de41d5a')
    expect(getShaFromPath('dummy')).toBe('')
  })
})
