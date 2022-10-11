import { styled } from '@mui/material/styles';

const ProgressWrappr = styled(({ className, ...rest }: any) => (
  <span className={className + " github-progress-wrapper"} {...rest} />
))`
& {
  display: flex;
  height: 8px;
  overflow: hidden;
  background-color: rgba(110,118,129,0.4);
  border-radius: 6px;
  outline: 1px solid transparent;
}
`

export default ProgressWrappr;
