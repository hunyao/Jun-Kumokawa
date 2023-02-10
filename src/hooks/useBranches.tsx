import React from 'react';
import { repositoryContext } from '../contexts/repository';
import { GithubGetBranchResponseType } from '../contexts/repository'

type useBranchesResponseType = [
  Array<GithubGetBranchResponseType>,
  number
]
const useBranches: () => useBranchesResponseType = () => {
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
