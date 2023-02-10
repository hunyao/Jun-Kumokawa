import React from 'react';
import { styled } from '@mui/material/styles';

interface DiscussionSidebarItemUIProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}
const DiscussionSidebarItem = styled(React.forwardRef<HTMLDivElement, DiscussionSidebarItemUIProps>(({ className, ...rest }, ref) => (
  <div className={className + " discussion-sidebar-item"} {...rest} />
)))`
& {
  padding-top: 16px;
  font-size: 12px;
  color: #8b949e;
}
&+& {
  margin-top: 16px;
  border-top: 1px solid #21262d;
}
& .discussion-sidebar-item-header {
  font-weight: 900;
  margin-bottom: 8px;
  color: #c9d1d9;
}
`

export default DiscussionSidebarItem
