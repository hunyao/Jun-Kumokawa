import React from 'react';
import Box from '@mui/material/Box';
import FileNavigation from '../../../components/FileNavigation';
import ListDirectory from '../../../components/ListDirectory';
import FileView from '../../../components/FileView';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

const BlobPage = () => {
  const location = useLocation();
  const { pathname } = location;
  const splited = pathname.split('/');
  const filename = splited.pop() as string;
  const [ content, setContent ] = React.useState("");
  const [ isBinary, setIsBinary ] = React.useState(false);
  const [ isImage, setIsImage ] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    axios({
      method: "get",
      url: pathname,
      baseURL: "/api",
      responseType: 'text',
      transitional: {
        silentJSONParsing: false,
        forcedJSONParsing: false,
        clarifyTimeoutError: false,
      }
    })
      .then(({ data, headers }) => {
        if (mounted) {
          setContent(data);
          setIsBinary(headers["x-file-type"].includes('binary'))
          setIsImage(/^image\//.test(headers["x-file-type"]))
        }
      })
    return () => {
      mounted = false;
    }
  }, [])

  return (
    <>
      <Box>
        <FileNavigation
          mode="navigation"
          path={decodeURIComponent(pathname).replace(/^\/blob/, '')}
        />
        <ListDirectory
          path={decodeURIComponent(pathname).replace(/^\/blob/, '')}
          type="blob"
        />
        <FileView
          filename={filename}
          content={content}
          binary={isBinary}
          image={isImage}
          mode="sourceCode"
        />
      </Box>
    </>
  )
}

export default BlobPage;
