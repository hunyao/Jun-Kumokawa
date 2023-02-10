import React from 'react';
import { styled } from '@mui/material/styles';

interface DiscussionContentUIProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}
const DiscussionContent = styled(React.forwardRef<HTMLDivElement, DiscussionContentUIProps>(({ className, ...rest }, ref) => (
  <div className={className + " discussion-content"} ref={ref} {...rest} />
)))`
& {
  flex-basis: 75%;
  flex-grow: 0;
  max-width: 75%;
  margin: 0 0 0 40px;
  padding-left: 16px;
  border-bottom: 2px solid #30363d;
}
`

export default DiscussionContent
