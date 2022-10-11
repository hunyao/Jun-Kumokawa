import React from 'react';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = (props: any) => {
  const {
    children,
    loading
  } = props;

  if (loading) {
    return <Grid
      container
      justifyContent="center"
      p={2}
    >
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  } else {
    return children;
  }

}

export default Loading;
