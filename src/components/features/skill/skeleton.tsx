import { Container } from '#ui/index';

export const SkillPageSkeleton = () => (
  <Container className='grid grid-cols-4 gap-4 py-4'>
    <div className='row-span-3 space-y-1'>
      {[...Array(6)].map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows have no meaningful key
        <div key={i} className='skeleton h-9 w-full rounded-lg' />
      ))}
    </div>
    <div className='col-span-3'>
      <div className='skeleton my-2 h-8 w-40' />
      <div className='divider m-0' />
    </div>
    <div className='col-span-3 flex items-center justify-center'>
      <div className='skeleton h-64 w-64 rounded-full' />
    </div>
  </Container>
);
