import GithubBranchSwitching from '../GithubBranchSwitching';
import {render, screen} from '@testing-library/react'

test('Testing UI component GithubBranchSwitching', () => {
  render(<GithubBranchSwitching />)

  const element = screen.getByTestId('github-branch-switching');
  expect(element).toHaveClass('github-branch-switching')
})
