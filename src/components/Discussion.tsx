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
import DiscussionItemAvatar from './ui/discussion/DiscussionItemAvatar'
import DiscussionItemContent from './ui/discussion/DiscussionItemContent'
import DiscussionItemContentHeader from './ui/discussion/DiscussionItemContentHeader'
import DiscussionTimelineItem from './ui/discussion/DiscussionTimelineItem'
import DiscussionTimelineItemBadge from './ui/discussion/DiscussionTimelineItemBadge'
import DiscussionTimelineItemBody from './ui/discussion/DiscussionTimelineItemBody'
import AdditionalInformation from './ui/discussion/AdditionalInformation'
import AdditionalInformationSummary from './ui/discussion/AdditionalInformationSummary'
import AdditionalInformationDetails from './ui/discussion/AdditionalInformationDetails'
import Avatar from './Avatar'

type DiscussionTimelineItemType = {
  icon: typeof SvgIcon,
  text: string
}
type DiscussionSidebarItemType = [ string, string | React.ReactElement ];
type DiscussionAdditionalItemType = {
  title: string,
  items: string[]
}
interface DiscussionComponentProps {
  username: string,
  title: string,
  content: string | string[],
  timelineItems: Array<DiscussionTimelineItemType>,
  sidebarItems: Array<DiscussionSidebarItemType>,
  additionalItems: Array<DiscussionAdditionalItemType>
}
const DiscussionComponent: React.FC<DiscussionComponentProps> = (props) => {
  const [expanded, setExpanded] = React.useState<string | boolean>('');

  const handleChange = React.useCallback((panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  }, []);
  const {
    username,
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
            .map((timelineItem, index) => (
              <DiscussionTimelineItem key={index}>
                <DiscussionTimelineItemBadge>
                  <SvgIcon component={timelineItem.icon} />
                </DiscussionTimelineItemBadge>
                <DiscussionTimelineItemBody>
                  <Box display="inline-block">
                    <Avatar
                      height={20}
                      width={20}
                      sx={{
                        verticalAlign: 'middle',
                        display: 'inline-block'
                      }}
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
            <DiscussionItemAvatar>
              <Avatar
                height={40}
                width={40}
              />
            </DiscussionItemAvatar>
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
                  {typeof content === 'string' ? content: content.join("\n")}
                </Box>
                <Box
                  sx={{
                    borderBottomLeftRadius: '6px',
                    borderBottomRightRadius: '6px',
                    overflow: 'hidden'
                  }}
                >
                  {additionalItems.map((additionalItem, index) => (
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
                          {additionalItem.items.length === 0 ?
                            <MuiListItem>
                              <MuiListItemText primary="Nothing to show..." />
                            </MuiListItem>
                          : null}
                          {additionalItem.items.map((item, index) => (
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
          {sidebarItems.map(([ title, text ], index) => (
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
