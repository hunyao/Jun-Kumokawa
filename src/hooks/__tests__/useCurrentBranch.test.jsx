import { renderHook } from '@testing-library/react-hooks';
import useCurrentBranch from '../useCurrentBranch';
import MockData from '../../mockData'
import { wrapper, wrapperWithoutData } from '../../mockData/customRender'

describe('Testing useCurrentBranch', () => {
  test('if there is no data in the context', () => {
    const { result } = renderHook(() => useCurrentBranch(), { wrapper: wrapperWithoutData })
    const [
      currentBranchName,
      shaOfCurrentCommit,
      selectedBranch,
      changeBranch
    ] = result.current;

    expect(currentBranchName).toBe('');
    expect(shaOfCurrentCommit).toBe('');
    expect(selectedBranch).toBe(null);
    expect(jest.isMockFunction(changeBranch)).toBe(true);
  })

  test('if there is data in the context', () => {
    const { result } = renderHook(() => useCurrentBranch(), { wrapper })
    const [
      currentBranchName,
      shaOfCurrentCommit,
      selectedBranch,
      changeBranch
    ] = result.current;

    expect(currentBranchName).toBe(MockData.branches[0].name);
    expect(shaOfCurrentCommit).toBe(MockData.branches[0].commit.sha);
    expect(selectedBranch).toEqual(MockData.branches[0]);
    expect(jest.isMockFunction(changeBranch)).toBe(true);
  })
})
