import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';
import CheckIcon from '@mui/icons-material/Check';
import HistoryIcon from '@mui/icons-material/History';
import GithubDetailLink from './GithubDetailLink';
import GithubLink from './ui/GithubLink'
import Expander from './ui/Expander'
import ListDirectoryToolbar from './ui/ListDirectoryToolbar'
import useCommits from '../hooks/useCommits'
import Avatar from './Avatar'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ListDirectoryHeader = () => {
  const [ , commitsNumber ] = useCommits();
  const [ expend, setExpend ] = React.useState<boolean>(false);
  const welcomeMessage = 'Welcome to my website. Enjoy your stay at my website. Now open to work. You can hire me. Feel free to contact to me.'
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('desktop'));

  return (
    <>
      <ListDirectoryToolbar
        data-testid="list-directory-header"
      >
        <Grid
          container
          gap={1}
          flexWrap="nowrap"
          alignItems="center"
        >
          <Grid
            item
            flex="none"
          >
            <Avatar />
          </Grid>
          <Grid
            item
            flex="none"
          >
            <GithubLink
              href="#"
              data-testid="github-link-for-name"
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
            xs={12}
          >
            <GithubLink
              href="#"
              title={welcomeMessage}
              data-testid="github-link-for-welcome-message"
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
            <Expander
              onClick={() => setExpend(!expend)}
              data-testid="list-directory-header-expander"
            >
              ...
            </Expander>
          </Grid>
          <Grid
            container
            item
            alignItems="center"
            gap={0}
            flex={0}
            flexWrap="nowrap"
            display={matches ? 'none': ''}
          >
            <Grid
              item
              component={CheckIcon}
              sx={{
                color: '#3fd950',
                fontSize: '1em'
              }}
            />
            <Grid item>
              <GithubLink
                href="#"
                data-testid="github-link-for-sha"
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
              data-testid="github-link-for-date"
            >
              <Typography
                component="span"
                sx={{
                  fontSize: '14px'
                }}
              >
                right now
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
                <SvgIcon component={HistoryIcon} />
              }
              number={commitsNumber}
              name="commits"
              className={matches ? 'no-name': ''}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: expend ? 'initial': 'none',
            width: '100%',
            paddingLeft: 4
          }}
          data-testid="list-directory-header-expand"
        >
          <GithubLink
            href="#"
            className="primary"
            data-testid="github-link-for-full-message"
          >
            {welcomeMessage}
          </GithubLink>
        </Box>
      </ListDirectoryToolbar>
    </>
  )
}

export default ListDirectoryHeader;
