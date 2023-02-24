import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import FileNavigation from '../FileNavigation'
import { useNavigate } from "react-router-dom";
import useBranches from '../../hooks/useBranches'
import useTags from '../../hooks/useTags'
import usePathToSha from '../../hooks/usePathToSha'
import useShaToPath from '../../hooks/useShaToPath'

jest.mock('react-router-dom');
jest.mock('../../hooks/useBranches');
jest.mock('../../hooks/useTags');
jest.mock('../../hooks/usePathToSha');
jest.mock('../../hooks/useShaToPath');
describe('Testing FileNavigation', () => {
  const useNavigateFn = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  })
  test('with props mode=overview', async () => {
    useNavigate.mockReturnValue(useNavigateFn)
    useBranches.mockReturnValue([null, 123])
    useTags.mockReturnValue([null, 456])

    const props = {
      mode: 'overview',
      sha: 'dummy_sha'
    }

    render(<FileNavigation {...props} />)

    const element = screen.getByTestId('file-navigation')
    const elementBranches = screen.getByTestId('file-navigation-branches')
    const elementTags = screen.getByTestId('file-navigation-tags')
    const elementGoToFile = screen.getByTestId('file-navigation-go-to-file')
    const elementAddFile = screen.getByTestId('file-navigation-add-file')
    const elementCloneButton = screen.getByTestId('file-navigation-clone-button')
    const githubCloneButton = screen.getByTestId('github-clone-button')
    const elementGoToFileButton = screen.getByTestId('file-navigation-go-to-file-button')

    expect(element).toBeInTheDocument();
    expect(element).toContainElement(elementBranches);
    expect(element).toContainElement(elementTags);
    expect(element).toContainElement(elementGoToFile);
    expect(element).toContainElement(elementAddFile);
    expect(element).toContainElement(elementCloneButton);
    expect(elementCloneButton).toContainElement(githubCloneButton);
    expect(elementBranches).toHaveTextContent('123');
    expect(elementTags).toHaveTextContent('456');

    fireEvent.click(elementGoToFileButton)
    await waitFor(() => expect(useNavigateFn).toHaveBeenCalledWith('/find'))
  })
  test('with props mode=navigation', async () => {
    const getShaFromPathFn = jest.fn()
      .mockReturnValueOnce('e5fa44f2b31c1fb553b6021e7360d07d5d91ff5e')
      .mockReturnValueOnce('7448d8798a4380162d4b56f9b452e2f6f9e24e7a')
      .mockReturnValueOnce('a3db5c13ff90a36963278c6a39e4ee3c22e2a436')
      .mockReturnValueOnce('9c6b057a2b9d96a4067a749ee3b3b0158d390cf1')
    useNavigate.mockReturnValue(useNavigateFn)
    useBranches.mockReturnValue([null, 123])
    useTags.mockReturnValue([null, 456])
    usePathToSha.mockReturnValue(getShaFromPathFn)
    useShaToPath.mockReturnValue(() => ['src/dic1/dic2/dic3/file', false])

    const props = {
      mode: 'navigation',
      sha: 'dummy_sha'
    }

    render(<FileNavigation {...props} />)

    const element = screen.getByTestId('file-navigation')
    const elementBreadcrumbs = screen.getByTestId('file-navigation-breadcrumbs')
    const elementGoToFile = screen.getByTestId('file-navigation-go-to-file')
    const elementOtherButton = screen.getByTestId('file-navigation-other-button')
    const elementBreadcrumbsRoot = screen.getByTestId('file-navigation-breadcrumbs-root')
    const elementBreadcrumbs0 = screen.getByTestId('file-navigation-breadcrumbs-0')
    const elementBreadcrumbs1 = screen.getByTestId('file-navigation-breadcrumbs-1')
    const elementBreadcrumbs2 = screen.getByTestId('file-navigation-breadcrumbs-2')
    const elementBreadcrumbs3 = screen.getByTestId('file-navigation-breadcrumbs-3')
    const elementBreadcrumbsLast = screen.getByTestId('file-navigation-breadcrumbs-last')
    const elementGoToFileButton = screen.getByTestId('file-navigation-go-to-file-button')

    expect(element).toBeInTheDocument();
    expect(element).toContainElement(elementBreadcrumbs);
    expect(element).toContainElement(elementGoToFile);
    expect(element).toContainElement(elementOtherButton);
    expect(elementBreadcrumbs).toContainElement(elementBreadcrumbsRoot);
    expect(elementBreadcrumbs).toContainElement(elementBreadcrumbs0);
    expect(elementBreadcrumbs).toContainElement(elementBreadcrumbs1);
    expect(elementBreadcrumbs).toContainElement(elementBreadcrumbs2);
    expect(elementBreadcrumbs).toContainElement(elementBreadcrumbs3);
    expect(elementBreadcrumbs).toContainElement(elementBreadcrumbsLast);
    expect(elementBreadcrumbsRoot).toHaveTextContent("Jun-Kumokawa");
    expect(elementBreadcrumbs0).toHaveTextContent("src");
    expect(elementBreadcrumbs1).toHaveTextContent("dic1");
    expect(elementBreadcrumbs2).toHaveTextContent("dic2");
    expect(elementBreadcrumbs3).toHaveTextContent("dic3");
    expect(elementBreadcrumbsLast).toHaveTextContent("file");
    expect(elementGoToFile).toContainElement(elementGoToFileButton);

    fireEvent.click(elementBreadcrumbsRoot)
    await waitFor(() => expect(useNavigateFn).toHaveBeenCalledWith('/'))
    fireEvent.click(elementBreadcrumbs0)
    await waitFor(() => expect(getShaFromPathFn).toHaveBeenCalledWith('src'))
    await waitFor(() => expect(useNavigateFn).toHaveBeenCalledWith('/tree/e5fa44f2b31c1fb553b6021e7360d07d5d91ff5e'))
    fireEvent.click(elementBreadcrumbs1)
    await waitFor(() => expect(getShaFromPathFn).toHaveBeenCalledWith('src'))
    await waitFor(() => expect(getShaFromPathFn).toHaveBeenCalledWith('src/dic1'))
    await waitFor(() => expect(useNavigateFn).toHaveBeenCalledWith('/tree/7448d8798a4380162d4b56f9b452e2f6f9e24e7a'))
    fireEvent.click(elementBreadcrumbs2)
    await waitFor(() => expect(getShaFromPathFn).toHaveBeenCalledWith('src'))
    await waitFor(() => expect(getShaFromPathFn).toHaveBeenCalledWith('src/dic1'))
    await waitFor(() => expect(getShaFromPathFn).toHaveBeenCalledWith('src/dic1/dic2'))
    await waitFor(() => expect(useNavigateFn).toHaveBeenCalledWith('/tree/a3db5c13ff90a36963278c6a39e4ee3c22e2a436'))
    fireEvent.click(elementBreadcrumbs3)
    await waitFor(() => expect(getShaFromPathFn).toHaveBeenCalledWith('src'))
    await waitFor(() => expect(getShaFromPathFn).toHaveBeenCalledWith('src/dic1'))
    await waitFor(() => expect(getShaFromPathFn).toHaveBeenCalledWith('src/dic1/dic2'))
    await waitFor(() => expect(getShaFromPathFn).toHaveBeenCalledWith('src/dic1/dic2/dic3'))
    await waitFor(() => expect(useNavigateFn).toHaveBeenCalledWith('/tree/9c6b057a2b9d96a4067a749ee3b3b0158d390cf1'))
    fireEvent.click(elementGoToFileButton)
    await waitFor(() => expect(useNavigateFn).toHaveBeenCalledWith('/find'))
  })
  test('with props mode=navigation without sha', async () => {
    const getShaFromPathFn = jest.fn()
    useNavigate.mockReturnValue(useNavigateFn)
    useBranches.mockReturnValue([null, 123])
    useTags.mockReturnValue([null, 456])
    usePathToSha.mockReturnValue(getShaFromPathFn)
    useShaToPath.mockReturnValue(() => ['', true])

    const props = {
      mode: 'navigation',
      sha: ''
    }

    render(<FileNavigation {...props} />)

    const element = screen.getByTestId('file-navigation')
    const elementBreadcrumbs = screen.queryByTestId('file-navigation-breadcrumbs')
    const elementGoToFile = screen.queryByTestId('file-navigation-go-to-file')
    const elementOtherButton = screen.queryByTestId('file-navigation-other-button')

    expect(element).toBeInTheDocument();
    expect(elementBreadcrumbs).toBe(null);
    expect(elementGoToFile).toBe(null);
    expect(elementOtherButton).toBe(null);
  })
})
