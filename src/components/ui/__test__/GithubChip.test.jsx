import GithubChip from '../GithubChip';
import {render, screen} from '@testing-library/react'

test('Testing UI component GithubChip', () => {
  render(<GithubChip />)

  const element = screen.getByTestId('github-chip');
  expect(element).toHaveClass('github-chip')
})
