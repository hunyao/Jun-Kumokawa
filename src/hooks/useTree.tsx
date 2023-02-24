import React from 'react';
import { OctokitInstance } from '../plugins/Octokit';
import { Unpacked } from '../contexts/repository';
import { GithubGetTreeResponseType } from '../contexts/repository';
import useCurrentBranch from '../hooks/useCurrentBranch'
import { repositoryContext } from '../contexts/repository';

const treeCache: {
  [branchName: string]: {
    [key: string]: GithubGetTreeResponseType['tree']
  }
} = {}
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
const getTree = async (sha: string, branchName: string) => {
  if (treeCache[branchName] === undefined) {
    treeCache[branchName] = {};
  }
  if (treeCache[branchName][sha] !== undefined) {
    return treeCache[branchName][sha]
  }
  return OctokitInstance.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}', {
    owner: process.env.REACT_APP_REPOSITORY_OWNER as string,
    repo: process.env.REACT_APP_REPOSITORY_NAME as string,
    tree_sha: sha
  })
  .then(({ data }: { data: GithubGetTreeResponseType }) => {
    data.tree.sort(sorting)
    treeCache[branchName][sha] = data.tree
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
  const [ currentBranchName ] = useCurrentBranch();
  const { allTrees } = React.useContext(repositoryContext);

  React.useEffect(() => {
    if (sha === '') {
      setLoading(false);
      return;
    }
    if (allTrees === null) {
      return;
    }
    if (allTrees.sha !== sha && !allTrees.tree.find(t => t.sha === sha)) {
      setTree([]);
      setError(true)
      setLoading(false);
      return;
    }
    getTree(sha, currentBranchName)
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
  }, [
    sha,
    currentBranchName,
    allTrees
  ])

  return [
    tree,
    error,
    loading
  ]
}

export default useTree
