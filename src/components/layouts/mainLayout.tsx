import { type PropsWithChildren, useEffect } from 'react';
import {
  Footer,
  Header,
  ProfileWrapper,
  SideBarMenu,
  SideBarMenuState,
  Toast,
} from '#components/index';
import { isDarkMode } from '#utils/isDarkMode';

export const MainLayout = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode() ? 'dark' : 'light';
  }, []);

  return (
    <div className='relative'>
      <SideBarMenuState />
      <Header />
      <Toast />
      <ProfileWrapper />
      <div className='separater'>{children}</div>
      <Footer />
      <SideBarMenu />
    </div>
  );
};
