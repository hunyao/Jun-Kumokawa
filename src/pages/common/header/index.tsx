import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import TabMenu from '../../../components/TabMenu';
import Profile from '../../../components/Profile';
import CatIcon from '../../../assets/svgs/svg-cat';
import Container from '@mui/material/Container';
import SvgIcon from '@mui/material/SvgIcon';
import { useNavigate, useLocation } from "react-router-dom";
import { tokenContext } from '../../../contexts/token';
import ForestBackgroundImg from '../../../assets/images/forest-background.jpg';

const clientId = 'c8197b9538a81b217aa1';
// const clientSecret = 'bf42e26a95e0b561d94e0f4c0d26415168b5aa34';

const escapeParams = (params = {}) => {
  return Object
  .entries(params)
  .map(([ key, value ]: any[]) => {
    return key + '=' + encodeURIComponent(value);
  })
  .join('&')
}
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const {
    state: {
      access_token
    }
  } = React.useContext(tokenContext);
  const setMenuIdCallback = React.useCallback((menuId: number, menu: any) => {
    navigate("/" + menu.path)
  }, [])

  const handleClick = () => {
    window.location.href = 'https://github.com/login/oauth/authorize?' + escapeParams({
      client_id: clientId,
      redirect_url: 'http://localhost:3001/oauth2/github/response'
    })
  }

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
            <Box ml="auto">
              <Button onClick={handleClick}>
                { access_token === "" ? 'Sign in': 'Sign out' }
              </Button>
            </Box>
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
    access_token,
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
