import { Trans } from '@lingui/react/macro';
import type { Endpoints } from '@octokit/types';
import {
  Await,
  type LoaderFunction,
  NavLink,
  useLoaderData,
  useParams,
  useSearchParams,
} from 'react-router';
import {
  CloneCode,
  DirectoryContentWrapper,
  GoToFile,
  LanguageUsage,
  OverviewContentWrapper,
  SkillSidebarComponent,
  SwitchBranches,
} from '#components/index';
import { Routes } from '#constants/index';
import { useBranchAndTag } from '#hooks/useBranchAndTag';
import {
  CodeBranchSvg,
  CopyrightSvg,
  GitForkSvg,
  LinkSvg,
  MenuBookSvg,
  StarSvg,
  TagSvg,
  VisibilitySvg,
} from '#icons/index';
import { octokit } from '#lib/index';
import { Container, DetailBoxTitle, GithubButton, GithubChip } from '#ui/index';
import { numberFormat } from '#utils/index';

export const RepositoryPageWrapper = () => {
  const { promise } = useLoaderData();
  const { owner = '', id = '' } = useParams();
  return (
    <Await resolve={promise}>
      {(resolved) => (
        <RepositoryPage key={owner + id} resolvedData={resolved} />
      )}
    </Await>
  );
};

export type RepositoryPageLoaderType = [
  Endpoints['GET /repos/{owner}/{repo}']['response']['data'],
];
export const getRepositoryPageLoader: LoaderFunction = ({ params }) => {
  const { owner = '', id: repo = '' } = params;

  const repository = octokit.rest.repos
    .get({
      owner,
      repo,
    })
    .then(({ data }) => data);
  return {
    promise: Promise.all([repository]),
  };
};

type RepositoryPageProps = {
  resolvedData: RepositoryPageLoaderType;
};
export const RepositoryPage = (props: RepositoryPageProps) => {
  const [searchParams] = useSearchParams();
  const path = searchParams.get('path') || '';
  const { resolvedData } = props;
  const [repository] = resolvedData;
  const owner = repository.owner.login;
  const repo = repository.name;
  const isMyRepository = owner === 'hunyao' && repo === 'Jun-Kumokawa';

  const {
    branches,
    tags,
    currentRef = '',
    loading: branchAndTagLoading,
  } = useBranchAndTag({
    owner,
    repo,
    defaultBranch: repository.default_branch,
  });

  if (branchAndTagLoading) {
    return (
      <Container className='py-4'>
        <div className='skeleton my-4 h-4 w-24' />
        <div className='flex gap-4'>
          <div className='skeleton my-4 h-6 w-3/4' />
          <div className='skeleton my-4 h-6 w-1/4' />
        </div>
      </Container>
    );
  }

  return (
    <Container className='py-4'>
      <div className='flex items-center gap-2'>
        <img
          src={repository.owner.avatar_url}
          className='h-6 w-6 rounded-lg'
          alt={`${repository.owner.login} avatar`}
        />
        <NavLink
          to={Routes.REPOSITORY.replace(':owner', owner).replace(':id', repo)}
          className='link link-hover'
        >
          <span className='font-bold text-xl'>{repository.name}</span>
        </NavLink>
        <span className='rounded-full border-[1px] border-base-content/20 px-1 text-base-content/50 text-sm'>
          {repository.visibility}
        </span>
      </div>
      <div className='divider'></div>
      <div className='grid grid-cols-4 gap-6'>
        <div className='col-span-3'>
          <div className='flex items-center gap-2'>
            <SwitchBranches
              defaultBranch={repository.default_branch}
              value={currentRef}
              branches={branches}
              tags={tags}
            />
            <GithubButton $variant='ghost'>
              <CodeBranchSvg className='h-4 w-4 fill-current' />
              <Trans>{branches.length} Branches</Trans>
            </GithubButton>
            <GithubButton $variant='ghost'>
              <TagSvg className='h-4 w-4 fill-current' />
              <Trans>{tags.length} Tags</Trans>
            </GithubButton>
            <GoToFile
              className='ml-auto'
              owner={owner}
              repo={repo}
              branch={currentRef}
            />
            <CloneCode
              https_url={repository.clone_url}
              ssh_url={repository.ssh_url}
              github_url={`gh repo clone ${repository.full_name}`}
              owner={owner}
              repo={repo}
              branch={currentRef}
            />
          </div>
          <div className='mt-4'>
            <DirectoryContentWrapper
              key={currentRef + path}
              owner={owner}
              repo={repo}
              path={path}
              branch_ref={currentRef}
            />
          </div>
          <div className='mt-4'>
            <OverviewContentWrapper
              key={currentRef + path}
              path={path}
              owner={owner}
              repo={repo}
              branch={currentRef}
            />
          </div>
        </div>
        <div>
          <div>
            <DetailBoxTitle>
              <Trans>About</Trans>
            </DetailBoxTitle>
            <p className='my-3'>
              {repository.description || '(There is no description)'}
            </p>
            {repository.homepage && (
              <p className='my-3 flex items-center gap-2'>
                <LinkSvg className='h-6 w-6 -rotate-45 fill-current' />
                <a
                  href={repository.homepage}
                  target='_blank'
                  rel='noreferrer'
                  className='link link-primary no-underline'
                >
                  {repository.homepage.replace(/^https?:\/\//, '')}
                </a>
              </p>
            )}
            <div className='my-3 flex flex-wrap items-center gap-2'>
              {(repository.topics || []).map((topic) => (
                <GithubChip key={topic} title={topic}>
                  {topic}
                </GithubChip>
              ))}
            </div>
            <div className='my-3 grid grid-flow-row'>
              {[
                {
                  Icon: MenuBookSvg,
                  text: 'Readme',
                },
                {
                  Icon: CopyrightSvg,
                  text: 'MIT License',
                },
                {
                  Icon: StarSvg,
                  text: `${numberFormat(repository.watchers_count, true)} stars`,
                },
                {
                  Icon: VisibilitySvg,
                  text: `${numberFormat(repository.subscribers_count, true)} watchers`,
                },
                {
                  Icon: GitForkSvg,
                  text: `${numberFormat(repository.forks_count, true)} forks`,
                },
              ].map(({ Icon, text }, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: reason
                <div key={i}>
                  <span className='inline-flex cursor-default items-center gap-2 text-gray-500 text-sm hover:text-[#4493f8]'>
                    <Icon className='h-4 w-4 fill-current' />
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className='divider' />
          <LanguageUsage owner={owner} repo={repo} />
          {isMyRepository && (
            <>
              <div className='divider' />
              <SkillSidebarComponent />
            </>
          )}
        </div>
      </div>
    </Container>
  );
};
