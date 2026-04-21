import type { LoaderFunction } from 'react-router';
import { octokit } from '#lib/index';
import type {
  GetRepositoryBranchesResponseType,
  GetRepositoryResponseType,
  GetRepositoryTagsResponseType,
} from '#types/octokitApi';
import { requestRecursively } from '#utils/index';

export type RepositoryPageLoaderResponse = [
  GetRepositoryResponseType,
  GetRepositoryBranchesResponseType,
  GetRepositoryTagsResponseType,
];

export const getRepositoryPageLoader: LoaderFunction = ({
  params,
  request,
}) => {
  const { owner = '', id: repo = '' } = params;
  const { signal } = request;

  const repository = octokit.rest.repos
    .get({ owner, repo, request: { signal } })
    .then(({ data }) => data);

  const branches = requestRecursively(octokit.rest.repos.listBranches, {
    owner,
    repo,
    request: { signal },
  })
    .then((items) => items.map((item) => item.data))
    .then((items) => items.flat());

  const tags = requestRecursively(octokit.rest.repos.listTags, {
    owner,
    repo,
    request: { signal },
  })
    .then((items) => items.map((item) => item.data))
    .then((items) => items.flat());
  return {
    promise: Promise.all([repository, branches, tags]),
  };
};
