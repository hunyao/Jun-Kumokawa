import GithubBranchSwitchingTabs from '../GithubBranchSwitchingTabs';
import {render, screen} from '@testing-library/react'

test('Testing UI component GithubBranchSwitchingTabs', () => {
  render(<GithubBranchSwitchingTabs />)

  const element = screen.getByTestId('github-branch-switching-tabs');
  expect(element).toHaveClass('github-branch-switching-tabs')
})
