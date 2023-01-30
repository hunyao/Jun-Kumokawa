import Box from '@mui/material/Box';
import AvatarImg from '../../assets/images/avatar.jpg';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import moment from 'moment';
import DiscussionComponent from '../../components/Discussion';
import LinkGoogleMap from '../../components/LinkGoogleMap';

const Experience = () => {
  return (
    <>
      <Box
        mt={2}
      >
        <DiscussionComponent
          username="kumokawa"
          avator={AvatarImg}
          title={'became freelance ' + moment('2016-01-01T00:00:00+0900').fromNow()}
          content='I belonged to a team that managing a lot of in-house systems everybody use in house: mailing-lists, servers, SSL-certificates, and so on. and worked mainly on projects that developing and maintaining front-end and back-end on mobile games and ordering systems. and managed junior co-workers.'
          timelineItems={[
            {
              icon: LoginIcon,
              text: 'became freelance ' + moment('2016-01-01T00:00:00+0900').fromNow()
            }
          ]}
          sidebarItems={[
            [
              'Employment type',
              'Freelance'
            ],
            [
              'Became and end date',
              'Jan 2016 - present'
            ],
            [
              'Location',
              <LinkGoogleMap>Fukuoka, Japan</LinkGoogleMap>,
            ],
            [
              'Homepage',
              'The website right now you are looking at'
            ]
          ]}
          additionalItems={[
            {
              title: 'I had responsebilities at the company:',
              items: [
                'designing, coding, testing',
                'developing and maintaining Apis, Management screens, converting to pdf from data',
                'managing all Linux servers they have with ssh\n - crating a new account on a server',
                'designing, coding, testing',
                'developing and maintaining Apis, Management screens, converting to pdf from data',
                'managing all Linux servers they have with ssh\n - crating a new account on a server',
                'designing, coding, testing',
                'developing and maintaining Apis, Management screens, converting to pdf from data',
                'managing all Linux servers they have with ssh\n - crating a new account on a server',
              ]
            },
            {
              title: 'I used technologies at the company:',
              items: [
                'Git',
                'Subversion',
                'HTML',
                'CSS',
                'JavaScript',
                'Git',
                'Subversion',
                'Git',
                'Subversion',
                'HTML',
                'CSS',
                'JavaScript',
                'Git',
                'Subversion',
                '...and so on'
              ]
            }
          ]}
        />
        <DiscussionComponent
          username="kumokawa"
          avator={AvatarImg}
          title={'joined CLINKS Co. Ltd. ' + moment('2012-04-01T00:00:00+0900').fromNow()}
          content='I belonged to a team that managing a lot of in-house systems everybody use in house: mailing-lists, servers, SSL-certificates, and so on. and worked mainly on projects that developing and maintaining front-end and back-end on mobile games and ordering systems. and managed junior co-workers.'
          timelineItems={[
            {
              icon: LogoutIcon,
              text: 'left CLINKS Co. Ltd. ' + moment('2015-04-01T00:00:00+0900').fromNow()
            },
            {
              icon: LoginIcon,
              text: 'joined CLINKS Co. Ltd. ' + moment('2012-04-01T00:00:00+0900').fromNow()
            },
          ]}
          sidebarItems={[
            [
              'Company Name',
              'CLINKS Co. Ltd.'
            ],
            [
              'Employment type',
              'Permanent'
            ],
            [
              'Joined and left date',
              'April 2012 - April 2015'
            ],
            [
              'Location',
              <LinkGoogleMap>Tokyo, Japan</LinkGoogleMap>,
            ],
            [
              'Homepage',
              'https://www.clinks.jp/'
            ],
          ]}
          additionalItems={[
            {
              title: 'I had responsebilities at the company:',
              items: [
                'designing, coding, testing',
                'developing and maintaining Apis, Management screens, converting to pdf from data',
                'managing all Linux servers they have with ssh\n - crating a new account on a server',
                'designing, coding, testing',
                'developing and maintaining Apis, Management screens, converting to pdf from data',
                'managing all Linux servers they have with ssh\n - crating a new account on a server',
                'designing, coding, testing',
                'developing and maintaining Apis, Management screens, converting to pdf from data',
                'managing all Linux servers they have with ssh\n - crating a new account on a server',
              ]
            },
            {
              title: 'I used technologies at the company:',
              items: [
                'Git',
                'Subversion',
                'HTML',
                'CSS',
                'JavaScript',
                'Git',
                'Subversion',
                'Git',
                'Subversion',
                'HTML',
                'CSS',
                'JavaScript',
                'Git',
                'Subversion',
                '...and so on'
              ]
            }
          ]}
        />
      </Box>
    </>
  )
}

export default Experience;
