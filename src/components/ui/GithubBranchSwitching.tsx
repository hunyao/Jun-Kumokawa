import React from 'react'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const GithubBranchSwitching = styled(({className, children, ...rest}: any) => {
  return <Box
    className={className + " github-branch-swithcing"}
    sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
    {...rest}
  >
    <Box
      className="modal"
    >
      {children}
    </Box>
  </Box>
})`
& {
  position: absolute;
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
  padding: 0;
  pointer-events: none;
  display: none;
  transition: ease;
  animation-name: GithubBranchSwitchingAnimation;
  animation-duration: 0.3s;
}
& .modal {
  pointer-events: auto;
  width: 300px;
  height: auto;
  max-height: 480px;
  margin: 8px 0 16px 0;
  font-size: 12px;
  border-color: #30363d;
  border-radius: 6px;
  box-shadow: 0 8px 24px #010409;
  position: relative;
  background-color: #161b22;
  border: 1px solid #484f58;
  overflow: hidden;
}
& .github-branch-swithcing-item {
  border-bottom: 1px solid #21262d;
}
&.active {
  display: block;
}
@keyframes GithubBranchSwitchingAnimation {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
`

export default GithubBranchSwitching;
