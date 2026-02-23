import { Routes } from '@constants/index';
import { useGithub } from '@hooks/index';
import {
  CatSvg,
  LanguageSvg,
  LightOffSvg,
  LightOnSvg,
  LoginSvg,
  LogoutSvg,
} from '@icons/index';
import { Container, GithubMenuButton } from '@ui/index';
import type { FC } from 'react';
import { NavLink } from 'react-router';

export const Header: FC = () => {
  const { redirectToSignIn, isSignedIn, signOut } = useGithub();

  return (
    <div className='separater bg-base-300 py-2'>
      <Container className='flex items-center gap-4'>
        <label htmlFor='sidebarmenu'>
          <GithubMenuButton />
        </label>
        <CatSvg className='h-10 w-10 rounded-full fill-current' />
        <div className='mr-auto'>
          <NavLink to={Routes.HOME} className='link-element'>
            hunyao
          </NavLink>
          <span className='mx-2'>/</span>
          <NavLink to={Routes.HOME} className='link-element'>
            Jun-Kumokawa
          </NavLink>
        </div>
        {!isSignedIn ? (
          <div className='tooltip tooltip-bottom' data-tip='Log in to GitHub'>
            <button
              type='button'
              aria-label='Login to GitHub'
              onClick={redirectToSignIn}
            >
              <LoginSvg className='h-6 w-6 cursor-pointer fill-current' />
            </button>
          </div>
        ) : (
          <div className='tooltip tooltip-bottom' data-tip='Log out of GitHub'>
            <button
              type='button'
              aria-label='Logout from GitHub'
              onClick={signOut}
            >
              <LogoutSvg className='h-6 w-6 cursor-pointer fill-current' />
            </button>
          </div>
        )}
        <LanguageSvg className='h-6 w-6 fill-current' />
        <label className='swap swap-rotate'>
          <input type='checkbox' className='theme-controller' value='light' />
          <LightOnSvg className='swap-off h-6 w-6 fill-current' />
          <LightOffSvg className='swap-on h-6 w-6 fill-current' />
        </label>
      </Container>
    </div>
  );
};
