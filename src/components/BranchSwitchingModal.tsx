import React from 'react'
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import SvgIcon from '@mui/material/SvgIcon';
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
import useCurrentBranch from '../hooks/useCurrentBranch'
import useFilterBranches from '../hooks/useFilterBranches'
import useFilterTags from '../hooks/useFilterTags'
import useTags from '../hooks/useTags'
import { GithubGetBranchResponseType, GithubListRepositoryTagsResponseType } from '../contexts/repository'

interface BranchSwitchingModalProps {
  open: boolean,
  onClose: () => void
}
const BranchSwitchingModal:React.FC<BranchSwitchingModalProps> = (props) => {
  const {
    open,
    onClose
  } = props;

  const [ selectedTab, setSelectedTab ] = React.useState<number>(0);
  const [ searchingWords, setSearchingWords ] = React.useState<string>("");
  const [ currentBranchName, , ,changeBranch ] = useCurrentBranch();
  const [ filteredBranches ] = useFilterBranches(searchingWords);
  const [ filteredTags ] = useFilterTags(searchingWords);
  const [ ,tagsNumber ] = useTags();

  const placeholderMemo = React.useMemo(() => {
    if (selectedTab === 0) {
      return 'Find a branch';
    } else if (selectedTab === 1) {
      return 'Find a tag';
    } else {}
  }, [
    selectedTab
  ])

  const renderList = React.useCallback((filteredItems: Array<GithubGetBranchResponseType | GithubListRepositoryTagsResponseType>) => {
    return filteredItems.map((item, index) => (
      <ListItem disablePadding key={index}>
        <ListItemButton onClick={changeBranch.bind(null, item)}>
          <ListItemIcon
            className="github-branch-switching-list-item-icon"
          >
            <CheckIcon
              className="icon"
              sx={{
                display: currentBranchName === item.name ? 'inherit': 'none'
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary={item.name}
            disableTypography
            className="github-branch-switching-list-item-text"
          />
        </ListItemButton>
      </ListItem>
    ))
  }, [
    currentBranchName,
    changeBranch
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
      className={open ? 'active': ''}
    >
      <Grid
        p={1}
        pl={2}
        container
        component="header"
        className="github-branch-switching-item"
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
          onClick={onClose}
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
          className="github-branch-switching-item"
        >
          <GithubInput
            placeholder={placeholderMemo}
            value={searchingWords}
            onChange={({target: { value }}: React.ChangeEvent<HTMLInputElement>) => setSearchingWords(value)}
          />
        </Grid>
        <Grid
          item
          p={1}
        >
          <TabContext value={String(selectedTab)}>
            <GithubBranchSwitchingTabs
              value={selectedTab}
              onChange={(_: React.SyntheticEvent, newValue: number) => setSelectedTab(newValue)}
            >
              <Tab label="Branches" disableRipple value={0} />
              <Tab label="Tags" disableRipple value={1} />
            </GithubBranchSwitchingTabs>
            <GithubBranchSwitchingTabPanel value="0">
              <List>
                {renderList(filteredBranches)}
              </List>
            </GithubBranchSwitchingTabPanel>
            <GithubBranchSwitchingTabPanel value="1">
              <List>
                {tagsNumber === 0 &&
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
}

export default BranchSwitchingModal
