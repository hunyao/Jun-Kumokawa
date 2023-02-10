import React from 'react'
import TabPanel from '@mui/lab/TabPanel';
import { TabPanelProps } from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';

interface GithubBranchSwitchingTabPanelUIProps extends TabPanelProps {}
const GithubBranchSwitchingTabPanel = styled(React.forwardRef<HTMLDivElement, GithubBranchSwitchingTabPanelUIProps>(({className, ...rest}, ref) => (
  <TabPanel className={className + " github-branch-switching-tab-panel"} ref={ref} {...rest} />
)))`
& {
  padding: 0;
  max-height: 357px;
  overflow-y: auto;
}
& .github-branch-switching-list-item-icon {
  min-width: 16px;
  margin-right: 8px;
  font-size: 12px;

  svg.icon {
    font-size: 16px;
  }
}
& .github-branch-switching-list-item-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 1px;
}
`

export default GithubBranchSwitchingTabPanel;
