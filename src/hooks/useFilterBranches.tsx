import React from 'react';
import { repositoryContext } from '../contexts/repository';
import { GithubGetBranchResponseType } from '../contexts/repository';

type useFilterBranchesType = [
  Array<GithubGetBranchResponseType>
]
const useFilterBranches: (filteringText: string) => useFilterBranchesType = (filteringText: string) => {
  const {
    state: {
      branches
    }
  } = React.useContext(repositoryContext);

  return [
    React.useMemo(() => {
      return branches.filter((branch) => branch.name.includes(filteringText))
    }, [
      branches,
      filteringText
    ])
  ]
}

export default useFilterBranches
