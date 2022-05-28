import React from 'react'
import Box from '@mui/material/Box';
import GithubButton from './ui/GithubButton'
import SvgIcon from '@mui/material/SvgIcon';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';

const GithubMenuPoper = styled(({className, ...rest}: any) => {
   return <Menu className={className + " github-menu-poper"} {...rest} />
})`
& .MuiMenu-list {
  width: 300px;
  overflow: hidden;
  font-size: 12px;
  color: #c9d1d9;
  background-color: #161b22;
  background-clip: padding-box;
  border: 1px solid #30363d;
  border-radius: 6px;
  box-shadow: 0 8px 24px #010409;
  padding: 0;
}
& .MuiListSubheader-root {
  padding: 8px 10px;
  line-height: 16px;
  broder-bottom: 1px solid #21262d;
  font-size: 12px;
  background: #161b22;
  color: #c9d1d9;
  font-weight: 900;
}
`
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
  height: 16px;
  width: 16px;
  visibility: hidden;
}
&.selected > .MuiSvgIcon-root {
  visibility: visible;
}
`

const GithubMenuButton = (props: any) => {
  const {
    menuItems,
    value,
    onChange,
    subheader,
    buttonText
  } = props;

  const anchorRef = React.createRef<HTMLDivElement>();
  const [ anchorEl, setAnchorEl ] = React.useState<HTMLDivElement|null>(null);
  const open = Boolean(anchorEl);
  const handleClick = () => {
    setAnchorEl(anchorRef.current);
  };
  const handleClose = (selectedValue: any) => {
    onChange(selectedValue);
    setAnchorEl(null);
  };

  return (
    <>
      <GithubButton
        onClick={handleClick}
      >
        <span>
          {buttonText}
        </span>
        <SvgIcon component={ArrowDropDownIcon} />
      </GithubButton>
      <Box
        position="relative"
        top={5}
        ref={anchorRef}
      />
      <GithubMenuPoper
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        variant="menu"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ListSubheader>{subheader}</ListSubheader>
        {menuItems.map((item: any) => (
          <GithubMenuPoperMenuItem
            className={value === item.value ? 'selected': ''}
            onClick={() => handleClose(item.value)}
          >
            {item.text}
          </GithubMenuPoperMenuItem>
        ))}
      </GithubMenuPoper>
    </>
  )
}

export default GithubMenuButton
