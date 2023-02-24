import ListFilesItemRow from '../ListFilesItemRow';
import {render, screen} from '@testing-library/react'

test('Testing UI component ListFilesItemRow', () => {
  render(<ListFilesItemRow />)

  const element = screen.getByTestId('list-files-item-row');
  expect(element).toHaveClass('list-files-item-row')
})
