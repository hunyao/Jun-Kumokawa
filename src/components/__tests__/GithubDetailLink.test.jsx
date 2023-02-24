import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import GithubDetailLink from '../GithubDetailLink';
import HistoryIcon from '@mui/icons-material/History';
import SvgIcon from '@mui/material/SvgIcon';

describe('Testing GithubDetailLink', () => {
  test('with props which are random', async () => {
    const propIcon = <SvgIcon component={HistoryIcon} />
    const props = {
      href: 'https://kumokawa.jun',
      icon: propIcon,
      number: 123,
      name: 'prop-name'
    }
    render(<GithubDetailLink {...props} />)

    const element = screen.getByTestId('github-detail-link')
    const historyIcon = screen.getByTestId('HistoryIcon')

    expect(element).toBeInTheDocument();
    expect(element).toContainElement(historyIcon);
    expect(element).toHaveAttribute('href', 'https://kumokawa.jun');
    expect(element).toHaveTextContent('123');
    expect(element).toHaveTextContent('prop-name');
  })
})
