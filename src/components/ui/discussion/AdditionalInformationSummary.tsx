import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import CheckIcon from '@mui/icons-material/Check';

interface AdditionalInformationSummaryUIProps {}
const AdditionalInformationSummary = styled(React.forwardRef<HTMLDivElement, AccordionSummaryProps<'div', AdditionalInformationSummaryUIProps>>(({className, ...rest}, ref) => (
  <MuiAccordionSummary
    expandIcon={<CheckIcon />}
    className={className + " additional-information-summary"}
    ref={ref}
    {...rest}
  />
)))(({ theme }) => ({
  backgroundColor: '#161b22',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(0deg)',
  },
  '& .MuiAccordionSummary-content': {
    margin: 0,
    marginLeft: theme.spacing(1),
  },
  fontSize: 13,
  minHeight: 40,
  '& svg': {
    fontSize: 16,
    color: '#3fb950'
  }
}));

export default AdditionalInformationSummary
