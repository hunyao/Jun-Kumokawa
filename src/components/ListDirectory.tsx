import React from 'react';
import Paper from '@mui/material/Paper';
import ListDirectoryHeader from './ListDirectoryHeader'
import ListDirectoryContent from './ListDirectoryContent'
import FileView from './FileView';
import { OctokitInstance } from './../plugins/Octokit';
import { repositoryContext } from '../contexts/repository';

const sorting = (a: any, b: any) => {
  if (a.type !== b.type) {
    return a.type === "tree" ? -1 : 1;
  }
  const isDotFileA = a.path[0] === '.';
  const isDotFileB = b.path[0] === '.';
  if (isDotFileA !== isDotFileB) {
    return isDotFileA ? -1 : 1;
  }
  const isStartWithUpperCaseA = /^[A-Z]/.test(a.path);
  const isStartWithUpperCaseB = /^[A-Z]/.test(b.path);
  if (isStartWithUpperCaseA !== isStartWithUpperCaseB) {
    return isStartWithUpperCaseA ? -1 : 1;
  }

  return a.path < b.path ? -1 : 1;
}
const ListDirectory = (props: any) => {
  const {
    type,
    sha
  } = props;

  const {
    getShafromPath
  } = React.useContext(repositoryContext)

  const [ trees, setTree ] = React.useState([]);
  const [ showReadme, setShowReadme ] = React.useState(false);
  const [ readmeContent, setReadmeContent ] = React.useState("");
  const [ loading, setLoading ] = React.useState(true);

  React.useEffect(() => {
    if (type === "blob") {
      return;
    }
    if (sha === '') {
      return;
    }
    let mounted = true;
    OctokitInstance.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}', {
      owner: process.env.REACT_APP_REPOSITORY_OWNER as string,
      repo: process.env.REACT_APP_REPOSITORY_NAME as string,
      tree_sha: sha
    })
    .then(({ data }) => {
      if (mounted) {
        data.tree.sort(sorting)
        setTree(data.tree as any)
        const containReadme = data.tree
        .find((file: any) => file.path === 'README.md') !== undefined;
        setShowReadme(containReadme);
      }
    })
    return () => {
      mounted = false;
    }
  }, [
    sha,
    type
  ])

  React.useEffect(() => {
    if (showReadme === false) {
      return;
    }
    let mounted = true;
    const sha = getShafromPath('README.md');
    if (sha === undefined) {
      return;
    }
    OctokitInstance.request('GET /repos/{owner}/{repo}/git/blobs/{file_sha}', {
      owner: process.env.REACT_APP_REPOSITORY_OWNER as string,
      repo: process.env.REACT_APP_REPOSITORY_NAME as string,
      file_sha: sha as string
    })
    .then(({ data }) => {
      if (mounted) {
        setReadmeContent(atob(data.content))
      }
    })
    .then(() => setLoading(false))
    return () => {
      mounted = false;
    }
  }, [
    showReadme,
    getShafromPath
  ])

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
      <FileView
        filename="README.md"
        content={readmeContent}
        binary={false}
        image={false}
        mode="readme"
        sx={{
          display: showReadme ? 'inherit' : 'none'
        }}
        loading={loading}
      />
    </>
  )
}

export default ListDirectory;
