import React from 'react';
import Paper from '@mui/material/Paper';
import { PaperProps } from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

interface FileViewWrapperUIProps {}
const FileViewWrapper = styled(React.forwardRef<HTMLDivElement, PaperProps<"div", FileViewWrapperUIProps>>(({ className, ...rest }, ref) => (
  <Paper
    variant="outlined"
    data-testid="file-view-wrapper"
    className={className + " file-view-wrapper"}
    ref={ref}
    {...rest}
  />
)))(({theme}) => ({
  '&': {
    margin: '1rem 0',
    color: 'inherit',
    [theme.breakpoints.down('laptop')]: {
      margin: '0 -16px'
    }
  }
}))

export default FileViewWrapper;
