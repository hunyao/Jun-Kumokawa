import React from 'react';
import { OctokitInstance } from '../plugins/Octokit';
import { Unpacked } from '../contexts/repository';
import { GithubGetTreeResponseType } from '../contexts/repository';

const treeCache: {[key: string]: GithubGetTreeResponseType['tree']} = {}
const sorting = (a: Unpacked<GithubGetTreeResponseType['tree']>, b: Unpacked<GithubGetTreeResponseType['tree']>) => {
  if (a.type === undefined || a.path === undefined || b.type === undefined || b.path === undefined) {
    return 0;
  }
  if (a.type !== b.type) {
    return a.type === "tree" ? -1 : 1;
  }
  const isDotFileA = a.path[0] === '.';
  const isDotFileB = b.path[0] === '.';
  if (isDotFileA !== isDotFileB) {
    return isDotFileA ? -1 : 1;
  }
  const isStartWithUpperCaseA = /^[A-Z]/.test(a.path);
  const isStartWithUpperCaseB = /^[A-Z]/.test(b.path);
  if (isStartWithUpperCaseA !== isStartWithUpperCaseB) {
    return isStartWithUpperCaseA ? -1 : 1;
  }

  return a.path < b.path ? -1 : 1;
}
const getTree = async (sha: string) => {
  if (treeCache[sha] !== undefined) {
    return treeCache[sha]
  }
  return OctokitInstance.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}', {
    owner: process.env.REACT_APP_REPOSITORY_OWNER as string,
    repo: process.env.REACT_APP_REPOSITORY_NAME as string,
    tree_sha: sha
  })
  .then(({ data }: { data: GithubGetTreeResponseType }) => {
    data.tree.sort(sorting)
    treeCache[sha] = data.tree
    return data.tree
  })
}
type useTreeResponseType = [
  GithubGetTreeResponseType['tree'],
  boolean,
  boolean
]
const useTree: (sha: string) => useTreeResponseType = (sha: string = '') => {
  const [ tree, setTree ] = React.useState<GithubGetTreeResponseType['tree']>([]);
  const [ error, setError ] = React.useState<boolean>(false);
  const [ loading, setLoading ] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (sha === '') {
      return;
    }
    getTree(sha)
    .then((data: GithubGetTreeResponseType['tree']) => {
      setTree(() => {
        return [
          ...data
        ]
      })
    })
    .catch(() => {
      setTree([]);
      setError(true)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [sha])

  return [
    tree,
    error,
    loading
  ]
}

export default useTree
