import ProfileAdditionalItem from '../ProfileAdditionalItem';
import {render, screen} from '@testing-library/react'

test('Testing UI component ProfileAdditionalItem', () => {
  render(<ProfileAdditionalItem />)

  const element = screen.getByTestId('profile-additional-item');
  expect(element).toHaveClass('profile-additional-item')
})
