import { BarsSvg } from '@icons/index';
import styled from 'styled-components';

export const GithubMenuButton = styled.div.attrs({
  className:
    'github-menu-button cursor-pointer border-[1px] border-base-content/30 rounded p-1 hover:bg-base-content/10',
  children: <BarsSvg className='h-6 w-6 fill-current' />,
})``;
