import { Routes } from '@constants/index';
import {
  BriefcaseSvg,
  CatSvg,
  CodeSvg,
  HomeSvg,
  ScrewdriverWrenchSvg,
  XmarkSvg,
} from '@icons/index';
import { octokit } from '@lib/index';
import type { Endpoints } from '@octokit/types';
import { type FC, useEffect, useState, useTransition } from 'react';
import { NavLink } from 'react-router';

export const SideBarMenuState = () => (
  // biome-ignore lint/correctness/useUniqueElementIds: reason
  <input type='checkbox' id='sidebarmenu' className='peer hidden' />
);
export const SideBarMenu: FC = () => {
  const [isPending, startTransition] = useTransition();

  const [repos, setRepos] = useState<
    Endpoints['GET /user/repos']['response']['data']
  >([]);

  const close = () => {
    const ele = document.getElementById('sidebarmenu');
    if (ele instanceof HTMLInputElement === false) return;
    ele.checked = false;
  };

  useEffect(() => {
    startTransition(async () => {
      const { data } = await octokit
        .request<'GET /user/repos'>('GET /user/repos')
        .catch((e) => {
          if (e.status === 401) return { data: [] };
          throw e;
        });
      setRepos(data);
    });
  }, []);

  return (
    <>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: reason */}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: reason */}
      <div
        className='fixed top-0 left-0 hidden h-full w-full bg-black/20 peer-checked:block'
        onClick={close}
      />
      <div className='separater separater-right -translate-x-full fixed top-0 left-0 grid h-full w-96 grid-rows-[min-content_minmax(0,1fr)] gap-y-4 rounded-r-xl bg-base-300 p-4 transition-transform duration-200 peer-checked:translate-x-0'>
        <div className='flex items-center justify-between'>
          <CatSvg className='h-10 w-10 rounded-full fill-current' />
          <label htmlFor='sidebarmenu'>
            <XmarkSvg className='h-8 w-8 cursor-pointer rounded bg-base-content/10 fill-base-content/50 p-2 hover:fill-current' />
          </label>
        </div>
        <div className='overflow-y-auto'>
          <NavLink to={Routes.HOME}>
            <div className='link-element flex items-center gap-2'>
              <HomeSvg className='h-4 w-4 fill-current' />
              Overview
            </div>
          </NavLink>
          <NavLink to={Routes.MYTREE}>
            <div className='link-element flex items-center gap-2'>
              <CodeSvg className='h-4 w-4 fill-current' />
              Code
            </div>
          </NavLink>
          <NavLink to={Routes.EXPERIENCES}>
            <div className='link-element flex items-center gap-2'>
              <BriefcaseSvg className='h-4 w-4 fill-current' />
              Experiences
            </div>
          </NavLink>
          <NavLink to={Routes.SKILLS}>
            <div className='link-element flex items-center gap-2'>
              <ScrewdriverWrenchSvg className='h-4 w-4 fill-current' />
              Skills
            </div>
          </NavLink>
          <div className='divider'></div>
          <div className='py-2 font-bold text-base-content/50 text-sm'>
            Repositories
          </div>
          {isPending && (
            <div>
              <div className='skeleton h-4 w-full'></div>
              <div className='skeleton h-4 w-full'></div>
              <div className='skeleton h-4 w-full'></div>
              <div className='skeleton h-4 w-full'></div>
              <div className='skeleton h-4 w-full'></div>
              <div className='skeleton h-4 w-full'></div>
            </div>
          )}
          {repos.map((repository) => (
            <NavLink
              to={Routes.REPOSITORY.replace(
                ':owner',
                repository.owner.login,
              ).replace(':id', repository.name)}
              key={repository.node_id}
            >
              {({ isPending }) => (
                <div className='link-element flex cursor-pointer items-center gap-2'>
                  <span
                    className='loading loading-spinner loading-xs'
                    hidden={!isPending}
                  />
                  <img
                    src={repository.owner.avatar_url}
                    className='h-4 w-4 rounded-full'
                    alt=''
                  />
                  <span>
                    {repository.owner.login} / {repository.name}
                  </span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};
