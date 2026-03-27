import type { PropsWithChildren } from 'react';
import { LoginSvg, UnfoldSvg } from '#icons/index';

type TimelineProps = {
  title?: string;
};
export const Timeline = (props: PropsWithChildren<TimelineProps>) => {
  const { title, children } = props;
  return (
    <div className='relative ml-4 flex gap-2 py-2 before:absolute before:top-0 before:left-0 before:h-full before:w-[2px] before:bg-gray-300'>
      <div className='-ml-4'>
        <div className='avatar avatar-placeholder'>
          <div className='rounded-full bg-gray-700 p-2 text-neutral-100'>
            <LoginSvg className='h-4 w-4 fill-current' />
          </div>
        </div>
      </div>
      <div className='flex-1'>
        <details>
          <summary className='link link-hover hover:link-primary flex list-none justify-between leading-8 hover:no-underline'>
            <div>{title}</div>
            <UnfoldSvg className='fill-current' />
          </summary>
          {children}
        </details>
      </div>
    </div>
  );
};
