import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import CodeIcon from '@mui/icons-material/Code';
import InsightsIcon from '@mui/icons-material/Insights';
import GithubTabs from './ui/GithubTabs';
import GithubTab from './ui/GithubTab';

const Menus = [
  {
    name: 'overview',
    path: 'overview',
    icon: <HomeOutlinedIcon />,
  },
  {
    name: 'code',
    path: 'tree',
    icon: <CodeIcon />,
  },
  {
    name: 'experience',
    path: 'experience',
    icon: <WorkOutlineOutlinedIcon />,
  },
  {
    name: 'education',
    path: 'education',
    icon: <SchoolOutlinedIcon />,
  },
  {
    name: 'skills',
    path: 'skill',
    icon: <InsightsIcon />,
  }
]
const TabMenu = (props: any) => {
  const {
    path,
    onChange
  } = props;
  const [ menuId, setMenuId ] = React.useState(0);

  React.useEffect(() => {
    const index = Menus.findIndex(menu => menu.path === path);
    setMenuId(index === -1 ? 0 : index);
  }, [
    path
  ])

  return <GithubTabs
    value={menuId}
    onChange={(_:any, menuId:number) => onChange(menuId, Menus[menuId])}
  >
    {Menus.map((menu, index: number) => (
      <GithubTab
        icon={menu.icon}
        iconPosition="start"
        label={menu.name}
        key={index}
      />
    ))}
  </GithubTabs>
}

export default React.memo(
  TabMenu,
  (prev, next) => prev.path === next.path
);
