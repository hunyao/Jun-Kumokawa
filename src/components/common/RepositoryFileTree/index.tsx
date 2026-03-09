import { octokit } from '@lib/index';
import type { Endpoints } from '@octokit/types';
import { GithubButton } from '@ui/index';
import { useEffect, useState } from 'react';
import { RepositoryFileTreeItem, sorting } from '@components/index';

type RepositoryFileTreeProps = {
  owner: string;
  repo: string;
  branch: string;
  path: string;
};
export const RepositoryFileTree = (props: RepositoryFileTreeProps) => {
  const { owner, repo, branch, path } = props;
  const [showAll, setShowAll] = useState(false);
  const [tree, setTree] = useState<
    Endpoints['GET /repos/{owner}/{repo}/git/trees/{tree_sha}']['response']['data']['tree']
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const maxItems = 500;

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setShowAll(false);
        setIsLoading(true);
        setTree([]);
        const { data } = await octokit.rest.git.getTree({
          owner,
          repo,
          tree_sha: `${branch}:`,
        });
        data.tree.sort(sorting);
        if (!cancelled) setTree(data.tree);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [owner, repo, branch]);

  if (isLoading) {
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
  const isTruncated = tree.length > maxItems;
  const visibleTree = showAll ? tree : tree.slice(0, maxItems);
  return (
    <ul
      className={['m-0 w-full', 'menu flex-nowrap overflow-y-auto'].join(' ')}
    >
      {visibleTree.map((_treeItem) => (
        <RepositoryFileTreeItem
          key={`${path}${_treeItem.path}`}
          owner={owner}
          repo={repo}
          branch={branch}
          path={_treeItem.path}
          treeItem={_treeItem}
        />
      ))}
      {isTruncated && !showAll && (
        <li className='p-2 text-center'>
          <GithubButton $variant='border' onClick={() => setShowAll(true)}>
            Show all {tree.length} items
          </GithubButton>
        </li>
      )}
    </ul>
  );
};
