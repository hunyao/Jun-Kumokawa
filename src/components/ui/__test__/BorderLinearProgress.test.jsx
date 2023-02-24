import BorderLinearProgress from '../BorderLinearProgress';
import {render, screen} from '@testing-library/react'

test('Testing UI component BorderLinearProgress', () => {
  render(<BorderLinearProgress />)

  const element = screen.getByTestId('border-linear-progress');
  expect(element).toHaveClass('border-linear-progress')
})
