import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';

const TreeBrowserListItem = styled(({className, ...rest}: any) => (
  <ListItem className={className + " tree-browser-list-item"} {...rest} />
))`
& {
  padding: 8px 4px;
  color: #8b949e;
  user-select: none;
  margin: 1px;
  background: #0d1117;
  width: calc(100% - 2px);
}
& > .tree-browser-list-item-label {
  margin-left: 4px;
  color: #58a6ff;
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