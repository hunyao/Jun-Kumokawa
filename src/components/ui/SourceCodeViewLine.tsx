import { styled } from '@mui/material/styles';

const SourceCodeViewLine = styled('td')`
&:before {
  content: attr(data-line-number);
}
& {
  overflow: visible;
  font-size: 12px;
  color: #c9d1d9;
  word-wrap: normal;
  white-space: pre;

  position: relative;
  padding-right: 10px;
  padding-left: 10px;
  line-height: 20px;
  vertical-align: top;
}
`

export default SourceCodeViewLine;
