import React from 'react';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import moment from 'moment';
import Discussion from '../../components/Discussion';
import LinkGoogleMap from '../../components/LinkGoogleMap';
import GithubLink from '../../components/ui/GithubLink';
import { PersonalDataContext } from '../../contexts/personalData'

const Experience: React.FC = () => {
  const { experiences, profile } = React.useContext(PersonalDataContext);

  const RenderDom = React.useMemo(() => {
    return experiences.map((experience, index) => {
      return <Discussion
        key={index}
        username={profile.name.en.lastName.toLowerCase()}
        title={`joined ${experience.companyName} ` + moment(experience.employedAt).fromNow()}
        content={experience.summary}
        timelineItems={[
          {
            icon: LogoutIcon,
            text: `left ${experience.companyName} ` + moment(experience.leftAt).fromNow()
          },
          {
            icon: LoginIcon,
            text: `joined ${experience.companyName} ` + moment(experience.employedAt).fromNow()
          }
        ]}
        sidebarItems={[
          [
            'Company Name',
            experience.companyName
          ],
          [
            'Employment type',
            experience.employmentType
          ],
          [
            'joined and left date',
            moment(experience.employedAt).format('MMM YYYY') + ' - ' + moment(experience.leftAt).format('MMM YYYY')
          ],
          [
            'Location',
            <LinkGoogleMap>{experience.location}</LinkGoogleMap>,
          ],
          [
            'Homepage',
            <GithubLink href={experience.homepage}>{experience.homepage}</GithubLink>
          ]
        ]}
        additionalItems={[
          {
            title: 'Responsibility for:',
            items: experience.responsibilities
          },
          {
            title: 'Achievements:',
            items: experience.achievements
          },
          {
            title: 'Used technologies:',
            items: experience.usedSkills
          }
        ]}
      />
    })
  }, [
    experiences,
    profile
  ]);

  return <Box
    mt={2}
    data-testid="page-experience"
  >
    {RenderDom}
  </Box>
}

export default Experience;
