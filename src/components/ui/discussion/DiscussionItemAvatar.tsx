import React from 'react';
import { styled } from '@mui/material/styles';

const DiscussionItemAvatar = styled(({ className, ...rest }: any) => (
  <div className={className + " discussion-item-avatar"} {...rest} />
))`
& {
  position: absolute;
  left: -72px;
}
& > .discussion-item-avatar-img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
`

export default DiscussionItemAvatar
