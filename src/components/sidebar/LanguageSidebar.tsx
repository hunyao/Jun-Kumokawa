import React from 'react';
import SidebarItem from './SidebarItem'
import GithubProgress from './GithubProgress'
import { PersonalDataContextItemSkill } from '../../contexts/personalData';

interface LanguageSidebarProps extends Pick<PersonalDataContextItemSkill, "groupName" | "items"> {}
const LanguageSidebar: React.FC<LanguageSidebarProps> = (props) => {
  const {
    groupName,
    items
  } = props;

  return (
    <SidebarItem title={groupName}>
      <GithubProgress items={items} />
    </SidebarItem>
  )
}

export default LanguageSidebar
