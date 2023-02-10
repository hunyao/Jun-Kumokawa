import React from 'react';
import { styled } from '@mui/material/styles';

interface ProgressChildrenUIProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string
}
const ProgressChildren = styled(React.forwardRef<HTMLSpanElement, ProgressChildrenUIProps>(({ className, ...rest }, ref) => (
  <span className={className + " github-progress-children"} ref={ref} {...rest} />
)))`
& {
  outline: 2px solid transparent
}
& + .github-progress-children {
  margin-left: 2px
}
`

export default ProgressChildren;
