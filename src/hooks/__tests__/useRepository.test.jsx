import { renderHook } from '@testing-library/react-hooks';
import useRepository from '../useRepository';
import MockData from '../../mockData'
import { wrapper, wrapperWithoutData } from '../../mockData/customRender'

describe('Testing useRepository without any data', () => {
  test('if it is a property what should exist', () => {
    const { result } = renderHook(() => useRepository('name', 'initialValue'), { wrapper: wrapperWithoutData })
    const [ value ] = result.current;
    expect(value).toBe('initialValue')
  })
  test('if it is a property what should not exist', () => {
    const { result } = renderHook(() => useRepository('dummy', 'initialValue'), { wrapper: wrapperWithoutData })
    const [ value ] = result.current;
    expect(value).toBe('initialValue')
  })
})
describe('Testing useRepository with data', () => {
  test('if it is a property what should exist', () => {
    const { result } = renderHook(() => useRepository('name', 'initialValue'), { wrapper })
    const [ value ] = result.current;
    expect(value).toBe(MockData.repository['name'])
  })
  test('if it is a property what should not exist', () => {
    const { result } = renderHook(() => useRepository('dummy', 'initialValue'), { wrapper })
    const [ value ] = result.current;
    expect(value).toBe('initialValue')
  })
})
