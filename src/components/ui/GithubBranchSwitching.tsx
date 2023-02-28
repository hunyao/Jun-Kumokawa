import React from 'react'
import Box from '@mui/material/Box';
import { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface GithubBranchSwitchingUIProps {}
const GithubBranchSwitching = styled(React.forwardRef<HTMLDivElement, BoxProps<'div', GithubBranchSwitchingUIProps>>(({className, children, ...rest}, ref) => (
  <Box
    className={className + " github-branch-switching"}
    sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
    ref={ref}
    data-testid="github-branch-switching"
    {...rest}
  >
    <Box
      className="modal"
      data-testid="github-branch-switching-modal"
    >
      {children}
    </Box>
  </Box>
)))(({theme}) => ({
  '&': {
    position: 'absolute',
    display: 'none',
    pointerEvents: 'none',
    transition: 'ease',
    animationName: 'GithubBranchSwitchingAnimation',
    animationDuration: '0.3s',
    flexDirection: 'column',
    [theme.breakpoints.down('laptop')]: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      flexDirection: 'column',
      padding: '16px',
      '&::before': {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        content: '""'
      },
    },
    '&.active': {
      display: 'flex'
    },

    '> .modal': {
      position: 'relative',
      pointerEvents: 'auto',
      width: '300px',
      height: 'auto',
      maxHeight: '480px',
      top: '8px',
      fontSize: '14px',
      borderColor: '#30363d',
      borderRadius: '12px',
      boxShadow: '0 8px 24px #010409',
      backgroundColor: '#161b22',
      border: '1px solid #484f58',
      overflow: 'hidden',
      zIndex: 1,
      [theme.breakpoints.down('laptop')]: {
        width: 'unset',
        margin: 'auto 0'
      },
    },

    '.github-branch-switching-item': {
      borderBottom: '1px solid #21262d'
    },

    '@keyframes GithubBranchSwitchingAnimation': {
      '0%': {
        opacity: 0,
        transform: 'translateY(-10px)',
      },
      '100%': {
        opacity: 1,
        transform: 'translateY(0)',
      }
    }
  }
}))

export default GithubBranchSwitching;
