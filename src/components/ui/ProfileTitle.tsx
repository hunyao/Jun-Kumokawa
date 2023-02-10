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
    {...rest}
  />
)))`
& {
  color: #8b949e;
  font-size: 14px;
}
`

export default ProfileTitle;
