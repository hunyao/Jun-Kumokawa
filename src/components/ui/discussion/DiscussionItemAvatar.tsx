import React from 'react';
import { styled } from '@mui/material/styles';

interface DiscussionItemAvatarUIProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}
const DiscussionItemAvatar = styled(React.forwardRef<HTMLDivElement, DiscussionItemAvatarUIProps>(({ className, ...rest }, ref) => (
  <div
    className={className + " discussion-item-avatar"}
    ref={ref}
    data-testid="discussion-item-avatar"
    {...rest}
  />
)))`
& {
  position: absolute;
  left: -72px;
}
`

export default DiscussionItemAvatar
