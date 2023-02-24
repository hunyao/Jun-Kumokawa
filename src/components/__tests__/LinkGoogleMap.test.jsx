import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import LinkGoogleMap from '../LinkGoogleMap'

test('Testing LinkGoogleMap', () => {
  render(<LinkGoogleMap>Tokyo, Japan</LinkGoogleMap>)
  const element = screen.getByTestId('link-google-map')
  const elementIcon = screen.getByTestId('OpenInNewIcon')

  expect(element).toHaveTextContent('Tokyo, Japan')
  expect(element).toHaveAttribute('href', 'https://www.google.com/maps/place/Tokyo, Japan')
  expect(element).toHaveAttribute('target', '_blank');
  expect(element).toContainElement(elementIcon);
})

