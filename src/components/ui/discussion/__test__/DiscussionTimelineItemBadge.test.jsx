import DiscussionTimelineItemBadge from '../DiscussionTimelineItemBadge';
import {render, screen} from '@testing-library/react'

test('Testing UI component DiscussionTimelineItemBadge', () => {
  render(<DiscussionTimelineItemBadge />)

  const element = screen.getByTestId('discussion-timeline-item-badge');
  expect(element).toHaveClass('discussion-timeline-item-badge')
})
