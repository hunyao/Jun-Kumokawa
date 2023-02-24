import React from 'react';
import { styled } from '@mui/material/styles';

interface GithubProgressWrapperUIProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string
}
const GithubProgressWrapper = styled(React.forwardRef<HTMLSpanElement, GithubProgressWrapperUIProps>(({ className, ...rest }, ref) => (
  <span
    className={className + " github-progress-wrapper"}
    ref={ref}
    data-testid="github-progress-wrapper"
    {...rest}
  />
)))`
& {
  display: flex;
  height: 8px;
  overflow: hidden;
  background-color: rgba(110,118,129,0.4);
  border-radius: 6px;
  outline: 1px solid transparent;
}
`

export default GithubProgressWrapper;
