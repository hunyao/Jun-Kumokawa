import React from 'react';
import Highlightjs from 'highlight.js';
import Box from '@mui/material/Box';
import GithubLink from './ui/GithubLink'
import SourceCodeViewLine from './ui/SourceCodeViewLine'
import SourceCodeViewLineNum from './ui/SourceCodeViewLineNum'
import { useNavigate, useLocation } from "react-router-dom";

const SourceCodeView = (props: any) => {
  const {
    extention,
    content,
    binary,
    image
  } = props;
  const location = useLocation();
  const { pathname } = location;

  console.log(props);

  const RenderDom = React.useMemo(() => {
    if (binary && !image) {
      return <Box display="flex" justifyContent="center">
        <Box p={2}>
          <GithubLink href={'/api/' + pathname} className="active">
            View raw
          </GithubLink>
        </Box>
      </Box>
    } else if ((binary && image) || (!binary && extention === 'svg')) {
      return <Box
        component="img"
        src={'/api' + pathname}
        p={2}
      />
    } else {
      const supportedLangeage = Highlightjs.getLanguage(extention) !== undefined;
      return <table>
        {content.split("\n").map((line: string, index: number) => {
          return <tr>
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
      </table>
    }
  }, [
    content,
    binary,
    image
  ])

  return (
    <>
      {RenderDom}
    </>
  )
}

export default SourceCodeView;
