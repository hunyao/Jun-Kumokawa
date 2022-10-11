import React from 'react';
import GithubTabs from './ui/GithubTabs';
import GithubTab from './ui/GithubTab';

const TabMenu = (props: any) => {
  const {
    value,
    onChange,
    menus
  } = props;

  return <GithubTabs
    value={value}
    onChange={(_:any, menuId:number) => onChange(menuId)}
  >
    {menus.map((menu: any, index: number) => (
      <GithubTab
        icon={menu.icon}
        iconPosition="start"
        label={menu.name}
        key={index}
        value={menu.menuId}
      />
    ))}
  </GithubTabs>
}

export default React.memo(
  TabMenu,
  (prev, next) => prev.value === next.value
);
