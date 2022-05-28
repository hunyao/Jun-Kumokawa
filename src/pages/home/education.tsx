import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GithubLink from '../../components/ui/GithubLink'
import moment from 'moment';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Box from '@mui/material/Box';
import AvatarImg from '../../assets/images/avator.jpg';
import DiscussionComponent from '../../components/Discussion';

const LinkGoogleMap = (props: any) => {
  const { children, ...rest } = props;
  const href = "https://www.google.com/maps/place/" + children;
  return (
    <GithubLink
      href={href}
      target="_blank"
      {...rest}
    >
      <OpenInNewIcon
        sx={{
          fontSize: 'inherit'
        }}
      />
      {children}
    </GithubLink>
  )
}

const Education = () => {
  return (
    <>
      <Box
        mt={2}
      >
        <DiscussionComponent
          username="kumokawa"
          avator={AvatarImg}
          title={'entered Sakae-Higashi High School ' + moment('2007-04-01T00:00:00+0900').fromNow()}
          content=""
          timelineItems={[
            {
              icon: LogoutIcon,
              text: 'graduated from Sakae-Higashi High School ' + moment('2010-03-01T00:00:00+0900').fromNow()
            },
            {
              icon: LoginIcon,
              text: 'entered Sakae-Higashi High School ' + moment('2007-04-01T00:00:00+0900').fromNow()
            },
          ]}
          sidebarItems={[
            [
              'School Name',
              'Sakae-Higashi High School'
            ],
            [
              'Enterd and graduated date',
              'April 2007 - March 2010'
            ],
            [
              'Location',
              <LinkGoogleMap>Saitama, Japan</LinkGoogleMap>,
            ],
            [
              'Homepage',
              'https://www.sakaehigashi.ed.jp/'
            ],
          ]}
        />
      </Box>
    </>
  )
}

export default Education;
