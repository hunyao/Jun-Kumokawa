import React from 'react';
import Link from '@mui/material/Link';
import { LinkProps } from '@mui/material/Link';
import { styled } from '@mui/material/styles';

type LinkOverrideProps = {}
export type GithubLinkUIProps = LinkProps<'a', LinkOverrideProps>
const GithubLink = React.forwardRef<HTMLAnchorElement, GithubLinkUIProps>(({ className, ...rest }, ref) => (
  <Link
    className={className + " github-link"}
    ref={ref}
    data-testid="github-link"
    { ...rest }
  />
))

export default styled(GithubLink)`
& {
  color: #8b949e;
  text-decoration: none;
  font-size: 14px;
}
& svg {
  vertical-align: text-bottom;
  font-size: 16px;
}
&.primary {
  color: #c9d1d9;
  font-weight: bold;
}
& strong {
  font-weight: bold;
}
& .name {
  margin-left: 6px;
}
&.active {
  color: #58a6ff;
}
&.no-underline .fixed-color{
  color: #8b949e;
}
&.no-underline:hover .fixed-color{
  color: #8b949e;
}
&.no-underline:hover {
  color: #58a6ff;
  text-decoration: none;
}
&:hover {
  color: #58a6ff;
  text-decoration: underline;
}
&.no-name {
  & > .name {
    display: none;
  }
}
`
