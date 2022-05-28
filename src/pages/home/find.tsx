import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GithubLink from '../../components/ui/GithubLink'
import InputBase from '@mui/material/InputBase';
import axios from 'axios';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SvgIcon from '@mui/material/SvgIcon';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { useNavigate, useLocation } from "react-router-dom";

import { styled } from '@mui/material/styles';

const TreeBrowserListItem = styled(({className, ...rest}: any) => (
  <ListItem className={className + " tree-browser-list-item"} {...rest} />
))`
& {
  padding: 8px 4px;
  color: #8b949e;
  user-select: none;
  margin: 1px;
  background: #0d1117;
  width: calc(100% - 2px);
}
& > .tree-browser-list-item-label {
  margin-left: 4px;
  color: #58a6ff;
}
&.active {
  background: #1f6feb;
  color: #f0f6fc;
  cursor: pointer;
}
&.active > .tree-browser-list-item-label {
  color: #f0f6fc;
}
&:hover {
  background: #1f6feb;
  color: #f0f6fc;
  cursor: pointer;
}
&:hover > .tree-browser-list-item-label {
  color: #f0f6fc;
}
`

const Find = () => {
  const [ trees, setTrees ] = React.useState<string[]>([]);
  const [ searchText, setSearchText ] = React.useState("");
  const [ acticveRow, setActiceRow ] = React.useState(0);
  const navigate = useNavigate();

  const treesForDisplay = trees
  .slice(0, 50)
  .filter(tree => {
    return tree.toUpperCase().includes(searchText.toUpperCase())
  })

  const handleKeydown = ({ key }: any) => {
    let n = acticveRow;
    if (key === "ArrowDown") {
      n += 1;
    } else if (key === "ArrowUp") {
      n -= 1;
    } else if (key === "Enter") {
      navigate('/blob/' + treesForDisplay[acticveRow])
    } else {}

    n = n < 0 ? 0 : n;
    n = n >= treesForDisplay.length ? treesForDisplay.length-1 : n;

    setActiceRow(n);
  }

  React.useEffect(() => {
    axios({
      method: "get",
      url: '/trees',
      baseURL: "/api"
    })
    .then(({ data }) => {
      setTrees(data);
    })
  }, [])

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        mt={4}
        sx={{
          whiteSpace: 'pre',
          fontSize: '16px'
        }}
      >
        <GithubLink
          href="#"
          className="active"
        >
          Jun-Kumokawa
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
        {treesForDisplay
          .map((tree, index: number) => (
          <TreeBrowserListItem
            disablePadding
            className={index === acticveRow ? 'active': ''}
            onClick={() => navigate('/blob/' + tree)}
          >
            <SvgIcon component={ArrowForwardIosIcon} sx={{ height: 16, width: 16, marginX: 1, visibility: index === acticveRow ? 'visible': 'hidden'}} />
            <SvgIcon component={InsertDriveFileOutlinedIcon} sx={{ height: 16, width: 16}} />
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
