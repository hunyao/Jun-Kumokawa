import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Avatar from '../Avatar'
import ProfileJson from '../../data/profile.json';
const { profile } = ProfileJson;

test('Testing Avatar', () => {
  render(<Avatar />)
  const element = screen.getByTestId('avatar')
  expect(element).toHaveAttribute('title', profile.name.en.fullName);
  // These can never be tested, because we can never access to the Image element directly.
  // expect(element).toHaveAttribute('alt', profile.name.en.fullName);
  // expect(element).toHaveAttribute('src');
  // expect(element).toHaveStyle('height', '24px');
  // expect(element).toHaveStyle('width', '24px');
})
