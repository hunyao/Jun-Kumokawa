import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import ListDirectory from '../ListDirectory'
import ListDirectoryHeader from '../ListDirectoryHeader'
import ListDirectoryContent from '../ListDirectoryContent'

jest.mock('../ListDirectoryHeader')
jest.mock('../ListDirectoryContent')
test('Testing ListDirectory', () => {
  ListDirectoryContent.mockImplementation(() => <div data-testid="list-directory-content">This is ListDirectoryContent component. </div>)
  ListDirectoryHeader.mockImplementation(() => <div data-testid="list-directory-header" {...props}>This is ListDirectoryHeader component</div>)

  const props = {
    type: 'tree',
    sha: 'e5fa44f2b31c1fb553b6021e7360d07d5d91ff5e',
    trees: []
  }
  render(<ListDirectory {...props} />)
  const element = screen.getByTestId('list-directory')
  const elementHeader = screen.getByTestId('list-directory-header')
  const elementContent = screen.getByTestId('list-directory-content')

  expect(element).toBeInTheDocument();
  expect(element).toContainElement(elementHeader)
  expect(element).toContainElement(elementContent)
  expect(ListDirectoryContent).toHaveBeenCalledWith(props, {})
})

