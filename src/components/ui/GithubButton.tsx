import type { ComponentProps, CSSProperties } from 'react';
import styled from 'styled-components';
import { CaretDownSvg, CodeBranchSvg } from '#icons/index';

export const GithubButton = styled.button.attrs<{
  $variant: 'border' | 'ghost';
  $fullWidth?: boolean;
}>({
  className:
    'github-button rounded-lg flex items-center gap-2 py-1 px-3 cursor-pointer',
})`
width: ${(props) => (props.$fullWidth === true ? '' : 'max-content')};
border: ${(props) => (props.$variant === 'border' ? 'solid 1px color-mix(in oklch, var(--color-base-content) 20%, transparent)' : '')};
background: var(--github-button-bg, var(--color-base-100));
&:hover {
  background: color-mix(in oklch, var(--github-button-bg, var(--color-base-100)), var(--color-base-content) 10%)
}
`;
export const GithubDropdownButton = ({
  children,
  ...rest
}: Omit<ComponentProps<typeof GithubButton>, '$variant'>) => {
  return (
    <GithubButton $variant='border' {...rest}>
      {children}
      <CaretDownSvg className='h-3 w-3 fill-current' />
    </GithubButton>
  );
};
export const GithubBranchDropdownButton = ({
  children,
  ...rest
}: Omit<ComponentProps<typeof GithubButton>, '$variant'>) => {
  const style = {
    '--github-button-bg':
      'color-mix(in oklch, var(--color-base-content) 10%, transparent)',
  } as CSSProperties;
  return (
    <GithubButton
      className='text-base-content/60'
      style={style}
      $variant='border'
      {...rest}
    >
      <CodeBranchSvg className='h-4 w-4 fill-current' />
      {children}
      <CaretDownSvg className='ml-auto h-3 w-3 fill-current' />
    </GithubButton>
  );
};
