import React from 'react'
import { repositoryContext } from '../contexts/repository';

const useFilterTrees = (filteringText: string = '') => {
  const {
    allTrees,
  } = React.useContext(repositoryContext)

  return [
    React.useMemo(() => {
      if (allTrees.length === 0) {
        return [];
      }
      return allTrees.tree
      .filter((t: any) => t.type === 'blob')
      .map((t: any) => t.path)
      .filter((path: any) => {
        return path.toUpperCase().includes(filteringText.toUpperCase())
      })
      .slice(0, 50)
    }, [
      filteringText,
      allTrees
    ])
  ]
}

export default useFilterTrees
