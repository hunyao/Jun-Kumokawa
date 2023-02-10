import React from 'react'
import Box from '@mui/material/Box';
import GithubButton from './ui/GithubButton'
import SvgIcon from '@mui/material/SvgIcon';
import GitBranchIcon from '../assets/svgs/svg-git-branch';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import BranchSwitchingModal from './BranchSwitchingModal';
import useCurrentBranch from '../hooks/useCurrentBranch'

const BranchSwitching = () => {
  const [ open, setOpen ] = React.useState<boolean>(false);
  const [ currentBranchName ] = useCurrentBranch();
  const closeFn = React.useCallback(() => setOpen(false), [])

  return (
    <ClickAwayListener onClickAway={closeFn}>
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
            {currentBranchName}
          </Box>
          <SvgIcon component={ArrowDropDownIcon} />
        </GithubButton>
        <BranchSwitchingModal open={open} onClose={closeFn} />
      </Box>
    </ClickAwayListener>
  )
}

export default BranchSwitching
