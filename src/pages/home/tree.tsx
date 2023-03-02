import React from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import { BoxProps } from '@mui/material/Box';
import FileNavigation from '../../components/FileNavigation';
import ListDirectory from '../../components/ListDirectory';
import { useParams } from "react-router-dom";
import FileView from '../../components/FileView';
import Moo from '../../components/Moo'
import useCurrentBranch from '../../hooks/useCurrentBranch'
import useTree from '../../hooks/useTree'
import useTreeReadme from '../../hooks/useTreeReadme'
import Loading from '../../components/Loading'
import { repositoryContext } from '../../contexts/repository';
import SyazaiKaikenImage from '../../assets/images/syazai_kaiken.png'

interface TreeProps {
  mode?: 'navigation' | 'overview'
}
const Tree: React.FC<BoxProps<'div', TreeProps>> = (props) => {
  const params = useParams();
  const [ sha, setSha ] = React.useState<string>('');
  const [ trees, treesError, treeLoading ] = useTree(sha);
  const [ readmeContent, readmeContentError, readmeContentLoading ] = useTreeReadme(sha);
  const [ , currentBranchSha ] = useCurrentBranch();
  const { limited, rateLimitResetTime } = React.useContext(repositoryContext);

  const {
    mode = 'navigation',
    ...rest
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

  if (limited) {
    return <Box
      sx={props.sx}
    >
      <Box
        sx={{
          borderRadius: '6px',
          border: '1px solid rgba(248,81,73,0.4)',
          background: 'rgba(248,81,73,0.15)',
          padding: 2,
          margin: 2
        }}
      >
        We apologize for the inconvenience. Currently, Github's API limit is applied. It will be recovered {moment(rateLimitResetTime*1000).fromNow()}
      </Box>
      <Box
        sx={{
          textAlign: 'center'
        }}
      >
        <Box
          component="img"
          src={SyazaiKaikenImage}
          sx={{
            maxWidth: '400px',
            width: '100%'
          }}
        />
      </Box>
    </Box>
  }
  if (treesError || readmeContentError) {
    return <Moo sx={{
      ...props.sx,
      alignItems: 'initial'
    }} />
  }
  return (
    <Loading loading={treeLoading}>
      <Box
        data-testid="page-tree"
        {...rest}
      >
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
