import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import GithubButton from './ui/GithubButton'
import SvgIcon from '@mui/material/SvgIcon';
import ZipIcon from '../assets/svgs/svg-zip';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GithubCloneModal from './ui/GithubCloneModal'
import TerminalIcon from '@mui/icons-material/Terminal';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import GithubLink from './ui/GithubLink'
import Tooltip from '@mui/material/Tooltip';
import GithubCloneSelection from './GithubCloneSelection'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import useCurrentBranch from '../hooks/useCurrentBranch'

const GithubCloneButton = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [ currentBranchName ] = useCurrentBranch();

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box>
        <GithubButton
          className="primary"
          onClick={() => setOpen(!open)}
        >
          <span>
            Code
          </span>
          <SvgIcon component={ArrowDropDownIcon} />
        </GithubButton>
        <GithubCloneModal
          className={open ? 'active': ''}
        >
          <Box p={2}>
            <Grid
              container
              className="header"
            >
              <Grid item>
                <SvgIcon
                  component={TerminalIcon}
                  sx={{
                    fontSize: 16,
                    marginRight: 1
                  }}
                />
                Clone
              </Grid>
              <Grid
                item
                ml="auto"
              >
                <Tooltip title="Which remote URL should I use?">
                  <GithubLink
                    className="no-underline primary"
                    href="#"
                  >
                    <strong>
                      <span>
                        <SvgIcon
                          component={HelpOutlineOutlinedIcon}
                          sx={{
                            fontSize: 16
                          }}
                        />
                      </span>
                    </strong>
                  </GithubLink>
                </Tooltip>
              </Grid>
            </Grid>
            <GithubCloneSelection />
          </Box>
          <Box p={2}
            sx={{
              borderTop: '1px solid #21262d'
            }}
          >
            <Box
              component={"a"}
              href={
                "https://github.com/"
              + process.env.REACT_APP_REPOSITORY_OWNER
              + "/"
              + process.env.REACT_APP_REPOSITORY_NAME
              + "/archive/refs/heads/"
              + currentBranchName
              + ".zip"
              }
              sx={{
                color: '#c9d1d9',
                '&:hover': {
                  textDecoration: 'none'
              }}}
            >
              <SvgIcon
                component={ZipIcon}
                viewBox="0 0 16 16"
                sx={{fontSize: 16, mr:1}}
              />
              Download ZIP
            </Box>
          </Box>
        </GithubCloneModal>
      </Box>
    </ClickAwayListener>
  )
}

export default GithubCloneButton;
