import React from 'react';
import { styled } from '@mui/material/styles';

const DiscussionTimelineItemBody = styled(({ className, ...rest }: any) => (
  <div className={className + " discussion-timeline-item-body"} {...rest} />
))`
& {
  min-width: 0;
  max-width: 100%;
  margin-top: 4px;
  flex: auto;
}
`

export default DiscussionTimelineItemBody
