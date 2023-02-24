import ProfileAvatar from '../ProfileAvatar';
import {render, screen} from '@testing-library/react'

test('Testing UI component ProfileAvatar', () => {
  render(<ProfileAvatar />)

  const element = screen.getByTestId('profile-avatar');
  expect(element).toHaveClass('profile-avatar')
})
