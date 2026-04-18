import { Trans, useLingui } from '@lingui/react/macro';
import { useContext, useId, useState } from 'react';
import { Await, type LoaderFunction, useLoaderData } from 'react-router';
import { SuspenseWithComponent } from '#components/index';
import {
  type CONTRACT_TYPE,
  CONTRACT_TYPES,
  PROJECT_SCOPES,
} from '#constants/index';
import { TranslateContext } from '#contexts/index';
import { fetchExperienceData } from '#hooks/index';

import {
  CheckSvg,
  DateRangeSvg,
  DomainSvg,
  GroupsSvg,
  HandshakeSvg,
  LocationSvg,
  LoginSvg,
  UnfoldSvg,
  XmarkSvg,
} from '#icons/index';
import type { Experience, Project } from '#types/experience';
import { Container, GithubTab, GithubTabItem } from '#ui/index';

const TAB_RESPONSEBILITY = 1;
const TAB_ACHIEVEMENT = 2;
const TAB_TECH = 3;
const TAB_SCOPE = 4;

type ProjectProps = {
  experience: Experience;
  project: Project;
};
const ProjectComponent = (props: ProjectProps) => {
  const { experience, project } = props;
  const { i18n, t } = useLingui();
  const { lang } = useContext(TranslateContext);
  const [tab, setTab] = useState(TAB_RESPONSEBILITY);
  const id = useId();

  return (
    <div className='relative flex before:absolute before:top-0 before:bottom-0 before:left-4 before:w-[2px] before:bg-base-content/20'>
      <div>
        <div className='relative z-10 mr-2 bg-base-100 p-2'>
          <LoginSvg className='h-4 w-4 fill-current' />
        </div>
      </div>
      <div className='min-w-0 flex-1'>
        <div className='py-1 text-gray-400'>
          <Trans>assigned on {i18n.date(project.assignedAt)}</Trans>
        </div>
        <div className='my-2 rounded-lg ring ring-base-content/20 hover:bg-base-content/10'>
          <div className='collapse overflow-visible'>
            <input type='checkbox' className='peer hidden' id={id} />
            <div className='collapse-title cursor-default p-0'>
              <div className='flex items-center p-3'>
                <div className='mr-auto min-w-0'>
                  <div className='truncate' title={project.summary[lang]}>
                    {project.summary[lang]}
                  </div>
                  <div className='mt-1 flex items-center gap-4 text-gray-400 text-sm'>
                    <span title={t`role`}>{project.role[lang]}</span>
                    <span
                      className='flex items-center gap-1'
                      title={t`location`}
                    >
                      <LocationSvg className='h-6 w-6 fill-current' />
                      {experience.location}
                    </span>
                    <span
                      className='flex items-end gap-1'
                      title={t`size of project overall`}
                    >
                      <DomainSvg className='h-6 w-6 fill-current' />
                      {project.size.overall}
                    </span>
                    <span
                      className='flex items-end gap-1'
                      title={t`size of team`}
                    >
                      <GroupsSvg className='h-6 w-6 fill-current' />
                      {project.size.team}
                    </span>
                  </div>
                </div>
                <div className='mx-2 flex items-center justify-center'>
                  <div className='tooltip' data-tip={project.industry[lang]}>
                    <div className='w-24 truncate whitespace-nowrap rounded-full border-[1px] border-green-500 px-2 text-center text-green-500 text-sm'>
                      {project.industry[lang]}
                    </div>
                  </div>
                </div>
                <label htmlFor={id}>
                  <div className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg hover:bg-base-content/20'>
                    <div className='tooltip' data-tip={t`Show details`}>
                      <UnfoldSvg className='h-4 w-4 fill-current' />
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <div className='collapse-content opacity-0 transition-all duration-300 peer-checked:opacity-100'>
              <hr className='mb-4 border-base-content/20' />
              <h2 className='text-xl'>{project.name[lang]}</h2>
              <div className='mt-2 flex items-center gap-2 text-base-content/70 text-sm'>
                <DateRangeSvg className='h-4 w-4 fill-current' />
                <span>{i18n.date(project.assignedAt)}</span>
                <span> - </span>
                <span>{i18n.date(project.leftAt)}</span>
              </div>
              <div className='mt-2 flex items-center gap-2 text-base-content/70 text-sm'>
                <HandshakeSvg className='h-4 w-4 fill-current' />
                <span>
                  {
                    CONTRACT_TYPES[experience.employmentType as CONTRACT_TYPE][
                      lang
                    ]
                  }
                </span>
              </div>
              <div className='mt-2 flex items-center gap-2 text-base-content/70 text-sm'>
                <DomainSvg className='h-4 w-4 fill-current' />
                <span>{project.industryType[lang]}</span>
              </div>
              <GithubTab $variant='border' className='mt-4'>
                <GithubTabItem
                  $active={tab === TAB_RESPONSEBILITY}
                  onClick={setTab.bind(null, TAB_RESPONSEBILITY)}
                >
                  <Trans>Responsibilities</Trans>
                </GithubTabItem>
                <GithubTabItem
                  $active={tab === TAB_ACHIEVEMENT}
                  onClick={setTab.bind(null, TAB_ACHIEVEMENT)}
                >
                  <Trans>Achievements</Trans>
                </GithubTabItem>
                <GithubTabItem
                  $active={tab === TAB_TECH}
                  onClick={setTab.bind(null, TAB_TECH)}
                >
                  <Trans>Technologies</Trans>
                </GithubTabItem>
                <GithubTabItem
                  $active={tab === TAB_SCOPE}
                  onClick={setTab.bind(null, TAB_SCOPE)}
                >
                  <Trans>Scopes</Trans>
                </GithubTabItem>
              </GithubTab>
              <div className='p-4 pb-0'>
                <ul
                  className='list list-inside list-disc'
                  hidden={tab !== TAB_RESPONSEBILITY}
                >
                  {project.responsibilities[lang].length === 0 && (
                    <div>
                      <Trans id='experience.no-responsibility'>
                        Sorry...I couldn't remember any responsibility I had
                        during working or Perhaps you erased my memories since
                        it was long time ago.
                      </Trans>
                    </div>
                  )}
                  {project.responsibilities[lang].map((_responsibility, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: reason
                    <li key={i}>{_responsibility}</li>
                  ))}
                </ul>
                <ul
                  className='list list-inside list-disc'
                  hidden={tab !== TAB_ACHIEVEMENT}
                >
                  {project.achievements[lang].length === 0 && (
                    <div>
                      <Trans id='experience.no-achievement'>
                        Sorry...I couldn't remember any achievement I did during
                        working or Perhaps you erased my memories and you would
                        ask to hire me to let me have achievements you and I
                        will make in the future at your project.
                      </Trans>
                    </div>
                  )}
                  {project.achievements[lang].map((_achievement, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: reason
                    <li key={i}>{_achievement}</li>
                  ))}
                </ul>
                <ul className='list list-inside' hidden={tab !== TAB_TECH}>
                  {Object.entries(project.techs).map(([group, items], j) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: reason
                    <li key={j}>
                      <span className='font-bold'>{group}</span>
                      <ul className='list ml-4 list-inside list-disc'>
                        {items.map((item: string, k: number) => (
                          // biome-ignore lint/suspicious/noArrayIndexKey: reason
                          <li key={k}>{item}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
                <div hidden={tab !== TAB_SCOPE}>
                  <div>
                    {PROJECT_SCOPES.map((_scope) => (
                      <div className='flex items-center gap-2' key={_scope.en}>
                        <span hidden={!project.scopes.includes(_scope.en)}>
                          <CheckSvg className='h-4 w-4 fill-green-500' />
                        </span>
                        <span hidden={project.scopes.includes(_scope.en)}>
                          <XmarkSvg className='h-4 w-4 fill-red-500' />
                        </span>
                        <span>{_scope[lang]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExperiencePageSkeleton = () => (
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

const experienceDataPromise = fetchExperienceData();
export type ExperiencePageLoaderResponse = [Experience[]];
export const getExperienceLoader: LoaderFunction = () => {
  return {
    promise: Promise.all([experienceDataPromise]),
  };
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
