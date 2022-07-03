import React from 'react';
import Box from '@mui/material/Box';
import FileNavigation from '../../../components/FileNavigation';
import ListDirectory from '../../../components/ListDirectory';
import { useLocation, useParams } from "react-router-dom";
import { repositoryContext } from '../../../contexts/repository';

const Tree = () => {
  const location = useLocation();
  const { pathname } = location;
  const params = useParams();
  const [ sha, setSha ] = React.useState('');

  const {
    selectedBranch: {
      commit: {
        sha: commitSha
      }
    }
  } = React.useContext(repositoryContext)

  React.useEffect(() => {
    if (params.sha === undefined) {
      setSha(commitSha)
    } else {
      setSha(params.sha)
    }
  }, [
    commitSha,
    params
  ])

  return (
    <>
      <Box>
        <FileNavigation
          mode="navigation"
          sha={sha}
        />
        <ListDirectory
          type="tree"
          sha={sha}
        />
      </Box>
    </>
  )
}

export default Tree;
