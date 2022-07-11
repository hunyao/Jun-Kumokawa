import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import MuiListItemText from '@mui/material/ListItemText';

import CheckIcon from '@mui/icons-material/Check';

const Discussion = styled(({ className, ...rest }: any) => (
  <div className={className + " discussion"} {...rest} />
))`
& {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  gap: 24px;
  align-items: end;
}
& .discussion-username {
  font-weight: 900;
  color: #c9d1d9;
}
`
const DiscussionContent = styled(({ className, ...rest }: any) => (
  <div className={className + " discussion-content"} {...rest} />
))`
& {
  flex-basis: 75%;
  flex-grow: 0;
  max-width: 75%;
  margin: 0 0 0 40px;
  padding-left: 16px;
  border-bottom: 2px solid #30363d;
}
`
const DiscussionSidebar = styled(({ className, ...rest }: any) => (
  <div className={className + " discussion-sidebar"} {...rest} />
))`
& {
  flex-basis: 25%;
  flex-grow: 0;
  max-width: 25%;
  margin: 0;
}
`
const DiscussionItem = styled(({ className, ...rest }: any) => (
  <div className={className + " discussion-item"} {...rest} />
))`
& {
  position: relative;
  display: flex;
  padding-bottom: 16px;
  margin-left: 16px;
  width: 100%;
}
&:before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2px;
  content: "";
  background-color: #21262d;
}
`
const DiscussionItemAvator = styled(({ className, ...rest }: any) => (
  <div className={className + " discussion-item-avator"} {...rest} />
))`
& {
  position: absolute;
  left: -72px;
}
& > .discussion-item-avator-img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
`

const DiscussionItemContent = styled(({ className, ...rest }: any) => (
  <div className={className + " discussion-item-content"} {...rest} />
))`
& {
  margin-left: -16px;
  position: relative;
  color: #c9d1d9;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 6px;
  width: 100%;
}
&:before, &:after {
  position: absolute;
  top: 11px;
  right: 100%;
  left: -8px;
  width: 8px;
  height: 16px;
  pointer-events: none;
  content: " ";
  clip-path: polygon(0 50%, 100% 0, 100% 100%);
  color: #c9d1d9;
}
&:before {
  background-color: #30363d;
}
&:after {
  margin-left: 1px;
  background-color: #0d1117;
  background-image: linear-gradient(#161b22, #161b22);
}
`
const DiscussionItemContentHeader = styled(({ className, ...rest }: any) => (
  <div className={className + " discussion-item-content-header"} {...rest} />
))`
& {
  display: flex;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
  color: #8b949e;
  background: #161b22;
  border-bottom: 1px solid #30363d;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
`
const DiscussionTimelineItem = styled(({ className, ...rest }: any) => (
  <div className={className + " discussion-timeline-item"} {...rest} />
))`
& {
  position: relative;
  display: flex;
  padding: 16px 0;
  margin-left: 16px;
  color: #8b949e;
}
&:before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: block;
  width: 2px;
  content: "";
  background-color: #21262d;
}
`
const DiscussionTimelineItemBadge = styled(({ className, ...rest }: any) => (
  <div className={className + " discussion-timeline-item-badge"} {...rest} />
))`
& {
  position: relative;
  z-index: 1;
  display: flex;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  margin-left: -15px;
  align-items: center;
  background-color: #21262d;
  border: 2px solid #0d1117;
  border-radius: 50%;
  justify-content: center;
  flex-shrink: 0;
}
& > svg {
  height: 16px;
  width: 16px;
}
`
const DiscussionTimelineItemBody = styled(({ className, ...rest }: any) => (
  <div className={className + " discussion-timeline-item-body"} {...rest} />
))`
& {
  min-width: 0;
  max-width: 100%;
  margin-top: 4px;
  flex: auto;
}
`

const AdditionalInformation = styled((props: any) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const List = styled((props: any) => (
  <MuiList {...props} />
))(({ theme }) => ({
  padding: 0,
  maxHeight: 390,
  overflowY: 'auto'
}));

const ListItem = styled((props: any) => (
  <MuiListItem {...props} />
))(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const ListItemText = styled((props: any) => (
  <MuiListItemText {...props} />
))(({ theme }) => ({
  whiteSpace: 'break-spaces'
}));

const AdditionalInformationSummary = styled((props: any) => (
  <MuiAccordionSummary
    expandIcon={<CheckIcon sx={{ fontSize: '0.9rem', color: '#3fb950' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: '#161b22',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(0deg)',
  },
  '& .MuiAccordionSummary-content': {
    margin: 0,
    marginLeft: theme.spacing(1),
  },
  fontSize: 13,
  minHeight: 40,
}));

const AdditionalInformationDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const DiscussionSidebarItem = styled(({ className, ...rest }: any) => (
  <div className={className + " discussion-sidebar-item"} {...rest} />
))`
& {
  padding-top: 16px;
  font-size: 12px;
  color: #8b949e;
}
&+& {
  margin-top: 16px;
  border-top: 1px solid #21262d;
}
& .discussion-sidebar-item-header {
  font-weight: 900;
  margin-bottom: 8px;
  color: #c9d1d9;
}
`

const DiscussionComponent = (props: any) => {
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel: any) => (event: any, newExpanded: any) => {
    setExpanded(newExpanded ? panel : false);
  };
  const {
    username,
    avator,
    title,
    content,
    timelineItems = [],
    sidebarItems = [],
    additionalItems = []
  } = props;

  return (
    <>
      <Discussion>
        <DiscussionContent>
          {timelineItems
            .map((timelineItem: any, index: number) => (
              <DiscussionTimelineItem key={index}>
                <DiscussionTimelineItemBadge>
                  <SvgIcon component={timelineItem.icon} />
                </DiscussionTimelineItemBadge>
                <DiscussionTimelineItemBody>
                  <Box display="inline-block">
                    <Box
                      component="img"
                      src={avator}
                      height={20}
                      width={20}
                      sx={{
                        borderRadius: '50%',
                        verticalAlign: 'middle'
                      }}
                      display="inline-block"
                    />
                  </Box> <Typography
                    component="span"
                    className="discussion-username"
                  >
                    {username}
                  </Typography> <Typography
                    component="span"
                  >
                    {timelineItem.text}
                  </Typography>
                </DiscussionTimelineItemBody>
              </DiscussionTimelineItem>
            ))}
          <DiscussionItem>
            <DiscussionItemAvator>
              <Box
                component="img"
                src={avator}
                className="discussion-item-avator-img"
              />
            </DiscussionItemAvator>
            <DiscussionItemContent>
              <DiscussionItemContentHeader>
                <Typography
                  component="h3"
                  pt={1}
                  pb={1}
                  flex="auto"
                >
                  <span className="discussion-username">{username}</span> {title}
                </Typography>
              </DiscussionItemContentHeader>
              <Box
                className="discussion-item-content-body"
              >
                <Box
                  p={2}
                  sx={{
                    wordBreak: 'break-word'
                  }}
                >
                  {content}
                </Box>
                <Box
                  sx={{
                    borderBottomLeftRadius: '6px',
                    borderBottomRightRadius: '6px',
                    overflow: 'hidden'
                  }}
                >
                  {additionalItems.map((additionalItem: any, index: number) => (
                    <AdditionalInformation
                      expanded={expanded === ('panel' + index)}
                      onChange={handleChange('panel' + index)}
                      key={index}
                    >
                      <AdditionalInformationSummary>
                        <span style={{flex: 'auto'}}>{additionalItem.title}</span>
                        <span>Details</span>
                      </AdditionalInformationSummary>
                      <AdditionalInformationDetails>
                        <List>
                          {additionalItem.items.map((item: any, index: number) => <ListItem key={index}><ListItemText primary={item} /></ListItem>)}
                        </List>
                      </AdditionalInformationDetails>
                    </AdditionalInformation>
                  ))}
                </Box>
              </Box>
            </DiscussionItemContent>
          </DiscussionItem>
        </DiscussionContent>
        <DiscussionSidebar>
          {sidebarItems.map(([ title, text ]: any, index: number) => (
            <DiscussionSidebarItem key={index}>
              <Box
                className="discussion-sidebar-item-header"
              >
                {title}
              </Box>
              <Box
                className="discussion-sidebar-item-body"
              >
                {text}
              </Box>
            </DiscussionSidebarItem>
          ))}
        </DiscussionSidebar>
      </Discussion>
    </>
  )
}

export default DiscussionComponent;
