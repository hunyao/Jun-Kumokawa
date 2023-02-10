import React from 'react';
import Paper from '@mui/material/Paper';
import ListDirectoryHeader from './ListDirectoryHeader'
import ListDirectoryContent from './ListDirectoryContent'
import { GithubGetTreeResponseType } from '../contexts/repository';

interface ListDirectoryProps {
  type: 'tree' | 'blob',
  sha: string,
  trees: GithubGetTreeResponseType['tree']
}
const ListDirectory: React.FC<ListDirectoryProps> = (props) => {
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
