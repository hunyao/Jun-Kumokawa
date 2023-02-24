import React from 'react';
import { styled } from '@mui/material/styles';

interface GithubChipUIProps extends React.HTMLAttributes<HTMLAnchorElement> {
  className?: string
}
const GithubChip = styled(React.forwardRef<HTMLAnchorElement, GithubChipUIProps>(({ className, ...rest }, ref) => (
  <a
    className={className + " github-chip"}
    ref={ref}
    data-testid="github-chip"
    {...rest}
  />
)))`
& {
  display: inline-block;
  padding: 0 7px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 2em;
  padding-right: 10px;
  padding-left: 10px;
  line-height: 22px;
  color: #58a6ff;
  background-color: rgba(56,139,253,0.15);
  border: 1px solid rgba(0, 0, 0, 0);
  white-space: nowrap;
  margin: 0 .125em .333em 0;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
}
&:hover {
  background-color: #1f6feb;
  color: #f0f6fc;
  text-decoration: none;
}
&:active {
  background-color: #1f6feb;
  color: #f0f6fc;
}
`

export default GithubChip;
