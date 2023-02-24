import React from 'react';
import { styled } from '@mui/material/styles';

interface GithubProgressChildrenUIProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string
}
const GithubProgressChildren = styled(React.forwardRef<HTMLSpanElement, GithubProgressChildrenUIProps>(({ className, ...rest }, ref) => (
  <span
    className={className + " github-progress-children"}
    ref={ref}
    data-testid="github-progress-children"
    {...rest}
  />
)))`
& {
  outline: 2px solid transparent
}
& + .github-progress-children {
  margin-left: 2px
}
`

export default GithubProgressChildren;
