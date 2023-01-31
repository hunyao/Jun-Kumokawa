import React from 'react';
import { styled } from '@mui/material/styles';

const Discussion = styled(({ className, ...rest }: any) => (
  <div className={className + " discussion"} {...rest} />
))`
& {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  gap: 24px;
  align-items: end;
}
& .discussion-username {
  font-weight: 900;
  color: #c9d1d9;
}
`

export default Discussion