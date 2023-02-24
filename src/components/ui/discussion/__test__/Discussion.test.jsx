import Discussion from '../Discussion';
import {render, screen} from '@testing-library/react'

test('Testing UI component Discussion', () => {
  render(<Discussion />)

  const element = screen.getByTestId('discussion');
  expect(element).toHaveClass('discussion')
})
