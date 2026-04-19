import type { LoaderFunction } from 'react-router';
import { octokit } from '#lib/octokit';
import type {
  GetRepositoryBranchesResponseType,
  GetRepositoryResponseType,
  GetRepositoryTagsResponseType,
} from '#types/octokitApi';
import { requestRecursively } from '#utils/api';

export type TreePageLoaderResponse = [
  GetRepositoryResponseType,
  GetRepositoryBranchesResponseType,
  GetRepositoryTagsResponseType,
];
export const getTreePageLoader: LoaderFunction = ({ params }) => {
  const { owner = '', id: repo = '' } = params;

  const repository = octokit.rest.repos
    .get({
      owner,
      repo,
    })
    .then(({ data }) => data);
  const branches = requestRecursively(octokit.rest.repos.listBranches, {
    owner,
    repo,
  })
    .then((items) => items.map((item) => item.data))
    .then((items) => items.flat());
  const tags = requestRecursively(octokit.rest.repos.listTags, {
    owner,
    repo,
  })
    .then((items) => items.map((item) => item.data))
    .then((items) => items.flat());
  return {
    promise: Promise.all([repository, branches, tags]),
  };
};
