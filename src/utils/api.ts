import type { RequestInterface } from '@octokit/types';
import { octokit } from '#lib/octokit';

/**
 * Fetches all pages of a paginated Octokit endpoint.
 *
 * Uses `octokit.paginate.iterator` to iterate through all pages with
 * `per_page: 100`, accumulating each page response, then returns them all.
 *
 * @param func - Paginated Octokit list function (e.g. `octokit.rest.repos.listBranches`)
 * @param options - Request parameters forwarded to `func` on every page call
 * @returns Array of all page responses in order
 */
export const requestRecursively = async <R extends RequestInterface>(
  func: R,
  options: Parameters<R>[0],
): Promise<Array<Awaited<ReturnType<R>>>> => {
  const results: Array<Awaited<ReturnType<R>>> = [];

  const iterator = octokit.paginate.iterator(func, {
    // biome-ignore lint/suspicious/noExplicitAny: reason
    ...(options as any),
    per_page: 100,
  });

  for await (const res of iterator) {
    results.push(res as unknown as Awaited<ReturnType<R>>);
  }

  return results;
};
