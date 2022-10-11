import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';

const AdditionalInformation = styled(({ className, ...rest }: any) => (
  <MuiAccordion disableGutters elevation={0} square className={className + " additional-information"} {...rest} />
))(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

export default AdditionalInformation
