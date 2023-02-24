import DiscussionContent from '../DiscussionContent';
import {render, screen} from '@testing-library/react'

test('Testing UI component DiscussionContent', () => {
  render(<DiscussionContent />)

  const element = screen.getByTestId('discussion-content');
  expect(element).toHaveClass('discussion-content')
})
