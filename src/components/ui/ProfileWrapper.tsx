import React from 'react';
import Grid from '@mui/material/Grid';
import { GridProps } from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

interface ProfileWrapperUIProps {}
const ProfileWrapper = styled(React.forwardRef<HTMLDivElement, GridProps<"div", ProfileWrapperUIProps>>(({ className, ...rest }, ref) => (
  <Grid
    className={className + " profile-wrapper"}
    ref={ref}
    data-testid="profile-wrapper"
    {...rest}
  />
)))(({theme}) => ({
  '&': {
    'marginBottom': '16px',
    'display': 'grid',
    'gridTemplateColumns': 'min-content auto',
    'gridTemplateAreas': "'avatar name' 'avatar title' 'avatar additional'",
    'gridColumnGap': '16px',
    [theme.breakpoints.down('laptop')]: {
      'gridTemplateAreas': "'avatar name' 'avatar title' 'additional additional'",
      'gridRowGap': '16px'
    },
    [theme.breakpoints.down('tablet')]: {
      'gridTemplateAreas': "'avatar name' 'avatar title' 'additional additional'",
      'gridRowGap': '6px',
      'gridColumnGap': '16px',
    }
  }
}))

export default ProfileWrapper;
