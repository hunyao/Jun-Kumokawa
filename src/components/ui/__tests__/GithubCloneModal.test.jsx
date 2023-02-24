import GithubCloneModal from '../GithubCloneModal';
import {render, screen} from '@testing-library/react'

test('Testing UI component GithubCloneModal', () => {
  render(<GithubCloneModal />)

  const element = screen.getByTestId('github-clone-modal');
  expect(element).toHaveClass('github-clone-modal')
})
