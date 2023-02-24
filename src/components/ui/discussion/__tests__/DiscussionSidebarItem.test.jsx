import DiscussionSidebarItem from '../DiscussionSidebarItem';
import {render, screen} from '@testing-library/react'

test('Testing UI component DiscussionSidebarItem', () => {
  render(<DiscussionSidebarItem />)

  const element = screen.getByTestId('discussion-sidebar-item');
  expect(element).toHaveClass('discussion-sidebar-item')
})
