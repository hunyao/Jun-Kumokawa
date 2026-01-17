import styled, { css } from 'styled-components';

export const GithubTab = styled.ul.attrs<{ $variant: 'border' | 'lift' }>({
  className: 'github-tab grid auto-cols-max grid-flow-col gap-2 items-center',
})`
${(props) => {
  switch (props.$variant) {
    case 'border':
      return css`
        border-bottom: 1px solid color-mix(in oklch, var(--color-base-content) 10%, transparent);
        .github-tab-item {
          border-bottom: 2px solid transparent;
        }
        .github-tab-item.active {
          border-bottom: 2px solid var(--github-item-active-underline-color);
        }
      `;
    case 'lift':
      return css`
        padding: 0 .5rem;
        border-bottom: 1px solid color-mix(in oklch, var(--color-base-content) 10%, transparent);
        .github-tab-item {
            border-radius: var(--radius-lg) var(--radius-lg) 0 0;
            background: var(--color-base-300);
            border-bottom: 1px solid color-mix(in oklch, var(--color-base-content) 10%, transparent);
            margin-bottom: -1px;
        }
        .github-tab-item.active {
            border: 1px solid color-mix(in oklch, var(--color-base-content) 10%, transparent);
            border-bottom: 1px solid var(--color-base-300);
        }
      `;
  }
}}
`;
export const GithubTabItem = styled.li.attrs<{
  $active?: boolean;
  $pending?: boolean;
}>((props) => ({
  className: [
    'github-tab-item flex gap-2 items-center text-sm py-2 px-4 cursor-pointer h-full',
    props.$active ? 'active' : '',
  ].join(' '),
}))`
    .loading {
        display: ${(props) => (props.$pending ? '' : 'none')};
    }
    svg {
        fill: var(--github-item-icon-color)
    }
    font-weight: ${(props) => (props.$active ? 'bold' : '')};
`;
