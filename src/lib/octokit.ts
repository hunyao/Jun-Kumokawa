import { throttling } from '@octokit/plugin-throttling';
import { Octokit } from 'octokit';
import { ENV } from '#constants/index';
import { getSha1Digest } from '#utils/index';

const cache = new Map<string, Response>();
export const OCTOKIT_UNAUTHORIZED_EVENT = 'octokit:unauthorized';
export const clearOctokitCache = () => {
  cache.clear();
};
const CustomOctokit = Octokit.plugin(throttling);
export const octokit = new CustomOctokit({
  auth: window.localStorage.getItem('github-access-token') || undefined,
  throttle: {
    enabled: false,
  },
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
      const res = await fetch(resource, { ...options, headers });

      if (res.ok) {
        if (options.method === 'GET') {
          cache.set(sha1, res.clone());
          setTimeout(() => {
            cache.delete(sha1);
          }, ENV.CACHE_TTL_MS);
        }
      } else {
        if (res.status === 401 && token) {
          window.localStorage.removeItem('github-access-token');
          clearOctokitCache();
          window.dispatchEvent(new CustomEvent(OCTOKIT_UNAUTHORIZED_EVENT));
        }
      }
      return res;
    },
  },
});
