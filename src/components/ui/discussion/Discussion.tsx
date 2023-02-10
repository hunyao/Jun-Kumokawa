import React from 'react';
import { styled } from '@mui/material/styles';

interface DiscussionUIProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}
const Discussion = styled(React.forwardRef<HTMLDivElement, DiscussionUIProps>(({ className, ...rest }, ref) => (
  <div className={className + " discussion"} ref={ref} {...rest} />
)))`
& {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  gap: 24px;
  align-items: end;
}
& .discussion-username {
  font-weight: 900;
  color: #c9d1d9;
}
`

export default Discussion
