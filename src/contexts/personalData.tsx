import React from 'react';
import Experiences from '../data/experience.json'
import Skills from '../data/skills.json'
import Profile from '../data/profile.json'
import kebabcase from 'lodash.kebabcase';
import Color from 'color';
const { skills } = Skills;
const { experiences } = Experiences;
const { profile } = Profile;

export interface PersonalDataContextProfile {
  name: {
    [locale: string]: {
      fullName: string,
      firstName: string,
      lastName: string
    }
  },
  title: string,
  location: string,
  linkdin: string,
  email: string,
  tel: Array<number>,
  employment: boolean
}
export interface PersonalDataContextItemExperience {
  companyName: string,
  employmentType: string,
  employedAt: string,
  leftAt: string,
  homepage: string,
  industry: string,
  location: string,
  title: string,
  summary: string | string[],
  responsibilities: Array<string>,
  achievements: Array<string>,
  usedSkills: Array<string>
}
export interface PersonalDataContextItemSkill {
  groupName: string,
  colorCode: Array<number>,
  items: Array<{
    label: string,
    value: number,
    colorHex: string
  }>
}
export interface PersonalDataContextItem {
  profile: PersonalDataContextProfile
  experiences: Array<PersonalDataContextItemExperience>,
  skills: Array<PersonalDataContextItemSkill>,
  skillGroupList: Array<Array<string>>,
  skillAllInOne: Array<{
    label: string,
    value: number,
    groupName: string,
    groupId: string,
    colorCode: Array<number>
    colorHex: string
  }>
}
const getColor = (code: Array<number>, level: number) => {
  const baseColor = Color.rgb(code);
  if (baseColor.isDark()) {
    return baseColor.lighten(0.1 * level);
  } else {
    return baseColor.darken(0.1 * level);
  }
}
const addedColorHexSkills = skills.map(skill => {
  return {
    ...skill,
    items: skill.items.map((skillItem, index) => {
      return {
        ...skillItem,
        colorHex: getColor(skill.colorCode, index).hex()
      }
    })
  }
})
const skillAllInOne = skills.map(skill => {
  return skill.items.map((skillItem, index) => {
    return {
      ...skillItem,
      groupName: skill.groupName,
      groupId: kebabcase(skill.groupName),
      colorCode: getColor(skill.colorCode, index),
      colorHex: getColor(skill.colorCode, index).hex()
    }
  })
}).flat();

const skillGroupList = skills.map(skill => {
  return [
    skill.groupName,
    kebabcase(skill.groupName)
  ]
})
const initial = {
  profile,
  experiences,
  skills: addedColorHexSkills,
  skillGroupList,
  skillAllInOne
}
export const PersonalDataContext = React.createContext<PersonalDataContextItem>(initial);
export const { Provider, Consumer } = PersonalDataContext;

export const PersonalDataProvider: React.FC = ({children}) => {
  const [ state ] = React.useState(initial);
  return (
    <>
      <Provider
        value={state}>
        {children}
      </Provider>
    </>
  )
}
export {
  Consumer as PersonalDataConsumer
}
export default PersonalDataProvider;

// vim: sw=2:ai
