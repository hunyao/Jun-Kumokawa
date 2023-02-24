import DiscussionItemAvatar from '../DiscussionItemAvatar';
import {render, screen} from '@testing-library/react'

test('Testing UI component DiscussionItemAvatar', () => {
  render(<DiscussionItemAvatar />)

  const element = screen.getByTestId('discussion-item-avatar');
  expect(element).toHaveClass('discussion-item-avatar')
})
