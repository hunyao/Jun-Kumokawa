import React from 'react';
import SourceCodeViewLineNum from '../SourceCodeViewLineNum';
import {render, screen} from '@testing-library/react'

test('Testing UI component SourceCodeViewLineNum', () => {
  const tr = document.createElement('tr');
  render(<SourceCodeViewLineNum />, {container: document.body.appendChild(tr)})

  const element = screen.getByTestId('source-code-view-line-num');
  expect(element).toHaveClass('source-code-view-line-num')
})
