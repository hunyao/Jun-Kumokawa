import React from 'react';
import { styled } from '@mui/material/styles';

interface DiscussionSidebarUIProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}
const DiscussionSidebar = styled(React.forwardRef<HTMLDivElement, DiscussionSidebarUIProps>(({ className, ...rest }, ref) => (
  <div className={className + " discussion-sidebar"} ref={ref} {...rest} />
)))`
& {
  flex-basis: 25%;
  flex-grow: 0;
  max-width: 25%;
  margin: 0;
}
`

export default DiscussionSidebar
