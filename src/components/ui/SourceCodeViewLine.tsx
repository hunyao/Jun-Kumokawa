import React from 'react';
import { styled } from '@mui/material/styles';

interface SourceCodeViewLineUIProps extends React.HTMLAttributes<HTMLTableCellElement> {
  className?: string
}
const SourceCodeViewLine = styled(React.forwardRef<HTMLTableCellElement, SourceCodeViewLineUIProps>(({ className, ...rest }, ref) => (
  <td
    className={className + " source-code-view-line"}
    ref={ref}
    data-testid="source-code-view-line"
    {...rest}
  />
)))`
&:before {
  content: attr(data-line-number);
}
& {
  overflow: visible;
  font-size: 12px;
  color: #c9d1d9;
  word-wrap: normal;
  white-space: pre;

  position: relative;
  padding-right: 10px;
  padding-left: 10px;
  line-height: 20px;
  vertical-align: top;
}
`

export default SourceCodeViewLine;
