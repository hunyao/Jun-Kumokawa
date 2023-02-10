import React from 'react';
import { styled } from '@mui/material/styles';

interface ProgressLabelWrapperUIProps extends React.HTMLAttributes<HTMLUListElement> {
  className?: string
}
const ProgressLabelWrapper = styled(React.forwardRef<HTMLUListElement, ProgressLabelWrapperUIProps>(({ className, ...rest }, ref) => (
  <ul className={className + " github-progress-label-wrapper"} ref={ref} {...rest} />
)))`
& {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
}
`

export default ProgressLabelWrapper;
