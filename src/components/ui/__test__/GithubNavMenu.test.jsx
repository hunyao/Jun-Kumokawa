import GithubNavMenu from '../GithubNavMenu';
import {render, screen} from '@testing-library/react'

test('Testing UI component GithubNavMenu', () => {
  render(<GithubNavMenu />)

  const element = screen.getByTestId('github-nav-menu');
  expect(element).toHaveClass('github-nav-menu')
})
