import React from 'react';
import { repositoryContext } from '../contexts/repository';

type usePathToShaType = string | undefined;
const usePathToSha: () => (path: string) => usePathToShaType = () => {
  const {
    allTrees
  } = React.useContext(repositoryContext);

  const getShaFromPath = React.useCallback((path: string) => {
    if (allTrees === null) {
      return;
    }
    if (allTrees.tree.length === 0) {
      return;
    }
    const result = allTrees.tree.find(t => {
      return t.path === path
    });
    if (result === undefined) {
      return ''
    }
    return result.sha
  }, [
    allTrees
  ])

  return getShaFromPath
}

export default usePathToSha
