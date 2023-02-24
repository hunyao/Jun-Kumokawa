import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Moo from '../Moo'

test('Testing Moo', () => {
  render(<Moo />)
  const element = screen.getByTestId('moo')
  expect(element).toHaveTextContent("How may I help you sir?");
})

