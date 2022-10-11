import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const AdditionalInformationDetails = styled(({className, ...rest}: any) => (
  <MuiAccordionDetails className={className + " additional-information-details"} {...rest} />
))(({ theme }) => ({
  padding: 0,
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  '& .MuiList-root': {
    padding: 0,
    maxHeight: 390,
    overflowY: 'auto',
    '& .MuiListItem-root': {
      borderTop: `1px solid ${theme.palette.divider}`,
      '& .MuiListItemText-root': {
        whiteSpace: 'break-spaces'
      }
    }
  }
}));

export default AdditionalInformationDetails
