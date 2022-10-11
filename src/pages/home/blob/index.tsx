import React from 'react';
import Box from '@mui/material/Box';
import FileNavigation from '../../../components/FileNavigation';
import ListDirectory from '../../../components/ListDirectory';
import FileView from '../../../components/FileView';
import { useParams } from "react-router-dom";
import { OctokitInstance } from '../../../plugins/Octokit';
import { fromBlob } from 'file-type/browser';
import Moo from '../../../components/Moo';
import useShaToPath from '../../../hooks/useShaToPath'

const BlobPage = () => {
  const [ content, setContent ] = React.useState("");
  const [ isBinary, setIsBinary ] = React.useState(false);
  const [ isImage, setIsImage ] = React.useState(false);
  const [ filename, setFilename ] = React.useState("");
  const [ mime, setMime ] = React.useState("");
  const [ loading, setLoading ] = React.useState(true);
  const [ error, setError ] = React.useState(false);
  const { sha = '' } = useParams();
  const getPathFromSha = useShaToPath();

  React.useEffect(() => {
    const [ path ] = getPathFromSha(sha)
    setFilename(path)
  }, [
    getPathFromSha,
    sha
  ])

  React.useEffect(() => {
    let mounted = true;
    OctokitInstance.request('GET /repos/{owner}/{repo}/git/blobs/{file_sha}', {
      owner: process.env.REACT_APP_REPOSITORY_OWNER as string,
      repo: process.env.REACT_APP_REPOSITORY_NAME as string,
      file_sha: sha
    })
    .then(({ data }) => {
      if (mounted) {
        setContent(atob(data.content));
        return fetch("data:image/png;base64," + data.content)
        .then(fetched => {
          return fetched.blob()
        }).then(fetched => {
          return fromBlob(fetched)
        })
      }
    })
    .then((res: any) => {
      if (mounted) {
        if (res === undefined) {
          setIsBinary(false);
          setIsImage(false);
          setMime('text/plain')
        } else {
          setIsBinary(true)
          setIsImage(/^image\//.test(res.mime))
          setMime(res.mime)
        }
      }
    })
    .catch(err => {
      setError(true)
    })
    .finally(() => setLoading(false))

    return () => {
      mounted = false;
    }
  }, [
    sha
  ])

  if (error) {
    return <Moo />
  }

  return (
    <>
      <Box>
        <FileNavigation
          mode="navigation"
          sha={sha}
        />
        <ListDirectory
          type="blob"
          sha={sha}
          trees={[]}
        />
        <FileView
          filename={filename}
          content={content}
          binary={isBinary}
          image={isImage}
          mime={mime}
          mode="sourceCode"
          loading={loading}
        />
      </Box>
    </>
  )
}

export default BlobPage;
