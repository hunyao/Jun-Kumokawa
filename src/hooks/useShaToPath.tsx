import React from 'react';
import { repositoryContext } from '../contexts/repository';

const useShaToPath = () => {
  const {
    allTrees,
    selectedBranch
  } = React.useContext(repositoryContext);

  const getPathFromSha = React.useCallback((sha: string) => {
    if (allTrees.length === 0) {
      return [
        undefined,
        undefined
      ]
    }
    const result = allTrees.tree.find((t: any) => {
      return t.sha === sha
    });
    if (result === undefined) {
      return [
        '',
        selectedBranch.commit.sha === sha
      ]
    }
    return [
      result.path,
      false
    ]
  }, [
    allTrees,
    selectedBranch
  ])

  return getPathFromSha
}

export default useShaToPath
