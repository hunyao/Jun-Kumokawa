import React from 'react';
import Box from '@mui/material/Box';
import FileNavigation from '../../../components/FileNavigation';
import ListDirectory from '../../../components/ListDirectory';
import { useParams } from "react-router-dom";
import FileView from '../../../components/FileView';
import Moo from '../../../components/Moo'
import useCurrentBranch from '../../../hooks/useCurrentBranch'
import useTree from '../../../hooks/useTree'
import useTreeReadme from '../../../hooks/useTreeReadme'
import Loading from '../../../components/Loading'

const Tree = (props: any) => {
  const params = useParams();
  const [ sha, setSha ] = React.useState('');
  const [ trees, treesError, treeLoading ] = useTree(sha);
  const [ readmeContent, readmeContentError, readmeContentLoading ] = useTreeReadme(sha);
  const [ , currentBranchSha ] = useCurrentBranch();

  const {
    mode = 'navigation'
  } = props;

  React.useEffect(() => {
    if (params.sha === undefined) {
      setSha(currentBranchSha)
    } else {
      setSha(params.sha)
    }
  }, [
    currentBranchSha,
    params
  ])

  if (treesError || readmeContentError) {
    return <Moo />
  }

  return (
    <Loading loading={treeLoading}>
      <Box>
        <FileNavigation
          mode={mode}
          sha={sha}
        />
        <ListDirectory
          type="tree"
          sha={sha}
          trees={trees}
        />
        <FileView
          filename="README.md"
          content={readmeContent || ""}
          binary={false}
          image={false}
          mode="readme"
          sx={{
            display: readmeContent !== '' ? 'inherit' : 'none'
          }}
          loading={readmeContentLoading}
        />
      </Box>
    </Loading>
  )
}

export default Tree;
