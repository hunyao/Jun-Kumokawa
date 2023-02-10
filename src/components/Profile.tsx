import React from 'react';
import Grid from '@mui/material/Grid';
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
import { PersonalDataContext } from '../contexts/personalData';
import ProfileWrapper from './ui/ProfileWrapper';
import ProfileTitle from './ui/ProfileTitle';
import ProfileAdditional from './ui/ProfileAdditional';
import ProfileAdditionalItem from './ui/ProfileAdditionalItem';
import Avatar from './Avatar';

const Profile = () => {
  const [ kanji, setKanji ] = React.useState<boolean>(false);
  const { profile } = React.useContext(PersonalDataContext);

  return (
    <ProfileWrapper>
      <Avatar
        height={100}
        width={100}
        sx={{
          borderRadius: '6px',
        }}
      />
      <Grid
        item
        flex={1}
      >
        <Grid
          container
          alignItems="center"
        >
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
            { kanji ? profile.name.ja.fullName : profile.name.en.fullName }
          </Typography>
        </Grid>
        <ProfileTitle>
          {profile.title}
        </ProfileTitle>
        <ProfileAdditional>
          {[
            {
              Icon: LocationOnOutlinedIcon,
              content: (
                <LinkGoogleMap target="_blank">
                  {profile.location}
                </LinkGoogleMap>
              )
            },
            {
              Icon: LinkedInIcon,
              content: (
                <GithubLink
                  href={`https://www.linkedin.com/in/${profile.linkdin}`}
                  target="_blank"
                >
                  @{profile.linkdin}
                </GithubLink>
              )
            },
            {
              Icon: EmailOutlinedIcon,
              content: (
                <GithubLink
                  href={`mailto:${profile.email}`}
                >
                  {profile.email}
                </GithubLink>
              )
            },
            {
              Icon: LocalPhoneOutlinedIcon,
              content: (
                <GithubLink
                  href={"tel:+" + profile.tel.join('')}
                >
                  +({profile.tel[0]}) {profile.tel[1]} {profile.tel[2]}
                </GithubLink>
              )
            },
          ].map(({ Icon, content }, index) => (
            <ProfileAdditionalItem
              icon={Icon}
              key={index}
            >
              {content}
            </ProfileAdditionalItem>
          ))}
          <Grid item>
            {profile.employment && <Chip
              label="Employment"
              size="small"
              variant="filled"
              color="info"
              title="Employment"
            />}
            {profile.employment || <Chip
              label="Open to work"
              size="small"
              variant="outlined"
              color="success"
              title="Open to work"
            />}
          </Grid>
        </ProfileAdditional>
      </Grid>
    </ProfileWrapper>
  )
}

export default React.memo(Profile, () => true);
