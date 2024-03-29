import React from 'react';
import { styled } from '@mui/material/styles';

interface ExpanderUIProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string
}
const Expander = styled(React.forwardRef<HTMLButtonElement, ExpanderUIProps>(({ className, ...rest }, ref) => (
  <button
    className={className + " expander"}
    ref={ref}
    data-testid="expander"
    {...rest}
  />
)))`
& {
  display: inline-block;
  height: 12px;
  padding: 0 5px 5px;
  font-size: 12px;
  font-weight: 600;
  line-height: 6px;
  color: #c9d1d9;
  text-decoration: none;
  vertical-align: middle;
  background-color: rgba(110, 118, 129, 0.4);
  border: 0;
  border-radius: 1px;
  cursor: pointer;
}
&:hover {
  background-color: rgba(56, 129, 253, 0.4);
  text-decoration: none;
}
&:active {
  background-color: #1f6feb;
}
`

export default Expander;
