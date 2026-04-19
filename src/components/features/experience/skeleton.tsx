import { Container } from '#ui/index';

export const ExperiencePageSkeleton = () => (
  <Container>
    <div className='separater mb-4 py-4'>
      <div className='skeleton h-8 w-48' />
    </div>
    <div className='grid auto-cols-fr gap-y-4 py-4'>
      {[...Array(5)].map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows have no meaningful key
          key={i}
          className='relative flex before:absolute before:top-0 before:bottom-0 before:left-4 before:w-[2px] before:bg-base-content/20'
        >
          <div>
            <div className='relative z-10 mr-2 bg-base-100 p-2'>
              <div className='skeleton h-4 w-4 rounded' />
            </div>
          </div>
          <div className='min-w-0 flex-1'>
            <div className='skeleton my-1 h-4 w-32' />
            <div className='my-2 rounded-lg ring ring-base-content/20'>
              <div className='p-3'>
                <div className='flex items-center'>
                  <div className='mr-auto min-w-0 flex-1 space-y-2'>
                    <div className='skeleton h-4 w-3/4' />
                    <div className='flex items-center gap-4'>
                      <div className='skeleton h-4 w-20' />
                      <div className='skeleton h-4 w-24' />
                      <div className='skeleton h-4 w-16' />
                      <div className='skeleton h-4 w-16' />
                    </div>
                  </div>
                  <div className='mx-2'>
                    <div className='skeleton h-5 w-24 rounded-full' />
                  </div>
                  <div className='skeleton h-8 w-8 rounded-lg' />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Container>
);
