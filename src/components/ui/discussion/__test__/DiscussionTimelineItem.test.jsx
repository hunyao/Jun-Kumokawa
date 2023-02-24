import DiscussionTimelineItem from '../DiscussionTimelineItem';
import {render, screen} from '@testing-library/react'

test('Testing UI component DiscussionTimelineItem', () => {
  render(<DiscussionTimelineItem />)

  const element = screen.getByTestId('discussion-timeline-item');
  expect(element).toHaveClass('discussion-timeline-item')
})
