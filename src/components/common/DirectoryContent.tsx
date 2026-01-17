import { FolderSvg } from '@icons/index';
import { octokit } from '@lib/index';
import type { components } from '@octokit/openapi-types';
import type { Endpoints } from '@octokit/types';
import { getAllCommitCounts } from '@utils/index';
import type { FC } from 'react';
import {
  Await,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router';
import type { unpackArray } from 'src/types';
import { DirectoryContentRowWrapper } from './DirectoryContentRow';
import { LatestCommit } from './LatestCommit';
import { SuspenseWithComponent } from './SuspenseWithComponent';

export const sorting = (
  a: unpackArray<
    Endpoints['GET /repos/{owner}/{repo}/git/trees/{tree_sha}']['response']['data']['tree']
  >,
  b: unpackArray<
    Endpoints['GET /repos/{owner}/{repo}/git/trees/{tree_sha}']['response']['data']['tree']
  >,
) => {
  if (
    a.type === undefined ||
    a.path === undefined ||
    b.type === undefined ||
    b.path === undefined
  ) {
    return 0;
  }
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
  currentBranch: string;
  separetedHeader?: boolean;
};
export const DirectoryContentWrapper: FC<DirectoryContentWrapperProps> = ({
  owner,
  repo,
  branch_ref,
  path,
  currentBranch,
  separetedHeader = false,
}) => {
  const promise = Promise.all([
    octokit.rest.repos.listCommits({
      owner,
      repo,
      sha: branch_ref,
      path,
      per_page: 1,
      page: 1,
    }),
    octokit.rest.git.getTree({
      owner,
      repo,
      tree_sha: `${currentBranch}:${path.replace(/^\//, '')}`,
    }),
    getAllCommitCounts({ owner, repo, sha: `heads/${currentBranch}` }),
  ]);
  return (
    <SuspenseWithComponent>
      <Await resolve={promise}>
        {([refResponse, treeResponse, totalCommitCount]) => (
          <DirectoryContent
            ref={refResponse.data}
            tree={treeResponse.data}
            totalCommitCount={totalCommitCount}
            owner={owner}
            repo={repo}
            branch_ref={branch_ref}
            separetedHeader={separetedHeader}
          />
        )}
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
  separetedHeader?: boolean;
};
export const DirectoryContent: FC<DirectoryContentProps> = (props) => {
  const {
    ref,
    tree,
    totalCommitCount,
    owner,
    repo,
    branch_ref,
    separetedHeader = false,
  } = props;
  tree.tree.sort(sorting);
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const path = searchParams.get('path') || '';

  const getPreviousPath = () => {
    const _path = path.split('/');
    _path.pop();
    return _path.join('/');
  };
  const _searchParams = new URLSearchParams(searchParams);
  _searchParams.set('path', getPreviousPath());

  if (separetedHeader) {
    return (
      <div>
        <div className='rounded-lg ring ring-base-content/20'>
          <div className='grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_5.5rem] gap-2 border-base-content/20 border-b-[1px] bg-base-content/5 p-2 text-sm'>
            <div>Name</div>
            <div>Last commit message</div>
            <div className='truncate'>Last commit date</div>
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
                fileName={_tree.path}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='rounded-lg ring ring-base-content/20'>
        <LatestCommit
          commit={ref[0]}
          totalCommitCount={totalCommitCount}
          className='border-base-content/20 border-b-[1px]'
        />
        <div>
          {path.length > 0 && (
            // biome-ignore lint/a11y/noStaticElementInteractions: reason
            <div
              className='flex cursor-pointer items-center gap-2 border-base-content/20 border-b-[1px] p-2 last:border-b-0 hover:bg-base-content/5'
              onClick={() => {
                navigate({
                  pathname,
                  search: `?${_searchParams.toString()}`,
                });
              }}
              onKeyDown={() => {}}
            >
              <FolderSvg className='h-6 w-6 fill-current' />
              <span className='link link-hover hover:link-primary flex-1'>
                ..
              </span>
            </div>
          )}
          {tree.tree.slice(0, 100).map((_tree) => (
            <DirectoryContentRowWrapper
              key={_tree.path}
              owner={owner}
              repo={repo}
              path={path}
              branch_ref={branch_ref}
              type={_tree.type}
              fileName={_tree.path}
            />
          ))}
          {tree.tree.length > 100 && (
            <div className='p-2 text-warning'>
              All of {tree.tree.length} entries will not be shown. it is
              truncated to 100 files.
            </div>
          )}
        </div>
      </div>
    );
  }
};
