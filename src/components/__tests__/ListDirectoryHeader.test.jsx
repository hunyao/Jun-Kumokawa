import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import ListDirectoryHeader from '../ListDirectoryHeader'
import useCommits from '../../hooks/useCommits'

jest.mock('../../hooks/useCommits');
describe('Testing ListDirectoryHeader', () => {
  const spy = jest.spyOn(React, 'useState');
  const setExpendFn = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
  })
  test('with props expand=false', async () => {
    spy.mockReturnValue([false, setExpendFn])
    useCommits.mockReturnValue([null, 123])

    render(<ListDirectoryHeader />)
    const element = screen.getByTestId('list-directory-header')
    const elementExpander = screen.getByTestId('list-directory-header-expander')
    const elementExpand = screen.getByTestId('list-directory-header-expand')
    const githubDetailLink = screen.getByTestId('github-detail-link')
    const githubLinkForName = screen.getByTestId('github-link-for-name')
    const githubLinkForWelcomeMessage = screen.getByTestId('github-link-for-welcome-message')
    const githubLinkForSha = screen.getByTestId('github-link-for-sha')
    const githubLinkForDate = screen.getByTestId('github-link-for-date')
    const githubLinkForFulMessage = screen.getByTestId('github-link-for-full-message')
    const historyIcon = screen.getByTestId('HistoryIcon');

    expect(element).toBeInTheDocument();
    expect(element).toContainElement(githubLinkForName)
    expect(element).toContainElement(githubLinkForWelcomeMessage)
    expect(element).toContainElement(elementExpander)
    expect(element).toContainElement(githubLinkForSha)
    expect(element).toContainElement(githubLinkForDate)
    expect(element).toContainElement(elementExpander)
    expect(element).toContainElement(githubLinkForFulMessage)
    expect(githubDetailLink).toContainElement(historyIcon)
    expect(githubLinkForName).toHaveTextContent('kumokawa')
    expect(githubLinkForWelcomeMessage).toHaveTextContent('Welcome to my website. Enjoy your stay at my website. Now open to work. You can hire me. Feel free to contact to me.')
    expect(elementExpander).toHaveTextContent('...')
    expect(githubLinkForSha).toHaveTextContent('790b524')
    expect(githubLinkForDate).toHaveTextContent('right now')
    expect(githubDetailLink).toHaveTextContent('123')
    expect(githubLinkForFulMessage).toHaveTextContent('Welcome to my website. Enjoy your stay at my website. Now open to work. You can hire me. Feel free to contact to me.')
    expect(elementExpand).toHaveStyle({display: 'none'})

    fireEvent.click(elementExpander);
    await waitFor(() => expect(setExpendFn).toHaveBeenCalledWith(true))
  })
  test('with props expand=true', async () => {
    spy.mockReturnValue([true, setExpendFn])
    useCommits.mockReturnValue([null, 123])

    render(<ListDirectoryHeader />)
    const element = screen.getByTestId('list-directory-header')
    const elementExpander = screen.getByTestId('list-directory-header-expander')
    const elementExpand = screen.getByTestId('list-directory-header-expand')
    const githubDetailLink = screen.getByTestId('github-detail-link')
    const githubLinkForName = screen.getByTestId('github-link-for-name')
    const githubLinkForWelcomeMessage = screen.getByTestId('github-link-for-welcome-message')
    const githubLinkForSha = screen.getByTestId('github-link-for-sha')
    const githubLinkForDate = screen.getByTestId('github-link-for-date')
    const githubLinkForFulMessage = screen.getByTestId('github-link-for-full-message')
    const historyIcon = screen.getByTestId('HistoryIcon');

    expect(element).toBeInTheDocument();
    expect(element).toContainElement(githubLinkForName)
    expect(element).toContainElement(githubLinkForWelcomeMessage)
    expect(element).toContainElement(elementExpander)
    expect(element).toContainElement(githubLinkForSha)
    expect(element).toContainElement(githubLinkForDate)
    expect(element).toContainElement(elementExpander)
    expect(element).toContainElement(githubLinkForFulMessage)
    expect(githubDetailLink).toContainElement(historyIcon)
    expect(githubLinkForName).toHaveTextContent('kumokawa')
    expect(githubLinkForWelcomeMessage).toHaveTextContent('Welcome to my website. Enjoy your stay at my website. Now open to work. You can hire me. Feel free to contact to me.')
    expect(elementExpander).toHaveTextContent('...')
    expect(githubLinkForSha).toHaveTextContent('790b524')
    expect(githubLinkForDate).toHaveTextContent('right now')
    expect(githubDetailLink).toHaveTextContent('123')
    expect(githubLinkForFulMessage).toHaveTextContent('Welcome to my website. Enjoy your stay at my website. Now open to work. You can hire me. Feel free to contact to me.')
    expect(elementExpand).toHaveStyle({display: 'initial'})

    fireEvent.click(elementExpander);
    await waitFor(() => expect(setExpendFn).toHaveBeenCalledWith(false))
  })
})

