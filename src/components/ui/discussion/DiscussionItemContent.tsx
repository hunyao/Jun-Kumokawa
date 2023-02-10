import React from 'react';
import { styled } from '@mui/material/styles';

interface DiscussionItemContentUIProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}
const DiscussionItemContent = styled(React.forwardRef<HTMLDivElement, DiscussionItemContentUIProps>(({ className, ...rest }, ref) => (
  <div className={className + " discussion-item-content"} ref={ref} {...rest} />
)))`
& {
  margin-left: -16px;
  position: relative;
  color: #c9d1d9;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 6px;
  width: 100%;
}
&:before, &:after {
  position: absolute;
  top: 11px;
  right: 100%;
  left: -8px;
  width: 8px;
  height: 16px;
  pointer-events: none;
  content: " ";
  clip-path: polygon(0 50%, 100% 0, 100% 100%);
  color: #c9d1d9;
}
&:before {
  background-color: #30363d;
}
&:after {
  margin-left: 1px;
  background-color: #0d1117;
  background-image: linear-gradient(#161b22, #161b22);
}
`

export default DiscussionItemContent
