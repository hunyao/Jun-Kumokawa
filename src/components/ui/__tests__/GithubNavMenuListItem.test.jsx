import GithubNavMenuListItem from '../GithubNavMenuListItem';
import {render, screen} from '@testing-library/react'

test('Testing UI component GithubNavMenuListItem', () => {
  render(<GithubNavMenuListItem />)

  const element = screen.getByTestId('github-nav-menu-list-item');
  expect(element).toHaveClass('github-nav-menu-list-item')
})
