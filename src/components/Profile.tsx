import React from 'react';
import Grid from '@mui/material/Grid';
import AvatarImg from '../assets/images/avator.jpg';
import Typography from '@mui/material/Typography';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import GithubLink from './ui/GithubLink'
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import LinkGoogleMap from './LinkGoogleMap';

const Profile = () => {
  const [ kanji, setKanji ] = React.useState(false);

  return (
    <Grid
      container
      flexDirection="row"
      flexWrap="nowrap"
      alignItems="center"
      my={2}
      height={100}
      gap={3}
    >
      <Grid
        item
        component="img"
        src={AvatarImg}
        alt="avator"
        height="100%"
        sx={{
          borderRadius: '6px'
        }}
      >
      </Grid>
      <Grid
        item
        flex={1}
      >
        <Grid container alignItems="center">
          <FormControlLabel
            labelPlacement="start"
            control={<Switch
              checked={kanji}
              size="small"
              onChange={({target: { checked }}) => setKanji(checked)}
            />}
            label="Kanji"
            sx={{margin: 0, userSelect: 'none'}}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              marginRight: 1
            }}
          >
            { kanji ? '雲川 洵' : 'JUN KUMOKAWA' }
          </Typography>
        </Grid>
        <Typography
          component="div"
          sx={{
            color: '#8b949e',
            fontSize: 14
          }}
        >
          Full-stack Engineer Who is made in Japan
        </Typography>
        <Grid
          container
          alignItems="center"
          spacing={1}
          sx={{
            fontSize: 14
          }}
        >
          {[
            {
              Icon: LocationOnOutlinedIcon,
              content: (
                <LinkGoogleMap target="_blank">
                  Tallinn, Estonia
                </LinkGoogleMap>
              )
            },
            {
              Icon: LinkedInIcon,
              content: (
                <GithubLink
                  href="https://www.linkedin.com/in/kumokawa"
                  target="_blank"
                >
                  @kumokawa
                </GithubLink>
              )
            },
            {
              Icon: EmailOutlinedIcon,
              content: (
                <GithubLink
                  href="mailto:jun@kumoti.jp"
                >
                  jun@kumoti.jp
                </GithubLink>
              )
            },
            {
              Icon: LocalPhoneOutlinedIcon,
              content: (
                <GithubLink
                  href="tel:+37253771037"
                >
                  +(372) 5377 1037
                </GithubLink>
              )
            },
          ].map(({ Icon, content }, index: number) => (
            <Grid
              container
              item
              spacing={0.5}
              alignItems="center"
              flex={0}
              flexWrap="nowrap"
              sx={{
                whiteSpace: 'nowrap'
              }}
              key={index}
            >
              <Grid
                item
                component={Icon}
              />
              <Grid item>
                {content}
              </Grid>
            </Grid>
          ))}
          <Grid item>
            <Chip
              label="Open to work"
              size="small"
              variant="outlined"
              color="success"
              title="Open to work"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default React.memo(Profile, () => false);
