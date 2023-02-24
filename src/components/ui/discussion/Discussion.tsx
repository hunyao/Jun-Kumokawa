import React from 'react';
import { styled } from '@mui/material/styles';

interface DiscussionUIProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}
const Discussion = styled(React.forwardRef<HTMLDivElement, DiscussionUIProps>(({ className, ...rest }, ref) => (
  <div
    className={className + " discussion"}
    ref={ref}
    data-testid="discussion"
    {...rest}
  />
)))(({theme}) => ({
  '&': {
    'display': 'flex',
    'flexWrap': 'nowrap',
    'gap': 24,
    'alignItems': 'end',
    [theme.breakpoints.up('xs')]: {
      'flexDirection': 'column-reverse'
    },
    [theme.breakpoints.up('laptop')]: {
      'flexDirection': 'row'
    },

    '.discussion-username': {
      'fontWeight': 900,
      'color': '#c9d1d9',
    },
    '.discussion-content': {
      [theme.breakpoints.up('xs')]: {
        'flexBasis': '100%',
      },
      [theme.breakpoints.up('laptop')]: {
        'flexBasis': '74%',
        'flexGrow': '0',
        'maxWidth': '74%',
      },
    },
    '.discussion-sidebar': {
      [theme.breakpoints.up('xs')]: {
        'flexBasis': '100%',
        'width': '100%',
        'boxSizing': 'border-box',
        'paddingLeft': '56px'
      },
      [theme.breakpoints.up('laptop')]: {
        'flexBasis': '24%',
        'flexGrow': '0',
        'maxWidth': '24%',
        'paddingLeft': '0px'
      },
    }
  }
}))

export default Discussion
