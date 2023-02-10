import React from 'react'
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import { TabsProps } from '@mui/material/Tabs';

interface GithubTabsUIProps {}
const GithubTabs = styled(React.forwardRef<HTMLButtonElement, TabsProps<'button', GithubTabsUIProps>>(({className, ...rest}, ref) => (
  <Tabs className={className + " github-tabs"} ref={ref} {...rest} />
)))`
& .MuiTabs-indicator {
  background-color: #F78166;
}
`;


export default GithubTabs;
