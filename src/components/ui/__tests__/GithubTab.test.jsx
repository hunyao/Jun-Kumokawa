import GithubTab from '../GithubTab';
import {render, screen} from '@testing-library/react'

test('Testing UI component GithubTab', () => {
  render(<GithubTab />)

  const element = screen.getByTestId('github-tab');
  expect(element).toHaveClass('github-tab')
})
