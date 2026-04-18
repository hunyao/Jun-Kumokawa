import { Trans } from '@lingui/react/macro';
import type { Endpoints } from '@octokit/types';
import { useId, useRef } from 'react';
import {
  Await,
  type LoaderFunction,
  useLoaderData,
  useParams,
  useSearchParams,
} from 'react-router';
import {
  BlobViewContentWrapper,
  Breadcrumbs,
  CopyContentButton,
  DirectoryContentWrapper,
  GoToFile,
  OverviewContentWrapper,
  RepositoryFileTree,
  SuspenseWithComponent,
  SwitchBranches,
} from '#components/index';
import { useBranchAndTag, useResizePanel } from '#hooks/index';
import { BottomPanelCloseSvg } from '#icons/index';
import { octokit } from '#lib/index';
import { GithubButton } from '#ui/index';
import { requestRecursively } from '#utils/api';

const TreePageSkeleton = () => (
  <div className='flex'>
    <div className='flex w-auto min-w-[300px] border-base-content/20 border-r-[1px]'>
      <div className='sticky top-0 grid max-h-screen flex-1 grid-rows-[min-content_min-content_min-content_min-content_minmax(0,1fr)] gap-2 p-4'>
        <div className='flex items-center gap-2'>
          <div className='skeleton h-8 w-8' />
          <div className='skeleton h-5 w-12' />
        </div>
        <div className='skeleton h-8 w-full' />
        <div className='skeleton h-8 w-full' />
        <div className='divider m-0' />
        <div className='space-y-1 overflow-hidden'>
          <div className='skeleton h-6 w-3/4' />
          <div className='skeleton h-6 w-1/2' />
          <div className='skeleton h-6 w-2/3' />
          <div className='skeleton h-6 w-1/2' />
          <div className='skeleton h-6 w-3/4' />
          <div className='skeleton h-6 w-1/3' />
          <div className='skeleton h-6 w-2/3' />
          <div className='skeleton h-6 w-1/2' />
        </div>
      </div>
    </div>
    <div className='min-w-0 flex-1 p-4'>
      <div className='mb-4 flex items-center gap-2'>
        <div className='skeleton h-6 w-28' />
        <div className='skeleton h-4 w-4' />
        <div className='skeleton h-6 w-20' />
        <div className='skeleton h-6 w-6 rounded' />
      </div>
      <div>
        <div className='skeleton h-10 w-full' />
        <div className='skeleton mt-px h-9 w-full' />
        <div className='skeleton mt-px h-9 w-full' />
        <div className='skeleton mt-px h-9 w-full' />
        <div className='skeleton mt-px h-9 w-full' />
        <div className='skeleton mt-px h-9 w-full' />
      </div>
      <div className='mt-4'>
        <div className='skeleton h-10 w-full' />
        <div className='skeleton mt-3 h-4 w-full' />
        <div className='skeleton mt-2 h-4 w-5/6' />
        <div className='skeleton mt-2 h-4 w-3/4' />
        <div className='skeleton mt-2 h-4 w-2/3' />
        <div className='skeleton mt-2 h-4 w-4/5' />
      </div>
    </div>
  </div>
);

export const TreePageWrapper = () => {
  const { promise } = useLoaderData();
  const { owner = '', id = '' } = useParams();
  return (
    <SuspenseWithComponent fallback={<TreePageSkeleton />}>
      <Await resolve={promise}>
        {(resolved) => <TreePage key={owner + id} resolvedData={resolved} />}
      </Await>
    </SuspenseWithComponent>
  );
};

export type TreePageLoaderResponse = [
  Endpoints['GET /repos/{owner}/{repo}']['response']['data'],
  Endpoints['GET /repos/{owner}/{repo}/branches']['response']['data'],
  Endpoints['GET /repos/{owner}/{repo}/tags']['response']['data'],
];
export const getTreePageLoader: LoaderFunction = ({ params }) => {
  const { owner = '', id: repo = '' } = params;

  const repository = octokit.rest.repos
    .get({
      owner,
      repo,
    })
    .then(({ data }) => data);
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
  return {
    promise: Promise.all([repository, branches, tags]),
  };
};

type TreePageProps = {
  resolvedData: TreePageLoaderResponse;
};
export const TreePage = (props: TreePageProps) => {
  const { resolvedData } = props;
  const [repository, branches, tags] = resolvedData;
  const [searchParams] = useSearchParams();
  const path = searchParams.get('path') || '';
  const mode = searchParams.get('mode') || 'tree';

  const owner = repository.owner.login;
  const repo = repository.name;
  const targetRef = useRef<HTMLDivElement>(null);
  const { resizeHandlerElement } = useResizePanel(targetRef);

  const { currentRef = '' } = useBranchAndTag({
    branches,
    tags,
    defaultBranch: repository.default_branch,
  });

  const collapseId = useId();

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
          <Breadcrumbs
            path={path}
            owner={owner}
            repo={repo}
            endWithSlash={mode === 'tree'}
          />
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
