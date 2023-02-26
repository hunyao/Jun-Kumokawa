import React from 'react';
import Box from '@mui/material/Box';
import ListIcon from '@mui/icons-material/List';
import IconButton from '@mui/material/IconButton';
import MarkdownView from './MarkdownView';
import SourceCodeView from './SourceCodeView';
import FileViewToolbar from './ui/FileViewToolbar'
import FileViewWrapper from './ui/FileViewWrapper'
import mimeTypes from "mime-types";
import Loading from './Loading';
import { SxProps } from '@mui/system';

interface FileViewProps {
  filename: string,
  content: string,
  mode: "sourceCode" | "readme",
  binary: boolean,
  image: boolean,
  mime?: string,
  sx?: SxProps,
  loading: boolean
}
const FileView: React.FC<FileViewProps> = (props) => {
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
    const extension = filename.split(".").pop() as string
    if (mode === "readme" || extension === 'md') {
      return <MarkdownView text={content} />
    } else if (mode === "sourceCode") {
      return <SourceCodeView
        content={content}
        extension={extension}
        binary={binary}
        image={image}
        mime={mime === undefined || mime === "" ? mimeTypes.contentType(filename) as string : mime}
        filename={filename.split('/').pop() as string}
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
      <FileViewWrapper sx={sx}>
        <FileViewToolbar>
          <IconButton>
            <ListIcon />
          </IconButton>
          {filename.split('/').pop()}
        </FileViewToolbar>
        <Box
          sx={{
            overflow: 'auto'
          }}
          data-testid="file-view-content"
        >
          <Loading loading={loading}>
            {RenderDom}
          </Loading>
        </Box>
      </FileViewWrapper>
    </>
  )
}

export default FileView;
