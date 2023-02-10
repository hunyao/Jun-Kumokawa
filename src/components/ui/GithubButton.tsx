import React from 'react';
import { styled } from '@mui/material/styles';

interface GithubButtonUIProps extends React.HTMLAttributes<HTMLAnchorElement> {
  className?: string
}
const GithubButton = styled(React.forwardRef<HTMLAnchorElement, GithubButtonUIProps>(({ className, ...rest }, ref) => (
  <a className={className + " github-button"} ref={ref} {...rest} />
)))`
& {
  position: relative;
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
  border: 1px solid;
  border-radius: 6px;
  color: #c9d1d9;
  background-color: #21262d;
  border-color: rgba(240, 246, 252, 0.1);
  box-shadow: 0 0 transparent;
  transition: .2s cubic-bezier(0.3, 0, 0.5, 1);
  transition-property: all;
  transition-property: color,background-color,border-color;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
  display: inline-block;
}
&.primary {
  color: #FFFFFF;
  background-color: #238636;
  border-color: rgba(240,246,252,0.1);
  box-shadow: 0 0 transparent;
}
& > svg {
  vertical-align: text-bottom;
  font-size: 16px;
}
& > span {
  vertical-align: top;
}
& > :not(:last-child) {
  margin-right: 4px;
}
&:hover {
  background-color: #30363d;
  border-color: #8b949e;
  transition-duration: .1s;
  text-decoration: none !important;
}
&.primary:hover {
  background-color: #2ea043;
  border-color: rgba(240,246,252,0.1);
}
&:active {
  background-color: hsla(212,12%,18%,1);
  border-color: #6e7871;
  transition-duration: .1s;
}
&.primary:active {
  background-color: #238636;
  box-shadow: 0 0 transparent;
}
`

export default GithubButton;
