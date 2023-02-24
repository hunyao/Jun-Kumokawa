import GithubLink from '../GithubLink';
import {render, screen} from '@testing-library/react'

test('Testing UI component GithubLink', () => {
  render(<GithubLink />)

  const element = screen.getByTestId('github-link');
  expect(element).toHaveClass('github-link')
})
