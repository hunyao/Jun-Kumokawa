import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import CheckIcon from '@mui/icons-material/Check';

const AdditionalInformationSummary = styled(({className, ...rest}: any) => (
  <MuiAccordionSummary
    expandIcon={<CheckIcon />}
    className={className + " additional-information-summary"}
    {...rest}
  />
))(({ theme }) => ({
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
