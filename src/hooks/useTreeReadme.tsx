import React from 'react';
import { OctokitInstance } from '../plugins/Octokit';
import useShaToPath from './useShaToPath';
import useCurrentBranch from './useCurrentBranch'

const treeReadmeCache: any = {}
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
  .then(({ data }: any) => {
    treeReadmeCache[path] = data.content;
    return data.content
  })
}
const useTreeReadme = (sha: string = '') => {
  const [ content, setContent ] = React.useState('');
  const [ error, setError ] = React.useState(false);
  const getPathFromSha = useShaToPath();
  const [ path ] = getPathFromSha(sha);
  const [ currentBranchName ] = useCurrentBranch();
  const [ loading, setLoading ] = React.useState(true);

  React.useEffect(() => {
    if (sha === '') {
      setLoading(false);
      return;
    }
    if (path === undefined) {
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
    currentBranchName
  ])

  return [
    content,
    error,
    loading
  ]
}

export default useTreeReadme
