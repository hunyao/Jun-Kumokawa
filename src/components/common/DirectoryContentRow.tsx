import { Routes } from '@constants/index';
import { FileSvg, FolderSvg } from '@icons/index';
import { octokit } from '@lib/index';
import type { components } from '@octokit/openapi-types';
import dayjs from 'dayjs';
import { type FC, useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router';

const commitCache = new Map<string, Array<components['schemas']['commit']>>();
const COMMIT_CACHE_TTL_MS = (() => {
  const value = Number(import.meta.env.VITE_COMMIT_TTL_MS);
  return Number.isFinite(value) && value > 0 ? value : 5 * 60 * 1000;
})();
const commitCacheTime = new Map<string, number>();

const DirectoryContentRowSkelton: FC = () => (
  <div className='border-base-content/20 border-b-[1px] p-4 last:border-b-0'>
    <div className='skeleton h-4 w-full'></div>
  </div>
);
type DirectoryContentRowWrapperProps = {
  owner: string;
  repo: string;
  path: string;
  branch_ref: string;
  type: string;
  fileName: string;
  enableCommitFetch?: boolean;
};
export const DirectoryContentRowWrapper: FC<DirectoryContentRowWrapperProps> = (
  props,
) => {
  const {
    owner,
    repo,
    path,
    branch_ref,
    type,
    fileName,
    enableCommitFetch = true,
  } = props;

  const [resolved, setResolved] =
    useState<Array<components['schemas']['commit']>>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const cacheKey = `${owner}/${repo}/${branch_ref}/${path}/${fileName}`;

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        if (!enableCommitFetch) {
          setResolved([]);
          return;
        }
        const cached = commitCache.get(cacheKey);
        const cachedAt = commitCacheTime.get(cacheKey);
        if (cached && cachedAt && Date.now() - cachedAt < COMMIT_CACHE_TTL_MS) {
          setResolved(cached);
          return;
        }
        setResolved(undefined);
        const _resolved = await octokit.rest.repos.listCommits({
          owner,
          repo,
          sha: branch_ref,
          path: path === '' ? fileName : `${path}/${fileName}`,
          per_page: 1,
          page: 1,
        });
        if (!cancelled) {
          commitCache.set(cacheKey, _resolved.data);
          commitCacheTime.set(cacheKey, Date.now());
          setResolved(_resolved.data);
        }
      } catch {
        if (!cancelled) {
          setResolved([]);
          setHasError(true);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [owner, repo, path, branch_ref, fileName, cacheKey]);

  if (isLoading) {
    return <DirectoryContentRowSkelton />;
  }

  return (
    <>
      {resolved !== undefined && (
        <DirectoryContentRow
          owner={owner}
          repo={repo}
          ref={resolved}
          type={type}
          fileName={fileName}
          hasError={hasError}
        />
      )}
    </>
  );
};

type DirectoryContentRowProps = {
  owner: string;
  repo: string;
  ref: Array<components['schemas']['commit']>;
  type: string;
  fileName: string;
  hasError: boolean;
};
export const DirectoryContentRow: FC<DirectoryContentRowProps> = (props) => {
  const { ref, type, fileName, owner, repo, hasError } = props;
  const [searchParams] = useSearchParams();
  const path = searchParams.get('path') || '';
  const commit = ref[0];

  const getNextPath = (_path: string) => {
    return path === '' ? _path : `${path}/${_path}`;
  };
  const _searchParams = new URLSearchParams(searchParams);
  _searchParams.set('path', getNextPath(fileName));
  _searchParams.set('mode', type);

  return (
    <div className='grid cursor-pointer grid-cols-[min-content_minmax(0,1fr)_minmax(0,1fr)_7rem] items-center gap-2 border-base-content/20 border-b-[1px] p-2 last:border-b-0 hover:bg-base-content/5'>
      {type === 'tree' && <FolderSvg className='h-6 w-6 fill-current' />}
      {type === 'blob' && <FileSvg className='h-6 w-6 fill-current' />}
      <span>
        <NavLink
          to={{
            pathname: Routes.TREE.replace(':owner', owner).replace(':id', repo),
            search: `?${_searchParams.toString()}`,
          }}
          className='link link-hover hover:link-primary'
        >
          {fileName}
        </NavLink>
      </span>
      <span className='truncate'>
        {hasError
          ? 'Failed to load commit'
          : commit
            ? commit.commit.message.split('\n')[0]
            : '-'}
      </span>
      <span
        title={
          commit && !hasError
            ? dayjs(commit.commit.committer?.date).format('llll')
            : ''
        }
        className='justify-self-end'
      >
        {hasError
          ? '-'
          : commit
            ? dayjs(commit.commit.committer?.date).fromNow()
            : '-'}
      </span>
    </div>
  );
};
