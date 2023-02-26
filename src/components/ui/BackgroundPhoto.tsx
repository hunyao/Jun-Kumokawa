import React from 'react';
import Box from '@mui/material/Box';
import { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ForestBackgroundImg from '../../assets/images/forest-background.jpg';

interface BackgroundPhotoUIProps {}
const BackgroundPhoto = styled(React.forwardRef<HTMLDivElement, BoxProps<"div", BackgroundPhotoUIProps>>(({ className, ...rest }, ref) => (
  <Box
    className={className + " background-photo"}
    ref={ref}
    data-testid="background-photo"
    {...rest}
  />
)))(({theme}) => ({
  '&': {
    'background': 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.96)), url(' + ForestBackgroundImg + ')',
    'backgroundSize': 'cover'
  }
}))

export default BackgroundPhoto;
