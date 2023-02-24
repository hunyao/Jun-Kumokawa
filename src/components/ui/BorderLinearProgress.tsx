import React from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import { LinearProgressProps } from '@mui/material/LinearProgress';

interface BorderLinearProgressUIProps extends LinearProgressProps {}
const BorderLinearProgress = styled(React.forwardRef<HTMLAnchorElement, BorderLinearProgressUIProps>(({ className, ...rest }, ref) => (
  <LinearProgress
    className={className + " border-linear-progress"}
    ref={ref}
    data-testid="border-linear-progress"
    {...rest}
  />
)))`
& {
  background: transparent;
  height: 4px;
}
`

export default BorderLinearProgress
