import React from 'react';
import Grid from '@mui/material/Grid';

const moo = '                 (__) \n                 (oo) \n           /------\\/ \n          / |    ||   \n         *  /\\---/\\ \n            ~~   ~~   \n..."Have you mooed today?"...\n'

const Moo = (props: any) => {
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
