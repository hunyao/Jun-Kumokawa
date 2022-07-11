import React from 'react';
import Box from '@mui/material/Box';
import FileNavigation from '../../../components/FileNavigation';
import ListDirectory from '../../../components/ListDirectory';
import FileView from '../../../components/FileView';
import { useParams } from "react-router-dom";
import { OctokitInstance } from '../../../plugins/Octokit';
import { fromBlob } from 'file-type/browser';
import { repositoryContext } from '../../../contexts/repository';

const BlobPage = () => {
  const [ content, setContent ] = React.useState("");
  const [ isBinary, setIsBinary ] = React.useState(false);
  const [ isImage, setIsImage ] = React.useState(false);
  const [ filename, setFilename ] = React.useState("");
  const [ mime, setMime ] = React.useState("");
  const [ loading, setLoading ] = React.useState(true);
  const { sha } = useParams();

  const {
    getPathFromSha
  } = React.useContext(repositoryContext)

  React.useEffect(() => {
    setFilename(getPathFromSha(sha))
  }, [
    getPathFromSha,
    sha
  ])

  React.useEffect(() => {
    let mounted = true;
    OctokitInstance.request('GET /repos/{owner}/{repo}/git/blobs/{file_sha}', {
      owner: process.env.REACT_APP_REPOSITORY_OWNER as string,
      repo: process.env.REACT_APP_REPOSITORY_NAME as string,
      file_sha: sha as string
    })
    .then(({ data }) => {
      if (mounted) {
        setContent(atob(data.content));
        const blob = new Blob([atob(data.content)]);
        return fromBlob(blob)
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
    .then(() => setLoading(false))

    return () => {
      mounted = false;
    }
  }, [
    sha
  ])

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
