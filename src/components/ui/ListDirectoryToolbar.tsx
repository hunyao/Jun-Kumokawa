import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { ToolbarProps } from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';

interface ListDirectoryToolbarUIProps extends React.HTMLAttributes<HTMLDivElement> {}
const ListDirectoryToolbar = styled(React.forwardRef<HTMLDivElement, ToolbarProps<'div', ListDirectoryToolbarUIProps>>(({ className, ...rest }, ref) => (
  <Toolbar className={className + " list-directory-toolbar"} ref={ref} {...rest} />
)))`
& {
  border-bottom: 1px solid #21262d;
  padding: 16px;
  min-height: initial;
  background: #161b22;
  flex-wrap: wrap;
}
`

export default ListDirectoryToolbar;
