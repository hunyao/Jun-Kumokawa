import type { components } from '@octokit/openapi-types';
import { useEffect, useState } from 'react';
import { octokit } from '#lib/index';

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

/**
 * Fetches the latest commit for a specific file path in a repository.
 *
 * Results are cached in memory per `owner/repo/branch/path/fileName` key with a
 * configurable TTL (defaults to 5 minutes, overridable via `VITE_COMMIT_TTL_MS`).
 * A `cancelled` flag prevents state updates after the component unmounts mid-fetch.
 *
 * @param props.owner - Repository owner
 * @param props.repo - Repository name
 * @param props.path - Directory path containing the file
 * @param props.branchRef - Branch or SHA ref to fetch commits from
 * @param props.fileName - Name of the file to look up
 * @param props.enableCommitFetch - When `false`, skips the API call (default: `true`)
 * @returns An object containing:
 * - `commit` – the latest commit, or `null` if not found
 * - `isLoading` – whether the request is in flight
 * - `hasError` – whether the request failed
 * - `isResolved` – whether the request has settled
 */
export const useDirectoryRowCommit = (props: UseDirectoryRowCommitProps) => {
  const {
    owner,
    repo,
    path,
    branchRef,
    fileName,
    enableCommitFetch = true,
  } = props;
  const [commit, setCommit] = useState<components['schemas']['commit'] | null>(
    null,
  );
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
