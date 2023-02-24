import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import UserEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import BranchSwitching from '../BranchSwitching'
import useCurrentBranch from '../../hooks/useCurrentBranch'

jest.mock('../../hooks/useCurrentBranch')
jest.mock('../BranchSwitchingModal', () => {
  return (props) => {
    return <div {...props}>Mocked BranchSwitchingModal</div>
  }
})
test('Testing BranchSwitching', async () => {
  useCurrentBranch.mockReturnValue([ 'mock-return-value' ])
  let initialStateValue = false;
  const setState = jest.fn().mockReturnValue(true).mockReturnValue(false);
  const spy = jest.spyOn(React, 'useState')
  .mockReturnValue([initialStateValue, setState])

  render(<BranchSwitching />)
  const element = screen.getByTestId('branch-switching')
  const elementButton = screen.getByTestId('branch-switching-button')
  const elementButtonLabel = screen.getByTestId('branch-switching-button-label')
  const elementIcon1 = screen.getByTestId('GitBranchIconIcon')
  const elementIcon2 = screen.getByTestId('ArrowDropDownIcon')
  const elementModal = screen.getByTestId('branch-switching-modal')

  expect(element).toBeInTheDocument();
  expect(element).toContainElement(elementButton);
  expect(elementButton).toContainElement(elementIcon1);
  expect(elementButton).toContainElement(elementIcon2);
  expect(element).toContainElement(elementModal);
  expect(elementButtonLabel).toHaveTextContent('mock-return-value');

  fireEvent.click(elementButton)
  await waitFor(() => expect(setState).toHaveBeenCalledWith(true))

  await UserEvent.pointer({target: document.body, keys: '[TouchA]'})
  await waitFor(() => expect(setState).toHaveBeenCalledWith(false))
})

