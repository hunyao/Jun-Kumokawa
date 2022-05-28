import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinkIcon from '@mui/icons-material/Link';
import GithubLink from '../ui/GithubLink'
import GithubChip from '../ui/GithubChip'
import ResouceLink from '../ResourceLink'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CopyrightIcon from '@mui/icons-material/Copyright';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import SidebarItem from './SidebarItem'

const About = () => {
  return (
    <>
      <SidebarItem title="About">
        <Typography
          paragraph
        >
          An efficient and flexible Human library for making web systems.
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
              href="#"
              className="active"
            >
              https://kumoti.jp
            </GithubLink>
          </Grid>
        </Grid>
        <Box
          my={2}
        >
          <GithubChip>react</GithubChip>
          <GithubChip>japascript</GithubChip>
          <GithubChip>library</GithubChip>
          <GithubChip>ui</GithubChip>
          <GithubChip>full-stack</GithubChip>
          <GithubChip>front-end</GithubChip>
          <GithubChip>back-end</GithubChip>
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
            text="181k stars"
          />
          <ResouceLink
            icon={RemoveRedEyeOutlinedIcon}
            text="6.7k watching"
          />
          <ResouceLink
            icon={ThumbUpAltOutlinedIcon}
            text="123m like"
          />
          <ResouceLink
            icon={ThumbDownAltOutlinedIcon}
            text="10k dislike"
          />
        </Box>
      </SidebarItem>
    </>
  )
}

export default About;
