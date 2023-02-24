import AdditionalInformationDetails from '../AdditionalInformationDetails';
import {render, screen} from '@testing-library/react'

test('Testing UI component AdditionalInformationDetails', () => {
  render(<AdditionalInformationDetails />)

  const element = screen.getByTestId('additional-information-details');
  expect(element).toHaveClass('additional-information-details')
})
