import React from 'react';
import { OctokitInstance } from './../plugins/Octokit';

export interface RepositoryInterface {
  branches: any,
  tags: any,
  commits: any,
}
export interface RepositoryBranchInterface {
  selectedBranch: string
}

export const repositoryContext = React.createContext<any>({});
export const { Provider, Consumer } = repositoryContext;

const initial = {
  branches: [],
  tags: [],
  commits: []
}
export function RepositoryProvider({ children }: any) {
  const [ state, dispatch ] = React.useState<any>(initial);
  const [ selectedBranch, changeBranch ] = React.useState<any>({
    name: '',
    commit: {
      sha: '',
      url: ''
    }
  });
  const [ allTrees, setAllTrees ] = React.useState<any>([]);

  async function getAllData(uri: string) {
    let p = 1
    let arr: any = [];
    while (true) {
      const { data } = await OctokitInstance.request(`${uri}?per_page={per_page}&page={page}`, {
        owner: process.env.REACT_APP_REPOSITORY_OWNER as string,
        repo: process.env.REACT_APP_REPOSITORY_NAME as string,
        per_page: 100,
        page: p
      })
      if (data.length === 0 || p === 5) {
        break;
      } else {
        arr = arr.concat(data);
        p += 1
      }
    }
    return arr;
  }

  React.useEffect(() => {
    // OctokitInstance.request('GET /rate_limit', {})
    Promise.all([
      OctokitInstance.request('GET /repos/{owner}/{repo}/branches/master', {
        owner: process.env.REACT_APP_REPOSITORY_OWNER as string,
        repo: process.env.REACT_APP_REPOSITORY_NAME as string
      }),
      getAllData('GET /repos/{owner}/{repo}/branches'),
      getAllData('GET /repos/{owner}/{repo}/tags'),
      getAllData('GET /repos/{owner}/{repo}/commits'),
    ])
    .then(([ masterBranch, branches, tags, commits ]) => {
      dispatch({
        branches: Array.from([
          ...branches,
          masterBranch.data
        ]),
        tags: tags,
        commits: commits
      })
      changeBranch(masterBranch.data)
    })
  }, [])
  React.useEffect(() => {
    if (selectedBranch.commit.sha === '') {
      return;
    }
    OctokitInstance.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1', {
      owner: process.env.REACT_APP_REPOSITORY_OWNER as string,
      repo: process.env.REACT_APP_REPOSITORY_NAME as string,
      tree_sha: selectedBranch.commit.sha
    })
    .then(({ data }) => {
      setAllTrees(data)
    })
  }, [
    selectedBranch
  ])

  const getPathFromSha = React.useCallback((sha: string) => {
    if (allTrees.length === 0 || sha === "") {
      return;
    }
    if (sha === selectedBranch.commit.sha) {
      return ''
    }
    return allTrees.tree.find((t: any) => t.sha === sha).path
  }, [
    allTrees
  ])

  const getShafromPath = React.useCallback((path: string) => {
    if (allTrees.length === 0) {
      return;
    }
    return allTrees.tree.find((t: any) => t.path === path).sha
  }, [
    allTrees
  ])

  return (
    <>
      <Provider
        value={{
          state,
          dispatch,
          selectedBranch,
          changeBranch,
          allTrees,
          getPathFromSha,
          getShafromPath
        }}>
        {children}
      </Provider>
    </>
  )
}
export {
  Consumer as RepositoryConsumer
}
export default RepositoryProvider;

// vim: sw=2:ai
