import { renderHook } from '@testing-library/react-hooks';
import useCow from '../useCow';
import messages from '../../pages/cow/cow.json';
const messagesWithIndex = messages.map((msg, i) => {
  return [ msg, i ]
})

const expectToBe = (level, msg) => {
  const { result } = renderHook(() => useCow(level))
  const [ responseMessage ] = result.current;
  expect(responseMessage).toBe(msg)
}
describe('Testing useCow hook', () => {
  test.each(messagesWithIndex)('With %# level testing', (msg, i) => {
    expectToBe('v'.repeat(i), msg)
  })

  test.each([
    messages.length,
    messages.length + 1,
    100
  ])('In case that more v', (i) => {
    expectToBe('v'.repeat(i), messages[messages.length-1])
  })

  test('In case that no v but all of the other alphabets', () => {
    expectToBe('abcdefghijklmnopqrstuwxyz', messages[0])
  })

  test('In case that no any alphabets but number', () => {
    expectToBe('1234567890', messages[0])
  })

  test('In case that some alphabets including v', () => {
    expectToBe('abcvdef', messages[0])
  })
})

