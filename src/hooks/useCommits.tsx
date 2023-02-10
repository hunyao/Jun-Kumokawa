import React from 'react';
import { repositoryContext } from '../contexts/repository';
import { GithubListCommitsResponseType } from '../contexts/repository';

type useCommitsResponseType = [
  Array<GithubListCommitsResponseType>,
  number
]
const useCommits: () => useCommitsResponseType = () => {
  const {
    state: {
      commits
    }
  } = React.useContext(repositoryContext);

  const commitsMemo = React.useMemo(() => commits, [commits]);
  const commitsNumberMemo = React.useMemo(() => commits.length, [commits]);

  return [
    commitsMemo,
    commitsNumberMemo
  ]
}

export default useCommits
