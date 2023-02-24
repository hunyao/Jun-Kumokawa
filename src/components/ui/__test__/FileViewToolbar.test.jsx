import FileViewToolbar from '../FileViewToolbar';
import {render, screen} from '@testing-library/react'

test('Testing UI component FileViewToolbar', () => {
  render(<FileViewToolbar />)

  const element = screen.getByTestId('file-view-toolbar');
  expect(element).toHaveClass('file-view-toolbar')
})
