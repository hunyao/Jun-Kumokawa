import type { GetRepositoryBranchesResponseType } from '#types/octokitApi';

export const useSortBranch = (
  branches: GetRepositoryBranchesResponseType,
  defaultBranch: string,
) => {
  const sortedBranches = branches.slice().sort((a, b) => {
    if (a.name === defaultBranch) return -1;
    if (b.name === defaultBranch) return 1;
    return 0;
  });

  return sortedBranches;
};
