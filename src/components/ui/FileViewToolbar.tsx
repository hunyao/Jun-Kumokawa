import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { ToolbarProps } from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';

interface FileViewToolbarUIProps {}
const FileViewToolbar = styled(React.forwardRef<HTMLDivElement, ToolbarProps<'div', FileViewToolbarUIProps>>(({ className, ...rest }, ref) => (
  <Toolbar
    className={className + " file-view-toolbar"}
    ref={ref}
    data-testid="file-view-toolbar"
    {...rest}
  />
)))`
& {
  border-bottom: 1px solid #21262d;
  padding: 8px;
  min-height: initial;
  position: initial;
}
`

export default FileViewToolbar;
