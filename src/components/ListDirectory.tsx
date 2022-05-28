import React from 'react';
import Paper from '@mui/material/Paper';
import ListDirectoryHeader from './ListDirectoryHeader'
import ListDirectoryContent from './ListDirectoryContent'
import FileView from './FileView';
import axios from 'axios';
const sorting = (a: any, b: any) => {
  if (a.type !== b.type) {
    return a.type === "tree" ? -1 : 1;
  }
  const isDotFileA = a.filename[0] === '.';
  const isDotFileB = b.filename[0] === '.';
  if (isDotFileA !== isDotFileB) {
    return isDotFileA ? -1 : 1;
  }
  const isStartWithUpperCaseA = /^[A-Z]/.test(a.filename);
  const isStartWithUpperCaseB = /^[A-Z]/.test(b.filename);
  if (isStartWithUpperCaseA !== isStartWithUpperCaseB) {
    return isStartWithUpperCaseA ? -1 : 1;
  }

  return a.filename < b.filename ? -1 : 1;
}
const ListDirectory = (props: any) => {
  const {
    path,
    type
  } = props;

  const [ trees, setTree ] = React.useState([]);
  const [ showReadme, setShowReadme ] = React.useState(false);
  const [ readmeContent, setReadmeContent ] = React.useState("");

  React.useEffect(() => {
    if (type === "blob") {
      return;
    }
    let mounted = true;
    axios({
      method: "get",
      url: '/tree' + path.split('/').map((p: string) => encodeURIComponent(p)).join('/'),
      baseURL: "/api"
    })
      .then(({ data }) => {
        if (mounted) {
          data.sort(sorting)
          setTree(data)
          const containReadme = data
            .find((file: any) => file.filename === 'README.md') !== undefined;
          setShowReadme(containReadme);
        }
      })
    return () => {
      mounted = false;
    }
  }, [
    path
  ])

  React.useEffect(() => {
    if (showReadme === false) {
      return;
    }
    let mounted = true;
    axios({
      method: "get",
      url: '/blob' + path + '/README.md',
      baseURL: "/api"
    })
      .then(({ data }) => {
        if (mounted) {
          setReadmeContent(data)
        }
      })
    return () => {
      mounted = false;
    }
  }, [
    showReadme
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
          path={path}
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
      />
    </>
  )
}

export default ListDirectory;
