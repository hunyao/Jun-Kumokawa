import DiscussionTimelineItemBody from '../DiscussionTimelineItemBody';
import {render, screen} from '@testing-library/react'

test('Testing UI component DiscussionTimelineItemBody', () => {
  render(<DiscussionTimelineItemBody />)

  const element = screen.getByTestId('discussion-timeline-item-body');
  expect(element).toHaveClass('discussion-timeline-item-body')
})
