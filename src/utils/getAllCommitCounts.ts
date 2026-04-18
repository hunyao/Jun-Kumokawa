import type { Endpoints, RequestParameters } from '@octokit/types';
import { octokit } from '#lib/index';
import { extractPageInfo } from './extractPageInfo';

const commitCountCache = new Map<string, number>();
const cacheAndReturn = (key: string, value: number) => {
  commitCountCache.set(key, value);
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
  if (cached) {
    return cached;
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
