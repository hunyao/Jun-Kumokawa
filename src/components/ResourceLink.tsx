import Box from '@mui/material/Box';
import GithubLink from './ui/GithubLink'
import SvgIcon from '@mui/material/SvgIcon';

interface ResourceLinkProps {
  icon: typeof SvgIcon,
  text: string,
  viewBox?: string
}
const ResourceLink: React.FC<ResourceLinkProps> = (props) => {
  const {
    icon,
    text,
    viewBox = '0 0 24 24'
  } = props;

  return (
    <>
      <Box mt={1}>
        <GithubLink
          href="#"
          className="no-underline"
        >
          <SvgIcon
            component={icon}
            viewBox={viewBox}
            sx={{
              height: 16,
              width: 16,
              marginRight: 1
            }}
          />
          {text}
        </GithubLink>
      </Box>
    </>
  )
}

export default ResourceLink;
