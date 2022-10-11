import React from 'react';
import { styled } from '@mui/material/styles';

const DiscussionTimelineItemBadge = styled(({ className, ...rest }: any) => (
  <div className={className + " discussion-timeline-item-badge"} {...rest} />
))`
& {
  position: relative;
  z-index: 1;
  display: flex;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  margin-left: -15px;
  align-items: center;
  background-color: #21262d;
  border: 2px solid #0d1117;
  border-radius: 50%;
  justify-content: center;
  flex-shrink: 0;
}
& > svg {
  font-size: 16px;
}
`

export default DiscussionTimelineItemBadge
