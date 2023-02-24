import GithubProgressChildren from '../GithubProgressChildren';
import {render, screen} from '@testing-library/react'

test('Testing UI component GithubProgressChildren', () => {
  render(<GithubProgressChildren />)

  const element = screen.getByTestId('github-progress-children');
  expect(element).toHaveClass('github-progress-children')
})
