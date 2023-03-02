import React from 'react';
import Grid from '@mui/material/Grid';
import {GridProps} from '@mui/material/Grid';

const moo = '                 (__) \n                 (oo) \n           /------\\/ \n          / |    ||   \n         *  /\\---/\\ \n            ~~   ~~   \n..."How may I help you sir?"...\n'

const Moo: React.FC<GridProps> = ({sx, ...rest}) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      p={3}
      sx={{
        whiteSpace: 'pre',
        ...sx
      }}
      data-testid="moo"
      {...rest}
    >
      {moo}
    </Grid>
  )
}

export default Moo
