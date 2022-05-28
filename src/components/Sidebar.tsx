import Box from '@mui/material/Box';
import About from './sidebar/About'
import GithubProgress from './sidebar/GithubProgress'
import SidebarItem from './sidebar/SidebarItem'
import { groupedSkills } from '../data/Skills'

const Sidebar = () => {
  return (
    <>
      <Box>
        <About />
        {Object.entries(groupedSkills)
          .map(([ groupName, items ], index: number) => (
            <SidebarItem title={groupName} key={index}>
              <GithubProgress list={items} />
            </SidebarItem>
          ))}
      </Box>
    </>
  )
}

export default Sidebar;
