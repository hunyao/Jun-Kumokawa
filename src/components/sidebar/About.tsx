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

const About = () => {
  const [ description ] = useRepository<'description'>('description', '');
  const [ homepage ] = useRepository<'homepage'>('homepage', '');
  const [ topics ] = useRepository<'topics'>('topics', []);
  const [ subscribersCount ] = useRepository<'subscribers_count'>('subscribers_count', 0);
  const [ forksCount ] = useRepository<'forks_count'>('forks_count', 0);
  const [ watchersCount ] = useRepository<'watchers_count'>('watchers_count', 0);

  return (
    <>
      <SidebarItem title="About">
        <Typography
          paragraph
        >
          {description}
        </Typography>
        <Grid
          container
          alignItems="center"
          my={2}
          spacing={0.5}
        >
          <Grid
            item
            component={LinkIcon}
          />
          <Grid item>
            <GithubLink
              href={homepage || ""}
              className="active"
            >
              {homepage !== null && homepage.replace(/^(http|https):\/\//, '')}
            </GithubLink>
          </Grid>
        </Grid>
        <Box
          my={2}
        >
          {topics !== undefined && topics.map((topic, key) => <GithubChip key={key}>{topic}</GithubChip>)}
        </Box>
        <Box>
          <ResourceLink
            icon={MenuBookIcon}
            text="Readme"
          />
          <ResourceLink
            icon={CopyrightIcon}
            text="MIT License"
          />
          <ResourceLink
            icon={StarBorderOutlinedIcon}
            text={watchersCount + " stars"}
          />
          <ResourceLink
            icon={RemoveRedEyeOutlinedIcon}
            text={subscribersCount + " watching"}
          />
          <ResourceLink
            icon={GitForkedIcon}
            viewBox="0 0 16 16"
            text={forksCount + " forks"}
          />
        </Box>
      </SidebarItem>
    </>
  )
}

export default About;
