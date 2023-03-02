import React from 'react';
import { Octokit } from '@octokit/rest'
import { GetResponseDataTypeFromEndpointMethod, } from "@octokit/types";
import { OctokitInstance } from './../plugins/Octokit';
import Loading from '../components/Loading'

export type Unpacked<T> = T extends (infer U)[] ? U : T;
const octokit = new Octokit();
export type GithubGetRepositoryResponseType = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.rest.repos.get
>
export type GithubGetBranchResponseType = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.rest.repos.getBranch
>
export type GithubListRepositoryTagsResponseType = Unpacked<
  GetResponseDataTypeFromEndpointMethod<
    typeof octokit.rest.repos.listTags
  >
>
export type GithubListCommitsResponseType = Unpacked<
  GetResponseDataTypeFromEndpointMethod<
    typeof octokit.rest.repos.listCommits
  >
>
export type GithubGetTreeResponseType = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.rest.git.getTree
>
export type GithubGetRepositoryReadmeResponseType = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.rest.repos.getReadme
>
export interface RepositoryData {
  repository: GithubGetRepositoryResponseType | null,
  branches: Array<GithubGetBranchResponseType>,
  tags: Array<GithubListRepositoryTagsResponseType>,
  commits: Array<GithubListCommitsResponseType>,
}
export interface RepositoryContext {
  state: RepositoryData,
  dispatch: React.Dispatch<RepositoryData>,
  selectedBranch: GithubGetBranchResponseType | GithubListRepositoryTagsResponseType | null,
  changeBranch: React.Dispatch<React.SetStateAction<GithubGetBranchResponseType | GithubListRepositoryTagsResponseType | null>>,
  allTrees: GithubGetTreeResponseType | null,
  loading: boolean,
  limited: boolean,
  rateLimitResetTime: number,
}

const initialState = {
  repository: null,
  branches: [],
  tags: [],
  commits: []
}
const initialContext = {
  state: initialState,
  dispatch: () => {},
  selectedBranch: null,
  changeBranch: () => {},
  allTrees: null,
  loading: true,
  limited: false,
  rateLimitResetTime: 0
}
export const repositoryContext = React.createContext<RepositoryContext>(initialContext);
export const { Provider, Consumer } = repositoryContext;
export const RepositoryProvider: React.FC = function ({ children }) {
  const [ state, dispatch ] = React.useState<RepositoryData>(initialState);
  const [ selectedBranch, changeBranch ] = React.useState<GithubGetBranchResponseType | GithubListRepositoryTagsResponseType | null>(null);
  const [ allTrees, setAllTrees ] = React.useState<GithubGetTreeResponseType | null>(null);
  const [ loadingForRepo, setLoadingForRepo ] = React.useState<boolean>(true);
  const [ loadingForBranch, setLoadingForBranch ] = React.useState<boolean>(true);
  const [ loadingForTag, setLoadingForTag ] = React.useState<boolean>(true);
  const [ loadingForCommit, setLoadingForCommit ] = React.useState<boolean>(true);
  const [ loadingForTree, setLoadingForTree ] = React.useState<boolean>(false);
  const [ loading, setLoading ] = React.useState<boolean>(true);
  const [ limited, setLimited] = React.useState<boolean>(false);
  const [ rateLimitResetTime, setRateLimitResetTime] = React.useState<number>(0);

  async function getAllData<T>(uri: string): Promise<Array<T>> {
    let p = 1
    let arr: Array<T> = [];
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

  function checkRateLimit(response: any) {
    const {
      headers
    } = response;
    if (headers['x-ratelimit-remaining'] === "0") {
      setLimited(true);
      setRateLimitResetTime(Number(headers['x-ratelimit-reset']));
    }
  }

  React.useEffect(() => {
    OctokitInstance.request('GET /repos/{owner}/{repo}', {
      owner: process.env.REACT_APP_REPOSITORY_OWNER as string,
      repo: process.env.REACT_APP_REPOSITORY_NAME as string
    })
    .then(repository => {
      const { data }: { data: GithubGetRepositoryResponseType } = repository;
      dispatch((prev) => {
        return {
          ...prev,
          repository: data
        }
      })
    })
    .catch((err) => {
      checkRateLimit(err.response)
    })
    .finally(() => setLoadingForRepo(false))
  }, [])

  React.useEffect(() => {
    getAllData<GithubGetBranchResponseType>('GET /repos/{owner}/{repo}/branches')
    .then(branches => {
      dispatch((prev) => {
        return {
          ...prev,
          branches: branches
        }
      })
    })
    .catch((err) => {
      checkRateLimit(err.response)
    })
    .finally(() => setLoadingForBranch(false));
  }, [])
  React.useEffect(() => {
    getAllData<GithubListRepositoryTagsResponseType>('GET /repos/{owner}/{repo}/tags')
    .then((tags) => {
      dispatch((prev) => {
        return {
          ...prev,
          tags: tags
        }
      })
    })
    .catch((err) => {
      checkRateLimit(err.response)
    })
    .finally(() => setLoadingForTag(false));
  }, [])
  React.useEffect(() => {
    getAllData<GithubListCommitsResponseType>('GET /repos/{owner}/{repo}/commits')
    .then((commits) => {
      dispatch((prev) => {
        return {
          ...prev,
          commits: commits
        }
      })
    })
    .catch((err) => {
      checkRateLimit(err.response)
    })
    .finally(() => setLoadingForCommit(false));
  }, [])
  React.useEffect(() => {
    if (state.repository === null) {
      return;
    }
    if (state.repository.default_branch === undefined) {
      return;
    }
    changeBranch(state.branches.find(b => b.name === state.repository?.default_branch) as GithubGetBranchResponseType)
  }, [
    state.repository,
    state.branches
  ])

  React.useEffect(() => {
    const branch = selectedBranch as GithubGetBranchResponseType | null;
    if (branch === null || branch === undefined) {
      return;
    }
    if (branch.commit.sha === '') {
      return;
    }
    setLoadingForTree(true);
    OctokitInstance.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1', {
      owner: process.env.REACT_APP_REPOSITORY_OWNER as string,
      repo: process.env.REACT_APP_REPOSITORY_NAME as string,
      tree_sha: branch.commit.sha
    })
    .then(({ data }: {data: GithubGetTreeResponseType}) => {
      setAllTrees(data)
    })
    .catch((err) => {
      checkRateLimit(err.response)
    })
    .finally(() => setLoadingForTree(false));
  }, [
    selectedBranch
  ])

  React.useEffect(() => {
    if ([
      loadingForTag,
      loadingForTree,
      loadingForRepo,
      loadingForBranch,
      loadingForCommit
    ].some(Boolean) === true) {
      if (!loading) {
        setLoading(true);
      }
      return;
    }
    setLoading(false);
  }, [
    loadingForTag,
    loadingForTree,
    loadingForRepo,
    loadingForBranch,
    loadingForCommit,
    loading
  ])

  return (
    <>
      <Loading loading={loading}>
        <Provider
          value={{
            state,
            dispatch,
            selectedBranch,
            changeBranch,
            allTrees,
            loading,
            limited,
            rateLimitResetTime
          }}
        >
          {children}
        </Provider>
      </Loading>
    </>
  )
}
export {
  Consumer as RepositoryConsumer
}
export default RepositoryProvider;

// vim: sw=2:ai
