import React from 'react';
import AdditionalInformation from '../AdditionalInformation';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import {render, screen} from '@testing-library/react'

test('Testing UI component AdditionalInformation', () => {
  render(
    <AdditionalInformation>
      <MuiAccordionSummary>
      </MuiAccordionSummary>
      <MuiAccordionDetails>
      </MuiAccordionDetails>
    </AdditionalInformation>
  )

  const element = screen.getByTestId('additional-information');
  expect(element).toHaveClass('additional-information')
})
