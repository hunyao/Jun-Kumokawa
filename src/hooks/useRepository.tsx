import React from 'react';
import { repositoryContext } from '../contexts/repository';

const useRepository = (prop: string, init: any) => {
  const {
    state: {
      repository
    }
  } = React.useContext(repositoryContext);

  return [
    React.useMemo(() => {
      if (repository[prop] === undefined) return init;
      return repository[prop]
    }, [
      repository,
      prop,
      init
    ]),
  ]
}

export default useRepository
