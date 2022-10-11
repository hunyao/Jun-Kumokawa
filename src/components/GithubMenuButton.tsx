import React from 'react'
import Box from '@mui/material/Box';
import GithubButton from './ui/GithubButton'
import SvgIcon from '@mui/material/SvgIcon';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListSubheader from '@mui/material/ListSubheader';
import GithubMenuPoper from './ui/GithubMenuPoper'
import GithubMenuPoperMenuItem from './ui/GithubMenuPoperMenuItem'

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
        {menuItems.map((item: any, index: number) => (
          <GithubMenuPoperMenuItem
            className={value === item.value ? 'selected': ''}
            onClick={() => handleClose(item.value)}
            key={index}
          >
            {item.text}
          </GithubMenuPoperMenuItem>
        ))}
      </GithubMenuPoper>
    </>
  )
}

export default GithubMenuButton
