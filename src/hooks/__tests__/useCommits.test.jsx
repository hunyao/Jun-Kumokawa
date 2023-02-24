import { renderHook } from '@testing-library/react-hooks';
import useCommits from '../useCommits';
import MockData from '../../mockData'
import { wrapper, wrapperWithoutData } from '../../mockData/customRender'

describe('Testing useCommits', () => {
  test('if there is no data in the context', () => {
    const { result } = renderHook(() => useCommits(), { wrapper: wrapperWithoutData })
    const [ commits, LengthOfCommits ] = result.current;
    expect(commits).toEqual([]);
    expect(LengthOfCommits).toBe(0);
  })
  test('if there is data in the context', () => {
    const { result } = renderHook(() => useCommits(), { wrapper })
    const [ commits, LengthOfCommits ] = result.current;
    expect(commits).toEqual(MockData.commits);
    expect(LengthOfCommits).toBe(MockData.commits.length);
  })
})
