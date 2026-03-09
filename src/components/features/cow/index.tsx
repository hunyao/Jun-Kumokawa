import { useCow } from '@hooks/index';
import { useSearchParams } from 'react-router';

// Add more "v" on the param, it will be...
export const MooPage = () => {
  const [searchParams] = useSearchParams();

  const [level = ''] = Array.from(searchParams.entries())
    .filter(([key]) => /^v+$/.test(key))
    .map(([key]) => key);

  const [msg] = useCow(level);

  console.debug('// Add more "v" on the param, it will be...');
  console.debug(msg);
  return (
    <div className='container mx-auto'>
      <pre className='overflow-hidden overflow-x-auto whitespace-pre p-3'>
        {msg}
      </pre>
    </div>
  );
};
