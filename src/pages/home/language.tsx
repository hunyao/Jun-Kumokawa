import Typography from '@mui/material/Typography';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import SvgIcon from '@mui/material/SvgIcon';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import BusinessIcon from '@mui/icons-material/Business';
import GithubLink from '../../components/ui/GithubLink'

const LinkGoogleMap = (props: any) => {
  const { children, ...rest } = props;
  const href = "https://www.google.com/maps/place/" + children;
  return (
    <GithubLink
      href={href}
      {...rest}
    >
      <OpenInNewIcon
        sx={{
          fontSize: 'inherit'
        }}
      />
      {children}
    </GithubLink>
  )
}

const Experience = () => {
  return (
    <>
      <Timeline>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              <BusinessIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6">
              CLINKS Co. Ltd.
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              display="flex"
            >
              <SvgIcon component={CalendarTodayIcon} sx={{ color: 'gray' }} />
              2012 - 2015
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              display="flex"
            >
              <SvgIcon component={LocationOnOutlinedIcon} sx={{ color: 'gray' }} />
              <LinkGoogleMap target="_blank">
                Chuoku, Tokyo, Japan
              </LinkGoogleMap>
            </Typography>
            <Typography
              variant="body1"
              paragraph
            >
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </>
  )
}

export default Experience;
