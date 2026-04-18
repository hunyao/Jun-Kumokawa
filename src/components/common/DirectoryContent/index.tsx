import { Trans } from '@lingui/react/macro';
import type { components } from '@octokit/openapi-types';
import type { Endpoints } from '@octokit/types';
import { useMemo } from 'react';
import { Await, NavLink, useLocation, useSearchParams } from 'react-router';
import {
  DirectoryContentRowWrapper,
  LatestCommit,
  SuspenseWithComponent,
} from '#components/index';
import { ChildrenError } from '#features/errors';
import { FolderSvg } from '#icons/index';
import { octokit } from '#lib/index';
import type { unpackArray } from '#types/utils';
import { getAllCommitCounts, overrideSearchParams } from '#utils/index';

export const sorting = (
  a: unpackArray<
    Endpoints['GET /repos/{owner}/{repo}/git/trees/{tree_sha}']['response']['data']['tree']
  >,
  b: unpackArray<
    Endpoints['GET /repos/{owner}/{repo}/git/trees/{tree_sha}']['response']['data']['tree']
  >,
) => {
  if (a.type !== b.type) {
    return a.type === 'tree' ? -1 : 1;
  }
  const isDotFileA = a.path[0] === '.';
  const isDotFileB = b.path[0] === '.';
  if (isDotFileA !== isDotFileB) {
    return isDotFileA ? -1 : 1;
  }
  const isStartWithUpperCaseA = /^[A-Z]/.test(a.path);
  const isStartWithUpperCaseB = /^[A-Z]/.test(b.path);
  if (isStartWithUpperCaseA !== isStartWithUpperCaseB) {
    return isStartWithUpperCaseA ? -1 : 1;
  }
  return a.path < b.path ? -1 : 1;
};

type DirectoryContentWrapperProps = {
  owner: string;
  repo: string;
  branch_ref: string;
  path: string;
  separatedHeader?: boolean;
  skipCommitData?: boolean;
  initialRef?: Array<components['schemas']['commit']>;
  initialTotalCommitCount?: number;
};
export const DirectoryContentWrapper = ({
  owner,
  repo,
  branch_ref,
  path,
  separatedHeader = false,
}: DirectoryContentWrapperProps) => {
  const promise = useMemo(async () => {
    return Promise.all([
      octokit.rest.git
        .getTree({
          owner,
          repo,
          tree_sha: `${branch_ref}:${path.replace(/^\//, '')}`,
        })
        .then(({ data }) => data),
      octokit.rest.repos
        .listCommits({
          owner,
          repo,
          sha: branch_ref,
          path,
          per_page: 1,
          page: 1,
        })
        .then(({ data }) => data),
      getAllCommitCounts({ owner, repo, sha: branch_ref }),
    ]);
  }, [owner, repo, branch_ref, path]);
  return (
    <SuspenseWithComponent>
      <Await resolve={promise} errorElement={<ChildrenError />}>
        {([treeResponse, commitData, totalCommitCount]) => {
          treeResponse.tree.sort(sorting);
          return (
            <DirectoryContent
              ref={commitData}
              tree={treeResponse}
              totalCommitCount={totalCommitCount}
              owner={owner}
              repo={repo}
              branch_ref={branch_ref}
              separatedHeader={separatedHeader}
            />
          );
        }}
      </Await>
    </SuspenseWithComponent>
  );
};
type DirectoryContentProps = {
  ref: Array<components['schemas']['commit']>;
  tree: Endpoints['GET /repos/{owner}/{repo}/git/trees/{tree_sha}']['response']['data'];
  totalCommitCount: number;
  owner: string;
  repo: string;
  branch_ref: string;
  separatedHeader?: boolean;
};
export const DirectoryContent = (props: DirectoryContentProps) => {
  const {
    ref,
    tree,
    totalCommitCount,
    owner,
    repo,
    branch_ref,
    separatedHeader = false,
  } = props;
  const enableCommitFetch = tree.tree.length <= 200;
  const location = useLocation();
  const { pathname } = location;
  const [searchParams] = useSearchParams();
  const path = searchParams.get('path') || '';

  const getPreviousPath = () => {
    const _path = path.split('/');
    _path.pop();
    return _path.join('/');
  };
  const _searchParams = overrideSearchParams(searchParams, {
    path: getPreviousPath(),
  });
  const hasCommitData = ref.length > 0;

  if (separatedHeader) {
    return (
      <div>
        <LatestCommit
          commit={ref[0]}
          totalCommitCount={totalCommitCount}
          className='mb-4 rounded-lg ring ring-base-content/20'
        />
        <div className='rounded-lg ring ring-base-content/20'>
          <div className='grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_min-content] gap-2 border-base-content/20 border-b-[1px] bg-base-content/5 p-2 text-sm'>
            <div>
              <Trans>Name</Trans>
            </div>
            <div>
              <Trans>Last commit message</Trans>
            </div>
            <div className='truncate'>
              <Trans>Last commit date</Trans>
            </div>
          </div>
          <div className='text-sm'>
            {path.length > 0 && (
              <div className='flex cursor-pointer items-center gap-2 border-base-content/20 border-b-[1px] p-2 last:border-b-0 hover:bg-base-content/5'>
                <FolderSvg className='h-6 w-6 fill-current' />
                <span>
                  <NavLink
                    to={{
                      pathname,
                      search: `?${_searchParams.toString()}`,
                    }}
                    className='link link-hover hover:link-primary'
                  >
                    ..
                  </NavLink>
                </span>
              </div>
            )}
            {tree.tree.map((_tree) => (
              <DirectoryContentRowWrapper
                key={_tree.path}
                owner={owner}
                repo={repo}
                path={path}
                branch_ref={branch_ref}
                type={_tree.type}
                mode={_tree.mode}
                fileName={_tree.path}
                enableCommitFetch={enableCommitFetch}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='rounded-lg ring ring-base-content/20'>
        {hasCommitData && (
          <LatestCommit
            commit={ref[0]}
            totalCommitCount={totalCommitCount}
            className='border-base-content/20 border-b-[1px]'
          />
        )}
        <div>
          {path.length > 0 && (
            <NavLink
              to={{
                pathname,
                search: _searchParams.toString(),
              }}
              className='flex items-center gap-2 border-base-content/20 border-b-[1px] p-2 last:border-b-0 hover:bg-base-content/5'
            >
              <FolderSvg className='h-6 w-6 fill-current' />
              <span className='link link-hover hover:link-primary flex-1'>
                ..
              </span>
            </NavLink>
          )}
          {tree.tree.slice(0, 100).map((_tree) => (
            <DirectoryContentRowWrapper
              key={_tree.path}
              owner={owner}
              repo={repo}
              path={path}
              branch_ref={branch_ref}
              type={_tree.type}
              mode={_tree.mode}
              fileName={_tree.path}
              enableCommitFetch={enableCommitFetch}
            />
          ))}
          {tree.tree.length > 100 && (
            <div className='p-2 text-warning'>
              <Trans>
                All {tree.tree.length} entries are not shown. The list is
                truncated to 100 files.
              </Trans>
            </div>
          )}
        </div>
      </div>
    );
  }
};
