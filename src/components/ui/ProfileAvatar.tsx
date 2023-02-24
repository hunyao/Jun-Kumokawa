import React from 'react';
import Grid from '@mui/material/Grid';
import { GridProps } from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

interface ProfileAvatarUIProps {
  src: string
}
const ProfileAvatar = styled(React.forwardRef<HTMLImageElement, GridProps<"img", ProfileAvatarUIProps>>(({ className, src, ...rest }, ref) => (
  <Grid
    item
    component="img"
    src={src}
    alt="avatar"
    height="100%"
    className={className + " profile-avatar"}
    ref={ref}
    data-testid="profile-avatar"
    {...rest}
  />
)))`
& {
  border-radius: 6px
}
`

export default ProfileAvatar;
