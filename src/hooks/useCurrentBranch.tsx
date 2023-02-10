import React from 'react';
import { repositoryContext } from '../contexts/repository';
import { RepositoryContext } from '../contexts/repository';

type useCurrentBranchResponseType = [
  string,
  string,
  RepositoryContext["selectedBranch"],
  RepositoryContext["changeBranch"]
]
const useCurrentBranch: () => useCurrentBranchResponseType = () => {
  const {
    selectedBranch,
    changeBranch
  }: {
    selectedBranch: RepositoryContext['selectedBranch'],
    changeBranch: RepositoryContext['changeBranch'],
  } = React.useContext(repositoryContext);

  return [
    React.useMemo(() => {
      if (selectedBranch === null || selectedBranch === undefined) return '';
      return selectedBranch.name || ''
    }, [selectedBranch]),
    React.useMemo(() => {
      if (selectedBranch === null || selectedBranch === undefined) return '';
      return selectedBranch.commit.sha || ''
    }, [selectedBranch]),
    selectedBranch,
    changeBranch
  ]
}

export default useCurrentBranch
