import { useRouteError } from 'react-router';
import { ErrorPanel } from '#components/index';
import { Routes } from '#constants/index';
import { WarningSvg } from '#icons/index';

export const AppErrorPage = () => {
  const error = useRouteError() as { status?: number; statusText?: string };
  const status = error?.status;
  const statusText = error?.statusText;
  const title =
    status === 404 ? '404 - page not found' : 'Something went wrong';
  const subtitle =
    statusText || (status ? `Status: ${status}` : 'Unexpected error');

  return (
    <ErrorPanel
      title={title}
      subtitle={subtitle}
      actionLabel='Go home'
      actionTo={Routes.HOME}
      icon={<WarningSvg className='m-2 h-6 w-6 fill-current' />}
    />
  );
};
