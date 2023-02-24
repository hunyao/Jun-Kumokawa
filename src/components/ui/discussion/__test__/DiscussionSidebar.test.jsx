import DiscussionSidebar from '../DiscussionSidebar';
import {render, screen} from '@testing-library/react'

test('Testing UI component DiscussionSidebar', () => {
  render(<DiscussionSidebar />)

  const element = screen.getByTestId('discussion-sidebar');
  expect(element).toHaveClass('discussion-sidebar')
})
