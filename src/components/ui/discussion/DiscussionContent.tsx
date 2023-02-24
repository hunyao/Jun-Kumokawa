import React from 'react';
import { styled } from '@mui/material/styles';

interface DiscussionContentUIProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}
const DiscussionContent = styled(React.forwardRef<HTMLDivElement, DiscussionContentUIProps>(({ className, ...rest }, ref) => (
  <div
    className={className + " discussion-content"}
    ref={ref}
    data-testid="discussion-content"
    {...rest}
  />
)))`
& {
  margin: 0 0 0 40px;
  padding-left: 16px;
  border-bottom: 2px solid #30363d;
}
`

export default DiscussionContent
