import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import GithubButton from './ui/GithubButton'
import SvgIcon from '@mui/material/SvgIcon';
import GitBranchIcon from '../assets/svgs/svg-git-branch';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { repositoryContext } from '../contexts/repository';
import GithubBranchSwitching from './ui/GithubBranchSwitching';
import GithubBranchSwitchingTabs from './ui/GithubBranchSwitchingTabs';
import GithubBranchSwitchingTabPanel from './ui/GithubBranchSwitchingTabPanel';
import GithubInput from './ui/GithubInput';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const BranchSwitchingModal = React.forwardRef((props: any, ref) => {
  const {
    open
  } = props;

  const {
    state: {
      branches,
      tags
    },
    selectedBranch,
    changeBranch
  } = React.useContext(repositoryContext);

  const [ selectedTab, setSelectedTab ] = React.useState("0");
  const [ searchingWords, setSearchingWords ] = React.useState("");

  const filteredBranches = React.useMemo(() => {
    if (searchingWords === "") return branches;
    return branches.filter((branch: any) => branch.name.includes(searchingWords))
  }, [
    searchingWords,
    branches
  ]);
  const filteredTags = React.useMemo(() => {
    if (searchingWords === "") return tags;
    return tags.filter((tag: any) => tag.name.includes(searchingWords))
  }, [
    searchingWords,
    tags
  ]);

  const placeholderMemo = React.useMemo(() => {
    if (selectedTab === "0") {
      return 'Find a branch';
    } else if (selectedTab === "1") {
      return 'Find a tag';
    } else {}
  }, [
    selectedTab
  ])

  const renderList = React.useCallback((filteredItems) => {
    return filteredItems.map((item: any, index: number) => (
      <ListItem disablePadding key={index}>
        <ListItemButton onClick={() => changeBranch(item)}>
          <ListItemIcon
            className="github-branch-swithcing-list-item-icon"
          >
            <CheckIcon
              className="icon"
              sx={{
                display: selectedBranch.name === item.name ? 'inherit': 'none'
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary={item.name}
            disableTypography
            className="github-branch-swithcing-list-item-text"
          />
        </ListItemButton>
      </ListItem>
    ))
  }, [
    changeBranch,
    selectedBranch
  ]);

  React.useEffect(() => {
    if (!open) {
      setSearchingWords("")
    }
  }, [
    open
  ])

  return (
    <GithubBranchSwitching
      ref={ref}
      className={open ? 'active': ''}
    >
      <Grid
        p={1}
        pl={2}
        container
        component="header"
        className="github-branch-swithcing-item"
      >
        <Grid
          item
          component="span"
          flex={1}
          sx={{fontWeight: 'bold'}}
        >
          Switch branches/tags
        </Grid>
        <Grid
          item
          component={IconButton}
          p={0}
        >
          <SvgIcon
            component={CloseIcon}
            sx={{fontSize: 16}}
          />
        </Grid>
      </Grid>
      <Grid
        container
        flexDirection="column"
      >
        <Grid
          item
          p={1}
          className="github-branch-swithcing-item"
        >
          <GithubInput
            placeholder={placeholderMemo}
            value={searchingWords}
            onChange={({target: { value }}: any) => setSearchingWords(value)}
          />
        </Grid>
        <Grid
          item
          p={1}
        >
          <TabContext value={selectedTab}>
            <GithubBranchSwitchingTabs
              value={selectedTab}
              onChange={(_: any, newValue: number) => setSelectedTab(String(newValue))}
            >
              <Tab label="Branches" disableRipple value="0" />
              <Tab label="Tags" disableRipple value="1" />
            </GithubBranchSwitchingTabs>
            <GithubBranchSwitchingTabPanel value="0">
              <List>
                {renderList(filteredBranches)}
              </List>
            </GithubBranchSwitchingTabPanel>
            <GithubBranchSwitchingTabPanel value="1">
              <List>
                {tags.length === 0 &&
                <ListItem
                  disablePadding
                  disableGutters
                  component={Typography}
                  sx={{
                    justifyContent: 'center',
                    fontSize: 12
                  }}
                >
                  Nothing to show
                </ListItem>}
                {renderList(filteredTags)}
              </List>
            </GithubBranchSwitchingTabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </GithubBranchSwitching>
  )
})

const BranchSwitching = (props: any) => {
  const {
    selectedBranch,
  } = React.useContext(repositoryContext);

  const [ open, setOpen ] = React.useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box>
        <GithubButton onClick={() => setOpen(!open)}>
          <SvgIcon
            component={GitBranchIcon}
            viewBox="0 0 16 16"
            fontSize="small"
          />
          <Box
            component="span"
            sx={{
              maxWidth: 125,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'inline-block'
            }}
          >
            {selectedBranch.name}
          </Box>
          <SvgIcon component={ArrowDropDownIcon} />
        </GithubButton>
        <BranchSwitchingModal open={open} />
      </Box>
    </ClickAwayListener>
  )
}

export default BranchSwitching
