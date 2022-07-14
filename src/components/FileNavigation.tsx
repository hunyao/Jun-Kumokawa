import React from 'react';
import Grid from '@mui/material/Grid';
import SvgIcon from '@mui/material/SvgIcon';
import GitBranchIcon from '../assets/svgs/svg-git-branch';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import GithubDetailLink from './GithubDetailLink'
import GithubButton from './ui/GithubButton'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import GithubLink from './ui/GithubLink';
import { useNavigate } from "react-router-dom";
import { repositoryContext } from '../contexts/repository';
import BranchSwitching from '../components/BranchSwitching'

// mode: overview | navigation
const FileNavigation = (props: any) => {
  const {
    mode,
    sha
  } = props;
  const navigate = useNavigate();
  const {
    state: {
      branches,
      tags,
    },
    getPathFromSha,
    getShafromPath
  } = React.useContext(repositoryContext);

  const RenderDom = React.useMemo(() => {
    if (mode === "overview") {
      return (
        <>
          <Grid item ml={2}>
            <GithubDetailLink
              href="#"
              icon={
                <SvgIcon
                  component={GitBranchIcon}
                  viewBox="0 0 16 16"
                  sx={{
                    height: '16px',
                    width: '16px',
                    verticalAlign: 'text-bottom'
                  }}
                />
              }
              number={branches.length}
              name="branches"
            />
          </Grid>
          <Grid item ml={2}>
            <GithubDetailLink
              href="#"
              icon={
                <SvgIcon
                  component={LocalOfferOutlinedIcon}
                  sx={{
                    height: '16px',
                    width: '16px',
                    verticalAlign: 'text-bottom'
                  }}
                />
              }
              number={tags.length}
              name="tags"
            />
          </Grid>
          <Grid item ml="auto">
            <GithubButton
              onClick={() => navigate('/find')}
            >
              <span>
                Go to file
              </span>
            </GithubButton>
          </Grid>
          <Grid item ml={1}>
            <GithubButton>
              <span>
                Add file
              </span>
              <SvgIcon component={ArrowDropDownIcon} />
            </GithubButton>
          </Grid>
          <Grid item ml={1}>
            <GithubButton className="primary">
              <span>
                Code
              </span>
              <SvgIcon component={ArrowDropDownIcon} />
            </GithubButton>
          </Grid>
        </>
      )
    } else if (mode === "navigation") {
      const res = getPathFromSha(sha);
      if (res === undefined) {
        return;
      }
      const uris = res.split('/');
      const lastUri = uris.pop();

      return (
        <>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              marginLeft: 1
            }}
          >
            <GithubLink
              href="#"
              className="active"
              sx={{
                fontWeight: 600
              }}
              onClick={(e: any) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Jun-Kumokawa
            </GithubLink>
            {uris.map((uri: string, index: number, self: string[]) => {
              return <GithubLink
                key={index}
                href="#"
                className="active"
                onClick={(e: any) => {
                  e.preventDefault();
                  navigate(
                    "/tree/"
                    + getShafromPath(
                      self.slice(0, index + 1)
                      .map((p: string) => encodeURIComponent(p))
                      .join('/')
                    )
                  );
                }}
              >
                {uri}
              </GithubLink>
            })}
            <Typography
              color="text.primary"
              sx={{
                fontSize: 14
              }}
            >
              {lastUri}
            </Typography>
          </Breadcrumbs>
          <Grid item ml="auto">
            <GithubButton
              onClick={() => navigate('/find')}
            >
              <span>
                Go to file
              </span>
            </GithubButton>
          </Grid>
          <Grid item ml={1}>
            <GithubButton>
              <SvgIcon component={MoreHorizIcon} />
            </GithubButton>
          </Grid>
        </>
      )
    } else {}
  }, [
    mode,
    branches.length,
    tags.length,
    getPathFromSha,
    sha,
    navigate,
    getShafromPath
  ])

  return (
    <>
      <Grid
        container
        mt={3}
        alignItems="center"
      >
        <Grid item>
          <BranchSwitching />
        </Grid>
        {RenderDom}
      </Grid>
    </>
  )
}

export default FileNavigation;
