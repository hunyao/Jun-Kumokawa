import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import GithubLink from './ui/GithubLink'
import ListFilesItemRow from './ui/ListFilesItemRow'
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { OctokitInstance } from './../plugins/Octokit';
import useShaToPath from '../hooks/useShaToPath'
import useCurrentBranch from '../hooks/useCurrentBranch'
import usePreviousSha from '../hooks/usePreviousSha'
import Loading from './Loading'

const ListDirectoryContent = (props: any) => {
  const [ treeForDisplaies, setTreeForDisplaies ] = React.useState([]);
  const [ loading, setLoading ] = React.useState(true);
  const [ , currentBranchSha ] = useCurrentBranch();
  const getPathFromSha = useShaToPath();
  const {
    sha,
    trees,
    type
  } = props;
  const [ previousSha, isRootSha ] = usePreviousSha(sha);
  const navigate = useNavigate();

  React.useEffect(() => {
    Promise.all(trees.map(async (tree: any) => {
      return {
        tree,
        commit: await OctokitInstance.request('GET /repos/{owner}/{repo}/commits?path={path}&sha={sha}&per_page=1', {
          owner: process.env.REACT_APP_REPOSITORY_OWNER as string,
          repo: process.env.REACT_APP_REPOSITORY_NAME as string,
          path: '/' + getPathFromSha(tree.sha)[0],
          sha: currentBranchSha
        })
      }
    }))
    .then((responses: any) => {
      return responses.map((response: any) => {
        return {
          subject: response.commit.data[0]?.commit?.message || '',
          committerDate: response.commit.data[0]?.commit?.committer?.date || '',
          fileType: response.tree.type,
          path: response.tree.path,
          sha: response.tree.sha
        }
      })
    })
    .then(setTreeForDisplaies)
    .finally(() => setLoading(false))
  }, [
    trees,
    currentBranchSha,
    getPathFromSha
  ])

  const fileTypeIcon: any = React.useCallback((fileType: string) => {
    if (fileType === 'blob') {
      return InsertDriveFileOutlinedIcon
    } else if (fileType === 'tree') {
      return FolderIcon
    } else {
      return <></>
    }
  }, [])

  if (type !== 'tree') return null;

  return (
    <Loading loading={loading}>
      <Grid
        container
        flexDirection="column"
      >
        <ListFilesItemRow
          container
          sx={{
            display: isRootSha ? "none !important" : "inherit"
          }}
        >
          <Grid item flex="none">
            <GithubLink
              href="#"
              className="active"
              sx={{
                minWidth: 16,
                fontSize: 14,
                fontWeight: 600,
                textAlign: 'center'
              }}
              onClick={(e: any) => {
                e.preventDefault();
                navigate('/tree/' + previousSha)
              }}
            >
              <Box
                component="span"
                display="inline-block"
              >
                ..
              </Box>
            </GithubLink>
          </Grid>
          <Grid item flex={1}>
          </Grid>
        </ListFilesItemRow>
        {treeForDisplaies.map((tree: any, index: number) => {
          const {
            fileType,
            path,
            sha,
            subject,
            committerDate
          } = tree;
          if (['blob', 'tree'].includes(fileType) === false) {
            return null;
          }

          const href = [
            fileType,
            sha
          ]
            .filter((p: string) => p !== "")
            .join('/')

          return (
            <ListFilesItemRow key={index}>
              <Grid
                item
                className="file_icon"
                component={fileTypeIcon(fileType)}
              />
              <Grid item xs={3}>
                <GithubLink href={"#"} onClick={(e: any) => {
                  e.preventDefault();
                  navigate('/' + href)
                }}>
                  {path}
                </GithubLink>
              </Grid>
              <Grid item xs={8} className="commit-message">
                <GithubLink href="#">
                  {subject}
                </GithubLink>
              </Grid>
              <Grid item className="commited-time">
                {moment(committerDate).fromNow()}
              </Grid>
            </ListFilesItemRow>
          )
        })}
      </Grid>
    </Loading>
  )
}

export default ListDirectoryContent;
