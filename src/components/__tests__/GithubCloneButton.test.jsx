import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import GithubCloneButton from '../GithubCloneButton'
import useCurrentBranch from '../../hooks/useCurrentBranch'

jest.mock('../../hooks/useCurrentBranch')
jest.mock('../GithubCloneSelection', () => {
  return (props) => <div {...props}>This is GithubCloneSelection component</div>
})
describe('Testing GithubCloneButton', () => {
  const spy = jest.spyOn(React, 'useState');
  const setOpenFn = jest.fn();

  beforeEach(() => {
    useCurrentBranch.mockReturnValue([ 'dummy-current-branch' ])
  })
  afterEach(() => {
    jest.clearAllMocks();
  })

  test('with open=false', async () => {
    spy.mockReturnValue([false, setOpenFn])

    render(<GithubCloneButton />)

    const element = screen.getByTestId('github-clone-button')
    const elementButton = screen.getByTestId('github-clone-button-button')
    const githubCloneModal = screen.getByTestId('github-clone-modal')
    const githubCloneModalHeader = screen.getByTestId('github-clone-modal-header')
    const githubCloneModalHeaderHelp = screen.getByTestId('github-clone-modal-header-help')
    const githubCloneModalDownloadZip = screen.getByTestId('github-clone-modal-download-zip')
    const arrowDropDownIcon = screen.getByTestId('ArrowDropDownIcon')
    const terminalIcon = screen.getByTestId('TerminalIcon')
    const helpOutlineOutlinedIcon = screen.getByTestId('HelpOutlineOutlinedIcon')
    const zipIcon = screen.getByTestId('ZipIconIcon')

    expect(element).toBeInTheDocument();
    expect(element).toContainElement(elementButton);
    expect(element).toContainElement(githubCloneModal);
    expect(githubCloneModal).not.toHaveClass('active');
    expect(githubCloneModal).toContainElement(githubCloneModalHeader);
    expect(githubCloneModal).toContainElement(githubCloneModalHeaderHelp);
    expect(githubCloneModal).toContainElement(githubCloneModalDownloadZip);
    expect(elementButton).toContainElement(arrowDropDownIcon);
    expect(elementButton).toHaveTextContent('Code');
    expect(githubCloneModalHeader).toContainElement(terminalIcon);
    expect(githubCloneModalHeader).toHaveTextContent('Clone');
    expect(githubCloneModalHeaderHelp).toContainElement(helpOutlineOutlinedIcon);
    expect(githubCloneModalDownloadZip).toContainElement(zipIcon);
    expect(githubCloneModalDownloadZip).toHaveTextContent('Download ZIP');
    expect(githubCloneModalDownloadZip).toHaveAttribute('href', 'https://github.com/hunyao/Jun-Kumokawa/archive/refs/heads/dummy-current-branch.zip');

    fireEvent.click(elementButton);
    await waitFor(() => expect(setOpenFn).toHaveBeenCalledWith(true))
  })
  test('with open=true', async () => {
    spy.mockReturnValue([true, setOpenFn])

    render(<GithubCloneButton />)

    const element = screen.getByTestId('github-clone-button')
    const elementButton = screen.getByTestId('github-clone-button-button')
    const githubCloneModal = screen.getByTestId('github-clone-modal')
    const githubCloneModalHeader = screen.getByTestId('github-clone-modal-header')
    const githubCloneModalHeaderHelp = screen.getByTestId('github-clone-modal-header-help')
    const githubCloneModalDownloadZip = screen.getByTestId('github-clone-modal-download-zip')
    const arrowDropDownIcon = screen.getByTestId('ArrowDropDownIcon')
    const terminalIcon = screen.getByTestId('TerminalIcon')
    const helpOutlineOutlinedIcon = screen.getByTestId('HelpOutlineOutlinedIcon')
    const zipIcon = screen.getByTestId('ZipIconIcon')

    expect(element).toBeInTheDocument();
    expect(element).toContainElement(elementButton);
    expect(element).toContainElement(githubCloneModal);
    expect(githubCloneModal).toHaveClass('active');
    expect(githubCloneModal).toContainElement(githubCloneModalHeader);
    expect(githubCloneModal).toContainElement(githubCloneModalHeaderHelp);
    expect(githubCloneModal).toContainElement(githubCloneModalDownloadZip);
    expect(elementButton).toContainElement(arrowDropDownIcon);
    expect(elementButton).toHaveTextContent('Code');
    expect(githubCloneModalHeader).toContainElement(terminalIcon);
    expect(githubCloneModalHeader).toHaveTextContent('Clone');
    expect(githubCloneModalHeaderHelp).toContainElement(helpOutlineOutlinedIcon);
    expect(githubCloneModalDownloadZip).toContainElement(zipIcon);
    expect(githubCloneModalDownloadZip).toHaveTextContent('Download ZIP');
    expect(githubCloneModalDownloadZip).toHaveAttribute('href', 'https://github.com/hunyao/Jun-Kumokawa/archive/refs/heads/dummy-current-branch.zip');

    fireEvent.click(elementButton);
    await waitFor(() => expect(setOpenFn).toHaveBeenCalledWith(false))
  })
})
