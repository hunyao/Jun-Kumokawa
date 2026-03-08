import type { HTMLAttributes, PropsWithChildren } from 'react';

type ActivityProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
};
export const Activity = (props: PropsWithChildren<ActivityProps>) => {
  const { title = 'December 2018', children, ...rest } = props;
  return (
    <div {...rest}>
      <h3 className='mb-4 h-3 border-gray-300 border-b-[1px]'>
        <span className='bg-base-100 px-2'>{title}</span>
      </h3>
      {children}
    </div>
  );
};
