import styled, { css } from 'styled-components';

export const GithubNavMenu = styled.nav.attrs({
  className:
    'github-nav-menu border-[1px] border-base-content/20 rounded-md sticky top-4',
})``;
export const GithubNavMenuItem = styled.li.attrs<{ $active?: boolean }>({
  className:
    'github-nav-menu-item relative first:rounded-t-md last:rounded-b-md border-b-[1px] last:border-0 border-base-content/20 cursor-pointer hover:bg-base-content/10',
})`
& {
  padding: 0.5rem 1rem;
}
${(props) => {
  if (props.$active) {
    return css`
    & {
      background-color: color-mix(in oklab, var(--color-base-content) 10%, transparent);
    }
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 2px;
      height: 100%;
      background: #f78166;
      content: ""
    }
    `;
  }
}}
`;
