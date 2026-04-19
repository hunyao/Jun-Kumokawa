export const TreePageSkeleton = () => (
  <div className='flex'>
    <div className='flex w-auto min-w-[300px] border-base-content/20 border-r-[1px]'>
      <div className='sticky top-0 grid max-h-screen flex-1 grid-rows-[min-content_min-content_min-content_min-content_minmax(0,1fr)] gap-2 p-4'>
        <div className='flex items-center gap-2'>
          <div className='skeleton h-8 w-8' />
          <div className='skeleton h-5 w-12' />
        </div>
        <div className='skeleton h-8 w-full' />
        <div className='skeleton h-8 w-full' />
        <div className='divider m-0' />
        <div className='space-y-1 overflow-hidden'>
          <div className='skeleton h-6 w-3/4' />
          <div className='skeleton h-6 w-1/2' />
          <div className='skeleton h-6 w-2/3' />
          <div className='skeleton h-6 w-1/2' />
          <div className='skeleton h-6 w-3/4' />
          <div className='skeleton h-6 w-1/3' />
          <div className='skeleton h-6 w-2/3' />
          <div className='skeleton h-6 w-1/2' />
        </div>
      </div>
    </div>
    <div className='min-w-0 flex-1 p-4'>
      <div className='mb-4 flex items-center gap-2'>
        <div className='skeleton h-6 w-28' />
        <div className='skeleton h-4 w-4' />
        <div className='skeleton h-6 w-20' />
        <div className='skeleton h-6 w-6 rounded' />
      </div>
      <div>
        <div className='skeleton h-10 w-full' />
        <div className='skeleton mt-px h-9 w-full' />
        <div className='skeleton mt-px h-9 w-full' />
        <div className='skeleton mt-px h-9 w-full' />
        <div className='skeleton mt-px h-9 w-full' />
        <div className='skeleton mt-px h-9 w-full' />
      </div>
      <div className='mt-4'>
        <div className='skeleton h-10 w-full' />
        <div className='skeleton mt-3 h-4 w-full' />
        <div className='skeleton mt-2 h-4 w-5/6' />
        <div className='skeleton mt-2 h-4 w-3/4' />
        <div className='skeleton mt-2 h-4 w-2/3' />
        <div className='skeleton mt-2 h-4 w-4/5' />
      </div>
    </div>
  </div>
);
