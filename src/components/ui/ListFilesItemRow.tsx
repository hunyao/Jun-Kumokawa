import React from 'react';
import Grid from '@mui/material/Grid';
import { GridProps } from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

interface ListFilesItemRowUIProps {}
const ListFilesItemRow = styled(React.forwardRef<HTMLDivElement, GridProps<'div', ListFilesItemRowUIProps>>(({ className, ...rest }, ref) => (
  <Grid
    container
    py={1}
    px={2}
    flexWrap="nowrap"
    alignItems="center"
    className={className + " list-files-item-row"}
    ref={ref}
    {...rest}
  />
)))`
& {
  border-top: 1px solid #21262d;
  font-size: 14px;
  line-height: 1.5;

  .file_icon {
    display: inline-flex;
    flexBasis: 16px;
    font-size: 16px;
    color: #8b949e;
  }
  .commit-message {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .committed-time {
    flexBasis: 100px;
    text-align: right;
  }
}
& > .MuiGrid-item {
  white-space: nowrap;
}
& > .MuiGrid-item:not(:last-child) {
  margin-right: 16px;
}
&:hover {
  background: #161b22;
}
`

export default ListFilesItemRow;
