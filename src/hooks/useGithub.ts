import { use, useEffect, useState } from 'react';
import { ApiEndpoints } from '#constants/index';
import { SetToastContext } from '#contexts/index';
import { clearOctokitCache, OCTOKIT_UNAUTHORIZED_EVENT } from '#lib/index';

const githubAuthorizeURL = (code_challenge: string, state: string) =>
  `https://github.com/login/oauth/authorize?${new URLSearchParams({
    response_type: 'code',
    client_id: import.meta.env.VITE_GITHUB_API_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_GITHUB_API_REDIRECT_URI,
    scope: import.meta.env.VITE_GITHUB_API_SCOPE,
    prompt: 'select_account',
    code_challenge_method: 'S256',
    code_challenge,
    state,
  })}`;

export const checkIfSignedIn = () => {
  return window.localStorage.getItem('github-access-token') !== null;
};

/**
 * Manages GitHub OAuth authentication state.
 *
 * Listens for the `octokit:unauthorized` event to detect expired sessions and
 * automatically signs the user out. Clears both the Octokit and request caches
 * on every sign-in or sign-out to prevent stale data from being served.
 *
 * @returns An object containing:
 * - `isSignedIn` – whether a GitHub access token is currently stored
 * - `redirectToSignIn` – redirects to the GitHub OAuth authorization page
 * - `signIn` – stores the access token and marks the user as signed in
 * - `signOut` – removes the access token and marks the user as signed out
 */
export const useGithub = () => {
  const [isSignedIn, setIsSignIn] = useState(
    window.localStorage.getItem('github-access-token') !== null,
  );
  const setToast = use(SetToastContext);

  useEffect(() => {
    /** Clears caches, signs out, and shows an error toast on 401 responses. */
    const handleUnauthorized = () => {
      clearOctokitCache();
      setIsSignIn(false);
      setToast({
        type: 'error',
        message: 'Session expired. Signed out automatically.',
      });
    };

    window.addEventListener(OCTOKIT_UNAUTHORIZED_EVENT, handleUnauthorized);
    return () => {
      window.removeEventListener(
        OCTOKIT_UNAUTHORIZED_EVENT,
        handleUnauthorized,
      );
    };
  }, [setToast]);

  /**
   * Redirects the browser to the GitHub OAuth authorization page.
   * Query parameters are populated from environment variables.
   */
  const redirectToSignIn = async () => {
    const { code_challenge, state } = await fetch(
      ApiEndpoints.CODE_CHALLENGE,
    ).then((r) => r.json());
    window.location.assign(githubAuthorizeURL(code_challenge, state));
  };

  /**
   * Stores the access token, clears caches, and marks the user as signed in.
   *
   * @param accessToken - GitHub OAuth access token
   */
  const signIn = (accessToken: string) => {
    window.localStorage.setItem('github-access-token', accessToken);
    clearOctokitCache();
    setIsSignIn(true);
    setToast({
      type: 'success',
      message: 'Signed in successfully.',
    });
  };
  /** Removes the access token, clears caches, and marks the user as signed out. */
  const signOut = () => {
    window.localStorage.removeItem('github-access-token');
    clearOctokitCache();
    setIsSignIn(false);
    setToast({
      type: 'success',
      message: "You've been successfully signed out!",
    });
  };

  return { redirectToSignIn, isSignedIn, signIn, signOut };
};
