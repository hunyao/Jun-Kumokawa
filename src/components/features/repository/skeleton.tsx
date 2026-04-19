import { Container } from '#ui/index';

export const RepositoryPageSkeleton = () => (
  <Container className='py-4'>
    <div className='flex items-center gap-2'>
      <div className='skeleton h-6 w-6 rounded-lg' />
      <div className='skeleton h-7 w-40' />
      <div className='skeleton h-5 w-16 rounded-full' />
    </div>
    <div className='divider' />
    <div className='grid grid-cols-4 gap-6'>
      <div className='col-span-3 space-y-4'>
        <div className='flex items-center gap-2'>
          <div className='skeleton h-8 w-32' />
          <div className='skeleton h-8 w-24' />
          <div className='skeleton h-8 w-20' />
          <div className='skeleton ml-auto h-8 w-24' />
          <div className='skeleton h-8 w-28' />
        </div>
        <div>
          <div className='skeleton h-10 w-full' />
          <div className='skeleton mt-px h-9 w-full' />
          <div className='skeleton mt-px h-9 w-full' />
          <div className='skeleton mt-px h-9 w-full' />
          <div className='skeleton mt-px h-9 w-full' />
          <div className='skeleton mt-px h-9 w-full' />
        </div>
        <div>
          <div className='skeleton h-10 w-full' />
          <div className='skeleton mt-3 h-4 w-full' />
          <div className='skeleton mt-2 h-4 w-5/6' />
          <div className='skeleton mt-2 h-4 w-3/4' />
          <div className='skeleton mt-2 h-4 w-2/3' />
          <div className='skeleton mt-2 h-4 w-4/5' />
        </div>
      </div>
      <div>
        <div className='skeleton h-5 w-14' />
        <div className='skeleton mt-3 h-4 w-full' />
        <div className='skeleton mt-2 h-4 w-3/4' />
        <div className='mt-3 flex flex-wrap gap-2'>
          <div className='skeleton h-5 w-16 rounded-full' />
          <div className='skeleton h-5 w-20 rounded-full' />
          <div className='skeleton h-5 w-14 rounded-full' />
        </div>
        <div className='mt-3 space-y-2'>
          <div className='skeleton h-4 w-24' />
          <div className='skeleton h-4 w-28' />
          <div className='skeleton h-4 w-20' />
          <div className='skeleton h-4 w-24' />
          <div className='skeleton h-4 w-20' />
        </div>
        <div className='divider' />
        <div className='skeleton h-4 w-20' />
        <div className='skeleton mt-2 h-2 w-full rounded-full' />
        <div className='skeleton mt-1 h-2 w-3/4 rounded-full' />
      </div>
    </div>
  </Container>
);
