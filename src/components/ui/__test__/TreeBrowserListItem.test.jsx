import TreeBrowserListItem from '../TreeBrowserListItem';
import {render, screen} from '@testing-library/react'

test('Testing UI component TreeBrowserListItem', () => {
  render(<TreeBrowserListItem />)

  const element = screen.getByTestId('tree-browser-list-item');
  expect(element).toHaveClass('tree-browser-list-item')
})
