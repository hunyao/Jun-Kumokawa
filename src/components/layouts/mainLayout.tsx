import { type PropsWithChildren, useEffect } from 'react';
import {
  Footer,
  Header,
  ProfileWrapper,
  SideBarMenu,
  SideBarMenuState,
  Toast,
} from '#components/index';
import { getDefaultThemeName } from '#utils/index';

export const MainLayout = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    document.documentElement.dataset.theme = getDefaultThemeName();
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
