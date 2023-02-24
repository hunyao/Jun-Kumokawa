import GithubInput from '../GithubInput';
import {render, screen} from '@testing-library/react'

test('Testing UI component GithubInput', () => {
  render(<GithubInput />)

  const element = screen.getByTestId('github-input');
  expect(element).toHaveClass('github-input')
})
