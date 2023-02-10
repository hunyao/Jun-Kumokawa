import React from 'react';
import Grid from '@mui/material/Grid';

const moo = '                 (__) \n                 (oo) \n           /------\\/ \n          / |    ||   \n         *  /\\---/\\ \n            ~~   ~~   \n..."How may I help you sir?"...\n'

const Moo = () => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      p={3}
      sx={{
        whiteSpace: 'pre',
      }}
    >
      {moo}
    </Grid>
  )
}

export default Moo
