import React from 'react';
import LanguageSidebar from './LanguageSidebar'
import { PersonalDataContext } from '../../contexts/personalData';

const LanguageSidebars: React.FC = () => {
  const { skills } = React.useContext(PersonalDataContext);
  const Dom = React.useMemo(() => {
    return skills.map(({ groupName, items }, index: number) => (
      <LanguageSidebar
        groupName={groupName}
        items={items}
        key={index}
      />
    ))
  }, [
    skills
  ])
  return <>{Dom}</>
}

export default LanguageSidebars;
