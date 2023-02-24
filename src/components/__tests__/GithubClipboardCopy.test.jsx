import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import UserEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import GithubClipboardCopy from '../GithubClipboardCopy'

describe('Testing GithubClipboardCopy', () => {
  let originalNavigator = navigator;
  afterEach(() => {
    jest.clearAllMocks();
  })

  test('if it can copy the text with touching and Ctrl-C', async () => {
    const props = {
      copyText: 'copied text'
    }

    render(<GithubClipboardCopy {...props} />)

    const element = screen.getByTestId('github-clipboard-copy')
    const githubClipboardCopyBase = screen.getByTestId('github-clipboard-copy-base')
    const githubClipboardCopyBaseInput = screen.getByTestId('github-clipboard-copy-base-input')
    const githubClipboardCopyBaseButton = screen.getByTestId('github-clipboard-copy-base-button')
    const copyIcon = screen.getByTestId('CopyIconIcon')
    const inputElement = screen.getByDisplayValue(props.copyText)

    expect(element).toBeInTheDocument();
    expect(element).toContainElement(githubClipboardCopyBase);
    expect(githubClipboardCopyBase).toContainElement(githubClipboardCopyBaseInput)
    expect(githubClipboardCopyBase).toContainElement(githubClipboardCopyBaseButton)
    expect(githubClipboardCopyBaseButton).toContainElement(copyIcon)
    expect(githubClipboardCopyBaseInput).toContainElement(inputElement)

    const user = UserEvent.setup();
    await user.pointer({keys: '[TouchA]', target: inputElement})
    await waitFor(() => expect(inputElement).toHaveFocus())
    const system = await user.copy();
    await waitFor(() => expect(system.getData('text')).toBe(props.copyText))
  })
  test('if it can copy the text by pushing the button', async () => {
    const props = {
      copyText: 'copied text'
    }

    render(<GithubClipboardCopy {...props} />)

    const element = screen.getByTestId('github-clipboard-copy')
    const githubClipboardCopyBase = screen.getByTestId('github-clipboard-copy-base')
    const githubClipboardCopyBaseInput = screen.getByTestId('github-clipboard-copy-base-input')
    const githubClipboardCopyBaseButton = screen.getByTestId('github-clipboard-copy-base-button')
    const copyIcon = screen.getByTestId('CopyIconIcon')
    const inputElement = screen.getByDisplayValue(props.copyText)

    expect(element).toBeInTheDocument();
    expect(element).toContainElement(githubClipboardCopyBase);
    expect(githubClipboardCopyBase).toContainElement(githubClipboardCopyBaseInput)
    expect(githubClipboardCopyBase).toContainElement(githubClipboardCopyBaseButton)
    expect(githubClipboardCopyBaseButton).toContainElement(copyIcon)
    expect(githubClipboardCopyBaseInput).toContainElement(inputElement)

    fireEvent.click(githubClipboardCopyBaseButton);
    const checkIcon = screen.getByTestId('CheckIcon')
    expect(githubClipboardCopyBaseButton).toContainElement(checkIcon)
    const [ clipboardData ] = await originalNavigator.clipboard.read();
    const data = await clipboardData.data['text/plain'];
    expect(data).toBe(props.copyText)
  })
})
