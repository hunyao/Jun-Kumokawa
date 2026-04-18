import type { PropsWithChildren, ReactNode } from 'react';
import { Suspense } from 'react';

const LoadingComponent = () => {
  return (
    <output
      aria-live='polite'
      className='fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/10'
    >
      <span className='loading loading-dots loading-xl' />
    </output>
  );
};
type SuspenseWithComponentProps = {
  fallback?: ReactNode;
};
export const SuspenseWithComponent = ({
  children,
  fallback = <LoadingComponent />,
}: PropsWithChildren<SuspenseWithComponentProps>) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};
