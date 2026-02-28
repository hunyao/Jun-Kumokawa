import { SetToastContext } from '@contexts/ToastContext';
import { clearOctokitCache, OCTOKIT_UNAUTHORIZED_EVENT } from '@lib/octokit';
import { clearRequestCache } from '@utils/index';
import { use, useEffect, useState } from 'react';

export const useGithub = () => {
  const [isSignedIn, setIsSignIn] = useState(
    window.localStorage.getItem('github-access-token') !== null,
  );
  const setToast = use(SetToastContext);

  useEffect(() => {
    const handleUnauthorized = () => {
      clearOctokitCache();
      clearRequestCache();
      setIsSignIn(false);
      setToast({
        type: 'error',
        message: 'Session expired. Signed out automatically.',
      });
    };

    window.addEventListener(OCTOKIT_UNAUTHORIZED_EVENT, handleUnauthorized);
    return () => {
      window.removeEventListener(OCTOKIT_UNAUTHORIZED_EVENT, handleUnauthorized);
    };
  }, [setToast]);

  const redirectToSignIn = () => {
    const url = `https://github.com/login/oauth/authorize?${new URLSearchParams(
      {
        response_type: 'code',
        client_id: import.meta.env.VITE_GITHUB_API_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_GITHUB_API_REDIRECT_URI,
        scope: import.meta.env.VITE_GITHUB_API_SCOPE,
      },
    )}`;

    window.location.assign(url);
  };

  const signIn = (accessToken: string) => {
    window.localStorage.setItem('github-access-token', accessToken);
    clearOctokitCache();
    clearRequestCache();
    setIsSignIn(true);
    setToast({
      type: 'success',
      message: 'Signed in successfully.',
    });
  };
  const signOut = () => {
    window.localStorage.removeItem('github-access-token');
    clearOctokitCache();
    clearRequestCache();
    setIsSignIn(false);
    setToast({
      type: 'success',
      message: "You've been successfully signed out!",
    });
  };

  return { redirectToSignIn, isSignedIn, signIn, signOut };
};
