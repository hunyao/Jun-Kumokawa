import React from 'react';
import { styled } from '@mui/material/styles';

interface DiscussionItemUIProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}
const DiscussionItem = styled(React.forwardRef<HTMLDivElement, DiscussionItemUIProps>(({ className, ...rest }, ref) => (
  <div
    className={className + " discussion-item"}
    ref={ref}
    data-testid="discussion-item"
    {...rest}
  />
)))`
& {
  position: relative;
  display: flex;
  padding-bottom: 16px;
  margin-left: 16px;
  width: 100%;
}
&:before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2px;
  content: "";
  background-color: #21262d;
}
`

export default DiscussionItem
