import GithubButton from '../GithubButton';
import {render, screen} from '@testing-library/react'

test('Testing UI component GithubButton', () => {
  render(<GithubButton />)

  const element = screen.getByTestId('github-button');
  expect(element).toHaveClass('github-button')
})
