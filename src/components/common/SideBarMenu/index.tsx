import { Trans } from '@lingui/react/macro';
import { NavLink } from 'react-router';
import { Routes } from '#constants/index';
import {
  BriefcaseSvg,
  CatSvg,
  CodeSvg,
  HomeSvg,
  ScrewdriverWrenchSvg,
  XmarkSvg,
} from '#icons/index';
import { RepositoryWrapper } from './components/Repository';

export const SideBarMenuState = () => (
  <input type='checkbox' id='sidebarmenu' className='peer hidden' />
);
export const SideBarMenu = () => {
  const close = () => {
    const ele = document.getElementById('sidebarmenu');
    if (ele instanceof HTMLInputElement === false) return;
    ele.checked = false;
  };

  return (
    <>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: reason */}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: reason */}
      <div
        className='fixed top-0 left-0 z-20 hidden h-full w-full bg-black/20 peer-checked:block'
        onClick={close}
      />
      <div className='separater separater-right fixed top-0 left-0 z-20 grid h-full w-96 -translate-x-full grid-rows-[min-content_minmax(0,1fr)] gap-y-4 rounded-r-xl bg-base-300 p-4 transition-transform duration-200 peer-checked:translate-x-0'>
        <div className='flex items-center justify-between'>
          <CatSvg className='h-10 w-10 rounded-full fill-current' />
          <label htmlFor='sidebarmenu'>
            <XmarkSvg className='h-8 w-8 cursor-pointer rounded bg-base-content/10 fill-base-content/50 p-2 hover:fill-current' />
          </label>
        </div>
        <div className='overflow-y-auto'>
          <NavLink to={Routes.HOME}>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: reason */}
            {/* biome-ignore lint/a11y/noStaticElementInteractions: reason */}
            <div
              className='link-element flex items-center gap-2'
              onClick={close}
            >
              <HomeSvg className='h-4 w-4 fill-current' />
              <Trans>Overview</Trans>
            </div>
          </NavLink>
          <NavLink to={Routes.MYTREE}>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: reason */}
            {/* biome-ignore lint/a11y/noStaticElementInteractions: reason */}
            <div
              className='link-element flex items-center gap-2'
              onClick={close}
            >
              <CodeSvg className='h-4 w-4 fill-current' />
              <Trans context='sidebar'>Code</Trans>
            </div>
          </NavLink>
          <NavLink to={Routes.EXPERIENCES}>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: reason */}
            {/* biome-ignore lint/a11y/noStaticElementInteractions: reason */}
            <div
              className='link-element flex items-center gap-2'
              onClick={close}
            >
              <BriefcaseSvg className='h-4 w-4 fill-current' />
              <Trans>Experiences</Trans>
            </div>
          </NavLink>
          <NavLink to={Routes.SKILLS}>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: reason */}
            {/* biome-ignore lint/a11y/noStaticElementInteractions: reason */}
            <div
              className='link-element flex items-center gap-2'
              onClick={close}
            >
              <ScrewdriverWrenchSvg className='h-4 w-4 fill-current' />
              <Trans>Skills</Trans>
            </div>
          </NavLink>
          <div className='divider'></div>
          <div className='py-2 font-bold text-base-content/50 text-sm'>
            <Trans>Repositories</Trans>
          </div>
          <RepositoryWrapper onClick={close} />
        </div>
      </div>
    </>
  );
};
