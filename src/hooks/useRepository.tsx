import React from 'react';
import { repositoryContext } from '../contexts/repository';
import { GithubGetRepositoryResponseType } from '../contexts/repository'

type useRepositoryResponseType<K extends keyof GithubGetRepositoryResponseType> = [
  GithubGetRepositoryResponseType[K]
]
function useRepository<K extends keyof GithubGetRepositoryResponseType>(prop: K, init: GithubGetRepositoryResponseType[K]): useRepositoryResponseType<K> {
  const {
    state: {
      repository
    }
  } = React.useContext(repositoryContext);

  return [
    React.useMemo(() => {
      if (repository === null) {
        return init;
      }
      const value = repository[prop];
      if (value === undefined) {
        return init;
      }
      return value;
    }, [
      repository,
      prop,
      init
    ]),
  ]
}

export default useRepository
