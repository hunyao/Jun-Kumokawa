import React from 'react'
import { repositoryContext } from '../contexts/repository';

type useFilterTreesType = [
  Array<string>
]
const useFilterTrees: (filteringText: string) => useFilterTreesType = (filteringText: string = '') => {
  const {
    allTrees,
  } = React.useContext(repositoryContext)

  return [
    React.useMemo(() => {
      if (allTrees === null) {
        return [];
      }
      if (allTrees.tree.length === 0) {
        return [];
      }
      return allTrees.tree
      .filter(t => t.type === 'blob')
      .filter(t => t.path !== undefined)
      .map(t => t.path as string)
      .filter(path => {
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
