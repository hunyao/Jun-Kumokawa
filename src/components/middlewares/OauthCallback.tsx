import { useGithub } from '@hooks/index';
import { type FC, type PropsWithChildren, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export const OauthCallback: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn, isSignedIn } = useGithub();
  const accessToken = searchParams.get('access_token');
  useEffect(() => {
    if (accessToken !== null && !isSignedIn) {
      signIn(accessToken);
      navigate('/', { replace: true });
    }
  }, [accessToken, isSignedIn, navigate, signIn]);
  return children;
};
