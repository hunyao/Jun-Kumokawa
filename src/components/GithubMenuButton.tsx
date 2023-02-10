import React from 'react'
import Box from '@mui/material/Box';
import GithubButton from './ui/GithubButton'
import SvgIcon from '@mui/material/SvgIcon';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListSubheader from '@mui/material/ListSubheader';
import GithubMenuPopper from './ui/GithubMenuPopper'
import GithubMenuPopperMenuItem from './ui/GithubMenuPopperMenuItem'
import C3 from 'c3';

interface GithubMenuButtonProps<T> {
  menuItems: Array<{
    value: T,
    text: string
  }>,
  value: T,
  onChange: (value: T) => void,
  subheader: string,
  buttonText: string
}
const GithubMenuButton = function<T extends C3.ChartType>(props: GithubMenuButtonProps<T>): React.ReactElement {
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
  const handleClose = (selectedValue: T) => {
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
      <GithubMenuPopper
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
        {menuItems.map((item, index) => (
          <GithubMenuPopperMenuItem
            className={value === item.value ? 'selected': ''}
            onClick={() => handleClose(item.value)}
            key={index}
          >
            {item.text}
          </GithubMenuPopperMenuItem>
        ))}
      </GithubMenuPopper>
    </>
  )
}

export default GithubMenuButton
