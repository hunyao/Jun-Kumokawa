import MarkdownPaper from '../MarkdownPaper';
import {render, screen} from '@testing-library/react'

test('Testing UI component MarkdownPaper', () => {
  render(<MarkdownPaper />)

  const element = screen.getByTestId('markdown-paper');
  expect(element).toHaveClass('markdown-paper')
})
