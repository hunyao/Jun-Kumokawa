import DiscussionItemContent from '../DiscussionItemContent';
import {render, screen} from '@testing-library/react'

test('Testing UI component DiscussionItemContent', () => {
  render(<DiscussionItemContent />)

  const element = screen.getByTestId('discussion-item-content');
  expect(element).toHaveClass('discussion-item-content')
})
