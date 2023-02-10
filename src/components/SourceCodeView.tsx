import React from 'react';
import Highlightjs from 'highlight.js';
import Box from '@mui/material/Box';
import GithubLink from './ui/GithubLink'
import SourceCodeViewLine from './ui/SourceCodeViewLine'
import SourceCodeViewLineNum from './ui/SourceCodeViewLineNum'

interface SourceCodeViewProps {
  extension: string,
  content: string,
  binary: boolean,
  image: boolean,
  mime: string,
  filename: string
}
const SourceCodeView: React.FC<SourceCodeViewProps> = (props) => {
  const {
    extension,
    content,
    binary,
    image,
    mime,
    filename
  } = props;

  const RenderDom = React.useMemo(() => {
    if (binary && !image) {
      return <Box display="flex" justifyContent="center">
        <Box p={2}>
          <GithubLink
            href={`data:${mime};base64,${btoa(content)}`}
            className="active"
            download={filename}
          >
            View raw
          </GithubLink>
        </Box>
      </Box>
    } else if (binary && image) {
      return <Box
        component="img"
        src={`data:${mime};base64,${btoa(content)}`}
        p={2}
      />
    } else {
      const supportedLanguage = Highlightjs.getLanguage(extension) !== undefined;
      return <table>
        <tbody>
        {content.split("\n").map((line: string, index: number) => {
          return <tr key={index}>
            <SourceCodeViewLineNum
              data-line-number={index+1}
            />
            <SourceCodeViewLine
              dangerouslySetInnerHTML={{
                __html: supportedLanguage ? Highlightjs.highlight(line, {
                  language: extension
                }).value : line
              }}
            />
          </tr>
        })}
        </tbody>
      </table>
    }
  }, [
    content,
    binary,
    image,
    extension,
    mime,
    filename
  ])

  return (
    <>
      {RenderDom}
    </>
  )
}

export default SourceCodeView;
