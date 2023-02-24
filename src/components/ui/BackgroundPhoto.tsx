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
    'background': 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(' + ForestBackgroundImg + ')',
    'backgroundSize': 'cover',
    'height': 200,
    [theme.breakpoints.down('laptop')]: {
      'height': 100
    },
    [theme.breakpoints.down('tablet')]: {
      'display': 'none'
    }
  }
}))

export default BackgroundPhoto;
