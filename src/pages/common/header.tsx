import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import TabMenu from '../../components/TabMenu';
import Profile from '../../components/Profile';
import CatIcon from '../../assets/svgs/svg-cat';
import Container from '@mui/material/Container';
import SvgIcon from '@mui/material/SvgIcon';
import { useNavigate, useLocation } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import CodeIcon from '@mui/icons-material/Code';
import InsightsIcon from '@mui/icons-material/Insights';
import BackgroundPhoto from '../../components/ui/BackgroundPhoto'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Menus = [
  {
    name: 'overview',
    path: 'overview',
    beMatched: [
      '',
      'overview'
    ],
    icon: <HomeOutlinedIcon />,
    menuId: 0,
  },
  {
    name: 'code',
    path: 'tree',
    beMatched: [
      'tree',
      'blob',
    ],
    icon: <CodeIcon />,
    menuId: 1,
  },
  {
    name: 'experiences',
    path: 'experience',
    beMatched: [
      'experience'
    ],
    icon: <WorkOutlineOutlinedIcon />,
    menuId: 2,
  },
  {
    name: 'skills',
    path: 'skill',
    beMatched: [
      'skill'
    ],
    icon: <InsightsIcon />,
    menuId: 3,
  }
]

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [ menuId, setMenuId ] = React.useState<number | boolean>(0);
  const pathnameWithoutSlash = pathname.replace(/^\//, "").split('/')[0];
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('laptop'));

  React.useEffect(() => {
    const index = Menus.findIndex((menu) => {
      return menu.beMatched.find((s: string) => pathnameWithoutSlash === s) !== undefined
    });
    setMenuId(index === -1 ? false : index);
  }, [
    pathnameWithoutSlash
  ])

  const RenderDom = React.useMemo(() => {
    return (
      <>
        <AppBar
          position="static"
          sx={{
            background: '#161b22'
          }}
          data-testid="common-header"
        >
          <Toolbar
            sx={{
              justifyContent: {
                xs: 'center',
                laptop: 'inherit'
              }
            }}
          >
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
        <BackgroundPhoto
          sx={{
            boxShadow: 'inset 0 -1px 0 #21262d',
            paddingTop: 2,
            top: 0,
            zIndex: 10
          }}
          position={matches ? 'static': 'sticky'}
        >
          <Container>
            <Profile />
            <TabMenu
              menus={Menus}
              value={menuId}
              onChange={(val: number) => {
                navigate("/" + Menus[val].path)
              }}
            />
          </Container>
        </BackgroundPhoto>
      </>
    )
  }, [
    matches,
    menuId,
    navigate
  ])

  return RenderDom
}

export default Header
