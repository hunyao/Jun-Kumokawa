import AdditionalInformationSummary from '../AdditionalInformationSummary';
import {render, screen} from '@testing-library/react'

test('Testing UI component AdditionalInformationSummary', () => {
  render(<AdditionalInformationSummary />)

  const element = screen.getByTestId('additional-information-summary');
  expect(element).toHaveClass('additional-information-summary')
})
