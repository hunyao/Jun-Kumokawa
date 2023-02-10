import React from 'react';
import Box from '@mui/material/Box';
import About from './sidebar/About'
import LanguageSidebar from './sidebar/LanguageSidebar'
import { PersonalDataContext } from '../contexts/personalData'

const Sidebar: React.FC = () => {
  const { skills } = React.useContext(PersonalDataContext);
  const LanguageSidebarDom = React.useMemo(() => {
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

  return (
    <>
      <Box>
        <About />
        {LanguageSidebarDom}
      </Box>
    </>
  )
}

export default Sidebar;
