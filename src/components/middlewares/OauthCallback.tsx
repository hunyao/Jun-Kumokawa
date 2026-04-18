import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Routes } from '#constants/common';
import { useGithub } from '#hooks/index';

export const OauthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signIn } = useGithub();
  const accessToken = searchParams.get('access_token');

  // biome-ignore lint/correctness/useExhaustiveDependencies: reason
  useEffect(() => {
    if (accessToken !== null) {
      signIn(accessToken);
      navigate(Routes.HOME, { replace: true });
    }
  }, []);

  return null;
};
