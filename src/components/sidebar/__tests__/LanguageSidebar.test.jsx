import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import LanguageSidebar from '../LanguageSidebar'

describe('Testing LanguageSidebar', ()=> {
  test('with props', () => {
    const props = {
      groupName: 'Dummy Group Name',
      items: [
        {
          label: 'labelA',
          value: 1,
          colorHex: '#123456'
        },
        {
          label: 'labelB',
          value: 2,
          colorHex: '#A2A2A2'
        }
      ]
    }
    render(<LanguageSidebar {...props} />)

    const element = screen.getByTestId('sidebar-item')
    const elementTitle = screen.getByTestId('sidebar-item-title')
    const githubProgress = screen.getByTestId('github-progress')
    const githubProgressChildren0 = screen.getByTestId('github-progress-children-0')
    const githubProgressChildren1 = screen.getByTestId('github-progress-children-1')
    const githubProgressLabelChildrenIcon0 = screen.getByTestId('github-progress-label-children-icon-0')
    const githubProgressLabelChildrenIcon1 = screen.getByTestId('github-progress-label-children-icon-1')
    const githubProgressLabelChildrenLabel0 = screen.getByTestId('github-progress-label-children-label-0')
    const githubProgressLabelChildrenLabel1 = screen.getByTestId('github-progress-label-children-label-1')
    const githubProgressLabelChildrenValue0 = screen.getByTestId('github-progress-label-children-value-0')
    const githubProgressLabelChildrenValue1 = screen.getByTestId('github-progress-label-children-value-1')

    expect(element).toBeInTheDocument();
    expect(element).toContainElement(githubProgress);
    expect(elementTitle).toHaveTextContent("Dummy Group Name");
    expect(githubProgressChildren0).toHaveStyle({background: '#123456', width: ((1/3)*100) + "%"})
    expect(githubProgressChildren1).toHaveStyle({background: '#A2A2A2', width: ((2/3)*100) + "%"})
    expect(githubProgressLabelChildrenIcon0).toHaveStyle({color: '#123456'})
    expect(githubProgressLabelChildrenIcon1).toHaveStyle({color: '#A2A2A2'})
    expect(githubProgressLabelChildrenLabel0).toHaveTextContent('labelA')
    expect(githubProgressLabelChildrenLabel1).toHaveTextContent('labelB')
    expect(githubProgressLabelChildrenValue0).toHaveTextContent('1y')
    expect(githubProgressLabelChildrenValue1).toHaveTextContent('2y')
  })
})

