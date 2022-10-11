import React from 'react';
import { repositoryContext } from '../contexts/repository';

const useFilterTags = (filteringText: string) => {
  const {
    state: {
      tags
    }
  } = React.useContext(repositoryContext);

  return [
    React.useMemo(() => {
      return tags.filter((branch: any) => branch.name.includes(filteringText))
    }, [
      tags,
      filteringText
    ])
  ]
}

export default useFilterTags
