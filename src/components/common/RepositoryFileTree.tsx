import { octokit } from '@lib/index';
import type { Endpoints } from '@octokit/types';
import { type FC, useEffect, useRef, useTransition } from 'react';
import { sorting } from './DirectoryContent';
import { RepositoryFileTreeItem } from './RepositoryFileTreeItem';

type RepositoryFileTreeProps = {
  owner: string;
  repo: string;
  branch: string;
  path: string;
};
export const RepositoryFileTree: FC<RepositoryFileTreeProps> = (props) => {
  const { owner, repo, branch, path } = props;
  const tree = useRef<
    Endpoints['GET /repos/{owner}/{repo}/git/trees/{tree_sha}']['response']['data']['tree']
  >([]);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLUListElement>(null);

  const getTreeData = () => {
    if (tree.current.length > 0) return;
    startTransition(async () => {
      const { data } = await octokit.rest.git.getTree({
        owner,
        repo,
        tree_sha: `${branch}:`,
      });
      data.tree.sort(sorting);
      tree.current = data.tree;
    });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: reason
  useEffect(() => {
    getTreeData();
  }, []);

  if (isPending) {
    return (
      <ul className={[path.length === 0 ? 'menu' : ''].join(' ')}>
        <li className='menu-disabled'>
          {/* biome-ignore lint/a11y/useValidAnchor: reason */}
          <a>
            <span className='loading loading-spinner loading-sm'></span>
            <span>Loading...</span>
          </a>
        </li>
      </ul>
    );
  }
  return (
    <ul
      className={['m-0 w-full', 'menu flex-nowrap overflow-y-auto'].join(' ')}
      ref={ref}
    >
      {tree.current.map((_treeItem) => (
        <RepositoryFileTreeItem
          key={`${path}${_treeItem.path}`}
          owner={owner}
          repo={repo}
          branch={branch}
          path={_treeItem.path}
          treeItem={_treeItem}
        />
      ))}
    </ul>
  );
};
