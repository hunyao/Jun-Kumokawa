import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Sidebar from '../../components/Sidebar';
import FileNavigation from '../../components/FileNavigation';
import ListDirectory from '../../components/ListDirectory';

import { repositoryContext } from '../../contexts/repository';

const Overview = () => {
  const {
    selectedBranch: {
      commit: {
        sha
      }
    }
  } = React.useContext(repositoryContext)

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
            <FileNavigation
              mode="overview"
            />
            <ListDirectory
              type="tree"
              sha={sha}
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
