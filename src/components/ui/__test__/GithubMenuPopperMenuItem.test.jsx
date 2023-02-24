import GithubMenuPopperMenuItem from '../GithubMenuPopperMenuItem';
import {render, screen} from '@testing-library/react'

test('Testing UI component GithubMenuPopperMenuItem', () => {
  render(<GithubMenuPopperMenuItem />)

  const element = screen.getByTestId('github-menu-popper-menu-item');
  expect(element).toHaveClass('github-menu-popper-menu-item')
})
