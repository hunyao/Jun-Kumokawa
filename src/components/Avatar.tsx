import React from 'react';
import MuiAvatar from '@mui/material/Avatar';
import { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';
import AvatarImg from '../assets/images/avatar.jpg';
import { PersonalDataContext } from '../contexts/personalData';

interface AvatarProps {
  height?: number | string,
  width?: number | string
}
const Avatar: React.FC<MuiAvatarProps<"div", AvatarProps>> = (props) => {
  const {
    height = 24,
    width = 24,
    sx,
    ...rest
  } = props;
  const { profile } = React.useContext(PersonalDataContext);

  return (
    <MuiAvatar
      alt={profile.name.en.fullName}
      title={profile.name.en.fullName}
      src={AvatarImg}
      sx={{...sx, height, width}}
      data-testid="avatar"
      {...rest}
    />
  )
}

export default Avatar;
