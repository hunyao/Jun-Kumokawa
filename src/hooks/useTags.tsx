import React from 'react';
import { repositoryContext } from '../contexts/repository';
import { GithubListRepositoryTagsResponseType } from '../contexts/repository'

type useTagsResponseType = [
  Array<GithubListRepositoryTagsResponseType>,
  number
]
const useTags: () => useTagsResponseType = () => {
  const {
    state: {
      tags
    }
  } = React.useContext(repositoryContext);

  const tagsMemo = React.useMemo(() => tags, [tags]);
  const tagsNumberMemo = React.useMemo(() => tags.length, [tags]);

  return [
    tagsMemo,
    tagsNumberMemo
  ]
}

export default useTags
