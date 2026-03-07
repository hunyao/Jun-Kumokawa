import {
  BlobViewContentWrapper,
  CopyContentButton,
  DirectoryContentWrapper,
  GoToFile,
  LatestCommit,
  OverviewContent,
  RepositoryFileTree,
  SuspenseWithComponent,
  SwitchBranches,
} from '@components/index';
import { Routes } from '@constants/index';
import { useResizePanel } from '@hooks/index';
import { BottomPanelCloseSvg } from '@icons/index';
import { octokit } from '@lib/index';
import type { Endpoints } from '@octokit/types';
import { GithubButton } from '@ui/index';
import { getAllCommitCounts, requestRecursively } from '@utils/index';
import { useId, useRef } from 'react';
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

export const TreePageWrapper = () => {
  const { promise } = useLoaderData();
  const { owner = '', id = '' } = useParams();
  return (
    <SuspenseWithComponent>
      <Await resolve={promise}>
        {(resolved) => <TreePage key={owner + id} resolvedData={resolved} />}
      </Await>
    </SuspenseWithComponent>
  );
};

export type TreePageLoaderType = [
  Endpoints['GET /repos/{owner}/{repo}']['response'],
  Endpoints['GET /repos/{owner}/{repo}/branches']['response']['data'],
  Endpoints['GET /repos/{owner}/{repo}/tags']['response']['data'],
  Endpoints['GET /repos/{owner}/{repo}/commits']['response'],
  number,
];
export const getTreePageLoader: LoaderFunction = ({ params, request }) => {
  const { owner = '', id: repo = '' } = params;
  const searchParams = new URL(request.url).searchParams;
  const currentBranch = searchParams.get('branch') || undefined;
  const path = searchParams.get('path') || '';

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
  const ref = octokit.rest.repos.listCommits({
    owner,
    repo,
    sha: currentBranch === undefined ? undefined : `heads/${currentBranch}`,
    path,
    per_page: 1,
    page: 1,
  });
  const totalCommitCount = getAllCommitCounts({
    owner,
    repo,
    sha: currentBranch === undefined ? undefined : `heads/${currentBranch}`,
  });
  return {
    promise: Promise.all([repository, branches, tags, ref, totalCommitCount]),
  };
};

type TreePageProps = {
  resolvedData: TreePageLoaderType;
};
export const TreePage = (props: TreePageProps) => {
  const { resolvedData } = props;
  const [
    { data: repository },
    branches,
    tags,
    { data: ref },
    totalCommitCount,
  ] = resolvedData;
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const currentBranch = searchParams.get('branch') || repository.default_branch;
  const path = searchParams.get('path') || '';
  const mode = searchParams.get('mode') || 'tree';

  const owner = repository.owner.login;
  const repo = repository.name;
  const branch = [...branches, ...tags].find((_b) => _b.name === currentBranch);
  const targetRef = useRef<HTMLDivElement>(null);
  const { resizeHandlerElement } = useResizePanel(targetRef);

  const collapseId = useId();

  const onChangeBranch = (_branch: string) => {
    const _searchParams = searchParams;
    _searchParams.set('branch', _branch);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
  if (branch === undefined) return null;

  return (
    <div className='group flex'>
      <input type='checkbox' className='hidden' id={collapseId} />
      <div className='flex w-auto min-w-[300px] border-base-content/20 border-r-[1px] group-has-[input:checked]:hidden'>
        <div
          className='sticky top-0 grid max-h-screen flex-1 grid-rows-[min-content_min-content_min-content_min-content_minmax(0,1fr)] gap-2 p-4'
          ref={targetRef}
        >
          <div className='flex items-center gap-2 font-bold text-lg'>
            <div
              className='tooltip tooltip-right'
              data-tip='Collapse file tree'
            >
              <GithubButton
                $variant='ghost'
                className='!p-1'
                as='label'
                htmlFor={collapseId}
              >
                <BottomPanelCloseSvg className='h-6 w-6 rotate-90 fill-current' />
              </GithubButton>
            </div>
            Files
          </div>
          <SwitchBranches
            defaultBranch={repository.default_branch}
            value={currentBranch}
            branches={branches}
            tags={tags}
            className='w-full'
            onChange={onChangeBranch}
          />
          <GoToFile owner={owner} repo={repo} branch={branch.name} />
          <div className='divider m-0'></div>
          <RepositoryFileTree
            key={currentBranch}
            owner={owner}
            repo={repo}
            branch={branch.name}
            path=''
          />
        </div>
        {resizeHandlerElement}
      </div>
      <div className='min-w-0 flex-1 p-4'>
        <div className='mb-4 flex items-center gap-2'>
          <div
            className='tooltip tooltip-right hidden group-has-[input:checked]:block'
            data-tip='Expand file tree'
          >
            <GithubButton
              $variant='ghost'
              className='!p-1'
              as='label'
              htmlFor={collapseId}
            >
              <BottomPanelCloseSvg className='h-6 w-6 rotate-90 fill-current' />
            </GithubButton>
          </div>
          <SwitchBranches
            className='hidden group-has-[input:checked]:inline-block'
            defaultBranch={repository.default_branch}
            value={currentBranch}
            branches={branches}
            tags={tags}
            onChange={onChangeBranch}
          />
          <nav>
            <ol className='inline-block'>
              <li className='inline-block'>
                <NavLink
                  to={{
                    pathname: Routes.TREE.replace(
                      ':owner',
                      repository.owner.login,
                    ).replace(':id', repository.name),
                    search: new URLSearchParams({
                      ...Object.fromEntries(searchParams.entries()),
                      path: '',
                      mode: 'tree',
                    }).toString(),
                  }}
                  className='link link-primary link-hover'
                >
                  {repository.name}
                </NavLink>
              </li>
              {path.length === 0 && <span className='px-2'>/</span>}
              {path.length > 0 &&
                path
                  .replace(/^\//, '')
                  .split('/')
                  .map((_p, _i, _self) => (
                    <li className='inline-block' key={_p}>
                      <span className='px-2'>/</span>
                      {_self.length - 1 === _i && (
                        <>
                          <span className='font-bold'>{_p}</span>
                          {mode === 'tree' && <span className='px-2'>/</span>}
                        </>
                      )}
                      {_self.length - 1 !== _i && (
                        <NavLink
                          to={{
                            pathname: Routes.TREE.replace(
                              ':owner',
                              repository.owner.login,
                            ).replace(':id', repository.name),
                            search: new URLSearchParams({
                              ...Object.fromEntries(searchParams.entries()),
                              path: path
                                .replace(/^\//, '')
                                .split('/')
                                .slice(0, _i + 1)
                                .join('/'),
                              mode: 'tree',
                            }).toString(),
                          }}
                          className='link link-primary link-hover'
                        >
                          {_p}
                        </NavLink>
                      )}
                    </li>
                  ))}
            </ol>
          </nav>
          <div>
            <CopyContentButton content={path} data-tip='Copy path' />
          </div>
        </div>
        {ref[0] && (
          <LatestCommit
            commit={ref[0]}
            totalCommitCount={totalCommitCount}
            className='mb-4 rounded-lg ring ring-base-content/20'
          />
        )}
        {mode === 'tree' && (
          <div>
            <DirectoryContentWrapper
              key={currentBranch + path}
              owner={owner}
              repo={repo}
              path={path}
              currentBranch={currentBranch}
              branch_ref={branch.commit.sha}
              separatedHeader
              skipCommitData
              initialRef={ref}
              initialTotalCommitCount={totalCommitCount}
            />
            <div className='mt-4'>
              <OverviewContent
                key={currentBranch + path}
                path={path}
                owner={owner}
                repo={repo}
                branch={currentBranch}
              />
            </div>
          </div>
        )}
        {mode === 'blob' && (
          <BlobViewContentWrapper
            key={currentBranch + path}
            owner={owner}
            repo={repo}
            path={path}
            branch={currentBranch}
          />
        )}
      </div>
    </div>
  );
};
