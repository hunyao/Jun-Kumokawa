import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import GithubMenuButton from '../GithubMenuButton';

describe('Testing GithubMenuButton', () => {
  test('with props which are random', async () => {
    const onChangeFn = jest.fn();
    let props = {
      menuItems: [
        {value: 'ItemA', text: 'ItemAText'},
        {value: 'ItemB', text: 'ItemBText'},
        {value: 'ItemC', text: 'ItemCText'}
      ],
      value: 'ItemA',
      onChange: onChangeFn,
      subheader: 'dummy-subheader',
      buttonText: 'dummy-button-text'
    }
    const {rerender} = render(<GithubMenuButton {...props} />)

    const githubButton = screen.getByTestId('github-button')
    const arrowDropDownIcon = screen.getByTestId('ArrowDropDownIcon')

    expect(githubButton).toBeInTheDocument();
    expect(githubButton).toHaveTextContent(props.buttonText);
    expect(githubButton).toContainElement(arrowDropDownIcon);

    fireEvent.click(githubButton);

    const githubMenuPopper = screen.getByTestId('github-menu-popper')
    const githubMenuPopperMenuItem0 = screen.getByTestId('github-menu-popper-menu-item-0')
    const githubMenuPopperMenuItem1 = screen.getByTestId('github-menu-popper-menu-item-1')
    const githubMenuPopperMenuItem2 = screen.getByTestId('github-menu-popper-menu-item-2')
    expect(githubMenuPopper).toBeInTheDocument();
    expect(githubMenuPopper).toContainElement(githubMenuPopperMenuItem0);
    expect(githubMenuPopper).toContainElement(githubMenuPopperMenuItem1);
    expect(githubMenuPopper).toContainElement(githubMenuPopperMenuItem2);
    expect(githubMenuPopper).toHaveTextContent(props.subheader);
    expect(githubMenuPopperMenuItem0).toHaveClass('selected');
    expect(githubMenuPopperMenuItem1).not.toHaveClass('selected');
    expect(githubMenuPopperMenuItem2).not.toHaveClass('selected');
    expect(githubMenuPopperMenuItem0).toHaveTextContent(props.menuItems[0].text);
    expect(githubMenuPopperMenuItem1).toHaveTextContent(props.menuItems[1].text);
    expect(githubMenuPopperMenuItem2).toHaveTextContent(props.menuItems[2].text);

    fireEvent.click(githubMenuPopperMenuItem1);
    await waitFor(() => expect(onChangeFn).toHaveBeenCalledWith(props.menuItems[1].value))

    props.value = 'ItemB';
    rerender(<GithubMenuButton {...props} />)

    expect(githubMenuPopperMenuItem0).not.toHaveClass('selected');
    expect(githubMenuPopperMenuItem1).toHaveClass('selected');
    expect(githubMenuPopperMenuItem2).not.toHaveClass('selected');
  })
})
