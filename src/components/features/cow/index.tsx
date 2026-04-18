import { useEffect } from 'react';
import {
  Await,
  type LoaderFunction,
  useLoaderData,
  useSearchParams,
} from 'react-router';
import { fetchCowData, useCow } from '#hooks/index';
import type { Cow } from '#types/cow';

export const MooPageWrapper = () => {
  const { promise } = useLoaderData();
  return (
    <Await resolve={promise}>
      {(resolved) => <MooPage resolvedData={resolved} />}
    </Await>
  );
};

const cowDataPromise = fetchCowData();
export type MooPageLoaderResponse = [Cow];
export const getMooPageLoader: LoaderFunction = () => {
  return {
    promise: Promise.all([cowDataPromise]),
  };
};
type MooPageProps = {
  resolvedData: MooPageLoaderResponse;
};
export const MooPage = (props: MooPageProps) => {
  const { resolvedData } = props;
  const [cowData] = resolvedData;
  const [searchParams] = useSearchParams();

  const [level = ''] = Array.from(searchParams.entries())
    .filter(([key]) => /^v+$/.test(key))
    .map(([key]) => key);

  const { getMessage } = useCow(cowData);

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
        {getMessage(level)}
      </pre>
    </div>
  );
};
