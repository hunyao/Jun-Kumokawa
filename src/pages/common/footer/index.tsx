import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SvgIcon from '@mui/material/SvgIcon';
import CatIcon from '../../../assets/svgs/svg-cat';

const Footer = () => {
  return (
    <>
      <footer>
        <Container>
          <Box
            pt={5}
            pb={5}
            mt={3}
            sx={{
              borderTop: "1px solid #21262d"
            }}
          >
            <Grid container alignItems="center" spacing={1}>
              <Grid item p={2}>
                This Jun-Kumokawa has Super Cow Powers. <b>DO NOT OPEN <a href="#/moo">THE PAGE</a></b>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <SvgIcon
                  component={CatIcon}
                  viewBox="0 0 512 512"
                  sx={{
                    height: 24,
                    width: 24,
                    borderRadius: '50%',
                    color: 'black',
                    background: 'white'
                  }}
                />
              </Grid>
              <Grid item>
                <Box
                  component="span"
                  sx={{
                    fontSize: 12
                  }}
                >
                  © 2022 Jun Kumokawa.
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </footer>
    </>
  )
}

export default Footer
