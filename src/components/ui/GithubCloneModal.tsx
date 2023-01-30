import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const GithubCloneModal = React.forwardRef(({ className, children, ...rest }: any, ref) => (
  <Box className={className + " github-clone-modal"} {...rest} ref={ref}>
    <Box
      className={"modal"}
      sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
    >
      {children}
    </Box>
  </Box>
))

export default styled(GithubCloneModal)`
& {
  background-color: #161b22;
  position: relative;
  display: none;

  &.active {
    display: block;
  }
}
& > .modal:before {
  position: absolute;
  display: inline-block;
  content: "";
  top: -16px;
  right: 9px;
  left: auto;
  border: 8px solid transparent;
  border-bottom-color: #30363d;
}
& > .modal {
  position: absolute;
  top: 6px;
  right: 0;
  left: auto;
  width: 378px;
  margin-top: 2px;
  border: 1px solid #30363d;
  border-radius: 6px;
  box-shadow: 0 8px 24px #010409;
  padding: 0;
  background-clip: padding-box;
  background-color: #161b22;

  .header {
    font-weight: bold;
  }
}
& svg {
  vertical-align: text-bottom;
}`
