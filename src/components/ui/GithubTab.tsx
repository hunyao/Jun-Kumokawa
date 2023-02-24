import React from 'react';
import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import { TabProps } from '@mui/material/Tab';

interface GithubTabUIProps extends TabProps {}
const GithubTab = styled(React.forwardRef<HTMLDivElement, TabProps<'div', GithubTabUIProps>>(({ className, children, ...rest }, ref) => (
  <Tab
    className={className + " github-tab"}
    ref={ref}
    data-testid="github-tab"
    {...rest}
  />
)))`
& {
  min-height: initial;
  color: #c9d1d9;
  text-transform: capitalize;
  padding: 8px 16px;
}
& .MuiSvgIcon-root {
  color: #484F58;
}
&.Mui-selected .MuiSvgIcon-root {
  color: inherit;
}
&.Mui-selected {
  color: inherit;
}
`;

export default GithubTab;
