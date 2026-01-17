import { FileSvg, FolderSvg } from '@icons/index';
import { octokit } from '@lib/index';
import type { Endpoints } from '@octokit/types';
import {
  type FC,
  type ToggleEvent,
  useRef,
  useState,
  useTransition,
} from 'react';
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router';
import type { unpackArray } from 'src/types';
import { sorting } from './DirectoryContent';

type RepositoryFileTreeItemProps = {
  owner: string;
  repo: string;
  branch: string;
  path: string;
  treeItem: unpackArray<
    Endpoints['GET /repos/{owner}/{repo}/git/trees/{tree_sha}']['response']['data']['tree']
  >;
};
export const RepositoryFileTreeItem: FC<RepositoryFileTreeItemProps> = (
  props,
) => {
  const { treeItem, path, owner, repo, branch } = props;

  const ref = useRef<HTMLDetailsElement>(null);
  const tree = useRef<
    Endpoints['GET /repos/{owner}/{repo}/git/trees/{tree_sha}']['response']['data']['tree']
  >([]);
  const location = useLocation();
  const { pathname } = location;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [prevPath, setPrevPath] = useState(searchParams.get('path'));

  const onToggleHandler = (e: ToggleEvent) => {
    if (e.newState === 'closed') return;
    if (tree.current.length > 0) return;
    if (e.target instanceof HTMLDetailsElement === false) return;
    startTransition(async () => {
      const { data } = await octokit.rest.git.getTree({
        owner,
        repo,
        tree_sha: `${branch}:${path.replace(/^\//, '')}`,
      });
      data.tree.sort(sorting);
      tree.current = data.tree;
    });
    if (
      e.target.dataset.noNavigate !== '1' &&
      searchParams.get('path') !== path
    ) {
      navigate({
        pathname: pathname,
        search: new URLSearchParams({
          ...Object.fromEntries(searchParams.entries()),
          path: path,
          mode: treeItem.type,
        }).toString(),
      });
      if (ref.current) {
        ref.current.dataset.noNavigate = '0';
      }
    }
  };

  if (
    searchParams.get('path') !== prevPath &&
    searchParams.get('path')?.startsWith(`${path}/`)
  ) {
    if (ref.current) {
      ref.current.dataset.noNavigate = '1';
      ref.current.open = true;
    }
    setPrevPath(searchParams.get('path'));
  }

  return (
    <li>
      {treeItem.type === 'blob' && (
        <NavLink
          to={{
            pathname,
            search: new URLSearchParams({
              ...Object.fromEntries(searchParams.entries()),
              path,
              mode: 'blob',
            }).toString(),
          }}
          className={[
            'truncate',
            path === searchParams.get('path') ? 'bg-base-content/10' : '',
          ].join(' ')}
          title={treeItem.path}
        >
          <FileSvg className='h-6 w-6 fill-current' />
          {treeItem.path}
        </NavLink>
      )}
      {treeItem.type === 'tree' && (
        <details onToggle={onToggleHandler} ref={ref} className='w-full'>
          <summary
            role='treeitem'
            className={[
              path === searchParams.get('path') ? 'bg-base-content/10' : '',
            ].join(' ')}
            title={treeItem.path}
          >
            <FolderSvg className='h-6 w-6 fill-current' />
            {treeItem.path}
          </summary>
          {isPending && (
            <ul>
              <li className='menu-disabled'>
                {/* biome-ignore lint/a11y/useValidAnchor: reason */}
                <a>
                  <span className='loading loading-spinner loading-sm'></span>
                  <span>Loading...</span>
                </a>
              </li>
            </ul>
          )}
          {!isPending && tree.current.length > 0 && (
            <ul>
              {tree.current.map((_treeItem) => (
                <RepositoryFileTreeItem
                  key={`${path}${_treeItem.path}`}
                  owner={owner}
                  repo={repo}
                  branch={branch}
                  path={`${path}/${_treeItem.path}`}
                  treeItem={_treeItem}
                />
              ))}
            </ul>
          )}
        </details>
      )}
    </li>
  );
};
