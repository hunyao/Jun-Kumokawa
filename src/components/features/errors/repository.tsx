import { Routes } from '@constants/index';
import { WarningSvg } from '@icons/index';
import { NavLink, useParams } from 'react-router';

export const RepositoryErrorPage = () => {
  const { owner = '', id = '' } = useParams();
  return (
    <div className='p-4'>
      <div className='flex flex-col items-center justify-center rounded-lg border-[1px] border-base-content/20 px-6 py-7'>
        <WarningSvg className='m-2 h-6 w-6 fill-current' />
        <div className='m-2 font-bold text-2xl'>404 - page not found</div>
        <NavLink
          to={Routes.REPOSITORY.replace(':owner', owner).replace(':id', id)}
        >
          <button type='button' className='btn btn-primary btn-sm m-2'>
            Return to the repository overview
          </button>
        </NavLink>
      </div>
    </div>
  );
};
