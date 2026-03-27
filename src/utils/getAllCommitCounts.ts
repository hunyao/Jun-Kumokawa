import type { Endpoints, RequestParameters } from '@octokit/types';
import { octokit } from '#lib/index';
import { extractPageInfo } from './extractPageInfo';

const COMMIT_COUNT_TTL_MS = (() => {
  const value = Number(import.meta.env.VITE_COMMIT_TTL_MS);
  return Number.isFinite(value) && value > 0 ? value : 5 * 60 * 1000;
})();
const commitCountCache = new Map<string, { value: number; cachedAt: number }>();
const cacheAndReturn = (key: string, value: number) => {
  commitCountCache.set(key, { value, cachedAt: Date.now() });
  return value;
};

/**
 * Returns the total number of commits in a repository.
 *
 * @function
 * @param {object} options Options for `listCommits`
 * @returns {Promise<number>} total number of commits
 */
export async function getAllCommitCounts(
  options: RequestParameters &
    Endpoints['GET /repos/{owner}/{repo}/commits']['parameters'],
): Promise<number> {
  const cacheKey = JSON.stringify(options);
  const cached = commitCountCache.get(cacheKey);
  const now = Date.now();
  if (cached && now - cached.cachedAt < COMMIT_COUNT_TTL_MS) {
    return cached.value;
  }
  try {
    const first = await octokit.rest.repos.listCommits({
      ...options,
      page: 1,
      per_page: 1,
    });
    const linkInfo = extractPageInfo(first.headers.link);
    if (linkInfo === undefined || linkInfo.last == null)
      return cacheAndReturn(cacheKey, first.data.length);
    return cacheAndReturn(cacheKey, Number(linkInfo.last));
  } catch (e) {
    const error = e as { status?: number };
    if (error.status === 409) return cacheAndReturn(cacheKey, 0);
    throw e;
  }
}
