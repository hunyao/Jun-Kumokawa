import React from 'react';
import Highlightjs from 'highlight.js';
import Box from '@mui/material/Box';
import GithubLink from './ui/GithubLink'
import SourceCodeViewLine from './ui/SourceCodeViewLine'
import SourceCodeViewLineNum from './ui/SourceCodeViewLineNum'
import { useLocation } from "react-router-dom";

const SourceCodeView = (props: any) => {
  const {
    extention,
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
      const supportedLangeage = Highlightjs.getLanguage(extention) !== undefined;
      return <table>
        <tbody>
        {content.split("\n").map((line: string, index: number) => {
          return <tr key={index}>
            <SourceCodeViewLineNum
              data-line-number={index+1}
            />
            <SourceCodeViewLine
              dangerouslySetInnerHTML={{
                __html: supportedLangeage ? Highlightjs.highlight(line, {
                  language: extention
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
    extention,
    mime
  ])

  return (
    <>
      {RenderDom}
    </>
  )
}

export default SourceCodeView;
