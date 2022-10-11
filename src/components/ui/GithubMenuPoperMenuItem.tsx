import SvgIcon from '@mui/material/SvgIcon';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';

const GithubMenuPoperMenuItem = styled(({className, children, ...rest}: any) => (
  <MenuItem className={className + " github-menu-poper-menu-item"} {...rest}>
    <SvgIcon component={CheckIcon} />
    {children}
  </MenuItem>
))`
&.MuiMenuItem-root {
  padding: 8px 8px 8px 30px;
  overflow: hidden;
  color: inherit;
  cursor: pointer;
  border-bottom: 1px solid #21262d;
  text-align: left;
  background-color: #161b22;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  font-size: inherit;
  position: relative;
}
&.MuiMenuItem-root:hover {
  color: #f0f6fc;
  background-color: #1f6feb;
}
& > .MuiSvgIcon-root {
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 16px;
  visibility: hidden;
}
&.selected > .MuiSvgIcon-root {
  visibility: visible;
}
`

export default GithubMenuPoperMenuItem;
