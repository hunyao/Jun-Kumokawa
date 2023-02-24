import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import TabMenu from '../TabMenu'
import ZipIcon from '../../assets/svgs/svg-zip'
import CatIcon from '../../assets/svgs/svg-cat'
import CopyIcon from '../../assets/svgs/svg-copy'

describe('Testing TabMenu', () => {
  test('with props', async () => {
    const onChangeFn = jest.fn();
    const props = {
      menus: [
        {name: 'menuA', icon: <ZipIcon />, menuId: 1},
        {name: 'menuB', icon: <CatIcon />, menuId: 2},
        {name: 'menuC', icon: <CopyIcon />, menuId: 3},
      ],
      onChange: onChangeFn,
      value: 1
    }
    render(<TabMenu {...props} />)
    const element = screen.getByTestId('github-tabs')
    const elementTab0 = screen.getByTestId('github-tab-0')
    const elementTab1 = screen.getByTestId('github-tab-1')
    const elementTab2 = screen.getByTestId('github-tab-2')
    const zipIcon = screen.getByTestId('ZipIconIcon')
    const catIcon = screen.getByTestId('CatIconIcon')
    const copyIcon = screen.getByTestId('CopyIconIcon')

    expect(element).toBeInTheDocument();
    expect(element).toContainElement(elementTab0);
    expect(element).toContainElement(elementTab1);
    expect(element).toContainElement(elementTab2);
    expect(elementTab0).toContainElement(zipIcon);
    expect(elementTab1).toContainElement(catIcon);
    expect(elementTab2).toContainElement(copyIcon);
    expect(elementTab0).toHaveTextContent('menuA');
    expect(elementTab1).toHaveTextContent('menuB');
    expect(elementTab2).toHaveTextContent('menuC');
    expect(elementTab0).toHaveClass('Mui-selected');
    expect(elementTab1).not.toHaveClass('Mui-selected');
    expect(elementTab2).not.toHaveClass('Mui-selected');

    fireEvent.click(elementTab1);
    await waitFor(() => expect(onChangeFn).toHaveBeenCalledWith(2))
    fireEvent.click(elementTab2);
    await waitFor(() => expect(onChangeFn).toHaveBeenCalledWith(3))

  })
})

