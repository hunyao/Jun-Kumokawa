import React from 'react';
import { repositoryContext } from '../contexts/repository';

const useCurrentBranch = () => {
  const {
    selectedBranch,
    changeBranch
  } = React.useContext(repositoryContext);

  return [
    React.useMemo(() => {
      if (selectedBranch === undefined) return '';
      return selectedBranch.name || ''
    }, [selectedBranch]),
    React.useMemo(() => {
      if (selectedBranch === undefined) return '';
      return selectedBranch.commit.sha || ''
    }, [selectedBranch]),
    selectedBranch,
    changeBranch
  ]
}

export default useCurrentBranch
