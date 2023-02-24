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

    n = n < 0 ? filteredTrees.length-1 : n;
    n = n >= filteredTrees.length ? 0 : n;

    setActiveRow(n);
  }

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        mt={4}
        mb={1}
        sx={{
          whiteSpace: 'pre',
          fontSize: 16
        }}
        data-testid="page-find"
      >
        <GithubLink
          href="#"
          className="active"
          sx={{
            fontSize: '16px !important'
          }}
        >
          {process.env.REACT_APP_REPOSITORY_NAME}
        </GithubLink> / <InputBase
          autoFocus
          fullWidth
          onKeyDown={handleKeydown}
          onChange={({target: { value }}) => setSearchText(value)}
          sx={{
            '& .MuiInputBase-input': {
              'outline': 'none',
              'boxShadow': 'none'
            },
            '& .MuiInputBase-input:focus': {
              'border': 'solid 1px #58a6ff',
              'padding': '5px 12px',
              'borderRadius': '6px'
            }
          }}
        />
      </Box>
      <List
        disablePadding
        sx={{
          border: '1px solid #30363d',
          borderBottom: '0',
        }}
      >
        {filteredTrees
          .map((tree, index) => (
          <TreeBrowserListItem
            disablePadding
            className={index === activeRow ? 'active': ''}
            onClick={() => navigate('/blob/' + getShaFromPath(tree))}
            key={index}
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
