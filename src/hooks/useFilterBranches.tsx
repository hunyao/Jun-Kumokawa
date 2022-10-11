import React from 'react';
import { repositoryContext } from '../contexts/repository';

const useFilterBranches = (filteringText: string) => {
  const {
    state: {
      branches
    }
  } = React.useContext(repositoryContext);

  return [
    React.useMemo(() => {
      return branches.filter((branch: any) => branch.name.includes(filteringText))
    }, [
      branches,
      filteringText
    ])
  ]
}

export default useFilterBranches
