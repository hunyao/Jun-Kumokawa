import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import MuiListItemText from '@mui/material/ListItemText';
import Discussion from './ui/discussion/Discussion'
import DiscussionContent from './ui/discussion/DiscussionContent'
import DiscussionSidebar from './ui/discussion/DiscussionSidebar'
import DiscussionSidebarItem from './ui/discussion/DiscussionSidebarItem'
import DiscussionItem from './ui/discussion/DiscussionItem'
import DiscussionItemAvator from './ui/discussion/DiscussionItemAvator'
import DiscussionItemContent from './ui/discussion/DiscussionItemContent'
import DiscussionItemContentHeader from './ui/discussion/DiscussionItemContentHeader'
import DiscussionTimelineItem from './ui/discussion/DiscussionTimelineItem'
import DiscussionTimelineItemBadge from './ui/discussion/DiscussionTimelineItemBadge'
import DiscussionTimelineItemBody from './ui/discussion/DiscussionTimelineItemBody'
import AdditionalInformation from './ui/discussion/AdditionalInformation'
import AdditionalInformationSummary from './ui/discussion/AdditionalInformationSummary'
import AdditionalInformationDetails from './ui/discussion/AdditionalInformationDetails'

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
                        <MuiList>
                          {additionalItem.items.map((item: any, index: number) => (
                            <MuiListItem key={index}>
                              <MuiListItemText primary={item} />
                            </MuiListItem>
                          ))}
                        </MuiList>
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
