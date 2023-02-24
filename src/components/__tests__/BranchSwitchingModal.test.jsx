import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import UserEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import MockData from '../../mockData';
import BranchSwitchingModal from '../BranchSwitchingModal'
import useCurrentBranch from '../../hooks/useCurrentBranch'
import useFilterBranches from '../../hooks/useFilterBranches'
import useFilterTags from '../../hooks/useFilterTags'
import useTags from '../../hooks/useTags'

jest.mock('../../hooks/useCurrentBranch')
jest.mock('../../hooks/useFilterBranches')
jest.mock('../../hooks/useFilterTags')
jest.mock('../../hooks/useTags')

describe('Testing BranchSwitchingModal', () => {
  const changeBranchFn = jest.fn();
  const onCloseFn = jest.fn();
  const setSelectedTabFn = jest.fn();
  const setSearchingWordsFn = jest.fn();
  let initialStateFn;
  let spy = jest.spyOn(React, 'useState')

  beforeEach(() => {
    useCurrentBranch.mockReturnValue([ 'main', null, null, changeBranchFn ])
    useFilterBranches.mockReturnValue([ MockData.branches ])
    useFilterTags.mockReturnValue([ MockData.tags ])
    useTags.mockReturnValue([null, MockData.tags.length])
  })
  afterEach(() => {
    jest.clearAllMocks();
  })

  test('Testing BranchSwitchingModal for the prop open=false', async () => {
    initialStateFn = jest.fn()
    .mockReturnValueOnce([0, setSelectedTabFn]) // for selectedTab
    .mockReturnValueOnce(['', setSearchingWordsFn]) // for searchingWords
    spy.mockImplementation(initialStateFn)

    render(<BranchSwitchingModal open={false} onClose={onCloseFn} />)

    const element = screen.getByTestId('github-branch-switching')

    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass('active');
  })
  test('Testing BranchSwitchingModal for the prop open=true', async () => {
    initialStateFn = jest.fn()
    .mockReturnValueOnce([0, setSelectedTabFn]) // for selectedTab
    .mockReturnValueOnce(['', setSearchingWordsFn]) // for searchingWords
    spy.mockImplementation(initialStateFn)

    render(<BranchSwitchingModal open={true} onClose={onCloseFn} />)

    const element = screen.getByTestId('github-branch-switching')

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('active');
  })
  test('Testing BranchSwitchingModal with default props with open=false, Branches is selected, default branch is main', async () => {
    initialStateFn = jest.fn()
    .mockReturnValueOnce([0, setSelectedTabFn]) // for selectedTab
    .mockReturnValueOnce(['', setSearchingWordsFn]) // for searchingWords
    spy.mockImplementation(initialStateFn)

    render(<BranchSwitchingModal open={false} onClose={onCloseFn} />)

    const element = screen.getByTestId('github-branch-switching')
    const elementHeader = screen.getByTestId('github-branch-switching-header')
    const elementHeaderClose = screen.getByTestId('github-branch-switching-header-close')
    const elementSearchInput = screen.getByTestId('github-branch-switching-input')
    const elementTabsChildren1 = screen.getByTestId('github-branch-switching-tabs-1')
    const elementTabsChildren2 = screen.getByTestId('github-branch-switching-tabs-2')
    const elementTabsList0 = screen.getByTestId('github-branch-switching-tab-0')
    const elementTabsList1 = screen.getByTestId('github-branch-switching-tab-1')
    const defaultBranchIconElement = screen.getByTestId('github-branch-switching-list-item-icon-main')
    const AnotherBranchIconElement1 = screen.getByTestId('github-branch-switching-list-item-icon-yeswork')
    const AnotherBranchIconElement2 = screen.getByTestId('github-branch-switching-list-item-icon-gh-pages')
    const AnotherBranchButtonElement2 = screen.getByTestId('github-branch-switching-list-item-button-gh-pages')

    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass('active');
    expect(element).toContainElement(elementHeader);
    expect(elementHeader).toHaveClass('github-branch-switching-item');
    expect(elementSearchInput).toHaveValue('');
    expect(elementSearchInput).toHaveAttribute('placeholder', 'Find a branch');
    expect(elementTabsChildren1).toHaveTextContent('Branches')
    expect(elementTabsChildren1).toHaveClass('Mui-selected')
    expect(elementTabsChildren2).toHaveTextContent('Tags')
    expect(elementTabsChildren2).not.toHaveClass('Mui-selected')
    expect(elementTabsList1).toBeEmptyDOMElement()
    expect(defaultBranchIconElement).toHaveStyle({display: 'inherit'})
    expect(AnotherBranchIconElement1).toHaveStyle({display: 'none'})
    expect(AnotherBranchIconElement2).toHaveStyle({display: 'none'})

    fireEvent.click(elementHeaderClose)
    await waitFor(() => expect(onCloseFn).toHaveBeenCalled())

    fireEvent.click(AnotherBranchButtonElement2)
    await waitFor(() => expect(changeBranchFn).toHaveBeenCalledWith(MockData.branches.find(b => b.name === 'gh-pages'), expect.anything()))

    fireEvent.click(elementTabsChildren2)
    await waitFor(() => expect(setSelectedTabFn).toHaveBeenCalledWith(1))
  })
  test('Testing BranchSwitchingModal with default props with open=false, Tags is selected, default branch is main', async () => {
    initialStateFn = jest.fn()
    .mockReturnValueOnce([1, setSelectedTabFn]) // for selectedTab
    .mockReturnValueOnce(['', setSearchingWordsFn]) // for searchingWords
    spy.mockImplementation(initialStateFn)

    render(<BranchSwitchingModal open={false} onClose={onCloseFn} />)

    const element = screen.getByTestId('github-branch-switching')
    const elementHeader = screen.getByTestId('github-branch-switching-header')
    const elementHeaderClose = screen.getByTestId('github-branch-switching-header-close')
    const elementSearchInput = screen.getByTestId('github-branch-switching-input')
    const elementTabsChildren1 = screen.getByTestId('github-branch-switching-tabs-1')
    const elementTabsChildren2 = screen.getByTestId('github-branch-switching-tabs-2')
    const elementTabsList0 = screen.getByTestId('github-branch-switching-tab-0')
    const elementTabsList1 = screen.getByTestId('github-branch-switching-tab-1')
    const defaultBranchIconElement = screen.getByTestId('github-branch-switching-list-item-icon-v18.2.0')
    const AnotherBranchIconElement1 = screen.getByTestId('github-branch-switching-list-item-icon-v17.0.2')
    const AnotherBranchIconElement2 = screen.getByTestId('github-branch-switching-list-item-icon-v16.6.1')
    const AnotherBranchButtonElement2 = screen.getByTestId('github-branch-switching-list-item-button-v16.6.1')

    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass('active');
    expect(element).toContainElement(elementHeader);
    expect(elementHeader).toHaveClass('github-branch-switching-item');
    expect(elementSearchInput).toHaveValue('');
    expect(elementSearchInput).toHaveAttribute('placeholder', 'Find a tag');
    expect(elementTabsChildren1).toHaveTextContent('Branches')
    expect(elementTabsChildren1).not.toHaveClass('Mui-selected')
    expect(elementTabsChildren2).toHaveTextContent('Tags')
    expect(elementTabsChildren2).toHaveClass('Mui-selected')
    expect(elementTabsList0).toBeEmptyDOMElement()
    expect(elementTabsList1).not.toBeEmptyDOMElement()
    expect(defaultBranchIconElement).toHaveStyle({display: 'none'})
    expect(AnotherBranchIconElement1).toHaveStyle({display: 'none'})
    expect(AnotherBranchIconElement2).toHaveStyle({display: 'none'})

    fireEvent.click(elementHeaderClose)
    await waitFor(() => expect(onCloseFn).toHaveBeenCalled())

    fireEvent.click(AnotherBranchButtonElement2)
    await waitFor(() => expect(changeBranchFn).toHaveBeenCalledWith(MockData.tags.find(b => b.name === 'v16.6.1'), expect.anything()))

    fireEvent.click(elementTabsChildren1)
    await waitFor(() => expect(setSelectedTabFn).toHaveBeenCalledWith(0))
  })
  test('Testing BranchSwitchingModal for filtering with searchingWords in branches', async () => {
    initialStateFn = jest.fn()
    .mockReturnValueOnce([0, setSelectedTabFn]) // for selectedTab
    .mockReturnValueOnce(['main', setSearchingWordsFn]) // for searchingWords
    .mockReturnValueOnce([0, setSelectedTabFn]) // for selectedTab
    .mockReturnValueOnce(['main', setSearchingWordsFn]) // for searchingWords
    spy.mockImplementation(initialStateFn)

    const {rerender} = render(<BranchSwitchingModal open={true} onClose={onCloseFn} />)

    const element = screen.getByTestId('github-branch-switching')
    const elementHeader = screen.getByTestId('github-branch-switching-header')
    const elementSearchInput = screen.getByTestId('github-branch-switching-input')

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('active');
    expect(element).toContainElement(elementHeader);
    expect(elementHeader).toHaveClass('github-branch-switching-item');
    expect(elementSearchInput).toHaveValue('main');

    fireEvent.change(elementSearchInput, { target: { value: "master" } })
    await waitFor(() => expect(setSearchingWordsFn).toHaveBeenCalledWith('master'))

    rerender(<BranchSwitchingModal open={false} onClose={onCloseFn} />);
    await waitFor(() => expect(setSearchingWordsFn).toHaveBeenCalledWith(""))
  })
})
