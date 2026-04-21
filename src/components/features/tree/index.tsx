import { Trans } from '@lingui/react/macro';
import { useId, useRef } from 'react';
import { Await, useLoaderData, useParams, useSearchParams } from 'react-router';
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
import { ChildrenError } from '#features/errors';
import { useBranchAndTag, useResizePanel } from '#hooks/index';
import { BottomPanelCloseSvg } from '#icons/index';
import { GithubButton } from '#ui/index';
import type { TreePageLoaderResponse } from './loader';
import { TreePageSkeleton } from './skeleton';

export const TreePageWrapper = () => {
  const { promise } = useLoaderData();
  const { owner = '', id = '' } = useParams();
  return (
    <SuspenseWithComponent fallback={<TreePageSkeleton />}>
      <Await resolve={promise} errorElement={<ChildrenError />}>
        {(resolved) => <TreePage key={owner + id} resolvedData={resolved} />}
      </Await>
    </SuspenseWithComponent>
  );
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
          <GoToFile owner={owner} repo={repo} commitRef={currentRef} />
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

export { getTreePageLoader } from './loader';
