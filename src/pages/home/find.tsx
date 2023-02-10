import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GithubLink from '../../components/ui/GithubLink'
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import SvgIcon from '@mui/material/SvgIcon';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { useNavigate } from "react-router-dom";
import TreeBrowserListItem from '../../components/ui/TreeBrowserListItem';
import usePathToSha from '../../hooks/usePathToSha'
import useFilterTrees from '../../hooks/useFilterTrees'

const Find = () => {
  const [ searchText, setSearchText ] = React.useState<string>("");
  const [ activeRow, setActiveRow ] = React.useState<number>(0);
  const [ filteredTrees ] = useFilterTrees(searchText);
  const getShaFromPath = usePathToSha();
  const navigate = useNavigate();

  const handleKeydown = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    let n = activeRow;
    if (key === "ArrowDown") {
      n += 1;
    } else if (key === "ArrowUp") {
      n -= 1;
    } else if (key === "Enter") {
      navigate('/blob/' + getShaFromPath(filteredTrees[activeRow]))
    } else {}

    n = n < 0 ? 0 : n;
    n = n >= filteredTrees.length ? filteredTrees.length-1 : n;

    setActiveRow(n);
  }

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        mt={4}
        sx={{
          whiteSpace: 'pre',
          fontSize: 16
        }}
      >
        <GithubLink
          href="#"
          className="active"
        >
          {process.env.REACT_APP_REPOSITORY_NAME}
        </GithubLink> / <InputBase
          autoFocus
          fullWidth
          onKeyDown={handleKeydown}
          onChange={({target: { value }}) => setSearchText(value)}
        />
      </Box>
      <List
        disablePadding
        sx={{
          background: '#30363d',
        }}
      >
        {filteredTrees
          .map((tree, index) => (
          <TreeBrowserListItem
            disablePadding
            className={index === activeRow ? 'active': ''}
            onClick={() => navigate('/blob/' + getShaFromPath(tree))}
          >
            <SvgIcon
              component={ArrowForwardIosIcon}
              sx={{
                fontSize: 16,
                marginX: 1,
                visibility: index === activeRow ? 'visible': 'hidden'
              }}
            />
            <SvgIcon
              component={InsertDriveFileOutlinedIcon}
              sx={{ fontSize: 16 }}
            />
            <Typography
              component="span"
              display="inline-block"
              className="tree-browser-list-item-label"
            >
              {tree}
            </Typography>
          </TreeBrowserListItem>
        ))}
      </List>
    </>
  )
}

export default Find;
