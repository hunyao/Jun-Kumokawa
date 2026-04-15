import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useCow } from '#hooks/index';

// Add more "v" on the param, it will be...
export const MooPage = () => {
  const [searchParams] = useSearchParams();

  const [level = ''] = Array.from(searchParams.entries())
    .filter(([key]) => /^v+$/.test(key))
    .map(([key]) => key);

  const [msg] = useCow(level);

  useEffect(() => {
    console.log(
      `%c
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

 $$$$$$\\   $$$$$$\\  $$\\   $$\\ $$$$$$$$\\ $$$$$$\\  $$$$$$\\  $$\\   $$\\ 
$$  __$$\\ $$  __$$\\ $$ |  $$ |\\__$$  __|\\_$$  _|$$  __$$\\ $$$\\  $$ |
$$ /  \\__|$$ /  $$ |$$ |  $$ |   $$ |     $$ |  $$ /  $$ |$$$$\\ $$ |
$$ |      $$$$$$$$ |$$ |  $$ |   $$ |     $$ |  $$ |  $$ |$$ $$\\$$ |
$$ |      $$  __$$ |$$ |  $$ |   $$ |     $$ |  $$ |  $$ |$$ \\$$$$ |
$$ |  $$\\ $$ |  $$ |$$ |  $$ |   $$ |     $$ |  $$ |  $$ |$$ |\\$$$ |
\\$$$$$$  |$$ |  $$ |\\$$$$$$  |   $$ |   $$$$$$\\  $$$$$$  |$$ | \\$$ |
 \\______/ \\__|  \\__| \\______/    \\__|   \\______| \\______/ \\__|  \\__|

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

%cI would not recommend to add "v" on the param unless you want to hire me`,
      'color: orange; font-weight: bold; font-size: 0.8rem',
      'color: orange; font-weight: bold; font-size: 1.5rem',
    );
  }, []);
  return (
    <div className='container mx-auto'>
      <pre className='overflow-hidden overflow-x-auto whitespace-pre p-3'>
        {msg}
      </pre>
    </div>
  );
};
