import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Profile from '../Profile'
import { wrapperForPersonal } from '../../mockData/customRender'
import ProfileJSON from '../../data/profile.json'

describe('Testing Profile', () => {
  const spy = jest.spyOn(React, 'useState');
  const setKanjiFn = jest.fn();
  beforeEach(() => {
  })
  afterEach(() => {
    jest.clearAllMocks();
  })
  test('with props kanji=false employment=false', async () => {
    spy.mockReturnValue([false, setKanjiFn])
    render(<Profile />, { wrapper: wrapperForPersonal() });
    const element = screen.getByTestId('profile')
    const avatar = screen.getByTestId('avatar')
    const elementName = screen.getByTestId('profile-name')
    const elementNameRadio = screen.getByTestId('profile-name-radio')
    const elementNameRadioSwitch = screen.getByTestId('profile-name-radio-switch')
    const elementNameDisplay = screen.getByTestId('profile-name-display')
    const profileTitle = screen.getByTestId('profile-title')
    const profileAdditional = screen.getByTestId('profile-additional')
    const profileAdditionalItem0 = screen.getByTestId('profile-additional-item-0')
    const profileAdditionalItem1 = screen.getByTestId('profile-additional-item-1')
    const profileAdditionalItem2 = screen.getByTestId('profile-additional-item-2')
    const profileAdditionalItem3 = screen.getByTestId('profile-additional-item-3')
    const profileAdditionalItemLocation = screen.getByTestId('profile-additional-item-location')
    const profileAdditionalItemLinkdin = screen.getByTestId('profile-additional-item-linkdin')
    const profileAdditionalItemEmail = screen.getByTestId('profile-additional-item-email')
    const profileAdditionalItemTel = screen.getByTestId('profile-additional-item-tel')
    const locationOnOutlinedIcon = screen.getByTestId('LocationOnOutlinedIcon')
    const linkdinIcon = screen.getByTestId('LinkedInIcon')
    const emailOutlinedIcon = screen.getByTestId('EmailOutlinedIcon')
    const localPhoneOutliendIcon = screen.getByTestId('LocalPhoneOutlinedIcon')
    const elementAdditionalWorkStatus = screen.getByTestId('profile-additional-work-status')

    expect(element).toBeInTheDocument();
    expect(element).toContainElement(avatar);
    expect(element).toContainElement(elementName);
    expect(elementName).toContainElement(elementNameRadio);
    expect(elementName).toContainElement(elementNameRadioSwitch);
    expect(elementName).toContainElement(elementNameDisplay);
    expect(elementNameRadio).toHaveTextContent('Kanji');
    expect(elementNameDisplay).toHaveTextContent(ProfileJSON.profile.name.en.fullName);
    expect(element).toContainElement(profileTitle);
    expect(element).toContainElement(profileAdditional);
    expect(profileTitle).toHaveTextContent(ProfileJSON.profile.title);
    expect(profileAdditional).toContainElement(profileAdditionalItem0);
    expect(profileAdditional).toContainElement(profileAdditionalItem1);
    expect(profileAdditional).toContainElement(profileAdditionalItem2);
    expect(profileAdditional).toContainElement(profileAdditionalItem3);
    expect(profileAdditionalItem0).toContainElement(locationOnOutlinedIcon);
    expect(profileAdditionalItem1).toContainElement(linkdinIcon);
    expect(profileAdditionalItem2).toContainElement(emailOutlinedIcon);
    expect(profileAdditionalItem3).toContainElement(localPhoneOutliendIcon);
    expect(profileAdditionalItem0).toContainElement(profileAdditionalItemLocation);
    expect(profileAdditionalItem1).toContainElement(profileAdditionalItemLinkdin);
    expect(profileAdditionalItem2).toContainElement(profileAdditionalItemEmail);
    expect(profileAdditionalItem3).toContainElement(profileAdditionalItemTel);
    expect(profileAdditionalItemLocation).toHaveTextContent(ProfileJSON.profile.location);
    expect(profileAdditionalItemLinkdin).toHaveTextContent('@' + ProfileJSON.profile.linkdin);
    expect(profileAdditionalItemEmail).toHaveTextContent(ProfileJSON.profile.email);
    const tel = ProfileJSON.profile.tel;
    expect(profileAdditionalItemTel).toHaveTextContent(`+(${tel[0]}) ${tel[1]} ${tel[2]}`);
    expect(elementAdditionalWorkStatus).toHaveTextContent('Open to work');

    fireEvent.click(elementNameRadio)
    await waitFor(() => expect(setKanjiFn).toHaveBeenCalledWith(true))
  })
  test('with props kanji=true employment=true', async () => {
    spy.mockReturnValue([true, setKanjiFn])
    render(<Profile />, { wrapper: wrapperForPersonal({employment: true}) });
    const element = screen.getByTestId('profile')
    const elementNameRadio = screen.getByTestId('profile-name-radio')
    const elementNameDisplay = screen.getByTestId('profile-name-display')
    const elementAdditionalWorkStatus = screen.getByTestId('profile-additional-work-status')

    expect(element).toBeInTheDocument();
    expect(elementNameDisplay).toHaveTextContent(ProfileJSON.profile.name.ja.fullName);
    expect(elementAdditionalWorkStatus).toHaveTextContent('Employment');

    fireEvent.click(elementNameRadio)
    await waitFor(() => expect(setKanjiFn).toHaveBeenCalledWith(false))

  })
})
