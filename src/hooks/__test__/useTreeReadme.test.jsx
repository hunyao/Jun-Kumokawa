import { renderHook } from '@testing-library/react-hooks';
import useTreeReadme from '../useTreeReadme';
import { wrapper, wrapperWithoutData } from './customRender'
import { OctokitInstance } from '../../plugins/Octokit';

jest.mock('../../plugins/Octokit')
describe('Testing useTreeReadme', () => {
  afterEach(() => {
    OctokitInstance.request.mockClear();
  })
  test('if The sha is not provided', async () => {
    let initialValue = ''
    const { result } = renderHook(() => useTreeReadme(initialValue), { wrapper })
    expect(result.current[0]).toEqual('')
    expect(result.current[1]).toBe(false)
    expect(result.current[2]).toBe(false)
  })
  test('if The sha does exist on the tree in the current branch', async () => {
    OctokitInstance.request.mockResolvedValue({
      data: {
        content: "UkVBRE1F"
      }
    })
    let initialValue = '6cbc3730a0ebe3b39937c08a4b4d852eef5054be'
    const { result, waitForNextUpdate } = renderHook(() => useTreeReadme(initialValue), { wrapper })
    expect(result.current[2]).toBe(true)
    await waitForNextUpdate();
    expect(result.current[0]).toEqual("README")
    expect(result.current[1]).toBe(false)
    expect(result.current[2]).toBe(false)
  })
  test('if The sha does exist on the tree in another branch', async () => {
    OctokitInstance.request.mockResolvedValue({
      data: {
        content: "VEVTVFRFU1Q="
      }
    })
    let initialValue = '472221ca000285a92eac0bb64a3d63dc732f2101'
    const { result } = renderHook(() => useTreeReadme(initialValue), { wrapper })
    expect(result.current[0]).toEqual("")
    expect(result.current[1]).toBe(true)
    expect(result.current[2]).toBe(false)
  })
  test('if it is 400 http code', async () => {
    OctokitInstance.request.mockRejectedValue({code: 400})
    let initialValue = '7019e22435e12bf46dcb7f580bc1059f2454b389'
    const { result, waitForNextUpdate } = renderHook(() => useTreeReadme(initialValue), { wrapper })
    expect(result.current[2]).toBe(true)
    await waitForNextUpdate();
    expect(result.current[0]).toEqual("")
    expect(result.current[1]).toBe(true)
    expect(result.current[2]).toBe(false)
  })
  test('if it is 404 http code', async () => {
    OctokitInstance.request.mockRejectedValue({code: 404})
    let initialValue = '524e187c9b3ccd43a3f65769beb4bb889e1b4ad6'
    const { result, waitForNextUpdate } = renderHook(() => useTreeReadme(initialValue), { wrapper })
    expect(result.current[2]).toBe(true)
    await waitForNextUpdate();
    expect(result.current[0]).toEqual("")
    expect(result.current[1]).toBe(false)
    expect(result.current[2]).toBe(false)
  })
  test('if The sha which does not exist is provided', async () => {
    let initialValue = 'dummy'
    const { result } = renderHook(() => useTreeReadme(initialValue), { wrapper })
    expect(result.current[0]).toEqual('')
    expect(result.current[1]).toBe(true)
    expect(result.current[2]).toBe(false)
  })
})
