import ProfileAdditional from '../ProfileAdditional';
import {render, screen} from '@testing-library/react'

test('Testing UI component ProfileAdditional', () => {
  render(<ProfileAdditional />)

  const element = screen.getByTestId('profile-additional');
  expect(element).toHaveClass('profile-additional')
})
