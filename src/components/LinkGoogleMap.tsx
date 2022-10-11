import GithubLink from './ui/GithubLink'
import SvgIcon from '@mui/material/SvgIcon';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const LinkGoogleMap = (props: any) => {
  const { children, ...rest } = props;
  const href = "https://www.google.com/maps/place/" + children;
  return (
    <GithubLink
      href={href}
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
