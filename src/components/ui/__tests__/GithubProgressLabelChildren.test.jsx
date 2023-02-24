import GithubProgressLabelChildren from '../GithubProgressLabelChildren';
import {render, screen} from '@testing-library/react'

test('Testing UI component GithubProgressLabelChildren', () => {
  render(<GithubProgressLabelChildren />)

  const element = screen.getByTestId('github-progress-label-children');
  expect(element).toHaveClass('github-progress-label-children')
})
