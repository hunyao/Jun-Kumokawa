import React from 'react';
import { styled } from '@mui/material/styles';

interface GithubProgressLabelWrapperUIProps extends React.HTMLAttributes<HTMLUListElement> {
  className?: string
}
const GithubProgressLabelWrapper = styled(React.forwardRef<HTMLUListElement, GithubProgressLabelWrapperUIProps>(({ className, ...rest }, ref) => (
  <ul
    className={className + " github-progress-label-wrapper"}
    ref={ref}
    data-testid="github-progress-label-wrapper"
    {...rest}
  />
)))`
& {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
}
`

export default GithubProgressLabelWrapper;
