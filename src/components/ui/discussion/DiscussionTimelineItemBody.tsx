import React from 'react';
import { styled } from '@mui/material/styles';

interface DiscussionTimelineItemBodyUIProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}
const DiscussionTimelineItemBody = styled(React.forwardRef<HTMLDivElement, DiscussionTimelineItemBodyUIProps>(({ className, ...rest }, ref) => (
  <div
    className={className + " discussion-timeline-item-body"}
    ref={ref}
    data-testid="discussion-timeline-item-body"
    {...rest}
  />
)))`
& {
  min-width: 0;
  max-width: 100%;
  margin-top: 4px;
  flex: auto;
}
`

export default DiscussionTimelineItemBody
