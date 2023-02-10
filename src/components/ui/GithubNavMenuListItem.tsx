import React from 'react';
import ListItem from '@mui/material/ListItem';
import { ListItemProps } from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';

interface GithubNavMenuListItemUIProps {}
const GithubNavMenuListItem = styled(React.forwardRef<HTMLLIElement, ListItemProps<'li', GithubNavMenuListItemUIProps>>(({className, ...rest}, ref) => (
  <ListItem disablePadding className={className + " github-nav-menu-list-item"} ref={ref} {...rest} />
)))`
& {
  background: #0d1117;
  margin: 1px;
  width: calc(100% - 2px);
  color: #c9d1d9;
  line-height: 1.5;
}
& > .MuiListItemButton-root {
  line-height: 1.5;
  text-transform: capitalize;
}
&.selected {
  background: transparent;
}
&.selected:before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2px;
  content: "";
  background-color: #f78166;
}
`

export default GithubNavMenuListItem;
