import Grid from '@mui/material/Grid';
import { useSearchParams } from 'react-router-dom';
import messages from './cow.json';

// Add more "v" on the param, it will be...
const Moo = () => {
  const [ searchParams ] = useSearchParams();

  const [ level="" ] = Array
  .from(searchParams.entries())
  .map(([ key, ]) => key);

  let i;
  if (level === "" || !/^v+$/.test(level)) {
    i = 0;
  } else {
    i = level.length < messages.length ? level.length : messages.length-1;
  }

  console.error(messages[i])
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
        {messages[i]}
      </Grid>
    </>
  )
}

export default Moo;
