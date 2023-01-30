import React from 'react'
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';

const GithubBranchSwitchingTabPanel = styled(({className, ...rest}: any) => (
  <TabPanel className={className + " github-branch-switching-tab-panel"} {...rest} />
))`
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
