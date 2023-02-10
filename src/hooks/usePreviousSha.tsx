import React from 'react';
import { repositoryContext } from '../contexts/repository';
import useShaToPath from '../hooks/useShaToPath'
import useCurrentBranch from '../hooks/useCurrentBranch'

type usePreviousShaType = [
  string,
  boolean
]
const usePreviousSha: (sha: string | undefined) => usePreviousShaType = (sha: string | undefined) => {
  const {
    allTrees,
  } = React.useContext(repositoryContext);
  const getPathFromSha = useShaToPath();
  const [ , currentBranchSha ] = useCurrentBranch();

  return [
    React.useMemo(() => {
      if (sha === undefined) {
        return '';
      }
      if (allTrees === null) {
        return '';
      }
      if (allTrees.tree.length === 0 || sha === "") {
        return '';
      }
      const [ path, err ] = getPathFromSha(sha);
      if (err) {
          return '';
      }
      if (allTrees.sha === sha) {
        return allTrees.sha;
      }
      if (!path.includes('/')) {
        return currentBranchSha
      } else {
        return allTrees.tree.find(t => {
          const parentPath = path.split('/');
          parentPath.pop();
          return t.path === parentPath.join('/')
        })?.sha as string
      }
    }, [
      allTrees,
      currentBranchSha,
      getPathFromSha,
      sha
    ]),
    React.useMemo(() => allTrees !== null && allTrees.sha === sha, [allTrees, sha])
  ]
}

export default usePreviousSha
