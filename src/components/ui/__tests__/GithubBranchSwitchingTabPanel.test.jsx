import GithubBranchSwitchingTabPanel from '../GithubBranchSwitchingTabPanel';
import {render, screen} from '@testing-library/react'
import TabContext from '@mui/lab/TabContext';

test('Testing UI component GithubBranchSwitchingTabPanel', () => {
  render(<TabContext value="1"><GithubBranchSwitchingTabPanel value="1" /></TabContext>)

  const element = screen.getByTestId('github-branch-switching-tab-panel');
  expect(element).toHaveClass('github-branch-switching-tab-panel')
})
