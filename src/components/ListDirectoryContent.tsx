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
import { GithubGetTreeResponseType, GithubListCommitsResponseType, Unpacked } from '../contexts/repository';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type ListDirectoryTreeType = {
  subject: string,
  committerDate: string,
  fileType: string,
  path: string,
  sha: string
}
interface ListDirectoryContentProps {
  sha: string | undefined,
  trees: GithubGetTreeResponseType['tree'],
  type: "tree" | "blob"
}
const ListDirectoryContent: React.FC<ListDirectoryContentProps> = (props) => {
  const [ treeForDisplays, setTreeForDisplays ] = React.useState<Array<ListDirectoryTreeType>>([]);
  const [ loading, setLoading ] = React.useState<boolean>(true);
  const [ show, setShow ] = React.useState<boolean>(false);
  const [ , currentBranchSha ] = useCurrentBranch();
  const getPathFromSha = useShaToPath();
  const {
    sha,
    trees,
    type
  } = props;
  const [ previousSha, isRootSha ] = usePreviousSha(sha);
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('laptop'));

  React.useEffect(() => {
    let mounted = true;
    setLoading(true)
    Promise
      .all(trees.map(async (tree) => {
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
      .then((responses) => {
        if (!mounted) return [];
        return responses.map(({ commit, tree }: { commit: { data: Array<GithubListCommitsResponseType> }, tree: Unpacked<GithubGetTreeResponseType['tree']> }) => {
          return {
            subject: commit.data[0]?.commit?.message || '' as string,
            committerDate: commit.data[0]?.commit?.committer?.date || '' as string,
            fileType: tree.type as string,
            path: tree.path as string,
            sha: tree.sha as string
          }
        })
      })
      .then((response) => {
        if (!mounted) return;
        setTreeForDisplays(response)
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      })
    return () => {
      mounted = false;
    }
  }, [
    trees,
    currentBranchSha,
    getPathFromSha
  ])

  const fileTypeIcon = React.useCallback((fileType: string) => {
    if (fileType === 'blob') {
      return InsertDriveFileOutlinedIcon
    } else if (fileType === 'tree') {
      return FolderIcon
    } else {
      throw Error('The fileType ' + fileType + ' is unavailable')
    }
  }, [])

  if (type !== 'tree') return null;

  return (
    <Loading loading={loading}>
      <Grid
        container
        flexDirection="column"
        data-testid="list-directory-content"
      >
        <ListFilesItemRow
          display={matches && !show ? '': 'none'}
        >
          <GithubLink
            className="active"
            sx={{
              margin: '0 auto'
            }}
            onClick={() => setShow(true)}
          >
            View code
          </GithubLink>
        </ListFilesItemRow>
        <ListFilesItemRow
          container
          data-testid="list-directory-content-root-item"
          display={((matches && show) || (!matches && !show)) && !isRootSha ? '': 'none'}
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
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                navigate('/tree/' + previousSha)
              }}
              data-testid="list-directory-content-root-item-link"
            >
              <Box
                component="span"
                display="inline-block"
              >
                ..
              </Box>
            </GithubLink>
          </Grid>
        </ListFilesItemRow>
        {treeForDisplays.map((tree, index) => {
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
            <ListFilesItemRow
              key={index}
              data-testid={"list-files-item-row-" + index}
              display={!matches || show ? '': 'none'}
            >
              <Grid
                item
                className={"file_icon icon-type-" + fileType}
                component={fileTypeIcon(fileType)}
                data-testid={"list-files-item-row-icon-" + index}
              />
              <Grid
                item
                xs={12}
                laptop={3}
              >
                <GithubLink
                  href={"#"}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    navigate('/' + href)
                  }}
                  data-testid={"list-files-item-row-link-" + index}
                >
                  {path}
                </GithubLink>
              </Grid>
              <Grid
                item
                xs={8}
                className="commit-message"
                data-testid={"list-files-item-row-subject-" + index}
                display={{xs: 'none', laptop: 'inherit'}}
              >
                <GithubLink href="#">
                  {subject}
                </GithubLink>
              </Grid>
              <Grid
                item
                className="committed-time"
                data-testid={"list-files-item-row-date-" + index}
              >
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
