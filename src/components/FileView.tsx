import React from 'react';
import Box from '@mui/material/Box';
import ListIcon from '@mui/icons-material/List';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import MarkdownView from './MarkdownView';
import SourceCodeView from './SourceCodeView';
import FileViewToolbar from './ui/FileViewToolbar'
import GithubLink from './ui/GithubLink'
import mimeTypes from "mime-types";
import Loading from './Loading'

const FileView = (props: any) => {
  const {
    filename,
    content,
    mode,
    binary,
    image,
    mime,
    sx = {},
    loading
  } = props;

  const RenderDom = React.useMemo(() => {
    if (filename === undefined) {
      return;
    }
    const extention = filename.split(".").pop()
    if (mode === "readme" || extention === 'md') {
      return <MarkdownView text={content} />
    } else if (mode === "sourceCode") {
      return <SourceCodeView
        content={content}
        extention={extention}
        binary={binary}
        image={image}
        mime={mime === undefined || mime === "" ? mimeTypes.contentType(filename) : mime}
        filename={filename.split('/').pop()}
      />
    } else {}
  }, [
    mode,
    content,
    binary,
    image,
    mime,
    filename,
  ])

  return (
    <>
      <span id="contentView" />
      <Paper
        variant="outlined"
        sx={{
          margin: '1rem 0',
          color: 'inherit',
          ...sx
        }}
      >
        <FileViewToolbar>
          <IconButton>
            <ListIcon />
          </IconButton>
          <GithubLink href="#contentView">{filename}</GithubLink>
        </FileViewToolbar>
        <Box
          sx={{
            overflow: 'auto'
          }}
        >
          <Loading loading={loading}>
            {RenderDom}
          </Loading>
        </Box>
      </Paper>
    </>
  )
}

export default FileView;
