import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import GithubLink from './ui/GithubLink'
import ListFilesItemRow from './ui/ListFilesItemRow'
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { repositoryContext } from '../contexts/repository';

import { OctokitInstance } from './../plugins/Octokit';

const ListDirectoryContent = (props: any) => {
  const [ root, setRoot ] = React.useState(true);
  const [ treeForDisplaies, setTreeForDisplaies ] = React.useState([]);
  const [ previousSha, setPreviousSha ] = React.useState('');
  const {
    sha,
    trees,
    type
  } = props;
  const navigate = useNavigate();

  const {
    allTrees,
    getPathFromSha,
    selectedBranch: {
      commit: {
        sha: commitSha
      }
    }
  } = React.useContext(repositoryContext);

  React.useEffect(() => {
    if (allTrees.length === 0 || sha === "") {
      return;
    }
    setRoot(allTrees.sha === sha);
    if (allTrees.sha === sha) {
      return;
    }
    const path = getPathFromSha(sha);
    if (!path.includes('/')) {
      setPreviousSha(commitSha);
    } else {
      setPreviousSha(allTrees.tree.find((t: any) => {
        const parentPath = path.split('/');
        parentPath.pop();
        return t.path === parentPath.join('/')
      }).sha)
    }
  }, [
    allTrees,
    sha,
    commitSha,
    getPathFromSha
  ])

  React.useEffect(() => {
    if (allTrees.length === 0) {
      return;
    }
    Promise.all(trees.map(async (tree: any) => {
      return {
        tree,
        commit: await OctokitInstance.request('GET /repos/{owner}/{repo}/commits?path={path}&sha={sha}&per_page=1', {
          owner: process.env.REACT_APP_REPOSITORY_OWNER as string,
          repo: process.env.REACT_APP_REPOSITORY_NAME as string,
          path: '/' + allTrees.tree.find((allTree: any) => allTree.sha === tree.sha).path,
          sha: commitSha
        })
      }
    }))
    .then((responses: any) => {
      return responses.map((response: any) => {
        return {
          subject: response.commit.data[0].commit.message,
          committerDate: response.commit.data[0].commit.committer.date,
          fileType: response.tree.type,
          path: response.tree.path,
          sha: response.tree.sha
        }
      })
    })
    .then(setTreeForDisplaies)
  }, [
    trees,
    allTrees,
    commitSha
  ])

  if (type !== 'tree') return null;

  return (
    <>
      <Grid
        container
        flexDirection="column"
      >
        <ListFilesItemRow
          container
          sx={{
            display: root ? "none !important" : "inherit"
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

          const icon = fileType === 'blob' ? InsertDriveFileOutlinedIcon : FolderIcon;
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
                component={icon}
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
    </>
  )
}

export default ListDirectoryContent;
