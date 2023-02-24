import { renderHook } from '@testing-library/react-hooks';
import usePreviousSha from '../usePreviousSha';
import { wrapper, wrapperWithoutData } from './customRender'
import useCurrentBranch from '../useCurrentBranch'

jest.mock('../useCurrentBranch')
describe('Testing usePreviousSha', () => {
  test('if there is no data in the context', () => {
    useCurrentBranch.mockReturnValue(['', ''])
    let initialValue = ''
    const { result, rerender } = renderHook(() => usePreviousSha(initialValue), { wrapper: wrapperWithoutData })
    expect(result.current).toEqual([ '', false ])

    initialValue = '6b6d0617eff48860c5b4e3e79c74cbd3312cf45a';
    rerender();
    expect(result.current).toEqual([ '', false ])

    initialValue = '0967ef424bce6791893e9a57bb952f80fd536e93';
    rerender();
    expect(result.current).toEqual([ '', false ])

    initialValue = '93cf328f2b038f9c85b8f076948b024b24aff3a4';
    rerender();
    expect(result.current).toEqual([ '', false ])

    initialValue = 'dummy';
    rerender();
    expect(result.current).toEqual([ '', false ])

    initialValue = 'dummy/dummy';
    rerender();
    expect(result.current).toEqual([ '', false ])

    initialValue = 'src/dummy';
    rerender();
    expect(result.current).toEqual([ '', false ])
  })
  test('if there is data in the context', () => {
    // Set the sha to master
    useCurrentBranch.mockReturnValue(['', '6b6d0617eff48860c5b4e3e79c74cbd3312cf45a'])
    let initialValue = ''
    const { result, rerender } = renderHook(() => usePreviousSha(initialValue), { wrapper })
    expect(result.current).toEqual([ '', false ])

    // path: /
    initialValue = '6b6d0617eff48860c5b4e3e79c74cbd3312cf45a';
    rerender();
    // The parent path: /
    expect(result.current).toEqual([ '6b6d0617eff48860c5b4e3e79c74cbd3312cf45a', true ])

    // path: tsconfig
    initialValue = '0967ef424bce6791893e9a57bb952f80fd536e93';
    rerender();
    // The parent path: /
    expect(result.current).toEqual([ '6b6d0617eff48860c5b4e3e79c74cbd3312cf45a', false ])

    // path: scripts/shared/evalToString.js
    initialValue = '93cf328f2b038f9c85b8f076948b024b24aff3a4';
    rerender();
    // The parent path: scripts/shared
    expect(result.current).toEqual([ '3d2df4ed0dd68551cef39e9398f2eaceea4e6c59', false ])

    // dummy path
    initialValue = 'dummy';
    rerender();
    expect(result.current).toEqual([ '', false ])

    // dummy path
    initialValue = 'dummy/dummy';
    rerender();
    expect(result.current).toEqual([ '', false ])

    // dummy path
    initialValue = 'src/dummy';
    rerender();
    expect(result.current).toEqual([ '', false ])
  })
})
