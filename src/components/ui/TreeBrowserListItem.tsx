import React from 'react';
import ListItem from '@mui/material/ListItem';
import { ListItemProps } from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';

interface TreeBrowserListItemUIProps {}
const TreeBrowserListItem = styled(React.forwardRef<HTMLLIElement, ListItemProps<'li', TreeBrowserListItemUIProps>>(({className, ...rest}, ref) => (
  <ListItem
    className={className + " tree-browser-list-item"}
    ref={ref}
    data-testid="tree-browser-list-item"
    {...rest}
  />
)))`
& {
  padding: 8px 4px;
  color: #8b949e;
  user-select: none;
  background: transparent;
  border-bottom: 1px solid #30363d;
}
& > .tree-browser-list-item-label {
  margin-left: 4px;
  color: #58a6ff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
&.active {
  background: #1f6feb;
  color: #f0f6fc;
  cursor: pointer;
}
&.active > .tree-browser-list-item-label {
  color: #f0f6fc;
}
&:hover {
  background: #1f6feb;
  color: #f0f6fc;
  cursor: pointer;
}
&:hover > .tree-browser-list-item-label {
  color: #f0f6fc;
}
`

export default TreeBrowserListItem
