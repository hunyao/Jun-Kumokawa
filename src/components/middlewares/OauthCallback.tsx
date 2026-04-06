import { type PropsWithChildren, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Routes } from '#constants/common';
import { useGithub } from '#hooks/index';

export const OauthCallback = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn, isSignedIn } = useGithub();
  const accessToken = searchParams.get('access_token');
  useEffect(() => {
    if (accessToken !== null && !isSignedIn) {
      signIn(accessToken);
      navigate(Routes.HOME, { replace: true });
    }
  }, [accessToken, isSignedIn, navigate, signIn]);
  return children;
};
