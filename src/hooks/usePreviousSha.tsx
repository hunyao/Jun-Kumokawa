import React from 'react';
import { repositoryContext } from '../contexts/repository';
import useShaToPath from '../hooks/useShaToPath'
import useCurrentBranch from '../hooks/useCurrentBranch'

const usePreviousSha = (sha: string) => {
  const {
    allTrees,
  } = React.useContext(repositoryContext);
  const getPathFromSha = useShaToPath();
  const [ , currentBranchSha ] = useCurrentBranch();

  return [
    React.useMemo(() => {
      if (allTrees.length === 0 || sha === "") {
        return '';
      }
      if (allTrees.sha === sha) {
        return sha;
      }
      const [ path ] = getPathFromSha(sha);
      if (!path.includes('/')) {
        return currentBranchSha
      } else {
        return allTrees.tree.find((t: any) => {
          const parentPath = path.split('/');
          parentPath.pop();
          return t.path === parentPath.join('/')
        }).sha
      }
    }, [
      allTrees,
      currentBranchSha,
      getPathFromSha,
      sha
    ]),
    React.useMemo(() => allTrees.sha === sha, [allTrees, sha])
  ]
}

export default usePreviousSha
