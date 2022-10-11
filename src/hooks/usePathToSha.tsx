import React from 'react';
import { repositoryContext } from '../contexts/repository';

const usePathToSha = () => {
  const {
    allTrees
  } = React.useContext(repositoryContext);

  const getShafromPath = React.useCallback((path: string) => {
    if (allTrees.length === 0) {
      return;
    }
    const result = allTrees.tree.find((t: any) => {
      return t.path === path
    });
    if (result === undefined) {
      return ''
    }
    return result.sha
  }, [
    allTrees
  ])

  return getShafromPath
}

export default usePathToSha
