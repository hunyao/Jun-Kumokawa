import { styled } from '@mui/material/styles';

const SourceCodeViewLineNum = styled('td')`
&:before {
  content: attr(data-line-number);
}
& {
  width: 1%;
  min-width: 50px;
  padding-right: 10px;
  padding-left: 10px;
  font-size: 12px;
  line-height: 20px;
  color: #484f58;
  text-align: right;
  white-space: nowrap;
  vertical-align: top;
  cursor: pointer;
  user-select: none;
}
`

export default SourceCodeViewLineNum;
