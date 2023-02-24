import Chart from '../Chart';
import {render, screen} from '@testing-library/react'

test('Testing UI component Chart', () => {
  render(<Chart />)

  const element = screen.getByTestId('c3-chart');
  expect(element).toHaveClass('c3-chart')
})
