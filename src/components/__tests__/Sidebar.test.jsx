import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Sidebar from '../Sidebar'
import About from '../sidebar/About'
import LanguageSidebar from '../sidebar/LanguageSidebar'
import { wrapperForPersonal } from '../../hooks/__test__/customRender'

jest.mock('../sidebar/About')
jest.mock('../sidebar/LanguageSidebar')
test('Testing Sidebar', () => {
  About.mockReturnValue(<div data-testid="about">This is About component</div>)
  LanguageSidebar.mockReturnValue(<div data-testid="language-sidebar">This is LanguageSidebar component</div>)

  render(<Sidebar />, {wrapper: wrapperForPersonal()})
  const elementAbout = screen.getByTestId('about');
  const elementLanguageSidebar = screen.getAllByTestId('language-sidebar');

  expect(elementAbout).toBeInTheDocument();
  elementLanguageSidebar.forEach(e => expect(e).toBeInTheDocument())
})

