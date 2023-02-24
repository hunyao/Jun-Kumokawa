import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import SidebarItem from '../SidebarItem'

describe('Testing SidebarItem', ()=> {
  test('with props', () => {
    const props = {
      title: 'Dummy Title'
    }
    const children = <div data-testid="sidebar-item-children">This is the children element</div>
    render(
      <SidebarItem {...props}>
        {children}
      </SidebarItem>
    )
    const element = screen.getByTestId('sidebar-item')
    const elementTitle = screen.getByTestId('sidebar-item-title')
    const elementChildren = screen.getByTestId('sidebar-item-children')
    expect(elementTitle).toHaveTextContent("Dummy Title");
    expect(element).toContainElement(elementChildren);
  })
})

