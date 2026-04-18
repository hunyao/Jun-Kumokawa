import { Octokit } from 'octokit';
import { GithubApiRateLimitError } from '#errors/index';
import { getSha1Digest } from '#utils/index';

const controller = new AbortController();
const signal = controller.signal;
const cache = new Map<string, Response>();
export const OCTOKIT_UNAUTHORIZED_EVENT = 'octokit:unauthorized';
export const clearOctokitCache = () => {
  cache.clear();
};
export const octokit = new Octokit({
  auth: window.localStorage.getItem('github-access-token') || undefined,
  request: {
    fetch: async (resource: string, options: RequestInit) => {
      const token = window.localStorage.getItem('github-access-token');
      const headers = new Headers(options.headers);
      if (token && !headers.has('authorization')) {
        headers.set('authorization', `token ${token}`);
      }

      let sha1: string = '';
      if (options.method === 'GET') {
        sha1 = await getSha1Digest(resource);
        if (cache.has(sha1)) {
          return (cache.get(sha1) as Response).clone();
        }
      }
      const res = await fetch(resource, { ...options, headers, signal });

      if (res.ok) {
        if (options.method === 'GET') {
          cache.set(sha1, res.clone());
        }
      } else {
        if (res.status === 401 && token) {
          window.localStorage.removeItem('github-access-token');
          clearOctokitCache();
          window.dispatchEvent(new CustomEvent(OCTOKIT_UNAUTHORIZED_EVENT));
        } else {
          if (res.status === 403 || res.status === 429) {
            if (res.headers.get('x-ratelimit-remaining') === '0') {
              controller.abort(
                new GithubApiRateLimitError(
                  res.status,
                  Number(res.headers.get('x-ratelimit-reset')),
                ),
              );
            }
          }
        }
      }
      return res;
    },
  },
});
