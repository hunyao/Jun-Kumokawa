import React from 'react';
import Grid from '@mui/material/Grid';
import { GridProps } from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

interface ProfileWrapperUIProps {}
const ProfileWrapper = styled(React.forwardRef<HTMLDivElement, GridProps<"div", ProfileWrapperUIProps>>(({ className, ...rest }, ref) => (
  <Grid
    container
    flexDirection="row"
    flexWrap="nowrap"
    alignItems="center"
    my={2}
    height={100}
    gap={3}
    className={className + " profile-wrapper"}
    ref={ref}
    {...rest}
  />
)))``

export default ProfileWrapper;
