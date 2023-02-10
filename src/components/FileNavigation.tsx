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
import BranchSwitching from '../components/BranchSwitching'
import GithubCloneButton from '../components/GithubCloneButton'
import useBranches from '../hooks/useBranches'
import useTags from '../hooks/useTags'
import usePathToSha from '../hooks/usePathToSha'
import useShaToPath from '../hooks/useShaToPath'

interface FileNavigationProps {
  mode: 'overview' | 'navigation'
  sha: string
}
const FileNavigation: React.FC<FileNavigationProps> = (props) => {
  const {
    mode,
    sha
  } = props;
  const navigate = useNavigate();
  const [ , branchesNumber ] = useBranches();
  const [ , tagsNumber ] = useTags();
  const getShaFromPath = usePathToSha();
  const getPathFromSha = useShaToPath();

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
                />
              }
              number={branchesNumber}
              name="branches"
            />
          </Grid>
          <Grid item ml={2}>
            <GithubDetailLink
              href="#"
              icon={
                <SvgIcon
                  component={LocalOfferOutlinedIcon}
                />
              }
              number={tagsNumber}
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
            <GithubCloneButton />
          </Grid>
        </>
      )
    } else if (mode === "navigation") {
      const [ path, err ] = getPathFromSha(sha);
      if (err) {
        return;
      }
      const uris = path.split('/');
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
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              {process.env.REACT_APP_REPOSITORY_NAME}
            </GithubLink>
            {uris.map((uri: string, index: number, self: string[]) => {
              return <GithubLink
                key={index}
                href="#"
                className="active"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  navigate(
                    "/tree/"
                    + getShaFromPath(
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
    branchesNumber,
    tagsNumber,
    getPathFromSha,
    sha,
    navigate,
    getShaFromPath
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
