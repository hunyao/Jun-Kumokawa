import { useGithub } from '@hooks/index';
import type { FC, PropsWithChildren } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export const OauthCallback: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn, isSignedIn } = useGithub();
  const accessToken = searchParams.get('access_token');
  if (accessToken !== null && !isSignedIn) {
    signIn(accessToken);
    navigate('/');
  }
  return children;
};
