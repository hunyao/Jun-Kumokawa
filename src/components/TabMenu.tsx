import React from 'react';
import GithubTabs from './ui/GithubTabs';
import GithubTab from './ui/GithubTab';

type TabMenuType = {
  name: string,
  icon?: React.ReactElement,
  menuId: number
}
interface TabMenuProps {
  value: number | boolean,
  onChange: (value: number) => void,
  menus: Array<TabMenuType>
}
const TabMenu: React.FC<TabMenuProps> = (props) => {
  const {
    value,
    onChange,
    menus
  } = props;

  return <GithubTabs
    value={value}
    onChange={(_: React.SyntheticEvent, menuId:number) => onChange(menuId)}
  >
    {menus.map((menu, index) => (
      <GithubTab
        icon={menu.icon}
        iconPosition="start"
        label={menu.name}
        key={index}
        value={menu.menuId}
        data-testid={"github-tab-" + index}
      />
    ))}
  </GithubTabs>
}

export default React.memo(
  TabMenu,
  (prev, next) => prev.value === next.value
);
