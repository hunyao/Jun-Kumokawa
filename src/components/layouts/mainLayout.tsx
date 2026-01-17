import {
  Footer,
  Header,
  Profile,
  SideBarMenu,
  SideBarMenuState,
  Toast,
} from '@components/index';
import type { FC, PropsWithChildren } from 'react';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='relative'>
      <SideBarMenuState />
      <Header />
      <Toast />
      <Profile />
      <div className='separater'>{children}</div>
      <Footer />
      <SideBarMenu />
    </div>
  );
};
