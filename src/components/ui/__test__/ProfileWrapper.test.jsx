import ProfileWrapper from '../ProfileWrapper';
import {render, screen} from '@testing-library/react'

test('Testing UI component ProfileWrapper', () => {
  render(<ProfileWrapper />)

  const element = screen.getByTestId('profile-wrapper');
  expect(element).toHaveClass('profile-wrapper')
})
