import React from 'react';
import Box from '@mui/material/Box';
import Tree from './tree'
import About from '../../components/sidebar/About'
import LanguageSidebars from '../../components/sidebar/LanguageSidebars'

const Overview = () => {
  return (
    <Box
      data-testid="page-overview"
    >
      <Box
        display="grid"
        gap={3}
        sx={{
          gridTemplateColumns: {
            xs: '100%',
            laptop: '74% 24%'
          }
        }}
      >
        <Tree
          mode="overview"
          sx={{
            gridRowStart: {
              xs: 2,
              laptop: 1
            },
            gridRowEnd: {
              xs: 2,
              laptop: 5
            }
          }}
        />
        <About />
        <Box>
          <LanguageSidebars />
        </Box>
      </Box>
    </Box>
  )
}

export default Overview;
