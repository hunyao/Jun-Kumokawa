import React from 'react';
import Grid from '@mui/material/Grid';
import { GridProps } from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

interface ProfileAdditionalUIProps {}
const ProfileAdditional = styled(React.forwardRef<HTMLDivElement, GridProps<"div", ProfileAdditionalUIProps>>(({ className, ...rest }, ref) => (
  <Grid
    container
    alignItems="center"
    spacing={1}
    className={className + " profile-additional"}
    ref={ref}
    {...rest}
  />
)))`
& {
  font-size: 14px;
}
`

export default ProfileAdditional;
