import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Sidebar from '../../components/Sidebar';
import FileNavigation from '../../components/FileNavigation';
import ListDirectory from '../../components/ListDirectory';
import FileView from '../../components/FileView';
import Readme from '../../data/Readme';
import { tokenContext } from '../../contexts/token';
import { Octokit } from 'octokit'

import axios from 'axios';

const Overview = () => {
  const octokit = new Octokit({
    auth: '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'
  });
  const {
    state: {
      access_token,
      token_type
    }
  } = React.useContext(tokenContext);
  console.log(octokit)

  // React.useEffect(() => {
  //   axios({
  //     method: 'get',
  //     url: '/user',
  //     baseURL: 'https://api.github.com',
  //     headers: {
  //       Authorization: token_type + ' ' + access_token
  //     }
  //   })
  //   .then(({data}) => {
  //     console.log(data)
  //   });
  // }, [])

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
              path=""
              type="tree"
            />
            <FileView
              filename="README.md"
              content={Readme}
              binary={false}
              image={false}
              mode="readme"
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
