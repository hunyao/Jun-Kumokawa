import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import ResourceLink from '../ResourceLink'
import ZipIcon from '../../assets/svgs/svg-zip'

test('Testing ResourceLink', () => {
  const props = {
    icon: ZipIcon,
    text: 'dummy-text',
    viewBox: '0 0 16 16'
  }
  const {container} = render(<ResourceLink {...props} />)
  const zipIcon = screen.getByTestId('ZipIconIcon');
  expect(container).toContainElement(zipIcon)
  expect(container).toHaveTextContent('dummy-text')
  expect(zipIcon).toHaveAttribute('viewBox', '0 0 16 16')
})

