import type { GetResponseDataTypeFromEndpointMethod } from '@octokit/types';
import type { octokit } from '#lib/index';

export type GetRepositoryResponseType = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.rest.repos.get
>;
export type GetRepositoryBranchesResponseType =
  GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.listBranches>;
export type GetRepositoryTagsResponseType =
  GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.listTags>;
export type GetRepositoryListForAuthenticatedUser =
  GetResponseDataTypeFromEndpointMethod<
    typeof octokit.rest.repos.listForAuthenticatedUser
  >;
export type GetRepositoryContentResponseType =
  GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.getContent>;

export type GetListCommitsParameters = Parameters<
  typeof octokit.rest.repos.listCommits
>[0];
