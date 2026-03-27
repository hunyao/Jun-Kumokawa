import type { PropsWithChildren } from 'react';
import {
  Footer,
  Header,
  Profile,
  SideBarMenu,
  SideBarMenuState,
  Toast,
} from '#components/index';

export const MainLayout = ({ children }: PropsWithChildren) => {
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
