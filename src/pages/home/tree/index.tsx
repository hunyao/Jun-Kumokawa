import Box from '@mui/material/Box';
import FileNavigation from '../../../components/FileNavigation';
import ListDirectory from '../../../components/ListDirectory';
import { useNavigate, useLocation } from "react-router-dom";

const Tree = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <Box>
        <FileNavigation
          mode="navigation"
          path={decodeURIComponent(pathname).replace(/^\/tree/, '')}
        />
        <ListDirectory
          path={decodeURIComponent(pathname).replace(/^\/tree/, '')}
          type="tree"
        />
      </Box>
    </>
  )
}

export default Tree;
