import React from 'react';
import { repositoryContext } from '../contexts/repository';

const useCommits = () => {
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
