import React from 'react';
import { OctokitInstance } from '../plugins/Octokit';

const treeCache: any = {}
const sorting = (a: any, b: any) => {
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
  .then(({ data }: any) => {
    data.tree.sort(sorting)
    treeCache[sha] = data.tree
    return data.tree
  })
}
const useTree = (sha: string = '') => {
  const [ tree, setTree ] = React.useState<any>(null);
  const [ error, setError ] = React.useState(false);
  const [ loading, setLoading ] = React.useState(true);

  React.useEffect(() => {
    if (sha === '') {
      return;
    }
    getTree(sha)
    .then(data => {
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
