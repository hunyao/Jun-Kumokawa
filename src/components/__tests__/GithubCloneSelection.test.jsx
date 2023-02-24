import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import GithubCloneSelection from '../GithubCloneSelection';
import { wrapper } from '../../hooks/__test__/customRender'
import MockData from '../../hooks/__test__/__mockData__';

jest.mock('../GithubClipboardCopy', () => {
  return ({copyText, ...rest}) => <div {...rest} data-testid="github-clipboard-copy">This is GithubClipboardCopy component. The copyText is {copyText}</div>
})
jest.mock('../TabMenu', () => {
  return (props) => <div {...props} data-testid="tab-menu">This is TabMenu component.</div>
})
describe('Testing GithubCloneSelection', () => {
  const spyState = jest.spyOn(React, 'useState');
  const setMenuIdFn = jest.fn();
  const setCopyTextFn = jest.fn();

  beforeEach(() => {
  })
  afterEach(() => {
    jest.clearAllMocks();
  })

  test('with menuId=0', async () => {
    spyState
    .mockReturnValueOnce([0, setMenuIdFn])
    .mockReturnValueOnce(['', setCopyTextFn])

    render(<GithubCloneSelection />, {wrapper})

    const element = screen.getByTestId('github-clone-selection')
    const tabMenu = screen.getByTestId('tab-menu')
    const githubClipboardCopy = screen.getByTestId('github-clipboard-copy')

    expect(element).toBeInTheDocument();
    expect(element).toContainElement(tabMenu);
    expect(element).toContainElement(githubClipboardCopy);
    expect(element).toHaveTextContent('Use Git or checkout with SVN using the web URL.');
    expect(setCopyTextFn).toHaveBeenCalledWith(MockData.repository['clone_url'])
  })
  test('with menuId=1', async () => {
    spyState
    .mockReturnValueOnce([1, setMenuIdFn])
    .mockReturnValueOnce(['', setCopyTextFn])
    render(<GithubCloneSelection />, {wrapper})

    const element = screen.getByTestId('github-clone-selection')
    const tabMenu = screen.getByTestId('tab-menu')
    const githubClipboardCopy = screen.getByTestId('github-clipboard-copy')

    expect(element).toBeInTheDocument();
    expect(element).toContainElement(tabMenu);
    expect(element).toContainElement(githubClipboardCopy);
    expect(element).toHaveTextContent('Use a password-protected SSH key.');
    expect(setCopyTextFn).toHaveBeenCalledWith(MockData.repository['ssh_url'])
  })
  test('with menuId=2', async () => {
    spyState
    .mockReturnValueOnce([2, setMenuIdFn])
    .mockReturnValueOnce(['', setCopyTextFn])
    render(<GithubCloneSelection />, {wrapper})

    const element = screen.getByTestId('github-clone-selection')
    const tabMenu = screen.getByTestId('tab-menu')
    const githubClipboardCopy = screen.getByTestId('github-clipboard-copy')

    expect(element).toBeInTheDocument();
    expect(element).toContainElement(tabMenu);
    expect(element).toContainElement(githubClipboardCopy);
    expect(element).toHaveTextContent('Work fast with our official CLI. Learn more.');
    expect(setCopyTextFn).toHaveBeenCalledWith(MockData.repository['git_url'])
  })
})
