import type { FC, PropsWithChildren, ReactNode } from 'react';
import { Suspense } from 'react';

type LoadingComponentProps = {
  debug?: string;
};
const LoadingComponent: FC<LoadingComponentProps> = (props) => {
  const { debug } = props;

  return (
    <div
      role='status'
      aria-live='polite'
      className='fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/10'
    >
      <span className='loading loading-dots loading-xl'></span>
      {debug && <div>{debug}</div>}
    </div>
  );
};
type SuspenseWithComponentProps = {
  fallback?: ReactNode;
};
export const SuspenseWithComponent: FC<
  PropsWithChildren<SuspenseWithComponentProps>
> = ({ children, fallback = <LoadingComponent /> }) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};
