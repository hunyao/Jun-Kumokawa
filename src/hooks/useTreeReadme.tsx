import React from 'react';
import { OctokitInstance } from '../plugins/Octokit';
import useShaToPath from './useShaToPath';
import useCurrentBranch from './useCurrentBranch'
import { GithubGetRepositoryReadmeResponseType } from '../contexts/repository'

type useTreeReadmeResponseType = [
  string,
  boolean,
  boolean
]
const treeReadmeCache: { [key: string]: string } = {}
const getTreeReadme = async (path: string = '', currentBranchName: string) => {
  if (treeReadmeCache[path] !== undefined) {
    return treeReadmeCache[path]
  }
  return OctokitInstance.request('GET /repos/{owner}/{repo}/readme/{path}?ref={ref}', {
      owner: process.env.REACT_APP_REPOSITORY_OWNER as string,
      repo: process.env.REACT_APP_REPOSITORY_NAME as string,
      path: path,
      ref: currentBranchName
    })
    .then(({ data }: { data: GithubGetRepositoryReadmeResponseType }) => {
    treeReadmeCache[path] = data.content;
    return data.content
  })
}
const useTreeReadme: (sha: string) => useTreeReadmeResponseType = (sha: string = '') => {
  const [ content, setContent ] = React.useState<string>('');
  const [ error, setError ] = React.useState<boolean>(false);
  const getPathFromSha = useShaToPath();
  const [ path, err ] = getPathFromSha(sha);
  const [ currentBranchName ] = useCurrentBranch();
  const [ loading, setLoading ] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (sha === '') {
      setLoading(false);
      return;
    }
    if (err) {
      setLoading(false);
      return;
    }
    getTreeReadme(path, currentBranchName)
    .then(data => {
      setContent(atob(data))
    })
    .catch(({code}) => {
      setContent('')
      setError(code !== 404)
    })
    .finally(() => setLoading(false))
  }, [
    sha,
    path,
    err,
    currentBranchName
  ])

  return [
    content,
    error,
    loading
  ]
}

export default useTreeReadme
