import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Loading from '../Loading'

describe('Testing Loading', () => {
  test('with props loading=true', () => {
    const props = {
      loading: true
    }
    const {container} = render(<Loading {...props}>This is children</Loading>);
    const elementCircularProgress = screen.getByTestId('loading-circular-progress')

    expect(container).not.toHaveTextContent('This is children')
    expect(container).toContainElement(elementCircularProgress)
  })
  test('with props loading=false', () => {
    const props = {
      loading: false
    }
    const {container} = render(<Loading {...props}>This is children</Loading>);
    const elementCircularProgress = screen.queryByTestId('loading-circular-progress')

    expect(container).toHaveTextContent('This is children')
    expect(elementCircularProgress).toBe(null)
  })
})

