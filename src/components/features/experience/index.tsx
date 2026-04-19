import { Trans } from '@lingui/react/macro';
import { Await, useLoaderData } from 'react-router';
import { SuspenseWithComponent } from '#components/index';
import { Container } from '#ui/index';
import { ProjectComponent } from './components/Project';
import type { ExperiencePageLoaderResponse } from './loader';
import { ExperiencePageSkeleton } from './skeleton';

export const ExperiencePageWrapper = () => {
  const { promise } = useLoaderData();
  return (
    <SuspenseWithComponent fallback={<ExperiencePageSkeleton />}>
      <Await resolve={promise}>
        {(resolved) => <ExperiencePage resolvedData={resolved} />}
      </Await>
    </SuspenseWithComponent>
  );
};

type ExperiencePageProps = {
  resolvedData: ExperiencePageLoaderResponse;
};

export const ExperiencePage = (props: ExperiencePageProps) => {
  const { resolvedData } = props;
  const [experiences] = resolvedData;

  return (
    <Container>
      <div className='separater mb-4 py-4 font-bold text-2xl'>
        <Trans>Working activity</Trans>
      </div>
      <div className='grid auto-cols-fr gap-y-4 py-4'>
        {experiences.flatMap((experience, j) =>
          experience.projects.map((project, i) => (
            <ProjectComponent
              // biome-ignore lint/suspicious/noArrayIndexKey: reason
              key={`${i}${j}`}
              experience={experience}
              project={project}
            />
          )),
        )}
      </div>
    </Container>
  );
};

export { getExperienceLoader } from './loader';
