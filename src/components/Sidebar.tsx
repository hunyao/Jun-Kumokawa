import React from 'react';
import Box from '@mui/material/Box';
import {BoxProps} from '@mui/material/Box';
import About from './sidebar/About'
import LanguageSidebars from './sidebar/LanguageSidebars'

interface SidebarProps {}
const Sidebar: React.FC<BoxProps<'div', SidebarProps>> = (props) => {
  return (
    <>
      <Box {...props}>
        <About />
        <LanguageSidebars />
      </Box>
    </>
  )
}

export default Sidebar;
