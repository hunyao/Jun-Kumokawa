import React from 'react';
import GithubMenuPopper from '../GithubMenuPopper';
import {render, screen} from '@testing-library/react'
import MenuItem from '@mui/material/MenuItem';

test('Testing UI component GithubMenuPopper', () => {
  render(<GithubMenuPopper open />)

  const element = screen.getByTestId('github-menu-popper');
  expect(element).toHaveClass('github-menu-popper')
})
