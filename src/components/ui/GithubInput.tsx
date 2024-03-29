import React from 'react'
import { styled } from '@mui/material/styles';

interface GithubInputUIProps extends React.HTMLAttributes<HTMLInputElement> {
  className?: string,
  value: any
}
const GithubInput = styled(React.forwardRef<HTMLInputElement, GithubInputUIProps>(({className, ...rest}, ref) => (
  <input
    className={className + " github-input"}
    ref={ref}
    data-testid="github-input"
    {...rest}
  />
)))`
& {
  font-size: 14px;
  display: block;
  width: 100%;
  padding: 5px 12px;
  line-height: 20px;
  color: #c9d1d9;
  background-color: #0d1117;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #30363d;
  border-radius: 6px;
  box-shadow: 0 0 transparent;
  transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
  transition-property: color,background-color,box-shadow,border-color;
  box-sizing: border-box;
}
&:focus {
  border-color: #58a6ff;
  outline: none;
  box-shadow: inset 0 0 0 1px transparent;
}
`

export default GithubInput
