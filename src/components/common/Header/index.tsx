import { useLingui } from '@lingui/react/macro';
import { NavLink } from 'react-router';
import { TranslateMenu } from '#components/index';
import { ENV, Routes } from '#constants/index';
import { useGithub, useThemeController } from '#hooks/index';
import {
  CatSvg,
  LightOffSvg,
  LightOnSvg,
  LoginSvg,
  LogoutSvg,
} from '#icons/index';
import { Container, GithubMenuButton } from '#ui/index';

export const Header = () => {
  const { redirectToSignIn, isSignedIn, signOut } = useGithub();
  const { t } = useLingui();
  const { value, themeControlRef } = useThemeController();

  return (
    <header className='separater bg-base-300 py-2'>
      <Container className='flex items-center gap-4'>
        <label htmlFor='sidebarmenu'>
          <GithubMenuButton />
        </label>
        <CatSvg className='h-10 w-10 rounded-full fill-current' />
        <div className='mr-auto'>
          <NavLink to={Routes.HOME} className='link-element'>
            {ENV.REPOSITORY_OWNER}
          </NavLink>
          <span className='mx-2'>/</span>
          <NavLink to={Routes.HOME} className='link-element'>
            {ENV.REPOSITORY_NAME}
          </NavLink>
        </div>
        {!isSignedIn ? (
          <div
            className='tooltip tooltip-bottom flex'
            data-tip={t`Sign in to GitHub`}
          >
            <button
              type='button'
              aria-label={t`Sign in to GitHub`}
              onClick={redirectToSignIn}
            >
              <LoginSvg className='h-6 w-6 cursor-pointer fill-current' />
            </button>
          </div>
        ) : (
          <div
            className='tooltip tooltip-bottom flex'
            data-tip={t`Sign out from GitHub`}
          >
            <button
              type='button'
              aria-label={t`Sign out from GitHub`}
              onClick={signOut}
            >
              <LogoutSvg className='h-6 w-6 cursor-pointer fill-current' />
            </button>
          </div>
        )}
        <TranslateMenu />
        <label className='swap swap-rotate'>
          <input
            type='checkbox'
            className='theme-controller'
            value='dark'
            defaultChecked={value}
            ref={themeControlRef}
          />
          <LightOnSvg className='swap-off h-6 w-6 fill-current' />
          <LightOffSvg className='swap-on h-6 w-6 fill-current' />
        </label>
      </Container>
    </header>
  );
};
