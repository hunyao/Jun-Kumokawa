import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { AccordionDetailsProps } from '@mui/material/AccordionDetails';

interface AdditionalInformationDetailsUIProp extends AccordionDetailsProps {}
const AdditionalInformationDetails = styled(React.forwardRef<HTMLDivElement, AdditionalInformationDetailsUIProp>(({className, ...rest}, ref) => (
  <MuiAccordionDetails
    className={className + " additional-information-details"}
    ref={ref}
    data-testid="additional-information-details"
    {...rest}
  />
)))(({ theme }) => ({
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
