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
import ResouceLink from '../ResourceLink'
import SidebarItem from './SidebarItem'
import useRepository from '../../hooks/useRepository'

const About = () => {
  const [ description ] = useRepository('description', '');
  const [ homepage ] = useRepository('homepage', '');
  const [ topics ] = useRepository('topics', []);
  const [ subscribersCount ] = useRepository('subscribers_count', '');
  const [ forksCount ] = useRepository('forks_count', '');
  const [ watchersCount ] = useRepository('watchers_count', '');

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
              href={homepage}
              className="active"
            >
              {homepage.replace(/^(http|https):\/\//, '')}
            </GithubLink>
          </Grid>
        </Grid>
        <Box
          my={2}
        >
          {topics.map((topic: string, key: number) => <GithubChip key={key}>{topic}</GithubChip>)}
        </Box>
        <Box>
          <ResouceLink
            icon={MenuBookIcon}
            text="Readme"
          />
          <ResouceLink
            icon={CopyrightIcon}
            text="MIT License"
          />
          <ResouceLink
            icon={StarBorderOutlinedIcon}
            text={watchersCount + " stars"}
          />
          <ResouceLink
            icon={RemoveRedEyeOutlinedIcon}
            text={subscribersCount + " watching"}
          />
          <ResouceLink
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
