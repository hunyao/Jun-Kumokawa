import Expander from '../Expander';
import {render, screen} from '@testing-library/react'

test('Testing UI component Expander', () => {
  render(<Expander />)

  const element = screen.getByTestId('expander');
  expect(element).toHaveClass('expander')
})
