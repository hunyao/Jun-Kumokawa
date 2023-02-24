import GithubLink from './ui/GithubLink'
import { GithubLinkUIProps } from './ui/GithubLink'
import SvgIcon from '@mui/material/SvgIcon';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const LinkGoogleMap: React.FC<GithubLinkUIProps> = (props) => {
  const { children, ...rest } = props;
  const href = "https://www.google.com/maps/place/" + children;
  return (
    <GithubLink
      href={href}
      target="_blank"
      data-testid="link-google-map"
      {...rest}
    >
      <SvgIcon
        component={OpenInNewIcon}
      />
      {children}
    </GithubLink>
  )
}

export default LinkGoogleMap;
