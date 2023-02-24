import { renderHook } from '@testing-library/react-hooks';
import useTree from '../useTree';
import { wrapper } from '../../mockData/customRender'
import { OctokitInstance } from '../../plugins/Octokit';
import MockTree1Json from '../../mockData/__jsons__/tree/src_assets.json'

jest.mock('../../plugins/Octokit')
describe('Testing useTree', () => {
  test('if The sha is not provided', async () => {
    let initialValue = ''
    const { result } = renderHook(() => useTree(initialValue))
    expect(result.current[0]).toEqual([])
    expect(result.current[1]).toBe(false)
    expect(result.current[2]).toBe(false)
  })
  test('if The sha does exist on a path in the current branch', async () => {
    OctokitInstance.request.mockResolvedValue({
      data: MockTree1Json
    })
    let initialValue = '769021ab51d116c1dcd1436e1a9eba1c5b4e7bf4'
    const { result, waitForNextUpdate } = renderHook(() => useTree(initialValue), {wrapper})
    expect(result.current[2]).toBe(true)
    await waitForNextUpdate();
    expect(result.current[0]).toEqual(MockTree1Json.tree)
    expect(result.current[1]).toBe(false)
    expect(result.current[2]).toBe(false)
  })
  test('if The sha does exist on a path in another branch', async () => {
    let initialValue = '3aa40be1233721029ad3fe1a26dc9f80a489e65f'
    const { result } = renderHook(() => useTree(initialValue), {wrapper})
    expect(result.current[0]).toEqual([])
    expect(result.current[1]).toBe(true)
    expect(result.current[2]).toBe(false)
  })
  test('if The sha does not exist on the tree', async () => {
    let initialValue = 'dummy'
    const { result } = renderHook(() => useTree(initialValue), {wrapper})
    expect(result.current[0]).toEqual([])
    expect(result.current[1]).toBe(true)
    expect(result.current[2]).toBe(false)
  })
  test('if The sha does not exist on remote repository', async () => {
    OctokitInstance.request.mockRejectedValue({
      data: {
        "message": "Not Found",
        "documentation_url": "https://docs.github.com/rest/reference/git#get-a-tree"
      }
    })
    let initialValue = '564a0acf5d790c6cf937a84aa7934ec88b5ab6e0'
    const { result, waitForNextUpdate } = renderHook(() => useTree(initialValue), {wrapper})
    expect(result.current[2]).toBe(true)
    await waitForNextUpdate();
    expect(result.current[0]).toEqual([])
    expect(result.current[1]).toBe(true)
    expect(result.current[2]).toBe(false)
  })
})
