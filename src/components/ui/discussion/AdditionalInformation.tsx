import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import { AccordionProps } from '@mui/material/Accordion';

interface AdditionalInformationUIProps extends AccordionProps {}
const AdditionalInformation = styled(React.forwardRef<HTMLDivElement, AdditionalInformationUIProps>(({ className, ...rest }, ref) => (
  <MuiAccordion
    disableGutters
    elevation={0}
    square
    className={className + " additional-information"}
    ref={ref}
    data-testid="additional-information"
    {...rest}
  />
)))(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

export default AdditionalInformation
