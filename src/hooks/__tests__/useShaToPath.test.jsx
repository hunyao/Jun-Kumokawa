import { renderHook } from '@testing-library/react-hooks';
import useShaToPath from '../useShaToPath';
import { wrapper, wrapperWithoutData } from '../../mockData/customRender'

describe('Testing useShaToPath', () => {
  test('if there is no data in the context', () => {
    const { result } = renderHook(() => useShaToPath(), { wrapper: wrapperWithoutData })
    const getPathFromSha = result.current;
    expect(getPathFromSha('7019e22435e12bf46dcb7f580bc1059f2454b389')).toEqual(['', true ])
    expect(getPathFromSha('6b6d0617eff48860c5b4e3e79c74cbd3312cf45a')).toEqual(['', true])
    expect(getPathFromSha('dummy')).toEqual([ '', true ])
    expect(getPathFromSha('src/dummy')).toEqual([ '', true ])
    expect(getPathFromSha('directory/dummy')).toEqual([ '', true ])
  })
  test('if there is data in the context', () => {
    const { result } = renderHook(() => useShaToPath(), { wrapper })
    const getPathFromSha = result.current;
    // path: scripts/rollup/validate/eslintrc.fb.js
    expect(getPathFromSha('7019e22435e12bf46dcb7f580bc1059f2454b389')).toEqual(['scripts/rollup/validate/eslintrc.fb.js', false])
    // paht: /
    expect(getPathFromSha('6b6d0617eff48860c5b4e3e79c74cbd3312cf45a')).toEqual(['', false])
    expect(getPathFromSha('dummy')).toEqual(['', true])
    expect(getPathFromSha('directory/dummy')).toEqual(['', true])
  })
})
