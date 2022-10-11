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
  repository: {},
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
    OctokitInstance.request('GET /repos/{owner}/{repo}', {
      owner: process.env.REACT_APP_REPOSITORY_OWNER as string,
      repo: process.env.REACT_APP_REPOSITORY_NAME as string
    })
    .then(repository => {
      const { data } = repository;
      dispatch((prev: any) => {
        return {
          ...prev,
          repository: data
        }
      })
    })
  }, [])

  React.useEffect(() => {
    getAllData('GET /repos/{owner}/{repo}/branches')
    .then((branches: any) => {
      dispatch((prev: any) => {
        return {
          ...prev,
          branches: branches
        }
      })
    })
  }, [])
  React.useEffect(() => {
    getAllData('GET /repos/{owner}/{repo}/tags')
    .then((tags: any) => {
      dispatch((prev: any) => {
        return {
          ...prev,
          tags: tags
        }
      })
    })
  }, [])
  React.useEffect(() => {
    getAllData('GET /repos/{owner}/{repo}/commits')
    .then((commits: any) => {
      dispatch((prev: any) => {
        return {
          ...prev,
          commits: commits
        }
      })
    })
  }, [])
  React.useEffect(() => {
    if (state.repository.default_branch === undefined) {
      return;
    }
    changeBranch(state.branches.find((b: any) => b.name === state.repository.default_branch))
  }, [
    state.repository,
    state.branches
  ])

  React.useEffect(() => {
    if (selectedBranch === undefined) {
      return;
    }
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

  return (
    <>
      <Provider
        value={{
          state,
          dispatch,
          selectedBranch,
          changeBranch,
          allTrees,
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
