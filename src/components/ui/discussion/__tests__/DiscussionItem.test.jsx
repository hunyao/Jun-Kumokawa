import DiscussionItem from '../DiscussionItem';
import {render, screen} from '@testing-library/react'

test('Testing UI component DiscussionItem', () => {
  render(<DiscussionItem />)

  const element = screen.getByTestId('discussion-item');
  expect(element).toHaveClass('discussion-item')
})
