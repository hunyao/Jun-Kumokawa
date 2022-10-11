import React from 'react';
import Paper from '@mui/material/Paper';
import ListDirectoryHeader from './ListDirectoryHeader'
import ListDirectoryContent from './ListDirectoryContent'

const ListDirectory = (props: any) => {
  const {
    type,
    sha,
    trees
  } = props;

  return (
    <>
      <span id="files" />
      <Paper
        variant="outlined"
        sx={{
          margin: '1rem 0',
          color: 'inherit'
        }}
      >
        <ListDirectoryHeader />
        <ListDirectoryContent
          sha={sha}
          trees={trees}
          type={type}
        />
      </Paper>
    </>
  )
}

export default ListDirectory;
