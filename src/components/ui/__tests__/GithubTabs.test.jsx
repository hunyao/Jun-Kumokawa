import GithubTabs from '../GithubTabs';
import {render, screen} from '@testing-library/react'

test('Testing UI component GithubTabs', () => {
  render(<GithubTabs />)

  const element = screen.getByTestId('github-tabs');
  expect(element).toHaveClass('github-tabs')
})
