import React from 'react';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingProps {
  loading: boolean
}
const Loading: React.FC<LoadingProps> = (props) => {
  const {
    children,
    loading
  } = props;

  if (loading) {
    return <Grid
      container
      justifyContent="center"
      p={2}
      flexDirection="column"
    >
      <Grid item textAlign="center">
        <CircularProgress
          data-testid="loading-circular-progress"
        />
      </Grid>
      <Grid item textAlign="center">
        Loading....
      </Grid>
    </Grid>
  } else {
    return <>{children}</>
  }

}

export default Loading;
