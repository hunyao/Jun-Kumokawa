import React from 'react';
import { styled } from '@mui/material/styles';

interface MarkdownPaperUIProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}
const MarkdownPaper = styled(React.forwardRef<HTMLDivElement, MarkdownPaperUIProps>(({ className, ...rest }, ref) => (
  <div className={className + " markdown-paper"} ref={ref} {...rest} />
)))`
& {
  line-height: 1.5;
  font-size: 16px;
}
& h1 {
  padding-bottom: .3em;
  font-size: 2em;
  border-bottom: 1px solid #21262d;
}
& h2 {
  padding-bottom: .3em;
  font-size: 1.5em;
  border-bottom: 1px solid #21262d;
}
`

export default MarkdownPaper;
