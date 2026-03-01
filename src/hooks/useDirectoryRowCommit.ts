import { octokit } from '@lib/index';
import type { components } from '@octokit/openapi-types';
import { useEffect, useState } from 'react';

const commitCache = new Map<string, Array<components['schemas']['commit']>>();
const commitCacheTime = new Map<string, number>();
const COMMIT_CACHE_TTL_MS = (() => {
  const value = Number(import.meta.env.VITE_COMMIT_TTL_MS);
  return Number.isFinite(value) && value > 0 ? value : 5 * 60 * 1000;
})();

type UseDirectoryRowCommitProps = {
  owner: string;
  repo: string;
  path: string;
  branchRef: string;
  fileName: string;
  enableCommitFetch?: boolean;
};

export const useDirectoryRowCommit = (props: UseDirectoryRowCommitProps) => {
  const {
    owner,
    repo,
    path,
    branchRef,
    fileName,
    enableCommitFetch = true,
  } = props;
  const [commit, setCommit] = useState<components['schemas']['commit'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const cacheKey = `${owner}/${repo}/${branchRef}/${path}/${fileName}`;

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        setIsResolved(false);
        if (!enableCommitFetch) {
          setCommit(null);
          setIsResolved(true);
          return;
        }

        const cached = commitCache.get(cacheKey);
        const cachedAt = commitCacheTime.get(cacheKey);
        if (cached && cachedAt && Date.now() - cachedAt < COMMIT_CACHE_TTL_MS) {
          setCommit(cached[0] ?? null);
          setIsResolved(true);
          return;
        }

        const resolved = await octokit.rest.repos.listCommits({
          owner,
          repo,
          sha: branchRef,
          path: path === '' ? fileName : `${path}/${fileName}`,
          per_page: 1,
          page: 1,
        });

        if (!cancelled) {
          commitCache.set(cacheKey, resolved.data);
          commitCacheTime.set(cacheKey, Date.now());
          setCommit(resolved.data[0] ?? null);
          setIsResolved(true);
        }
      } catch {
        if (!cancelled) {
          setCommit(null);
          setHasError(true);
          setIsResolved(true);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [owner, repo, path, branchRef, fileName, cacheKey, enableCommitFetch]);

  return { commit, isLoading, hasError, isResolved };
};
