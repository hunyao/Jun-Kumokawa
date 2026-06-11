import { useLingui } from '@lingui/react/macro';
import { useContext } from 'react';
import { NavLink } from 'react-router';
import { TranslateMenu } from '#components/index';
import { ENV, langs, Routes } from '#constants/index';
import { SetTranslateContext, TranslateContext } from '#contexts/index';
import { useGithub, useThemeController } from '#hooks/index';
import {
  CatSvg,
  CheckSvg,
  LightOffSvg,
  LightOnSvg,
  LoginSvg,
  LogoutSvg,
  MoreVertSvg,
} from '#icons/index';
import { Container, GithubButton, GithubMenuButton } from '#ui/index';

export const Header = () => {
  const { redirectToSignIn, isSignedIn, signOut } = useGithub();
  const { t } = useLingui();
  const { value, themeControlRef } = useThemeController();
  const { lang: currentLang } = useContext(TranslateContext);
  const setTranslate = useContext(SetTranslateContext);

  return (
    <header className='separater bg-base-300 py-2'>
      <Container className='flex items-center gap-2 md:gap-4'>
        <label htmlFor='sidebarmenu'>
          <GithubMenuButton />
        </label>
        <CatSvg className='hidden h-10 w-10 rounded-full fill-current sm:block' />
        <div className='mr-auto min-w-0 overflow-hidden'>
          <NavLink to={Routes.HOME} className='link-element'>
            {ENV.REPOSITORY_OWNER}
          </NavLink>
          <span className='mx-2'>/</span>
          <NavLink to={Routes.HOME} className='link-element'>
            {ENV.REPOSITORY_NAME}
          </NavLink>
        </div>

        {/* デスクトップ: 3つのコントロールをそのまま表示 */}
        <div className='hidden items-center gap-4 md:flex'>
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
        </div>

        {/* モバイル: 三点リーダーメニュー */}
        <div className='dropdown dropdown-end md:hidden'>
          <button
            tabIndex={0}
            type='button'
            aria-label={t`More options`}
            className='flex cursor-pointer items-center p-1'
          >
            <MoreVertSvg className='h-5 w-5 fill-current' />
          </button>
          <div
            // biome-ignore lint/a11y/noNoninteractiveTabindex: DaisyUI dropdown requires tabIndex to close on blur
            tabIndex={0}
            className='dropdown-content z-1 mt-2 w-40 rounded-xl border-[1px] border-base-content/20 bg-base-100 p-2 shadow-sm'
          >
            {langs.map(({ lang, text }) => (
              <GithubButton
                key={lang}
                $variant='ghost'
                $fullWidth
                className='w-full whitespace-nowrap'
                onClick={() => currentLang !== lang && setTranslate({ lang })}
              >
                <CheckSvg
                  className={[
                    'h-4 w-4',
                    currentLang === lang ? 'fill-current' : 'fill-transparent',
                  ].join(' ')}
                />
                {text}
              </GithubButton>
            ))}
            <div className='divider my-1' />
            <GithubButton
              $variant='ghost'
              $fullWidth
              className='w-full text-nowrap'
              onClick={() => themeControlRef?.current?.click()}
            >
              {value ? (
                <LightOffSvg className='h-4 w-4 fill-current' />
              ) : (
                <LightOnSvg className='h-4 w-4 fill-current' />
              )}
              {value ? t`Dark mode` : t`Light mode`}
            </GithubButton>
            <div className='divider my-1' />
            <GithubButton
              $variant='ghost'
              $fullWidth
              className='w-full text-nowrap'
              onClick={isSignedIn ? signOut : redirectToSignIn}
            >
              {isSignedIn ? (
                <>
                  <LogoutSvg className='h-4 w-4 fill-current' />
                  {t`Sign out`}
                </>
              ) : (
                <>
                  <LoginSvg className='h-4 w-4 fill-current' />
                  {t`Sign in`}
                </>
              )}
            </GithubButton>
          </div>
        </div>
      </Container>
    </header>
  );
};
