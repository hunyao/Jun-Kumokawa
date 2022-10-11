import Menu from '@mui/material/Menu';
import { styled } from '@mui/material/styles';

const GithubMenuPoper = styled(({className, ...rest}: any) => (
  <Menu className={className + " github-menu-poper"} {...rest} />
))`
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

export default GithubMenuPoper;
