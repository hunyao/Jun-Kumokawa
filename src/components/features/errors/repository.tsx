import { useParams, useRouteError } from 'react-router';
import { ErrorPanel } from '#components/index';
import { Routes } from '#constants/index';
import { GithubApiRateLimitError } from '#errors/index';
import { WarningSvg } from '#icons/index';
import { genRepositoryPath } from '#utils/index';

export const RepositoryErrorPage = () => {
  const error = useRouteError() as {
    status?: number;
    statusText?: string;
    cause?: unknown;
  };
  const { owner = '', id = '' } = useParams();

  const rateLimitError =
    error?.cause instanceof GithubApiRateLimitError ? error.cause : null;

  const status = rateLimitError?.status ?? error?.status;
  const statusText = rateLimitError?.statusText ?? error?.statusText;
  const title =
    status === 404 ? '404 - page not found' : 'Something went wrong';
  const subtitle =
    statusText || (status ? `Status: ${status}` : 'Unexpected error');
  const isRepoRoute = Boolean(owner && id);
  const target = owner && id ? genRepositoryPath(owner, id) : Routes.HOME;
  return (
    <ErrorPanel
      title={title}
      subtitle={subtitle}
      actionLabel={
        isRepoRoute ? 'Return to the repository overview' : 'Go home'
      }
      actionTo={target}
      icon={<WarningSvg className='m-2 h-6 w-6 fill-current' />}
    />
  );
};
