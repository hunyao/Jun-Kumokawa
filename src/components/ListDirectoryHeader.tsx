import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AvatarImg from '../assets/images/avator.jpg';
import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';
import CheckIcon from '@mui/icons-material/Check';
import HistoryIcon from '@mui/icons-material/History';
import Avatar from '@mui/material/Avatar';
import GithubDetailLink from './GithubDetailLink';
import GithubLink from './ui/GithubLink'
import Expander from './ui/Expander'
import ListDirectoryToolbar from './ui/ListDirectoryToolbar'
import { repositoryContext } from '../contexts/repository';

const ListDirectoryHeader = (props: any) => {
  const {
    state: {
      commits
    }
  } = React.useContext(repositoryContext);
  const [ expend, setExpend ] = React.useState(false);
  const welcomeMessage = 'Welcome to my website. Enjoy your stay at my website. Now open to work. You can hire me. Feel free to contact to me.'

  return (
    <>
      <ListDirectoryToolbar>
        <Grid
          container
          spacing={1}
          flexWrap="nowrap"
          alignItems="center"
        >
          <Grid
            item
            flex="none"
          >
            <Avatar
              alt="Jun Kumokawa"
              title="Jun Kumokawa"
              src={AvatarImg}
              sx={{height: 24, width: 24}}
            />
          </Grid>
          <Grid
            item
            flex="none"
          >
            <GithubLink
              href="#"
            >
              <Typography
                component="span"
                variant="body2"
              >
                kumokawa
              </Typography>
            </GithubLink>
          </Grid>
          <Grid
            item
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}
            xs={8}
          >
            <GithubLink
              href="#"
              title={welcomeMessage}
            >
              <Typography
                component="span"
                variant="body2"
              >
                {welcomeMessage}
              </Typography>
            </GithubLink>
          </Grid>
          <Grid
            item
            flex="none"
          >
            <Expander onClick={() => setExpend(!expend)}>...</Expander>
          </Grid>
          <Grid
            container
            item
            alignItems="center"
            spacing={1}
            flex={0}
            flexWrap="nowrap"
          >
            <Grid
              item
              component={CheckIcon}
              sx={{
                color: '#3fd950',
              }}
            />
            <Grid item>
              <GithubLink
                href="#"
              >
                <Typography
                  component="span"
                  sx={{
                    fontSize: '12px'
                  }}
                >
                  790b524
                </Typography>
              </GithubLink>
            </Grid>
          </Grid>
          <Grid
            item
            flex="none"
          >
            <GithubLink
              href="#"
            >
              <Typography
                component="span"
                sx={{
                  fontSize: '14px'
                }}
              >
                9 hours ago
              </Typography>
            </GithubLink>
          </Grid>
          <Grid
            item
            flex="none"
          >
            <GithubDetailLink
              href="#"
              icon={
                <SvgIcon
                  component={HistoryIcon}
                  sx={{
                    height: '16px',
                    width: '16px',
                    verticalAlign: 'text-bottom'
                  }}
                />
              }
              number={commits.length}
              name="commits"
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: expend ? 'initial': 'none',
            width: '100%',
            paddingLeft: 4
          }}
        >
          <GithubLink href="#" className="primary">
            {welcomeMessage}
          </GithubLink>
        </Box>
      </ListDirectoryToolbar>
    </>
  )
}

export default ListDirectoryHeader;
