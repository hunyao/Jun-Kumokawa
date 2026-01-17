import { Routes } from '@constants/index';
import { FileSvg, FolderSvg } from '@icons/index';
import { octokit } from '@lib/index';
import type { components } from '@octokit/openapi-types';
import dayjs from 'dayjs';
import { type FC, useEffect, useRef, useTransition } from 'react';
import { NavLink, useSearchParams } from 'react-router';

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
};
export const DirectoryContentRowWrapper: FC<DirectoryContentRowWrapperProps> = (
  props,
) => {
  const { owner, repo, path, branch_ref, type, fileName } = props;

  const resolved = useRef<Array<components['schemas']['commit']>>(undefined);
  const [isPending, startTransition] = useTransition();

  // biome-ignore lint/correctness/useExhaustiveDependencies: has to be called only onetime
  useEffect(() => {
    startTransition(async () => {
      const _resolved = await octokit.rest.repos.listCommits({
        owner,
        repo,
        sha: branch_ref,
        path: path === '' ? fileName : `${path}/${fileName}`,
        per_page: 1,
        page: 1,
      });
      resolved.current = _resolved.data;
    });
  }, []);

  if (isPending) {
    return <DirectoryContentRowSkelton />;
  }

  return (
    <>
      {resolved.current !== undefined && (
        <DirectoryContentRow
          owner={owner}
          repo={repo}
          ref={resolved.current}
          type={type}
          fileName={fileName}
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
};
export const DirectoryContentRow: FC<DirectoryContentRowProps> = (props) => {
  const { ref, type, fileName, owner, repo } = props;
  const [searchParams] = useSearchParams();
  const path = searchParams.get('path') || '';

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
      <span className='truncate'>{ref[0].commit.message.split('\n')[0]}</span>
      <span
        title={dayjs(ref[0].commit.committer?.date).format('llll')}
        className='justify-self-end'
      >
        {dayjs(ref[0].commit.committer?.date).fromNow()}
      </span>
    </div>
  );
};
