import type { PropsWithChildren } from 'react';
import {
  Footer,
  Header,
  ProfileWrapper,
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
      <ProfileWrapper />
      <div className='separater'>{children}</div>
      <Footer />
      <SideBarMenu />
    </div>
  );
};
