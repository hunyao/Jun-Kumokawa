import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import GithubProgress from '../GithubProgress'

describe('Testing GithubProgress', ()=> {
  test('with props', async () => {
    const props = {
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
    render(<GithubProgress {...props} />)

    const element = screen.getByTestId('github-progress')
    const githubProgressWrapper = screen.getByTestId('github-progress-wrapper')
    const githubProgressChildren0 = screen.getByTestId('github-progress-children-0')
    const githubProgressChildren1 = screen.getByTestId('github-progress-children-1')
    const githubProgressLabelWrapper = screen.getByTestId('github-progress-label-wrapper')
    const githubProgressLabelChildren0 = screen.getByTestId('github-progress-label-children-0')
    const githubProgressLabelChildren1 = screen.getByTestId('github-progress-label-children-1')
    const githubProgressLabelChildrenIcon0 = screen.getByTestId('github-progress-label-children-icon-0')
    const githubProgressLabelChildrenIcon1 = screen.getByTestId('github-progress-label-children-icon-1')
    const githubProgressLabelChildrenLabel0 = screen.getByTestId('github-progress-label-children-label-0')
    const githubProgressLabelChildrenLabel1 = screen.getByTestId('github-progress-label-children-label-1')
    const githubProgressLabelChildrenValue0 = screen.getByTestId('github-progress-label-children-value-0')
    const githubProgressLabelChildrenValue1 = screen.getByTestId('github-progress-label-children-value-1')

    expect(element).toBeInTheDocument();
    expect(element).toContainElement(githubProgressWrapper);
    expect(element).toContainElement(githubProgressLabelWrapper);
    expect(githubProgressWrapper).toContainElement(githubProgressChildren0);
    expect(githubProgressWrapper).toContainElement(githubProgressChildren1);
    expect(githubProgressLabelWrapper).toContainElement(githubProgressLabelChildren0);
    expect(githubProgressLabelWrapper).toContainElement(githubProgressLabelChildren1);
    expect(githubProgressLabelWrapper).toContainElement(githubProgressLabelChildrenIcon0);
    expect(githubProgressLabelWrapper).toContainElement(githubProgressLabelChildrenIcon1);
    expect(githubProgressLabelWrapper).toContainElement(githubProgressLabelChildrenLabel0);
    expect(githubProgressLabelWrapper).toContainElement(githubProgressLabelChildrenLabel1);
    expect(githubProgressLabelWrapper).toContainElement(githubProgressLabelChildrenValue0);
    expect(githubProgressLabelWrapper).toContainElement(githubProgressLabelChildrenValue1);

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
