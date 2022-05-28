import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';

const GithubTab = styled(Tab)`
& {
  min-height: initial;
  color: #c9d1d9;
  text-transform: capitalize;
}
& .MuiSvgIcon-root {
  color: #484F58;
}
&.Mui-selected .MuiSvgIcon-root {
  color: inherit;
}
&.Mui-selected {
  color: inherit;
}
`;

export default GithubTab;
