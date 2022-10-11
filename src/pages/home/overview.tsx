import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tree from './tree'
import Sidebar from '../../components/Sidebar';

const Overview = () => {
  return (
    <>
      <Box>
        <Grid
          container
          gap={3}
          flexWrap="nowrap"
          flexDirection={{
            xs: 'column-reverse',
            md: 'row',
          }}
        >
          <Grid item md={9} xs={12}>
            <Tree
              mode="overview"
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Sidebar />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Overview;
