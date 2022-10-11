import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  background: 'transparent',
  height: 2
}));

export default BorderLinearProgress
