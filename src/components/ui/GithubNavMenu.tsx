import React from 'react';
import Paper from '@mui/material/Paper';
import { PaperProps } from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

interface GithubNavMenuUIProps {}
const GithubNavMenu = styled(React.forwardRef<HTMLDivElement, PaperProps<'nav', GithubNavMenuUIProps>>(({className, ...rest}, ref) => (
  <Paper component="nav" className={className + " github-nav-menu"} ref={ref} {...rest} />
)))`
& {
  border-radius: 6px;
  padding: 1px;
}
& + & {
  margin-top: 8px;
}
`

export default GithubNavMenu;
