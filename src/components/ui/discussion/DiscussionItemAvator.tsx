import React from 'react';
import { styled } from '@mui/material/styles';

const DiscussionItemAvator = styled(({ className, ...rest }: any) => (
  <div className={className + " discussion-item-avator"} {...rest} />
))`
& {
  position: absolute;
  left: -72px;
}
& > .discussion-item-avator-img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
`

export default DiscussionItemAvator
