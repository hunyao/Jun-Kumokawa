import type { ReactNode } from 'react';
import { NavLink } from 'react-router';

type ErrorPanelProps = {
  title: string;
  subtitle?: string;
  actionLabel: string;
  actionTo: string;
  icon?: ReactNode;
};

export const ErrorPanel = (props: ErrorPanelProps) => {
  const { title, subtitle, actionLabel, actionTo, icon } = props;
  return (
    <div className='p-4'>
      <div className='flex flex-col items-center justify-center rounded-lg border-[1px] border-base-content/20 px-6 py-7'>
        {icon}
        <div className='m-2 font-bold text-2xl'>{title}</div>
        {subtitle && (
          <div className='text-base-content/60 text-sm'>{subtitle}</div>
        )}
        <NavLink to={actionTo}>
          <button type='button' className='btn btn-primary btn-sm m-2'>
            {actionLabel}
          </button>
        </NavLink>
      </div>
    </div>
  );
};
