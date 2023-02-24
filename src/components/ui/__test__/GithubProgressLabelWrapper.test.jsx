import GithubProgressLabelWrapper from '../GithubProgressLabelWrapper';
import {render, screen} from '@testing-library/react'

test('Testing UI component GithubProgressLabelWrapper', () => {
  render(<GithubProgressLabelWrapper />)

  const element = screen.getByTestId('github-progress-label-wrapper');
  expect(element).toHaveClass('github-progress-label-wrapper')
})
