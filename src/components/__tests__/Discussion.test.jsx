import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import DiscussionComponent from '../Discussion'
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

test('Testing Discussion', async () => {
  let spy = jest.spyOn(React, 'useState')
  const setExpandedFn = jest.fn();
  spy.mockReturnValue(['', setExpandedFn])

  const props = {
    username: 'dummy-name',
    title: 'A Senior Jest Tester',
    content: 'This is a test content',
    timelineItems: [
      {
        icon: LogoutIcon,
        text: 'This is a timeline with LogoutIcon'
      },
      {
        icon: LoginIcon,
        text: 'This is a timeline with LoginIcon'
      }
    ],
    sidebarItems: [
      [ 'name', 'dummy-name' ],
      [ 'age', '31' ]
    ],
    additionalItems: [
      {
        title: 'My hobbies are',
        items: ['Building computers', 'Coding something on Ubuntu']
      },
      {
        title: 'I love',
        items: ['Japanese foods', 'And Japanese foods', 'And more']
      },
    ],
  }
  render(<DiscussionComponent {...props} />)

  const element = screen.getByTestId('discussion')
  const elementContent = screen.getByTestId('discussion-content')
  const elementSidebar = screen.getByTestId('discussion-sidebar')
  const elementSidebarItem0 = screen.getByTestId('discussion-sidebar-item-0')
  const elementSidebarItem1 = screen.getByTestId('discussion-sidebar-item-1')
  const elementTimelineItem0 = screen.getByTestId('discussion-timeline-item-0')
  const elementTimelineItem1 = screen.getByTestId('discussion-timeline-item-1')
  const elementItem = screen.getByTestId('discussion-item')
  const elementItemAvatar = screen.getByTestId('discussion-item-avatar')
  const elementItemContent = screen.getByTestId('discussion-item-content')
  const elementItemContentHeader = screen.getByTestId('discussion-item-content-header')
  const elementItemContentBodyContent = screen.getByTestId('discussion-item-content-body-content')
  const elementItemContentBodyItems = screen.getByTestId('discussion-item-content-body-items')
  const elementAdditionalInformation0 = screen.getByTestId('additional-information-0')
  const elementAdditionalInformation1 = screen.getByTestId('additional-information-1')
  const elementAdditionalInformationSummary0 = screen.getByTestId('additional-information-summary-0')
  const elementAdditionalInformationSummary1 = screen.getByTestId('additional-information-summary-1')
  const elementAdditionalInformationDetails0 = screen.getByTestId('additional-information-details-0')
  const elementAdditionalInformationDetails1 = screen.getByTestId('additional-information-details-1')

  expect(element).toBeInTheDocument();
  expect(element).toContainElement(elementContent);
  expect(element).toContainElement(elementSidebar);
  expect(elementSidebar).toContainElement(elementSidebarItem0);
  expect(elementSidebar).toContainElement(elementSidebarItem1);
  expect(elementContent).toContainElement(elementTimelineItem0);
  expect(elementContent).toContainElement(elementTimelineItem1);
  expect(elementContent).toContainElement(elementItem);
  expect(elementItem).toContainElement(elementItemAvatar);
  expect(elementItem).toContainElement(elementItemContent);
  expect(elementContent).toContainElement(elementItemContentHeader);
  expect(elementContent).toContainElement(elementItemContentBodyContent);
  expect(elementContent).toContainElement(elementItemContentBodyItems);
  expect(elementItemContentBodyItems).toContainElement(elementAdditionalInformation0);
  expect(elementItemContentBodyItems).toContainElement(elementAdditionalInformation1);
  expect(elementAdditionalInformation0).toContainElement(elementAdditionalInformationSummary0);
  expect(elementAdditionalInformation1).toContainElement(elementAdditionalInformationSummary1);
  expect(elementAdditionalInformation0).toContainElement(elementAdditionalInformationDetails0);
  expect(elementAdditionalInformation1).toContainElement(elementAdditionalInformationDetails1);

  expect(elementTimelineItem0).toHaveTextContent(props.username)
  expect(elementTimelineItem0).toHaveTextContent(props.timelineItems[0].text)
  expect(elementTimelineItem1).toHaveTextContent(props.username)
  expect(elementTimelineItem1).toHaveTextContent(props.timelineItems[1].text)

  fireEvent.click(elementAdditionalInformationSummary0)
  await waitFor(() => expect(setExpandedFn).toHaveBeenCalledWith('panel0'))

  fireEvent.click(elementAdditionalInformationSummary1)
  await waitFor(() => expect(setExpandedFn).toHaveBeenCalledWith('panel1'))
})

