import { RequestError } from 'octokit';
import type { ReactNode } from 'react';
import { useParams, useRouteError } from 'react-router';
import { ErrorPanel } from '#components/index';
import { Routes } from '#constants/index';
import { GithubApiRateLimitError } from '#errors/*';
import { genRepositoryPath } from '#utils/index';

export const RepositoryErrorPage = () => {
  const error = useRouteError();
  const { owner = '', id = '' } = useParams();

  let status: number;
  let statusText: string;
  let title: string;
  let subtitle: string;
  let icon: ReactNode;
  const isRepoRoute = Boolean(owner && id);
  const target = isRepoRoute ? genRepositoryPath(owner, id) : Routes.HOME;
  switch (true) {
    case error instanceof GithubApiRateLimitError:
      status = error?.status;
      statusText = error?.statusText;
      title = 'Github Rate limit Error';
      subtitle = statusText;
      icon = <img src='/images/syazai_kaiken.png' alt='' className='h-96' />;
      break;
    case error instanceof RequestError:
      status = error?.status;
      statusText = error?.message;
      title = status === 404 ? '404 - page not found' : 'Something went wrong';
      subtitle =
        statusText || (status ? `Status: ${status}` : 'Unexpected error');
      icon = <img src='/images/syazai_kaiken.png' alt='' className='h-96' />;
      break;
    default:
      title = 'Something went wrong';
      subtitle = 'Unexpected error';
      icon = <img src='/images/syazai_kaiken.png' alt='' className='h-96' />;
  }

  return (
    <ErrorPanel
      title={title}
      subtitle={subtitle}
      actionLabel={
        isRepoRoute ? 'Return to the repository overview' : 'Go home'
      }
      actionTo={target}
      icon={icon}
    />
  );
};
