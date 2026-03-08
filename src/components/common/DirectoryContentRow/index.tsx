import { Routes } from '@constants/index';
import { useDirectoryRowCommit } from '@hooks/index';
import {
  FileSubmoduleSvg,
  FileSvg,
  FolderSvg,
  SymlinkFileSvg,
} from '@icons/index';
import type { components } from '@octokit/openapi-types';
import dayjs from 'dayjs';
import { NavLink, useSearchParams } from 'react-router';

const DirectoryContentRowSkelton = () => (
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
  mode?: string;
  fileName: string;
  enableCommitFetch?: boolean;
};
export const DirectoryContentRowWrapper = (
  props: DirectoryContentRowWrapperProps,
) => {
  const {
    owner,
    repo,
    path,
    branch_ref,
    type,
    mode,
    fileName,
    enableCommitFetch = true,
  } = props;

  const { commit, isLoading, hasError, isResolved } = useDirectoryRowCommit({
    owner,
    repo,
    path,
    branchRef: branch_ref,
    fileName,
    enableCommitFetch,
  });

  if (isLoading) {
    return <DirectoryContentRowSkelton />;
  }

  if (!isResolved) return null;

  return (
    <DirectoryContentRow
      owner={owner}
      repo={repo}
      commit={commit}
      type={type}
      mode={mode}
      fileName={fileName}
      hasError={hasError}
    />
  );
};

type DirectoryContentRowProps = {
  owner: string;
  repo: string;
  commit: components['schemas']['commit'] | null;
  type: string;
  mode?: string;
  fileName: string;
  hasError: boolean;
};
export const DirectoryContentRow = (props: DirectoryContentRowProps) => {
  const { commit, type, mode, fileName, owner, repo, hasError } = props;
  const isFolder = mode === '040000';
  const isSubmodule = mode === '160000';
  const isSymlinkFile = mode === '120000';
  const isFile = mode === '100644' || mode === '100755';

  const getIcon = () => {
    if (isFolder) return <FolderSvg className='h-6 w-6 fill-current' />;
    if (isSubmodule)
      return <FileSubmoduleSvg className='h-4 w-6 fill-current' />;
    if (isSymlinkFile)
      return <SymlinkFileSvg className='h-4 w-6 fill-current' />;
    if (isFile) return <FileSvg className='h-6 w-6 fill-current' />;
    return type === 'tree' ? (
      <FolderSvg className='h-6 w-6 fill-current' />
    ) : (
      <FileSvg className='h-6 w-6 fill-current' />
    );
  };
  const [searchParams] = useSearchParams();
  const path = searchParams.get('path') || '';

  const getNextPath = (_path: string) => {
    return path === '' ? _path : `${path}/${_path}`;
  };
  const _searchParams = new URLSearchParams(searchParams);
  _searchParams.set('path', getNextPath(fileName));
  _searchParams.set('mode', type);

  return (
    <div
      className={[
        'grid grid-cols-[min-content_minmax(0,1fr)_minmax(0,1fr)_7rem] items-center gap-2 border-base-content/20 border-b-[1px] p-2 last:border-b-0',
        isSubmodule
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-pointer hover:bg-base-content/5',
      ].join(' ')}
    >
      {getIcon()}
      <span>
        {isSubmodule ? (
          <span className='text-base-content/50'>{fileName}</span>
        ) : (
          <NavLink
            to={{
              pathname: Routes.TREE.replace(':owner', owner).replace(
                ':id',
                repo,
              ),
              search: `?${_searchParams.toString()}`,
            }}
            className={[
              'link link-hover',
              isSymlinkFile ? 'link-primary' : 'hover:link-primary',
            ].join(' ')}
          >
            {fileName}
          </NavLink>
        )}
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
