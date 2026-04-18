import styled, { css } from 'styled-components';

export const GithubBreadcrumbs = styled.div.attrs<{
  $endWithSlash: boolean;
}>({
  className: 'github-breadcrumbs',
})`
display: inline-block;
& .github-breadcrumb:not(:first-of-type):before {
  content: "/";
  padding: 0 8px;
}
${(props) =>
  props.$endWithSlash === true
    ? css({
        '& .github-breadcrumb:last-of-type:after': {
          content: '"/"',
          padding: '0 8px',
        },
      })
    : null}
`;
export const GithubBreadcrumb = styled.div.attrs({
  className: 'github-breadcrumb',
})`
display: inline-block;
`;
