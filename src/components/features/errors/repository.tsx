import { useParams, useRouteError } from 'react-router';
import { ErrorPanel } from '#components/index';
import { Routes } from '#constants/index';
import { WarningSvg } from '#icons/index';

export const RepositoryErrorPage = () => {
  const error = useRouteError() as { status?: number; statusText?: string };
  const { owner = '', id = '' } = useParams();
  const status = error?.status;
  const statusText = error?.statusText;
  const title =
    status === 404 ? '404 - page not found' : 'Something went wrong';
  const subtitle =
    statusText || (status ? `Status: ${status}` : 'Unexpected error');
  const isRepoRoute = Boolean(owner && id);
  const target =
    owner && id
      ? Routes.REPOSITORY.replace(':owner', owner).replace(':id', id)
      : Routes.HOME;
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
