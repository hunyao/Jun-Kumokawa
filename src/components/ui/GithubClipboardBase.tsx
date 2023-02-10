import React from 'react';
import Box from '@mui/material/Box';
import { BoxProps } from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { InputBaseProps } from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

interface GithubClipboardCopyBaseUIProps {
  inputBaseProps: InputBaseProps,
  buttonProps: ButtonProps
}
const GithubClipboardCopyBase = styled(React.forwardRef<HTMLDivElement, BoxProps<'div', GithubClipboardCopyBaseUIProps>>(({ className, inputBaseProps, buttonProps, ...rest }, ref) => (
  <Box
    className={className + " github-clipboard-copy-base"}
    ref={ref}
    {...rest}
  >
    <InputBase {...inputBaseProps} />
    <Button variant="outlined" {...buttonProps} />
  </Box>
)))`
& {
  display: flex;

  .MuiInputBase-root {
    flex: 1;

    input {
      border: 1px solid #30363d;
      border-radius: 6px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      padding: 3px 12px;
      color: #c9d1d9;
      font-size: 12px;
    }
    input:focus {
      border-color: #58a6ff;
      outline: none;
      box-shadow: inset 0 0 0 1px transparent;
    }
  }
  .MuiButton-root {
    min-width: initial;
    color: #c9d1d9;
    background-color: #21262d;
    border-color: rgba(240,246,252,0.1);
    box-shadow: 0 0 transparent, 0 0 transparent;
    transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
    transition-property: all;
    transition-property: color,background-color,box-shadow,border-color;
  }
  svg {
    font-size: 12px;
  }
}`

export default GithubClipboardCopyBase;
