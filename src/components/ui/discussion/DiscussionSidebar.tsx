import React from 'react';
import { styled } from '@mui/material/styles';

const DiscussionSidebar = styled(({ className, ...rest }: any) => (
  <div className={className + " discussion-sidebar"} {...rest} />
))`
& {
  flex-basis: 25%;
  flex-grow: 0;
  max-width: 25%;
  margin: 0;
}
`

export default DiscussionSidebar
