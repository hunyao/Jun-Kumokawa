import type { Endpoints } from '@octokit/types';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { octokit } from '#lib/index';
import { requestRecursively } from '#utils/index';

let branchsCache:
  | Endpoints['GET /repos/{owner}/{repo}/branches']['response']['data']
  | null = null;
let tagsCache:
  | Endpoints['GET /repos/{owner}/{repo}/tags']['response']['data']
  | null = null;

type useBranchAndTagProps = {
  owner: string;
  repo: string;
  defaultBranch: string;
};
export const useBranchAndTag = (props: useBranchAndTagProps) => {
  const { owner, repo, defaultBranch } = props;
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState<
    Endpoints['GET /repos/{owner}/{repo}/branches']['response']['data']
  >([]);
  const [tags, setTags] = useState<
    Endpoints['GET /repos/{owner}/{repo}/tags']['response']['data']
  >([]);
  const [currentRef, setCurrentRef] = useState<string>();

  const getRef = (
    _branches: Endpoints['GET /repos/{owner}/{repo}/branches']['response']['data'],
    _tags: Endpoints['GET /repos/{owner}/{repo}/tags']['response']['data'],
  ) => {
    const refQuery = searchParams.get('ref');
    if (refQuery === null) {
      const defaultBranchRef = _branches.find(
        ({ name }) => name === defaultBranch,
      );
      if (defaultBranchRef === undefined) {
        throw new Error(
          `the defaultBranch \`${defaultBranch}\` does not exsit`,
        );
      }
      return defaultBranchRef.commit.sha;
    } else {
      const [prefix, ...rest] = refQuery.split('/');
      const refName = rest.join('/');
      if (prefix === 'b') {
        const branchRef = _branches.find(({ name }) => name === refName);
        if (branchRef === undefined) {
          throw new Error(`the branch \`${refName}\` does not exsit`);
        }
        return branchRef.commit.sha;
      } else if (prefix === 't') {
        const tagRef = _tags.find(({ name }) => name === refName);
        if (tagRef === undefined) {
          throw new Error(`the tag \`${refName}\` does not exsit`);
        }
        return tagRef.commit.sha;
      } else {
        throw new Error('invalid ref');
      }
    }
  };

  const cleanup = () => {
    branchsCache = null;
    tagsCache = null;
    setBranches([]);
    setTags([]);
    setCurrentRef(undefined);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: reason
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [owner, repo]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: reason
  useEffect(() => {
    if (currentRef !== undefined) {
      setCurrentRef(getRef(branches, tags));
    }
  }, [searchParams, currentRef]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: reason
  useEffect(() => {
    setLoading(true);
    if (branchsCache !== null && tagsCache !== null) {
      setBranches(branchsCache);
      setTags(tagsCache);
      setCurrentRef(getRef(branchsCache, tagsCache));
      setLoading(false);
      return;
    }

    Promise.all([
      branchsCache === null &&
        requestRecursively(octokit.rest.repos.listBranches, {
          owner,
          repo,
        })
          .then((items) => items.map((item) => item.data))
          .then((items) => items.flat()),
      tagsCache === null &&
        requestRecursively(octokit.rest.repos.listTags, {
          owner,
          repo,
        })
          .then((items) => items.map((item) => item.data))
          .then((items) => items.flat()),
    ])
      .then(([_branches, _tags]) => {
        if (_branches) {
          branchsCache = _branches;
          setBranches(_branches);
        }
        if (_tags) {
          tagsCache = _tags;
          setTags(_tags);
        }
        setCurrentRef(getRef(_branches || [], _tags || []));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { branches, tags, loading, currentRef, cleanup };
};
