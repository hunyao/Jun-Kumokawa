import { Trans } from '@lingui/react/macro';
import type { Endpoints } from '@octokit/types';
import { useId, useRef } from 'react';
import {
  Await,
  type LoaderFunction,
  NavLink,
  useLoaderData,
  useParams,
  useSearchParams,
} from 'react-router';
import {
  BlobViewContentWrapper,
  CopyContentButton,
  DirectoryContentWrapper,
  GoToFile,
  OverviewContentWrapper,
  RepositoryFileTree,
  SuspenseWithComponent,
  SwitchBranches,
} from '#components/index';
import { Routes } from '#constants/index';
import { useBranchAndTag, useResizePanel } from '#hooks/index';
import { BottomPanelCloseSvg } from '#icons/index';
import { octokit } from '#lib/index';
import { GithubButton } from '#ui/index';

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
  Endpoints['GET /repos/{owner}/{repo}']['response']['data'],
];
export const getTreePageLoader: LoaderFunction = ({ params }) => {
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

type TreePageProps = {
  resolvedData: TreePageLoaderType;
};
export const TreePage = (props: TreePageProps) => {
  const { resolvedData } = props;
  const [repository] = resolvedData;
  const [searchParams] = useSearchParams();
  const path = searchParams.get('path') || '';
  const mode = searchParams.get('mode') || 'tree';

  const owner = repository.owner.login;
  const repo = repository.name;
  const targetRef = useRef<HTMLDivElement>(null);
  const { resizeHandlerElement } = useResizePanel(targetRef);

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

  const collapseId = useId();

  if (branchAndTagLoading) {
    return (
      <div className='flex h-96 gap-4 py-4'>
        <div className='skeleton h-full w-1/4' />
        <div className='flex w-3/4 flex-col gap-4'>
          <div className='skeleton h-4 w-24' />
          <div className='skeleton h-12 w-full' />
          <div className='skeleton h-4 w-full' />
          <div className='skeleton h-4 w-full' />
          <div className='skeleton h-4 w-full' />
        </div>
      </div>
    );
  }

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
            <Trans>Files</Trans>
          </div>
          <SwitchBranches
            defaultBranch={repository.default_branch}
            value={currentRef}
            branches={branches}
            tags={tags}
            className='w-full'
          />
          <GoToFile owner={owner} repo={repo} branch={currentRef} />
          <div className='divider m-0'></div>
          <RepositoryFileTree
            key={currentRef}
            owner={owner}
            repo={repo}
            branch={currentRef}
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
            value={currentRef}
            branches={branches}
            tags={tags}
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
        {mode === 'tree' && (
          <div>
            <DirectoryContentWrapper
              key={currentRef + path}
              owner={owner}
              repo={repo}
              path={path}
              branch_ref={currentRef}
              separatedHeader
            />
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
        )}
        {mode === 'blob' && (
          <BlobViewContentWrapper
            key={currentRef + path}
            owner={owner}
            repo={repo}
            path={path}
            branch={currentRef}
          />
        )}
      </div>
    </div>
  );
};
