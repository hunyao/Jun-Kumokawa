import GithubClipboardCopyBase from '../GithubClipboardCopyBase';
import {render, screen} from '@testing-library/react'

test('Testing UI component GithubClipboardCopyBase', () => {
  render(<GithubClipboardCopyBase />)

  const element = screen.getByTestId('github-clipboard-copy-base');
  expect(element).toHaveClass('github-clipboard-copy-base')
})
