import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { GridProps } from '@mui/material/Grid';

interface GithubProgressLabelChildrenUIProps {}
const GithubProgressLabelChildren = styled(React.forwardRef<HTMLLIElement, GridProps<'li', GithubProgressLabelChildrenUIProps>>(({ className, ...rest }, ref) => (
  <Grid
    container
    item
    component="li"
    display="inline-flex"
    alignItems="center"
    flex={0}
    spacing={0.5}
    flexWrap="nowrap"
    className={className + " github-progress-label-children"}
    ref={ref}
    data-testid="github-progress-label-children"
    {...rest}
  />
)))`
& {
  list-style: none;
  white-space: nowrap;
  font-size: 12px;

  > .github-progress-label-children-symbol {
    height: 12px;
    width: 12px;
  }
}
`

export default GithubProgressLabelChildren;
