import React from 'react';
import Grid from '@mui/material/Grid';
import SvgIcon from '@mui/material/SvgIcon';
import GitBranchIcon from '../assets/svgs/svg-git-branch';
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
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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
  const theme = useTheme();
  const matchedForLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
  const matchedForDesktop = useMediaQuery(theme.breakpoints.down('desktop'));

  const items = React.useMemo(() => {
    const [ path, err ] = getPathFromSha(sha);
    if (err) {
      return [];
    }
    const uris = path.split('/');
    const lastUri = uris.pop();
    return [{
      name: 'branch-switching',
      showOverview: true,
      showTree: true,
      showMobile: true,
      render: <BranchSwitching />
    },
    {
      name: 'branches',
      showOverview: true,
      showTree: false,
      showMobile: false,
      render: <GithubDetailLink
        href="#"
        icon={
          <SvgIcon
            component={GitBranchIcon}
            viewBox="0 0 16 16"
          />
        }
        number={branchesNumber}
        name="branches"
        className={matchedForDesktop ? 'no-name': ''}
      />
    },
    {
      name: 'breadcrumbs',
      showOverview: false,
      showTree: true,
      showMobile: true,
      sx: {
        gridRow: '2 / 2',
        gridColumn: '1 / 5',
      },
      render: <Breadcrumbs
        aria-label="breadcrumb"
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
          data-testid="file-navigation-breadcrumbs-root"
        >
          {process.env.REACT_APP_REPOSITORY_NAME}
        </GithubLink>
        {uris.map((uri: string, index: number, self: string[]) => {
          return <GithubLink
            key={index}
            href="#"
            className="active"
            data-testid={"file-navigation-breadcrumbs-" + index}
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
          data-testid="file-navigation-breadcrumbs-last"
        >
          {lastUri}
        </Typography>
      </Breadcrumbs>
    },
    {
      name: 'tags',
      showOverview: true,
      showTree: false,
      showMobile: false,
      render: <GithubDetailLink
        href="#"
        icon={
          <SvgIcon
            component={LocalOfferOutlinedIcon}
          />
        }
        number={tagsNumber}
        name="tags"
        className={matchedForDesktop ? 'no-name': ''}
      />
    },
    {
      name: 'go-to-file',
      showOverview: true,
      showTree: true,
      showMobile: false,
      render: <GithubButton
        onClick={() => navigate('/find')}
        data-testid="file-navigation-go-to-file-button"
      >
        <span>
          Go to file
        </span>
      </GithubButton>
    },
    {
      name: 'clone-button',
      showOverview: true,
      showTree: false,
      showMobile: false,
      render: <GithubCloneButton />
    },
    {
      name: 'other-button',
      showOverview: true,
      showTree: true,
      showMobile: true,
      render: <GithubButton>
        <SvgIcon component={MoreHorizIcon} />
      </GithubButton>
    }
    ]}, [
    branchesNumber,
    navigate,
    getShaFromPath,
    getPathFromSha,
    sha,
    tagsNumber,
    matchedForDesktop
  ]);

  const RenderDom = React.useMemo(() => {
    return items
    .filter(item => {
      const show = item[mode === 'overview'? 'showOverview': 'showTree'];
      if (!show) {
        return false;
      }
      if (matchedForLaptop && !item.showMobile) {
        return false;
      }
      return true;
    })
  }, [
    items,
    matchedForLaptop,
    mode
  ])

  let gridTemplateAreas, gridTemplateColumns;
  if (mode === "overview") {
    gridTemplateAreas = "'branch-switching branches tags empty go-to-file clone-button other-button'"
    gridTemplateColumns = "max-content max-content max-content auto max-content max-content max-content"
  } else {
    gridTemplateAreas = "'branch-switching breadcrumb go-to-file other-button'"
    gridTemplateColumns = "repeat(2, 1fr) max-content"
    if (matchedForLaptop) {
      gridTemplateAreas = "'branch-switching empty go-to-file other-button' 'breadcrumb breadcrumb breadcrumb breadcrumb'"
      gridTemplateColumns = "repeat(3, 1fr) min-content"
    }
  }
  return (
    <>
      <Grid
        display="grid"
        mt={3}
        gap={1}
        alignItems="center"
        sx={{
          gridTemplateAreas,
          gridTemplateColumns
        }}
        data-testid="file-navigation"
      >
        {RenderDom
          .filter(d => d !== null)
          .map((dom, index) => (
          <Grid
            gridArea={dom.name}
            sx={dom.sx}
            key={index}
            data-testid={"file-navigation-" + dom.name}
          >
            {dom.render}
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default FileNavigation;
