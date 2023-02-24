import DiscussionItemContentHeader from '../DiscussionItemContentHeader';
import {render, screen} from '@testing-library/react'

test('Testing UI component DiscussionItemContentHeader', () => {
  render(<DiscussionItemContentHeader />)

  const element = screen.getByTestId('discussion-item-content-header');
  expect(element).toHaveClass('discussion-item-content-header')
})
