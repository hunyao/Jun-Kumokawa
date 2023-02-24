import GithubProgressWrapper from '../GithubProgressWrapper';
import {render, screen} from '@testing-library/react'

test('Testing UI component GithubProgressWrapper', () => {
  render(<GithubProgressWrapper />)

  const element = screen.getByTestId('github-progress-wrapper');
  expect(element).toHaveClass('github-progress-wrapper')
})
