import React from 'react';
import { styled } from '@mui/material/styles';

interface DiscussionItemContentHeaderUIProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}
const DiscussionItemContentHeader = styled(React.forwardRef<HTMLDivElement, DiscussionItemContentHeaderUIProps>(({ className, ...rest }, ref) => (
  <div className={className + " discussion-item-content-header"} ref={ref} {...rest} />
)))`
& {
  display: flex;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
  color: #8b949e;
  background: #161b22;
  border-bottom: 1px solid #30363d;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
`

export default DiscussionItemContentHeader
