import React from 'react';
import { styled } from '@mui/material/styles';

interface SourceCodeViewLineNumUIProps extends React.HTMLAttributes<HTMLTableCellElement> {
  className?: string
}
const SourceCodeViewLineNum = styled(React.forwardRef<HTMLTableCellElement, SourceCodeViewLineNumUIProps>(({ className, ...rest }, ref) => (
  <td className={className + " source-code-view-line-num"} ref={ref} {...rest} />
)))`
&:before {
  content: attr(data-line-number);
}
& {
  width: 1%;
  min-width: 50px;
  padding-right: 10px;
  padding-left: 10px;
  font-size: 12px;
  line-height: 20px;
  color: #484f58;
  text-align: right;
  white-space: nowrap;
  vertical-align: top;
  cursor: pointer;
  user-select: none;
}
`

export default SourceCodeViewLineNum;
