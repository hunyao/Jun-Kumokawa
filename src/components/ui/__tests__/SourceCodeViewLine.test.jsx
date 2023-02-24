import SourceCodeViewLine from '../SourceCodeViewLine';
import {render, screen} from '@testing-library/react'

test('Testing UI component SourceCodeViewLine', () => {
  const tr = document.createElement('tr')
  render(<SourceCodeViewLine />, {container: document.body.appendChild(tr)})

  const element = screen.getByTestId('source-code-view-line');
  expect(element).toHaveClass('source-code-view-line')
})

