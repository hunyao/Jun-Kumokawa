import ListDirectoryToolbar from '../ListDirectoryToolbar';
import {render, screen} from '@testing-library/react'

test('Testing UI component ListDirectoryToolbar', () => {
  render(<ListDirectoryToolbar />)

  const element = screen.getByTestId('list-directory-toolbar');
  expect(element).toHaveClass('list-directory-toolbar')
})
