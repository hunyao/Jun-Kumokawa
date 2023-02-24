import { renderHook } from '@testing-library/react-hooks';
import useBranches from '../useBranches';
import MockData from './__mockData__'
import { wrapper, wrapperWithoutData } from './customRender'

describe('Testing useBranches', () => {
  test('if there is no data in the context', () => {
    const { result } = renderHook(() => useBranches(), { wrapper: wrapperWithoutData })
    const [ branches, LengthOfBranch ] = result.current;
    expect(branches).toEqual([]);
    expect(LengthOfBranch).toBe(0);
  })
  test('if there is data in the context', () => {
    const { result } = renderHook(() => useBranches(), { wrapper })
    const [ branches, LengthOfBranch ] = result.current;
    expect(branches).toEqual(MockData.branches);
    expect(LengthOfBranch).toBe(MockData.branches.length);
  })
})
