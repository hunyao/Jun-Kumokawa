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

  console.error(msg)
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        p={3}
        sx={{
          whiteSpace: 'pre',
        }}
      >
        {msg}
      </Grid>
    </>
  )
}

export default Moo;
