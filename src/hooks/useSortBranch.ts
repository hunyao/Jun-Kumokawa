import type { Endpoints } from '@octokit/types';

export const useSortBranch = (
  branches: Endpoints['GET /repos/{owner}/{repo}/branches']['response']['data'],
  defaultBranch: string,
) => {
  const sortedBranches = branches.slice().sort((a, b) => {
    if (a.name === defaultBranch) return -1;
    if (b.name === defaultBranch) return 1;
    return 0;
  });

  return sortedBranches;
};
