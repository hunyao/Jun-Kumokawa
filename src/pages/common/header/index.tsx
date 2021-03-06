import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import TabMenu from '../../../components/TabMenu';
import Profile from '../../../components/Profile';
import CatIcon from '../../../assets/svgs/svg-cat';
import Container from '@mui/material/Container';
import SvgIcon from '@mui/material/SvgIcon';
import { useNavigate, useLocation } from "react-router-dom";
import ForestBackgroundImg from '../../../assets/images/forest-background.jpg';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const setMenuIdCallback = React.useCallback((menuId: number, menu: any) => {
    navigate("/" + menu.path)
  }, [])

  const RenderDom = React.useMemo(() => {
    return (
      <>
        <AppBar
          position="static"
          sx={{
            background: '#161b22'
          }}
        >
          <Toolbar>
            <IconButton
              sx={{ mr: 2 }}
              href="/"
            >
              <SvgIcon
                component={CatIcon}
                viewBox="0 0 512 512"
                sx={{
                  height: 32,
                  width: 32,
                  borderRadius: '50%',
                  color: 'black',
                  background: 'white'
                }}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(' + ForestBackgroundImg + ')',
            backgroundSize: 'cover',
            height: 300
          }}
        />
          <Box
            sx={{
              boxShadow: 'inset 0 -1px 0 #21262d',
            }}
          >
            <Container>
              <Profile />
              <TabMenu
                path={pathname.replace(/^\//, "")}
                onChange={setMenuIdCallback}
              />
            </Container>
        </Box>
      </>
    )
  }, [
    pathname,
    setMenuIdCallback
  ])

  return (
    <>
      {RenderDom}
    </>
  )
}

export default Header
