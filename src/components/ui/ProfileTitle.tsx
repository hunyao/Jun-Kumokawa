import React from 'react';
import Typography from '@mui/material/Typography';
import { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

interface ProfileTitleUIProps {}
const ProfileTitle = styled(React.forwardRef<HTMLDivElement, TypographyProps<"div", ProfileTitleUIProps>>(({ className, ...rest }, ref) => (
  <Typography
    component="div"
    className={className + " profile-title"}
    ref={ref}
    data-testid="profile-title"
    {...rest}
  />
)))(({theme}) => ({
  '&': {
    'color': '#8b949e',
    'fontSize': '14px',
    'padding': '8px 0',
    [theme.breakpoints.down('laptop')]: {
      'padding': 0
    }
  }
}))

export default ProfileTitle;
