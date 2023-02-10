import React from 'react';
import Box from '@mui/material/Box';
import FileNavigation from '../../../components/FileNavigation';
import ListDirectory from '../../../components/ListDirectory';
import FileView from '../../../components/FileView';
import { useParams } from "react-router-dom";
import { OctokitInstance } from '../../../plugins/Octokit';
import { fromBlob, FileTypeResult } from 'file-type/browser';
import Moo from '../../../components/Moo';
import useShaToPath from '../../../hooks/useShaToPath'

const BlobPage = () => {
  const [ content, setContent ] = React.useState<string>("");
  const [ isBinary, setIsBinary ] = React.useState<boolean>(false);
  const [ isImage, setIsImage ] = React.useState<boolean>(false);
  const [ filename, setFilename ] = React.useState<string>("");
  const [ mime, setMime ] = React.useState<string>("");
  const [ loading, setLoading ] = React.useState<boolean>(true);
  const [ error, setError ] = React.useState<boolean>(false);
  const { sha = '' } = useParams();
  const getPathFromSha = useShaToPath();

  React.useEffect(() => {
    const [ path, err ] = getPathFromSha(sha)
    if (err) {
      setError(true);
    } else {
      setFilename(path)
    }
  }, [
    getPathFromSha,
    sha
  ])

  React.useEffect(() => {
    let mounted = true;
    if (error) {
      return;
    }
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
    .then((res: FileTypeResult | undefined) => {
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
    sha,
    error
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
