import { SetToastContext } from '@contexts/ToastContext';
import { use, useState } from 'react';

export const useGithub = () => {
  const [isSignedIn, setIsSignIn] = useState(
    window.localStorage.getItem('github-access-token') !== null,
  );
  const setToast = use(SetToastContext);

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
    setIsSignIn(true);
    setToast({
      type: 'sccuess',
      message: 'Signing successful!',
    });
  };
  const signOut = () => {
    window.localStorage.removeItem('github-access-token');
    setIsSignIn(false);
    setToast({
      type: 'sccuess',
      message: "You've been successfully signed out!",
    });
  };

  return { redirectToSignIn, isSignedIn, signIn, signOut };
};
