import React from 'react';
import Grid from '@mui/material/Grid';
import { GridProps } from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import SvgIcon from '@mui/material/SvgIcon';

interface ProfileAdditionalItemUIProps {
  icon: typeof SvgIcon
}
const ProfileAdditionalItem = styled(React.forwardRef<HTMLDivElement, GridProps<"div", ProfileAdditionalItemUIProps>>(({ className, icon, children, ...rest }, ref) => (
  <Grid
    container
    item
    alignItems="center"
    flex={0}
    flexWrap="nowrap"
    className={className + " profile-additional-item"}
    ref={ref}
    data-testid="profile-additional-item"
    gap={0.5}
    {...rest}
  >
    <Grid
      item
      component={icon}
    />
    <Grid item>
      {children}
    </Grid>
  </Grid>
)))`
& {
  white-space: nowrap;
}
`

export default ProfileAdditionalItem;
