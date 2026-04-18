import type { Endpoints } from '@octokit/types';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

const getCommitSha = (
  branches:
    | Endpoints['GET /repos/{owner}/{repo}/branches']['response']['data']
    | Endpoints['GET /repos/{owner}/{repo}/tags']['response']['data'],
  targetBranchName: string,
) => {
  const defaultBranchRef = branches.find(
    ({ name }) => name === targetBranchName,
  );
  return defaultBranchRef === undefined
    ? undefined
    : defaultBranchRef.commit.sha;
};

type useBranchAndTagProps = {
  branches: Endpoints['GET /repos/{owner}/{repo}/branches']['response']['data'];
  tags: Endpoints['GET /repos/{owner}/{repo}/tags']['response']['data'];
  defaultBranch: string;
};
export const useBranchAndTag = (props: useBranchAndTagProps) => {
  const { branches, tags, defaultBranch } = props;
  const [searchParams] = useSearchParams();
  const [currentRef, setCurrentRef] = useState<string | undefined>(
    getCommitSha(branches, defaultBranch),
  );

  const getRef = (
    _branches: Endpoints['GET /repos/{owner}/{repo}/branches']['response']['data'],
    _tags: Endpoints['GET /repos/{owner}/{repo}/tags']['response']['data'],
  ) => {
    const refQuery = searchParams.get('ref');
    if (refQuery === null) {
      const defaultBranchRefCommitSha = getCommitSha(branches, defaultBranch);
      if (defaultBranchRefCommitSha === undefined) {
        throw new Error(
          `the defaultBranch \`${defaultBranch}\` does not exsit`,
        );
      }
      return defaultBranchRefCommitSha;
    } else {
      const [prefix, ...rest] = refQuery.split('/');
      const refName = rest.join('/');
      if (prefix === 'b') {
        const branchRefCommitSha = getCommitSha(branches, refName);
        if (branchRefCommitSha === undefined) {
          throw new Error(`the branch \`${refName}\` does not exsit`);
        }
        return branchRefCommitSha;
      } else if (prefix === 't') {
        const tagRefCommitSha = getCommitSha(tags, refName);
        if (tagRefCommitSha === undefined) {
          throw new Error(`the tag \`${refName}\` does not exsit`);
        }
        return tagRefCommitSha;
      } else {
        throw new Error('invalid ref');
      }
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: reason
  useEffect(() => {
    if (currentRef !== undefined) {
      setCurrentRef(getRef(branches, tags));
    }
  }, [searchParams]);

  return { currentRef };
};
