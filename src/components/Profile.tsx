import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import GithubLink from './ui/GithubLink'
import Chip from '@mui/material/Chip';
import { ChipProps } from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import LinkGoogleMap from './LinkGoogleMap';
import { PersonalDataContext } from '../contexts/personalData';
import ProfileWrapper from './ui/ProfileWrapper';
import ProfileTitle from './ui/ProfileTitle';
import ProfileAdditional from './ui/ProfileAdditional';
import ProfileAdditionalItem from './ui/ProfileAdditionalItem';
import Avatar from './Avatar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Profile = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('laptop'));
  const [ kanji, setKanji ] = React.useState<boolean>(false);
  const { profile } = React.useContext(PersonalDataContext);
  const propsForChip: ChipProps = {
    label: profile.employment ? 'Employment': 'Open to work',
    size: 'small',
    variant: profile.employment ? 'filled': 'outlined',
    color: profile.employment ? 'info': 'success',
    title: profile.employment ? 'Employment': 'Open to work'
  }

  return (
    <ProfileWrapper
      data-testid="profile"
    >
      <Avatar
        height={100}
        width={100}
        sx={{
          borderRadius: '6px',
          gridArea: 'avatar'
        }}
      />
      <Grid
        container
        alignItems="center"
        flexDirection={matches ? 'column': 'row'}
        data-testid="profile-name"
        sx={{
          gridArea: 'name'
        }}
      >
        <FormControlLabel
          labelPlacement="start"
          control={<Switch
            checked={kanji}
            size="small"
            onChange={({target: { checked }}) => setKanji(checked)}
            data-testid="profile-name-radio-switch"
          />}
          label="Kanji"
          sx={{
            margin: 0,
            userSelect: 'none'
          }}
          data-testid="profile-name-radio"
        />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
          }}
          data-testid="profile-name-display"
        >
          { kanji ? profile.name.ja.fullName : profile.name.en.fullName }
        </Typography>
      </Grid>
      <ProfileTitle
        sx={{
          gridArea: 'title',
        }}
      >
        {profile.title}
      </ProfileTitle>
      <ProfileAdditional
        sx={{
          gridArea: 'additional'
        }}
      >
        {[
          {
            Icon: LocationOnOutlinedIcon,
            content: (
              <LinkGoogleMap
                target="_blank"
                data-testid="profile-additional-item-location"
              >
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
                data-testid="profile-additional-item-linkdin"
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
                data-testid="profile-additional-item-email"
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
                data-testid="profile-additional-item-tel"
              >
                +({profile.tel[0]}) {profile.tel[1]} {profile.tel[2]}
              </GithubLink>
            )
          },
        ].map(({ Icon, content }, index) => (
          <ProfileAdditionalItem
            icon={Icon}
            key={index}
            data-testid={"profile-additional-item-" + index}
          >
            {content}
          </ProfileAdditionalItem>
        ))}
        <Grid
          item
          data-testid="profile-additional-work-status"
        >
          <Chip {...propsForChip} />
        </Grid>
      </ProfileAdditional>
    </ProfileWrapper>
  )
}

export default React.memo(Profile, () => true);
