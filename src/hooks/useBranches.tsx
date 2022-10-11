import React from 'react';
import { repositoryContext } from '../contexts/repository';

const useBranches = () => {
  const {
    state: {
      branches
    }
  } = React.useContext(repositoryContext);

  const branchesMemo = React.useMemo(() => branches, [branches]);
  const branchesNumberMemo = React.useMemo(() => branches.length, [branches]);

  return [
    branchesMemo,
    branchesNumberMemo
  ]
}

export default useBranches
