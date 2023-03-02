import Grid from '@mui/material/Grid';
import { useSearchParams } from 'react-router-dom';
import useCow from '../../hooks/useCow'

// Add more "v" on the param, it will be...
const Moo = () => {
  const [ searchParams ] = useSearchParams();

  const [ level="" ] = Array
  .from(searchParams.entries())
  .map(([ key, ]) => key);

  const [ msg ] = useCow(level)
  if (msg === '') {
    return <></>
  }

  console.debug("// Add more \"v\" on the param, it will be...")
  console.error(msg)
  return (
    <>
      <Grid
        container
        p={3}
        sx={{
          whiteSpace: 'pre',
          overflow: 'hidden',
          overflowX: 'auto'
        }}
        data-testid="page-moo"
      >
        {msg}
      </Grid>
    </>
  )
}

export default Moo;
