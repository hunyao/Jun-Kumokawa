import React from 'react'
import { useNavigate } from "react-router-dom";
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import ListDirectoryContent from '../ListDirectoryContent'
import useCurrentBranch from '../../hooks/useCurrentBranch'
import useShaToPath from '../../hooks/useShaToPath'
import usePreviousSha from '../../hooks/usePreviousSha'
import * as MockTreeCommitsJson from '../../mockData/__jsons__/tree-commits/fixtures_concurrent_time-slicing'
import MockTreeJson from '../../mockData/__jsons__/tree/fixtures_concurrent_time-slicing.json'
import { OctokitInstance } from '../../plugins/Octokit';
import moment from 'moment';

jest.mock('../../plugins/Octokit')
jest.mock('react-router-dom')
jest.mock('../../hooks/useCurrentBranch')
jest.mock('../../hooks/useShaToPath')
jest.mock('../../hooks/usePreviousSha')
jest.mock('../Loading', () => {
  return ({loading, children, ...rest}) => {
    if (loading) {
      return <div data-testid="loading" {...rest}>Loading...</div>
    } else {
      return <div data-testid="loading" {...rest}>{children}</div>
    }
  }
})
const makeTreeForDisplays = () => {
  return MockTreeJson.tree.map(t => {
    // const name = t.path.split('.')[0]
    return {
      t,
      commit: MockTreeCommitsJson.MAP[t.path]
    }
  }).map(({t, commit}) => {
    return {
      subject: commit[0]?.commit?.message || '',
      committerDate: commit[0]?.commit?.committer?.date || '',
      fileType: t.type,
      path: t.path,
      sha: t.sha
    }
  })
}
describe('Testing ListDirectoryContent', () => {
  const spy = jest.spyOn(React, 'useState');
  const setTreeForDisplaysFn = jest.fn();
  const setLoadingFn = jest.fn();
  const setShowFn = jest.fn();
  const navigateFn = jest.fn();
  const getPathFromShaFn = jest.fn();
  const regExpForNoLine = /(\r|\n)+/g

  beforeEach(() => {
    useCurrentBranch.mockReturnValue([null, '6b6d0617eff48860c5b4e3e79c74cbd3312cf45a'])
    useShaToPath.mockImplementation(() => getPathFromShaFn)
    useNavigate.mockReturnValue(navigateFn)
    OctokitInstance.request.mockImplementation(async (argv, options) => {
      return {data: MockTreeCommitsJson.MAP[options.path.replace('/', '')]}
    })
    getPathFromShaFn.mockImplementation((sha) => {
      return [MockTreeJson.tree.find(t => t.sha === sha).path]
    })
  })
  afterEach(() => {
    jest.clearAllMocks();
  })
  test('with props loading=true', async () => {
    const mockDataForTree = makeTreeForDisplays();
    spy
    .mockReturnValueOnce([mockDataForTree, setTreeForDisplaysFn])
    .mockReturnValueOnce([true, setLoadingFn])
    .mockReturnValueOnce([false, setShowFn])
    usePreviousSha.mockReturnValue(['e5fa44f2b31c1fb553b6021e7360d07d5d91ff5e', true])

    const props = {
      trees: MockTreeJson.tree,
      sha: MockTreeJson.sha,
      type: 'tree'
    }
    render(<ListDirectoryContent {...props} />)
    const elementLoading = screen.getByTestId('loading')
    expect(elementLoading).toBeInTheDocument();
    expect(elementLoading).toHaveTextContent('Loading...');
  })
  test('with props loading=false isRootPath=true', async () => {
    const mockDataForTree = makeTreeForDisplays();
    spy
    .mockReturnValueOnce([mockDataForTree, setTreeForDisplaysFn])
    .mockReturnValueOnce([false, setLoadingFn])
    .mockReturnValueOnce([false, setShowFn])
    usePreviousSha.mockReturnValue(['e5fa44f2b31c1fb553b6021e7360d07d5d91ff5e', true])

    const props = {
      trees: MockTreeJson.tree,
      sha: MockTreeJson.sha,
      type: 'tree'
    }
    render(<ListDirectoryContent {...props} />)

    const element = screen.getByTestId('list-directory-content')
    const elementRootItem = screen.getByTestId('list-directory-content-root-item')
    const elementRootItemLink = screen.getByTestId('list-directory-content-root-item-link')
    const listFilesItemRows = [0, 1, 2, 3, 4, 5].map(i => {
      return screen.getByTestId('list-files-item-row-' + i);
    });
    const listFilesItemRowIcons = [0, 1, 2, 3, 4, 5].map(i => {
      return screen.getByTestId('list-files-item-row-icon-' + i);
    });
    const listFilesItemRowLinks = [0, 1, 2, 3, 4, 5].map(i => {
      return screen.getByTestId('list-files-item-row-link-' + i);
    });
    const listFilesItemRowSubjects = [0, 1, 2, 3, 4, 5].map(i => {
      return screen.getByTestId('list-files-item-row-subject-' + i);
    });
    const listFilesItemRowDates = [0, 1, 2, 3, 4, 5].map(i => {
      return screen.getByTestId('list-files-item-row-date-' + i);
    });

    expect(element).toBeInTheDocument();
    expect(elementRootItem).not.toBeVisible();
    listFilesItemRows.forEach((row, i) => {
      expect(row).toContainElement(listFilesItemRowLinks[i]);
      expect(row).toContainElement(listFilesItemRowSubjects[i]);
      expect(row).toContainElement(listFilesItemRowDates[i]);
      expect(row).toContainElement(listFilesItemRowIcons[i]);
    })
    listFilesItemRowIcons.forEach((row, i) => {
      expect(row).toHaveClass('icon-type-' + mockDataForTree[i].fileType)
    })
    listFilesItemRowSubjects.forEach((row, i) => {
      expect(row.textContent.replace(regExpForNoLine, '')).toEqual(mockDataForTree[i].subject.replace(regExpForNoLine, ''))
    })
    listFilesItemRowDates.forEach((row, i) => {
      expect(row).toHaveTextContent(moment(mockDataForTree[i].committerDate).fromNow())
    })
    await waitFor(() => expect(setTreeForDisplaysFn).toHaveBeenCalledWith(mockDataForTree))

    listFilesItemRowLinks.forEach((row, i) => {
      fireEvent.click(row)
      const { fileType, sha } = mockDataForTree[i];
      expect(navigateFn).toHaveBeenNthCalledWith(i+1, `/${fileType}/${sha}`)
    })
    fireEvent.click(elementRootItemLink)
    expect(navigateFn).toHaveBeenCalledWith('/tree/e5fa44f2b31c1fb553b6021e7360d07d5d91ff5e')
  })
  test('with props loading=false isRootPath=false', async () => {
    const mockDataForTree = makeTreeForDisplays();
    spy
    .mockReturnValueOnce([mockDataForTree, setTreeForDisplaysFn])
    .mockReturnValueOnce([false, setLoadingFn])
    .mockReturnValueOnce([false, setShowFn])
    usePreviousSha.mockReturnValue(['e5fa44f2b31c1fb553b6021e7360d07d5d91ff5e', false])

    const props = {
      trees: MockTreeJson.tree,
      sha: MockTreeJson.sha,
      type: 'tree'
    }
    render(<ListDirectoryContent {...props} />)

    const element = screen.getByTestId('list-directory-content')
    const elementRootItem = screen.getByTestId('list-directory-content-root-item')
    const elementRootItemLink = screen.getByTestId('list-directory-content-root-item-link')
    const listFilesItemRows = [0, 1, 2, 3, 4, 5].map(i => {
      return screen.getByTestId('list-files-item-row-' + i);
    });
    const listFilesItemRowIcons = [0, 1, 2, 3, 4, 5].map(i => {
      return screen.getByTestId('list-files-item-row-icon-' + i);
    });
    const listFilesItemRowLinks = [0, 1, 2, 3, 4, 5].map(i => {
      return screen.getByTestId('list-files-item-row-link-' + i);
    });
    const listFilesItemRowSubjects = [0, 1, 2, 3, 4, 5].map(i => {
      return screen.getByTestId('list-files-item-row-subject-' + i);
    });
    const listFilesItemRowDates = [0, 1, 2, 3, 4, 5].map(i => {
      return screen.getByTestId('list-files-item-row-date-' + i);
    });

    expect(element).toBeInTheDocument();
    expect(elementRootItem).toBeVisible();
    listFilesItemRows.forEach((row, i) => {
      expect(row).toContainElement(listFilesItemRowLinks[i]);
      expect(row).toContainElement(listFilesItemRowSubjects[i]);
      expect(row).toContainElement(listFilesItemRowDates[i]);
      expect(row).toContainElement(listFilesItemRowIcons[i]);
    })
    listFilesItemRowIcons.forEach((row, i) => {
      expect(row).toHaveClass('icon-type-' + mockDataForTree[i].fileType)
    })
    listFilesItemRowSubjects.forEach((row, i) => {
      expect(row.textContent.replace(regExpForNoLine, '')).toEqual(mockDataForTree[i].subject.replace(regExpForNoLine, ''))
    })
    listFilesItemRowDates.forEach((row, i) => {
      expect(row).toHaveTextContent(moment(mockDataForTree[i].committerDate).fromNow())
    })
    await waitFor(() => expect(setTreeForDisplaysFn).toHaveBeenCalledWith(mockDataForTree))

    listFilesItemRowLinks.forEach((row, i) => {
      fireEvent.click(row)
      const { fileType, sha } = mockDataForTree[i];
      expect(navigateFn).toHaveBeenNthCalledWith(i+1, `/${fileType}/${sha}`)
    })
    fireEvent.click(elementRootItemLink)
    expect(navigateFn).toHaveBeenCalledWith('/tree/e5fa44f2b31c1fb553b6021e7360d07d5d91ff5e')
  })
  test('with props loading=false isRootPath=false type=blob', async () => {
    const mockDataForTree = makeTreeForDisplays();
    spy
    .mockReturnValueOnce([mockDataForTree, setTreeForDisplaysFn])
    .mockReturnValueOnce([false, setLoadingFn])
    .mockReturnValueOnce([false, setShowFn])
    usePreviousSha.mockReturnValue(['e5fa44f2b31c1fb553b6021e7360d07d5d91ff5e', false])

    const props = {
      trees: MockTreeJson.tree,
      sha: MockTreeJson.sha,
      type: 'blob'
    }
    const {container} = render(<ListDirectoryContent {...props} />)
    expect(container).toBeEmptyDOMElement()
  })
})
