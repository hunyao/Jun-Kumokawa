import React from 'react';
import { repositoryContext } from '../contexts/repository';

type useShaToPathResponseType = [
  string,
  boolean
]

const useShaToPath: () => (sha: string | undefined) => useShaToPathResponseType = () => {
  const {
    allTrees,
    selectedBranch
  } = React.useContext(repositoryContext);

  const getPathFromSha: (sha: string | undefined) => useShaToPathResponseType = React.useCallback((sha: string | undefined) => {
    if (sha === undefined || selectedBranch === null || selectedBranch === undefined || allTrees === null || allTrees.tree.length === 0) {
      return [
        '',
        true
      ]
    }
    const result = allTrees.tree.find(t => {
      return t.sha === sha
    });
    if (result === undefined || result.path === undefined) {
      return [
        '',
        false
      ]
    } else {
      return [
        result.path,
        false
      ]
    }
  }, [
    allTrees,
    selectedBranch
  ])

  return getPathFromSha
}

export default useShaToPath
