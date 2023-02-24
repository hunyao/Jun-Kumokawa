import ProfileTitle from '../ProfileTitle';
import {render, screen} from '@testing-library/react'

test('Testing UI component ProfileTitle', () => {
  render(<ProfileTitle />)

  const element = screen.getByTestId('profile-title');
  expect(element).toHaveClass('profile-title')
})
