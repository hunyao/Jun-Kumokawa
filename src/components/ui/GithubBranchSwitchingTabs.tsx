import React from 'react'
import Tabs from '@mui/material/Tabs';
import { styled } from '@mui/material/styles';

const GithubBranchSwitchingTabs = styled(({className, ...rest}: any) => {
  return <Tabs className={className + " github-branch-swithcing-tabs"} {...rest} />
})`
& {
  padding: 8px 8px 0 8px;
  min-height: initial;
  box-shadow: inset 0 -1px 0 #21262d;
  overflow: auto;
}
& .MuiTabs-indicator {
  width: 0;
  height: 0;
}
& .MuiTab-root {
  text-transform: initial;
  color: #8b949e;
  padding: 4px 16px;
  min-height: initial;
  font-size: 12px;
}
& .MuiTab-root.Mui-selected {
  background-color: #161b22;
  border: 1px solid #21262d;
  border-bottom-width: 0;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

& .MuiTab-root.Mui-selected,
& .MuiTab-root:hover {
  color: #c9d1d9;
}
`

export default GithubBranchSwitchingTabs
