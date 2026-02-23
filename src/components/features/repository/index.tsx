import {
  CloneCode,
  DirectoryContentWrapper,
  LanguageSidebarComponent,
  OverviewContent,
  SwitchBranches,
} from '@components/index';
import { Routes } from '@constants/index';
import {
  CodeBranchSvg,
  CopyrightSvg,
  GitForkSvg,
  LinkSvg,
  MenuBookSvg,
  StarSvg,
  TagSvg,
  VisibilitySvg,
} from '@icons/index';
import { octokit } from '@lib/index';
import type { Endpoints } from '@octokit/types';
import { Container, DetailBoxTitle, GithubButton, GithubChip } from '@ui/index';
import { numberFormat, requestRecursively } from '@utils/index';
import type { FC } from 'react';
import {
  Await,
  type LoaderFunction,
  NavLink,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router';

export const RepositoryPageWrapper: FC = () => {
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
  Endpoints['GET /repos/{owner}/{repo}']['response'],
  Endpoints['GET /repos/{owner}/{repo}/branches']['response']['data'],
  Endpoints['GET /repos/{owner}/{repo}/tags']['response']['data'],
];
export const getRepositoryPageLoader: LoaderFunction = ({ params }) => {
  const { owner = '', id: repo = '' } = params;

  const repository = octokit.rest.repos.get({
    owner,
    repo,
  });
  const branches = requestRecursively(octokit.rest.repos.listBranches, {
    owner,
    repo,
  })
    .then((items) => items.map((item) => item.data))
    .then((items) => items.flat());
  const tags = requestRecursively(octokit.rest.repos.listTags, {
    owner,
    repo,
  })
    .then((items) => items.map((item) => item.data))
    .then((items) => items.flat());
  return { promise: Promise.all([repository, branches, tags]) };
};

type RepositoryPageProps = {
  resolvedData: RepositoryPageLoaderType;
};
export const RepositoryPage: FC<RepositoryPageProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const path = searchParams.get('path') || '';
  const { resolvedData } = props;
  const [{ data: repository }, branches, tags] = resolvedData;
  const currentBranch = searchParams.get('branch') || repository.default_branch;
  const owner = repository.owner.login;
  const repo = repository.name;
  const branch = branches.find((_b) => _b.name === currentBranch);
  if (branch === undefined) return null;

  const onChangeBranch = (_branch: string) => {
    const _searchParams = searchParams;
    _searchParams.set('branch', _branch);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

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
              value={currentBranch}
              branches={branches}
              tags={tags}
              onChange={onChangeBranch}
            />
            <GithubButton $variant='ghost'>
              <CodeBranchSvg className='h-4 w-4 fill-current' />
              {branches.length} Branches
            </GithubButton>
            <GithubButton $variant='ghost'>
              <TagSvg className='h-4 w-4 fill-current' />
              {tags.length} Tags
            </GithubButton>
            <CloneCode
              className='ml-auto'
              https_url={repository.clone_url}
              ssh_url={repository.ssh_url}
              github_url={`gh repo clone ${repository.full_name}`}
              owner={owner}
              repo={repo}
              branch={branch.name}
            />
          </div>
          <div className='mt-4'>
            <DirectoryContentWrapper
              key={currentBranch + path}
              owner={owner}
              repo={repo}
              path={path}
              currentBranch={currentBranch}
              branch_ref={branch.commit.sha}
            />
          </div>
          <div className='mt-4'>
            <OverviewContent
              key={currentBranch + path}
              path={path}
              owner={owner}
              repo={repo}
            />
          </div>
        </div>
        <div>
          <div>
            <DetailBoxTitle>About</DetailBoxTitle>
            <p className='my-3'>
              {repository.description || '(There is no description)'}
            </p>
            {repository.homepage && (
              <p className='my-3 flex items-center gap-2'>
                <LinkSvg className='-rotate-45 h-6 w-6 fill-current' />
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
              {repository.topics?.map((topic) => (
                <GithubChip key={topic} title={topic}>
                  {topic}
                </GithubChip>
              ))}
            </div>
            <div className='my-3 grid grid-flow-row'>
              <div>
                <span className='inline-flex cursor-default items-center gap-2 text-gray-500 text-sm hover:text-[#4493f8]'>
                  <MenuBookSvg className='h-4 w-4 fill-current' />
                  Readme
                </span>
              </div>
              <div>
                <span className='inline-flex cursor-default items-center gap-2 text-gray-500 text-sm hover:text-[#4493f8]'>
                  <CopyrightSvg className='h-4 w-4 fill-current' />
                  MIT License
                </span>
              </div>
              <div>
                <span className='inline-flex cursor-default items-center gap-2 text-gray-500 text-sm hover:text-[#4493f8]'>
                  <StarSvg className='h-4 w-4 fill-current' />
                  {numberFormat(repository.watchers_count, true)} stars
                </span>
              </div>
              <div>
                <span className='inline-flex cursor-default items-center gap-2 text-gray-500 text-sm hover:text-[#4493f8]'>
                  <VisibilitySvg className='h-4 w-4 fill-current' />
                  {numberFormat(repository.subscribers_count, true)} watchers
                </span>
              </div>
              <div>
                <span className='inline-flex cursor-default items-center gap-2 text-gray-500 text-sm hover:text-[#4493f8]'>
                  <GitForkSvg className='h-4 w-4 fill-current' />
                  {numberFormat(repository.forks_count, true)} forks
                </span>
              </div>
            </div>
          </div>
          <div className='divider' />
          {owner === 'hunyao' && repo === 'Jun-Kumokawa' && (
            <LanguageSidebarComponent />
          )}
        </div>
      </div>
    </Container>
  );
};
