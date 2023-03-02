import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinkIcon from '@mui/icons-material/Link';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CopyrightIcon from '@mui/icons-material/Copyright';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import GitForkedIcon from '../../assets/svgs/svg-git-forked'
import GithubLink from '../ui/GithubLink'
import GithubChip from '../ui/GithubChip'
import ResourceLink from '../ResourceLink'
import SidebarItem from './SidebarItem'
import useRepository from '../../hooks/useRepository'

interface AboutProps {
  sx?: any
}
const About: React.FC<AboutProps> = (props) => {
  const [ description ] = useRepository<'description'>('description', '');
  const [ homepage ] = useRepository<'homepage'>('homepage', '');
  const [ topics ] = useRepository<'topics'>('topics', []);
  const [ subscribersCount ] = useRepository<'subscribers_count'>('subscribers_count', 0);
  const [ forksCount ] = useRepository<'forks_count'>('forks_count', 0);
  const [ watchersCount ] = useRepository<'watchers_count'>('watchers_count', 0);

  return (
    <>
      <SidebarItem
        title="About"
        data-testid="about"
        {...props}
      >
        <Typography
          paragraph
          data-testid="about-description"
        >
          {description}
        </Typography>
        <Grid
          container
          alignItems="center"
          my={2}
          gap={0.5}
          data-testid="about-homepage"
        >
          <Grid
            item
            component={LinkIcon}
            sx={{
              transform: 'rotateZ(135deg)'
            }}
          />
          <Grid item>
            <GithubLink
              href={homepage || ""}
              className="active"
              data-testid="about-homepage-link"
            >
              {homepage !== null && homepage.replace(/^(http|https):\/\//, '')}
            </GithubLink>
          </Grid>
        </Grid>
        <Box
          my={2}
          data-testid="about-topics"
        >
          {topics !== undefined && topics.map((topic, key) => <GithubChip key={key}>{topic}</GithubChip>)}
        </Box>
        <Box
          data-testid="about-others"
          display={{
            'xs': 'flex',
            'laptop': 'block'
          }}
          gap={2}
          sx={{
            '& > .resource-link': {
              xs: { 'marginTop': 4 }
            },
            flexWrap: 'wrap'
          }}
        >
          <ResourceLink
            icon={MenuBookIcon}
            text="Readme"
            data-testid="about-others-readme"
          />
          <ResourceLink
            icon={CopyrightIcon}
            text="MIT License"
            data-testid="about-others-license"
          />
          <ResourceLink
            icon={StarBorderOutlinedIcon}
            text={watchersCount + " stars"}
            data-testid="about-others-stars"
          />
          <ResourceLink
            icon={RemoveRedEyeOutlinedIcon}
            text={subscribersCount + " watching"}
            data-testid="about-others-subscribers"
          />
          <ResourceLink
            icon={GitForkedIcon}
            viewBox="0 0 16 16"
            text={forksCount + " forks"}
            data-testid="about-others-forks"
          />
        </Box>
      </SidebarItem>
    </>
  )
}

export default About;
