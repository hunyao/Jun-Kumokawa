import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import About from '../About'
import useRepository from '../../../hooks/useRepository'

jest.mock('../../../hooks/useRepository');
describe('Testing About', ()=> {
  test('with props', () => {
    useRepository
    .mockReturnValueOnce(['This is the description'])
    .mockReturnValueOnce(['https://kumokawa.jun'])
    .mockReturnValueOnce([['Japan', 'Estonia', 'Our World']])
    .mockReturnValueOnce([123])
    .mockReturnValueOnce([456])
    .mockReturnValueOnce([789])

    render(<About />)
    const element = screen.getByTestId('about')
    const elementDescription = screen.getByTestId('about-description')
    const elementHomepage = screen.getByTestId('about-homepage')
    const elementHomepageLink = screen.getByTestId('about-homepage-link')
    const linkIcon = screen.getByTestId('LinkIcon')
    const elementTopics = screen.getByTestId('about-topics')
    const elementOthers = screen.getByTestId('about-others')
    const elementOthersReadme = screen.getByTestId('about-others-readme')
    const elementOthersLicense = screen.getByTestId('about-others-license')
    const elementOthersStars = screen.getByTestId('about-others-stars')
    const elementOthersSubscribers = screen.getByTestId('about-others-subscribers')
    const elementOthersForks = screen.getByTestId('about-others-forks')
    const menuBookIcon = screen.getByTestId('MenuBookIcon')
    const copyrightIcon = screen.getByTestId('CopyrightIcon')
    const starBorderOutlinedIcon = screen.getByTestId('StarBorderOutlinedIcon')
    const removeRedEyeOutlinedIcon = screen.getByTestId('RemoveRedEyeOutlinedIcon')
    const gitForkedIcon = screen.getByTestId('GitForkedIconIcon')

    expect(element).toBeInTheDocument();
    expect(element).toContainElement(elementDescription);
    expect(element).toContainElement(elementHomepage);
    expect(element).toContainElement(elementTopics);
    expect(element).toContainElement(elementOthers);
    expect(elementHomepage).toContainElement(elementHomepageLink);
    expect(elementHomepage).toContainElement(linkIcon);
    expect(elementHomepageLink).toHaveAttribute('href', 'https://kumokawa.jun');
    expect(elementHomepageLink).toHaveTextContent('kumokawa.jun');
    expect(elementTopics).toHaveTextContent('Japan', 'Estonia', 'Our World');
    expect(elementOthers).toContainElement(elementOthersReadme);
    expect(elementOthers).toContainElement(elementOthersLicense);
    expect(elementOthers).toContainElement(elementOthersStars);
    expect(elementOthers).toContainElement(elementOthersSubscribers);
    expect(elementOthers).toContainElement(elementOthersForks);
    expect(elementOthersReadme).toContainElement(menuBookIcon);
    expect(elementOthersLicense).toContainElement(copyrightIcon);
    expect(elementOthersStars).toContainElement(starBorderOutlinedIcon);
    expect(elementOthersSubscribers).toContainElement(removeRedEyeOutlinedIcon);
    expect(elementOthersForks).toContainElement(gitForkedIcon);
    expect(elementOthersReadme).toHaveTextContent('Readme');
    expect(elementOthersLicense).toHaveTextContent('MIT License');
    expect(elementOthersStars).toHaveTextContent('789 stars');
    expect(elementOthersSubscribers).toHaveTextContent('123 watching');
    expect(elementOthersForks).toHaveTextContent('456 forks');
  })
})

