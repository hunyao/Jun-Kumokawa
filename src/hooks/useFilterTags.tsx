import React from 'react';
import { repositoryContext } from '../contexts/repository';
import { GithubListRepositoryTagsResponseType } from '../contexts/repository';

type useFilterTagsType = [
  Array<GithubListRepositoryTagsResponseType>
]
const useFilterTags: (filteringText: string) => useFilterTagsType = (filteringText: string) => {
  const {
    state: {
      tags
    }
  } = React.useContext(repositoryContext);

  return [
    React.useMemo(() => {
      return tags.filter(branch => branch.name.includes(filteringText))
    }, [
      tags,
      filteringText
    ])
  ]
}

export default useFilterTags
